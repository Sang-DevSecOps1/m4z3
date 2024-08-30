const mongoose = require("mongoose");

const ssdScanResultSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.String,
      ref: "User",
      required: true,
    },

    apiScanTime: {
      type: String,
      required: true,
      unique: false,
    },
    apiOwnerName: {
      type: String,
      required: true,
      unique: false,
    },
    apiOwnerEmail: {
      type: String,
      required: true,
      unique: false,
    },
    apiName: {
      type: String,
      required: true,
      unique: true,
    },
    apiDescription: {
      type: String,
      required: true,
      unique: false,
    },
    apiEndpointScanned: {
      type: String,
      required: true,
      unique: false,
    },
    apiURL: {
      type: String,
      required: true,
      unique: false,
    },
    apiScanType: {
      type: String,
      required: true,
      unique: false,
    },
    apiScanDuration: {
      type: String,
      required: false,
    },
    Flagged_Keywords: {
      type: Object,
      required: true,
      unique: false,
    },
    Unflagged_Keywords: {
      type: Object,
      required: true,
      unique: false,
    },
    Status_code: {
      type: Number,
      required: true,
      unique: false,
    },
    Feedback: {
      type: String,
      required: true,
      unique: false,
    },
    Request: {
      type: String,
      required: true,
      unique: false,
    },
    Response: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
      unique: false,
    },
    Impact_Of_Ssds: {
      type: String,
      required: true,
      unique: false,
    },
    Recommendation_For_Ssds: {
      type: String,
      required: true,
      unique: false,
    },
  },
  { timestamps: true }
);

const ssdScanResult = mongoose.model("ssdScanResult", ssdScanResultSchema);
module.exports = ssdScanResult;
