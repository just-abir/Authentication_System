require("dotenv").config();
const app = require("./src/app");

const connectDB = require("./src/Db/database");

connectDB();

app.listen(3000, () => {
  console.log("port  is runnning....");
});
