const Volunteer = require('../models/Volunteer');
const User = require('../models/User');
const emailService = require('../utils/emailService');

// @desc    Submit volunteer application
// @route   POST /api/volunteers/apply
// @access  Private
exports.createVolunteer = async (req, res, next) => {
    try {
        // Check if user already has a pending or active application
        const existingVolunteer = await Volunteer.findOne({
            userId: req.user.id,
            status: { $in: ['pending', 'approved', 'active'] }
        });

        if (existingVolunteer) {
            return res.status(400).json({
                success: false,
                error: 'You already have an active volunteer application or profile'
            });
        }

        req.body.userId = req.user.id;

        const volunteer = await Volunteer.create(req.body);

        // Send confirmation email
        // Get user details for email
        const user = await User.findById(req.user.id);
        if (user) {
            await emailService.sendVolunteerConfirmation(user.email, user.fullName);
        }

        res.status(201).json({
            success: true,
            data: volunteer
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get all volunteer applications (with filtering)
// @route   GET /api/volunteers/applications
// @access  Private/Admin
exports.getAllVolunteers = async (req, res, next) => {
    try {
        const { status, skillset, availability } = req.query;

        // Build query
        const query = {};

        if (status) {
            query.status = status;
        }

        if (availability) {
            query.availability = availability;
        }

        if (skillset) {
            query.skillset = { $in: skillset.split(',') };
        }

        const volunteers = await Volunteer.find(query)
            .populate('userId', 'fullName email')
            .sort('-createdAt');

        res.status(200).json({
            success: true,
            count: volunteers.length,
            data: volunteers
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update volunteer status
// @route   PUT /api/volunteers/:id/status
// @access  Private/Admin
exports.updateVolunteerStatus = async (req, res, next) => {
    try {
        const { status } = req.body;

        if (!['pending', 'approved', 'rejected', 'active', 'inactive'].includes(status)) {
            return res.status(400).json({
                success: false,
                error: 'Please provide a valid status'
            });
        }

        let volunteer = await Volunteer.findById(req.params.id);

        if (!volunteer) {
            return res.status(404).json({
                success: false,
                error: 'Volunteer application not found'
            });
        }

        volunteer = await Volunteer.findByIdAndUpdate(
            req.params.id,
            { status },
            {
                new: true,
                runValidators: true
            }
        ).populate('userId', 'fullName email');

        // If approved, we could update the user role to 'volunteer'
        if (status === 'approved' || status === 'active') {
            await User.findByIdAndUpdate(volunteer.userId._id, { role: 'volunteer' });
        }

        res.status(200).json({
            success: true,
            data: volunteer
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get volunteer application for current user
// @route   GET /api/volunteers/user/:userId
// @access  Private
exports.getVolunteerByUser = async (req, res, next) => {
    try {
        // Ensure user is requesting their own data or is admin
        if (req.user.id !== req.params.userId && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                error: 'Not authorized to view this application'
            });
        }

        const volunteer = await Volunteer.findOne({ userId: req.params.userId });

        if (!volunteer) {
            return res.status(404).json({
                success: false,
                error: 'No volunteer application found for this user'
            });
        }

        res.status(200).json({
            success: true,
            data: volunteer
        });
    } catch (error) {
        next(error);
    }
};
