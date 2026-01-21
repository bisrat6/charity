const Donation = require('../models/Donation');
const Campaign = require('../models/Campaign');
const Volunteer = require('../models/Volunteer');

// @desc    Get overall statistics
// @route   GET /api/stats
// @access  Public
exports.getStats = async (req, res, next) => {
    try {
        // 1. Calculate total raised from completed donations
        const donationStats = await Donation.aggregate([
            {
                $match: { status: 'completed' }
            },
            {
                $group: {
                    _id: null,
                    totalRaised: { $sum: '$amount' }
                }
            }
        ]);

        const totalRaised = donationStats.length > 0 ? donationStats[0].totalRaised : 0;

        // 2. Count active campaigns
        const activeCampaigns = await Campaign.countDocuments({ status: 'active' });

        // 3. Count total volunteers (approved or active)
        const totalVolunteers = await Volunteer.countDocuments({
            status: { $in: ['approved', 'active'] }
        });

        // 4. Calculate lives impacted (Total Raised / 150)
        // Assuming $150 impacts one life (as per requirement)
        const livesImpacted = Math.floor(totalRaised / 150);

        res.status(200).json({
            success: true,
            data: {
                totalRaised,
                activeCampaigns,
                totalVolunteers,
                livesImpacted
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};
