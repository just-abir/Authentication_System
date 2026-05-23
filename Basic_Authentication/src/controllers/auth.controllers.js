const userModel = require("../models/user.models");

const userRegister = async () => {
  const { userName, email, password } = req.body;

  const user = await userModel.create({
    userName,
    email,
    password,
  });
};

module.exports = { userRegister };
