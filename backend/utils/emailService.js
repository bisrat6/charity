const nodemailer = require('nodemailer');

// Create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.mailtrap.io',
    port: process.env.EMAIL_PORT || 2525,
    secure: process.env.EMAIL_SECURE === 'true', // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER, // generated ethereal user
        pass: process.env.EMAIL_PASS, // generated ethereal password
    },
});

/**
 * Send welcome email to new user
 * @param {string} email - Recipient email
 * @param {string} name - Recipient name
 */
const sendWelcomeEmail = async (email, name) => {
    try {
        const info = await transporter.sendMail({
            from: `"${process.env.FROM_NAME || 'Charity App'}" <${process.env.FROM_EMAIL || 'noreply@charityapp.com'}>`,
            to: email,
            subject: 'Welcome to Charity App',
            text: `Hello ${name},\n\nWelcome to Charity App! We are excited to have you on board.\n\nBest regards,\nThe Team`,
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Welcome, ${name}!</h2>
          <p>Thank you for joining our community. We are thrilled to have you with us.</p>
          <p>If you have any questions, feel free to reply to this email.</p>
          <br>
          <p>Best regards,</p>
          <p>The Charity App Team</p>
        </div>
      `,
        });
        console.log('Welcome email sent: %s', info.messageId);
        return info;
    } catch (error) {
        console.error('Error sending welcome email:', error);
        // Don't throw error to prevent blocking the flow, just log it
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
        const info = await transporter.sendMail({
            from: `"${process.env.FROM_NAME || 'Charity App'}" <${process.env.FROM_EMAIL || 'noreply@charityapp.com'}>`,
            to: email,
            subject: 'Volunteer Application Received',
            text: `Hello ${name},\n\nThank you for applying to volunteer with us. We have received your application and will review it shortly.\n\nBest regards,\nThe Team`,
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Application Received</h2>
          <p>Dear ${name},</p>
          <p>Thank you for your interest in volunteering with us. We have successfully received your application.</p>
          <p>Our team will review your profile and get back to you soon regarding the next steps.</p>
          <br>
          <p>Best regards,</p>
          <p>The Charity App Team</p>
        </div>
      `,
        });
        console.log('Volunteer confirmation email sent: %s', info.messageId);
        return info;
    } catch (error) {
        console.error('Error sending volunteer confirmation email:', error);
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
        const formattedAmount = new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);

        const info = await transporter.sendMail({
            from: `"${process.env.FROM_NAME || 'Charity App'}" <${process.env.FROM_EMAIL || 'noreply@charityapp.com'}>`,
            to: email,
            subject: 'Donation Receipt',
            text: `Hello ${name},\n\nThank you for your donation of ${formattedAmount}. Your support makes a difference!\nTransaction ID: ${id}\nDate: ${new Date(date).toLocaleDateString()}\n\nBest regards,\nThe Team`,
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Thank You for Your Donation!</h2>
          <p>Dear ${name},</p>
          <p>We are incredibly needs grateful for your generous donation. Your support helps us continue our mission.</p>
          <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3>Donation Details</h3>
            <p><strong>Amount:</strong> ${formattedAmount}</p>
            <p><strong>Transaction ID:</strong> ${id}</p>
            <p><strong>Date:</strong> ${new Date(date).toLocaleDateString()}</p>
          </div>
          <p>Please keep this email for your records.</p>
          <br>
          <p>With gratitude,</p>
          <p>The Charity App Team</p>
        </div>
      `,
        });
        console.log('Donation receipt sent: %s', info.messageId);
        return info;
    } catch (error) {
        console.error('Error sending donation receipt:', error);
        return null;
    }
};

module.exports = {
    sendWelcomeEmail,
    sendVolunteerConfirmation,
    sendDonationReceipt
};
