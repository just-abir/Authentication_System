const express = require("express");
const authController = require("../controllers/auth.controllers");

const router = express.Router();

router.post("/register", authController.userRegister);

module.exports = router;
