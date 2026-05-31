require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./DB/Database");
const userRouter = require("./routes/user.routes");
const musicRouter = require("./routes/music.routes");
const cookieParser = require("cookie-parser");
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/users", userRouter);
app.use("/api/musics/", musicRouter);
module.exports = app;
