const generateToken = require("./generateToken");

const sendToken = (res, user, statusCode = 200) => {
  const token = generateToken(user);

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return res.status(statusCode).json({
    success: true,
    user,
    token,
  });
};

module.exports = sendToken;
