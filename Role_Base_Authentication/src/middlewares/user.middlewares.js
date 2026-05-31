const jwt = require("jsonwebtoken");

const userArtist = async (req, res, next) => {
  const token = req.cookies.token;

  try {
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "login first",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decoded vaue", decoded);

    if (decoded.role !== "artist") {
      return res.status(403).json({
        message: "forbiiden unautriozed",
      });
    }
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      message: error.message,
    });
  }
};

const userListener = async (req, res, next) => {
  const token = req.cookies.token;

  try {
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "login first",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decoded vaue", decoded);

    if (decoded.role !== "listener") {
      return res.status(403).json({
        message: "forbiiden unautriozed",
      });
    }
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      message: error.message,
    });
  }
};

module.exports = { userArtist, userListener };
