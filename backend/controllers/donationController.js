const axios = require("axios");
const Donation = require("../models/Donation");
const Campaign = require("../models/Campaign");
const User = require("../models/User");
const emailService = require("../utils/emailService");

// 1. Create Chapa payment intent
exports.createPaymentIntent = async (req, res, next) => {
  try {
    const {
      amount,
      currency = "ETB",
      campaignId,
      donationType,
      tier,
    } = req.body;
    const user = req.user;
    const txRef = `donation-${Date.now()}-${user._id}`;
    const chapaUrl = "https://api.chapa.co/v1/transaction/initialize";
    const frontendBase = process.env.FRONTEND_URL
      ? process.env.FRONTEND_URL.replace(/\/$/, "")
      : "http://localhost:3000";
    const returnUrl = `${frontendBase}/donation-success?tx_ref=${txRef}`;
    let backendBase =
      process.env.BACKEND_URL || `${req.protocol}://${req.get("host")}`;
    if (
      process.env.NODE_ENV === "production" &&
      backendBase.startsWith("http://")
    ) {
      backendBase = backendBase.replace("http://", "https://");
    }
    const callbackUrl = `${backendBase}/api/donations/webhook`;

    const payload = {
      amount: String(amount),
      currency,
      email: (user.email || "").toLowerCase().trim(),
      first_name: (user.fullName || "").split(" ")[0] || "Donor",
      last_name: (user.fullName || "").split(" ")[1] || "User",
      tx_ref: txRef,
      phone_number: user.phone || "0912345678",
      callback_url: callbackUrl,
      return_url: returnUrl,
      customization: {
        title: "Donation",
        description: `Donation to Cornerstone${campaignId ? " Campaign" : ""}`,
      },
      meta: {
        userId: String(user._id),
        campaignId: campaignId || "",
        donationType: donationType || "one-time",
        tier: tier || "custom",
      },
    };

    const response = await axios.post(chapaUrl, payload, {
      headers: { Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}` },
    });
    const { data } = response;
    if (data.status !== "success") {
      return res.status(400).json({
        error: data.message || "Chapa failed to initialize payment",
        chapa: data
      });
    }
    res.status(200).json({ checkout_url: data.data.checkout_url, tx_ref: txRef });
  } catch (err) {
    let errorMessage = "Failed to initialize payment";
    let chapaError = null;
    if (err.response && err.response.data) {
      chapaError = err.response.data;
      // Handle Chapa validation errors
      if (chapaError.message && typeof chapaError.message === 'object') {
        const validationErrors = Object.entries(chapaError.message)
          .map(([field, msgs]) => `${field}: ${Array.isArray(msgs) ? msgs.join(', ') : msgs}`)
          .join('; ');
        errorMessage = `Validation error - ${validationErrors}`;
      } else if (chapaError.message) {
        errorMessage = chapaError.message;
      }
    } else if (err.message) {
      errorMessage = err.message;
    }
    console.error("Donation payment initialization error:", errorMessage, chapaError);
    res.status(500).json({ error: errorMessage, chapa: chapaError });
  }
};

// 2. Chapa webhook handler
exports.chapaWebhook = async (req, res) => {
  try {
    console.log("=== Chapa Webhook Received ===");
    console.log("Request body:", JSON.stringify(req.body, null, 2));

    const { tx_ref, status } = req.body;
    if (!tx_ref || (status !== "success" && status !== "paid")) {
      console.log("Invalid webhook data - tx_ref:", tx_ref, "status:", status);
      return res.status(400).json({ error: "Invalid webhook data" });
    }

    // Verify with Chapa
    console.log("Verifying transaction with Chapa:", tx_ref);
    const verifyUrl = `https://api.chapa.co/v1/transaction/verify/${tx_ref}`;
    const response = await axios.get(verifyUrl, {
      headers: { Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}` },
    });

    console.log("Chapa verification response:", JSON.stringify(response.data, null, 2));
    const txn = response.data.data;

    if (!txn || (txn.status !== "success" && txn.status !== "paid")) {
      console.log("Payment not successful - status:", txn?.status);
      return res.status(400).json({ error: "Payment not successful" });
    }

    // Check if donation already exists
    let donation = await Donation.findOne({ stripePaymentIntentId: tx_ref });
    if (donation) {
      console.log("Donation already exists:", donation._id);
      return res.status(200).json({ ok: true });
    }

    // Create donation
    const meta = txn.meta || {};
    console.log("Creating donation with meta:", meta);

    donation = await Donation.create({
      userId: meta.userId,
      amount: txn.amount,
      currency: txn.currency,
      donationType: meta.donationType || "one-time",
      tier: meta.tier || "custom",
      stripePaymentIntentId: tx_ref,
      status: "completed",
      createdAt: new Date(),
    });
    console.log("Donation created:", donation._id);

    // Link to campaign and update progress
    if (meta.campaignId) {
      await Campaign.findByIdAndUpdate(meta.campaignId, {
        $inc: { currentAmount: txn.amount },
      });
      console.log("Campaign updated:", meta.campaignId);
    }

    // Send receipt email
    const user = await User.findById(meta.userId);
    if (user) {
      await emailService.sendDonationReceipt(user.email, user.fullName, {
        amount: txn.amount,
        currency: txn.currency,
        id: tx_ref,
        date: new Date(),
      });
      console.log("Receipt email sent to:", user.email);
    }

    console.log("=== Webhook Processing Complete ===");
    res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Chapa webhook error:", err.message);
    console.error("Error stack:", err.stack);
    res.status(500).json({ error: "Webhook processing failed" });
  }
};

// 3. Get user donation history
exports.getUserDonations = async (req, res) => {
  try {
    const { userId } = req.params;
    const donations = await Donation.find({ userId }).sort("-createdAt");
    res.status(200).json({ donations });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch donations" });
  }
};

// 4. Get donation statistics
exports.getStats = async (req, res) => {
  try {
    const totalRaised = await Donation.aggregate([
      { $match: { status: "completed" } },
      { $group: { _id: null, total: { $sum: "$amount" }, count: { $sum: 1 } } },
    ]);
    const livesImpacted = totalRaised[0]
      ? Math.floor(totalRaised[0].total / 150)
      : 0;
    res.status(200).json({
      totalRaised: totalRaised[0]?.total || 0,
      donationCount: totalRaised[0]?.count || 0,
      livesImpacted,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch stats" });
  }
};
