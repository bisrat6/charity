const { body } = require("express-validator");

const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

exports.signupValidation = [
  body("fullName").trim().notEmpty().withMessage("Full name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("password")
    .matches(passwordRegex)
    .withMessage(
      "Password must be at least 8 characters and include letters and numbers",
    ),
];

exports.loginValidation = [
  body("email").isEmail().withMessage("Valid email is required"),
  body("password").exists().withMessage("Password is required"),
];

exports.resetPasswordValidation = [
  body("token").notEmpty().withMessage("Reset token is required"),
  body("password")
    .matches(passwordRegex)
    .withMessage(
      "Password must be at least 8 characters and include letters and numbers",
    ),
];

exports.phoneValidation = [
  body("phone")
    .optional()
    .isMobilePhone("any")
    .withMessage("Invalid phone number"),
];
