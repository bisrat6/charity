const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const User = require("../models/User");
const emailService = require("../utils/emailService");

const signToken = (user) => {
  const payload = { id: user.id, role: user.role };
  return jwt.sign(payload, process.env.JWT_SECRET || "dev_secret", {
    expiresIn: "7d",
  });
};

exports.signup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { fullName, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "User already exists" });

    // Let User model pre-save hook hash the password
    user = new User({ fullName, email, password });
    await user.save();

    // Send welcome email
    await emailService.sendWelcomeEmail(user.email, user.fullName);

    const token = signToken(user);
    res.json({
      token,
      user: {
        _id: user.id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

exports.signin = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { email, password } = req.body;
  try {
    // include password field for verification
    const user = await User.findOne({ email }).select("+password");
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = signToken(user);
    res.json({
      token,
      user: {
        _id: user.id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      // To avoid leaking which emails are registered, respond OK
      return res.json({
        msg: "If an account exists, a reset email has been sent.",
      });
    }

    // Create a short-lived reset token
    const resetToken = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET || "dev_secret",
      { expiresIn: "1h" },
    );

    // Send password reset email using centralized service
    await emailService.sendPasswordResetEmail(
      user.email,
      user.fullName,
      resetToken,
    );

    res.json({ msg: "If an account exists, a reset email has been sent." });
  } catch (err) {
    console.error("Forgot password error:", err);
    res.status(500).send("Server error");
  }
};
exports.resetPassword = async (req, res) => {
  const { token, password } = req.body;
  try {
    if (!token || !password)
      return res.status(400).json({ msg: "Token and new password required" });
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "dev_secret");
    const user = await User.findById(decoded.id);
    if (!user) return res.status(400).json({ msg: "Invalid token" });

    // Assign plain password and let pre-save hook hash it
    user.password = password;
    await user.save();

    res.json({ msg: "Password has been reset successfully" });
  } catch (err) {
    console.error("Reset password error:", err);
    res.status(500).send("Server error");
  }
};

exports.me = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ msg: "User not found" });
    res.json({ user });
  } catch (err) {
    console.error("Get me error:", err);
    res.status(500).send("Server error");
  }
};
