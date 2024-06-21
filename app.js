// Requiring all modules
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const { authRoutes, userRoutes } = require("./routes/index");
app.use(express.static("./public"));

dotenv.config();
app.use(cors());
app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Connecting to Mongo DB!!
mongoose.set("strictQuery", true);

const connectMongodb = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("D4t4B4s3 1s Succ3sfully C0nn3ct3d");
  } catch (error) {
    console.log(error);
  }
};

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use("/auth", authRoutes);
app.use("/users", userRoutes);

// Parsing all 404 requests
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// for development
if (app.get("env") === "development") {
  app.use((error, req, res) => {
    res.status(error.status || 500);
    req.json({
      message: error.message || "Internal Server Error",
      error: error,
    });
  });
}

//Server listening on port process.env.PORT
const PORT = 3000;
const port = process.env.PORT || PORT;
app.listen(port, () => {
  connectMongodb();
  console.log(`The Server is listening on port ${port}`);
});
