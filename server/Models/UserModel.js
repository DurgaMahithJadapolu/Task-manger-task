const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  googleId: String,  // For Google OAuth
});

const User = mongoose.model("User", userSchema);

module.exports = User;
