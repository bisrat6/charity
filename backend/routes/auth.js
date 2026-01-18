const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { signupValidation, loginValidation } = require("../utils/validators");
const { resetPasswordValidation } = require("../utils/validators");
const auth = require("../middleware/auth");

// POST /api/auth/signup
router.post("/signup", signupValidation, authController.signup);

// POST /api/auth/signin
router.post("/signin", loginValidation, authController.signin);

// POST /api/auth/forgot-password
router.post("/forgot-password", authController.forgotPassword);

// POST /api/auth/reset-password
router.post(
  "/reset-password",
  resetPasswordValidation,
  authController.resetPassword,
);

// GET /api/auth/me (protected)
router.get("/me", auth, authController.me);

module.exports = router;
