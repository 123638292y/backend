const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Inscription d'un utilisateur
exports.registerUser = async (req, res) => {
  try {
    const { firstName, lastName, username, email, password, confirmPassword, agreeToTerms } = req.body;

    if (!firstName || !lastName || !username || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required." });
    }

    if (!agreeToTerms) {
      return res.status(400).json({ message: "You must agree to the terms." });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use." });
    }

    const newUser = new User({ firstName, lastName, username, email, password });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};
