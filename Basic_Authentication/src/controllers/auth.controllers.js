const userModel = require("../models/user.models");
const jwt = require("jsonwebtoken");

const userRegister = async (req, res) => {
  const { userName, email, password } = req.body;

  const userExist = await userModel.findOne({ email });

  if (userExist) {
    return res.status(400).json({
      success: false,
      message: "user already exists",
    });
  }

  const user = await userModel.create({
    userName,
    email,
    password,
  });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(201).json({
    message: "user created successully",
    user,
    token,
  });
};

const createPost = async (req, res) => {
  const token = req.cookies.token;

  console.log("Token: ", token);
  if (!token) {
    return res.status(401).json({
      message: "unauthorized access1",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("Decode value : ", decoded);

    const user = await userModel.findOne({ _id: decoded.id });
    res.status(200).json({
      message: "The user info true",
      user,
    });
  } catch (error) {
    return res.status(401).json({
      message: "unauthorized access2",
    });
  }
};

module.exports = { userRegister, createPost };
