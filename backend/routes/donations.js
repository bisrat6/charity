const express = require("express");
const router = express.Router();
const donationController = require("../controllers/donationController");
const auth = require("../middleware/auth");

// Create Chapa payment intent
router.post(
  "/create-payment-intent",
  auth.protect,
  donationController.createPaymentIntent,
);

// Chapa webhook for payment verification
router.post("/webhook", donationController.chapaWebhook);

// Get user donation history
router.get("/user/:userId", auth.protect, donationController.getUserDonations);

// Get donation statistics
router.get("/stats", donationController.getStats);

module.exports = router;
