const express = require("express");
const router = express.Router();
const passport = require("passport");
const { registerUser, loginUser, forgotPassword } = require("../Controllers/UserController");

// Register route
router.post("/register", registerUser);

// Login route
router.post("/login", loginUser);

// Forgot Password route
router.post("/forgot-password", forgotPassword);

// Google OAuth route
router.post("/google-login", passport.authenticate("google", { session: false }));

module.exports = router;
