const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User ID is required']
    },
    amount: {
        type: Number,
        required: [true, 'Donation amount is required'],
        min: [1, 'Donation amount must be at least 1']
    },
    currency: {
        type: String,
        required: [true, 'Currency is required'],
        default: 'USD',
        uppercase: true,
        enum: ['USD', 'EUR', 'GBP', 'ETB']
    },
    donationType: {
        type: String,
        required: [true, 'Donation type is required'],
        enum: ['one-time', 'monthly', 'annual'],
        default: 'one-time'
    },
    tier: {
        type: String,
        enum: ['bronze', 'silver', 'gold', 'platinum', 'custom'],
        default: 'custom'
    },
    stripePaymentIntentId: {
        type: String,
        sparse: true,
        unique: true
    },
    status: {
        type: String,
        required: [true, 'Status is required'],
        enum: ['pending', 'completed', 'failed', 'refunded'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Index for faster queries
donationSchema.index({ userId: 1, createdAt: -1 });
donationSchema.index({ status: 1 });

module.exports = mongoose.model('Donation', donationSchema);
