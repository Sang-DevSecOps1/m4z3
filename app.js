// Requiring all modules
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const { authRoutes, apiScans } = require("./routes/index");
app.use(express.static("./public"));

const ejs = require("ejs");
const fs = require("fs");
const jsreport = require("jsreport");
const api = require("./models/targetDetails.models");
const sensitiveKeywords = require("./models/keywords.models");
const {
  foundKeywords,
  notFoundKeywords,
} = require("./controllers/scanShadowSensitiveData.controllers");
let {
  isVulnerableScanReport,
  isNotVulnerableScanReport,
} = require("./controllers/scanShadowSensitiveData.controllers");
const uniqueIds = require("./models/uniqueIds.models");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
const scanResults = {
  apiScanTime: new Date().toLocaleString(),
  apiOwnerName: `${api.apiOwnerName}`,
  apiOwnerEmail: `${api.apiOwnerEmail}`,
  apiName: `${api.apiName}`,
  apiDescription: `${api.apiDescription}`,
  apiURL: `${api.apiURL}`,
  apiIdentifiers: `${sensitiveKeywords.apiKeywords}`,
  apiScanType: "BOLA and SSD Scans",
  apiScanDuration: "",
};

isVulnerableScanReport = {
  Total_Keywords_Scanned: sensitiveKeywords.apiKeywords,
  Flagged_Keywords: foundKeywords,
  Unflagged_Keywords: notFoundKeywords,
  Status_code: 200,
  Message: "This API is vulnerable to Shadow Sensitive Data Exposure",
};

isNotVulnerableScanReport = {
  Total_Keywords_Scanned: sensitiveKeywords.apiKeywords,
  Flagged_Keywords: foundKeywords,
  Unflagged_Keywords: notFoundKeywords,
  Status_code: 200,
  Message: "This API is NOT vulnerable to Shadow Sensitive Data Exposure",
};

app.get("/technical-report", (req, res) => {
  res.render("technicalReport.ejs", {
    scanResults,
    isVulnerableScanReport,
    isNotVulnerableScanReport,
  });
});

app.get("/executive-report", (req, res) => {
  res.render("executiveReport.ejs", {
    scanResults,
    isVulnerableScanReport,
    isNotVulnerableScanReport,
  });
});

app.use("/auth", authRoutes);
app.use("/api", apiScans);

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

app.use(cors());
app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

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
