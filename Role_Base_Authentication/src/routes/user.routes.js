const express = require("express");
const userController = require("../controllers/user.controller");
const userModel = require("../models/user.model");
const router = express.Router();

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);

router.get("/", async (req, res) => {
  try {
    const user = await userModel.find();
    res.json(user);
  } catch (erorr) {
    res.status(500).json({
      message: "some thing wrong",
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const user = await userModel.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
