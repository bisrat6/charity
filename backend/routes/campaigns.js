const express = require('express');
const {
    getCampaigns,
    getCampaign,
    createCampaign,
    updateCampaign,
    deleteCampaign
} = require('../controllers/campaignController');

const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router
    .route('/')
    .get(getCampaigns)
    .post(protect, authorize('admin'), createCampaign);

router
    .route('/:id')
    .get(getCampaign)
    .put(protect, authorize('admin'), updateCampaign)
    .delete(protect, authorize('admin'), deleteCampaign);

module.exports = router;
