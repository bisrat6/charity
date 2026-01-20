const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protect routes
exports.protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        // Combined: structured error + simple msg
        return res.status(401).json({
            success: false,
            msg: 'No token, authorization denied',
        });
    }

    try {
        // Keep your dev_secret fallback, but also load user from DB
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'dev_secret');
        req.user = await User.findById(decoded.id);

        if (!req.user) {
            return res.status(401).json({
                success: false,
                error: 'User not found, not authorized',
            });
        }

        next();
    } catch (err) {
        return res.status(401).json({
            success: false,
            error: 'Token is not valid',
        });
    }
};

// Grant access to specific roles
exports.authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                error: `User role ${req.user.role} is not authorized to access this route`,
            });
        }
        next();
    };
};
