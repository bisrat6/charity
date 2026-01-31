const User = require("../models/User");

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password").sort({ createdAt: -1 });
        res.json({
            success: true,
            count: users.length,
            data: users,
        });
    } catch (err) {
        console.error("Error fetching users:", err);
        res.status(500).json({ error: "Server Error" });
    }
};
