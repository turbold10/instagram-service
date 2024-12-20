const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/userRoutes");
const postRoute = require("./routes/postRoutes");
const likeRoute = require("./routes/likeRoutes");
const cors = require("cors");
const { commentRoute } = require("./routes/commentRoute");

dotenv.config();
const PORT = 8080;

const app = express();
app.use(cors());

app.use(express.json());

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("connect to db");
  } catch (error) {
    throw new error("failed to connect DB");
  }
};

connectToDB();
app.use(userRoute);
app.use(postRoute);
app.use(likeRoute);
app.use(commentRoute);

app.listen(PORT, console.log(`your server is running on port: ${PORT}`));
