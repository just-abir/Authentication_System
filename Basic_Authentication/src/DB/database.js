const mongoose = require("mongoose");

const DB_URL = process.env.DATABASE_URL;

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(DB_URL);

    console.log("Database connected");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
