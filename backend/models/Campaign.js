const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Campaign title is required'],
        trim: true,
        maxlength: [200, 'Title cannot exceed 200 characters']
    },
    description: {
        type: String,
        required: [true, 'Campaign description is required'],
        trim: true
    },
    goalAmount: {
        type: Number,
        required: [true, 'Goal amount is required'],
        min: [1, 'Goal amount must be at least 1']
    },
    currentAmount: {
        type: Number,
        default: 0,
        min: [0, 'Current amount cannot be negative']
    },
    status: {
        type: String,
        required: [true, 'Status is required'],
        enum: ['draft', 'active', 'completed', 'cancelled'],
        default: 'draft'
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Creator ID is required']
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update the updatedAt timestamp before saving
campaignSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

// Index for faster queries
campaignSchema.index({ status: 1, createdAt: -1 });
campaignSchema.index({ createdBy: 1 });

// Virtual for calculating progress percentage
campaignSchema.virtual('progressPercentage').get(function () {
    return this.goalAmount > 0 ? Math.round((this.currentAmount / this.goalAmount) * 100) : 0;
});

// Ensure virtuals are included in JSON output
campaignSchema.set('toJSON', { virtuals: true });
campaignSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Campaign', campaignSchema);
