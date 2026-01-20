const express = require('express');
const {
    createVolunteer,
    getAllVolunteers,
    updateVolunteerStatus,
    getVolunteerByUser
} = require('../controllers/volunteerController');

const router = express.Router();

// Middleware placeholders - assuming these will be implemented or already exist
// If authentication middleware is not ready, we might need to mock or skip it for now, 
// but based on typical patterns:
const { protect, authorize } = require('../middleware/auth');

// Routes
router.post('/apply', protect, createVolunteer);
router.get('/applications', protect, authorize('admin'), getAllVolunteers);
router.put('/:id/status', protect, authorize('admin'), updateVolunteerStatus);
router.get('/user/:userId', protect, getVolunteerByUser);

module.exports = router;
