const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendToken = require("../utils/sendToken");

const registerUser = async (req, res) => {
  try {
    const { name, email, role = "listener", password } = req.body;

    const isExistUser = await userModel.findOne({
      $or: [{ email }, { name }],
    });

    if (isExistUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    return sendToken(res, user, 201);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("Input password:", password); // ← DEBUG: Check what's coming in
    console.log("Input password length:", password.length); // ← DEBUG: Check for extra spaces

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exist",
      });
    }
    console.log("Stored hashed password:", user.password); // ← DEBUG: Check DB password
    console.log("User from DB:", user); // ← DEBUG: Verify user object

    const isMatch = await bcrypt.compare(password, user.password);

    console.log("Password match result:", isMatch); // ← DEBUG: See if it matches

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid password1",
      });
    }

    return sendToken(res, user, 200);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { registerUser, loginUser };
