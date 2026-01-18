const mongoose = require('mongoose');

const volunteerSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User ID is required']
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
        trim: true
    },
    skillset: [{
        type: String,
        trim: true
    }],
    availability: {
        type: String,
        required: [true, 'Availability is required'],
        enum: ['weekdays', 'weekends', 'both', 'flexible'],
        default: 'flexible'
    },
    interests: [{
        type: String,
        trim: true
    }],
    message: {
        type: String,
        trim: true,
        maxlength: [1000, 'Message cannot exceed 1000 characters']
    },
    status: {
        type: String,
        required: [true, 'Status is required'],
        enum: ['pending', 'approved', 'rejected', 'active', 'inactive'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Index for faster queries
volunteerSchema.index({ userId: 1 });
volunteerSchema.index({ status: 1 });

module.exports = mongoose.model('Volunteer', volunteerSchema);
