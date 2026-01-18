const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const User = require("../models/User");
const nodemailer = require("nodemailer");

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

    const token = signToken(user);
    res.json({
      token,
      user: {
        id: user.id,
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
        id: user.id,
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

    // Prepare email (only send if env configured)
    if (
      process.env.EMAIL_HOST &&
      process.env.EMAIL_USER &&
      process.env.EMAIL_PASS
    ) {
      const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const resetUrl = `${process.env.FRONTEND_URL || "http://localhost:3000"}/reset-password?token=${resetToken}`;
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: "Password reset",
        text: `Reset your password: ${resetUrl}`,
      });
    } else {
      console.log("Reset token (no email configured):", resetToken);
    }

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
