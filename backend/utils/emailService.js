const nodemailer = require("nodemailer");
const path = require("path");
const pug = require("pug");

// Create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || "smtp.mailtrap.io",
  port: process.env.EMAIL_PORT || 2525,
  secure: process.env.EMAIL_SECURE === "true", // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER, // generated ethereal user
    pass: process.env.EMAIL_PASS, // generated ethereal password
  },
});

// Helper to render a pug template to HTML
function renderEmailTemplate(templateName, locals) {
  const templatePath = path.join(
    __dirname,
    "../views/emails",
    templateName + ".pug",
  );
  return pug.renderFile(templatePath, locals);
}

const sendWelcomeEmail = async (email, name) => {
  try {
    const html = renderEmailTemplate("welcome", {
      name,
      year: new Date().getFullYear(),
    });
    const info = await transporter.sendMail({
      from: `"${process.env.FROM_NAME || "CORNERSTONE"}" <${process.env.FROM_EMAIL || "noreply@cornerstone.com"}>`,
      to: email,
      subject: "Welcome to CORNERSTONE",
      html,
    });
    console.log("Welcome email sent: %s", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending welcome email:", error);
    return null;
  }
};

/**
 * Send volunteer application received confirmation
 * @param {string} email - Recipient email
 * @param {string} name - Recipient name
 */
const sendVolunteerConfirmation = async (email, name) => {
  try {
    const html = renderEmailTemplate("volunteerConfirmation", {
      name,
      year: new Date().getFullYear(),
    });
    const info = await transporter.sendMail({
      from: `"${process.env.FROM_NAME || "CORNERSTONE"}" <${process.env.FROM_EMAIL || "noreply@cornerstone.com"}>`,
      to: email,
      subject: "Volunteer Application Received",
      html,
    });
    console.log("Volunteer confirmation email sent: %s", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending volunteer confirmation email:", error);
    return null;
  }
};

/**
 * Send donation receipt
 * @param {string} email - Recipient email
 * @param {string} name - Recipient name
 * @param {object} donationDetails - Donation details (amount, currency, etc.)
 */
const sendDonationReceipt = async (email, name, donationDetails) => {
  try {
    const { amount, currency, id, date } = donationDetails;
    const formattedAmount = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
    }).format(amount);
    const html = renderEmailTemplate("donationReceipt", {
      name,
      amount: formattedAmount,
      id,
      date: new Date(date).toLocaleDateString(),
      year: new Date().getFullYear(),
    });
    const info = await transporter.sendMail({
      from: `"${process.env.FROM_NAME || "CORNERSTONE"}" <${process.env.FROM_EMAIL || "noreply@cornerstone.com"}>`,
      to: email,
      subject: "Donation Receipt",
      html,
    });
    console.log("Donation receipt sent: %s", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending donation receipt:", error);
    return null;
  }
};

/**
 * Send password reset email
 * @param {string} email - Recipient email
 * @param {string} name - Recipient name
 * @param {string} resetToken - JWT reset token
 */
const sendPasswordResetEmail = async (email, name, resetToken) => {
  try {
    const resetUrl = `${process.env.FRONTEND_URL || "http://localhost:3000"}/reset-password?token=${resetToken}`;
    const html = renderEmailTemplate("passwordReset", {
      name,
      resetUrl,
      year: new Date().getFullYear(),
    });
    const info = await transporter.sendMail({
      from: `"${process.env.FROM_NAME || "CORNERSTONE"}" <${process.env.FROM_EMAIL || "noreply@cornerstone.com"}>`,
      to: email,
      subject: "Password Reset Request",
      html,
    });
    console.log("Password reset email sent: %s", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending password reset email:", error);
    return null;
  }
};

module.exports = {
  sendWelcomeEmail,
  sendVolunteerConfirmation,
  sendDonationReceipt,
  sendPasswordResetEmail,
};
