const mongoose = require("mongoose");

const scanResultSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.String,
      ref: "User",
      required: true,
    },

    apiScanTime: {
      type: String,
      required: true,
    },
    apiOwnerName: {
      type: String,
      required: true,
    },
    apiOwnerEmail: {
      type: String,
      required: true,
    },
    apiName: {
      type: String,
      required: true,
    },
    apiDescription: {
      type: String,
      required: true,
    },
    apiURL: {
      type: String,
      required: true,
    },
    apiScanType: {
      type: String,
      required: true,
    },
    apiScanDuration: {
      type: String,
      required: false,
    },
    Total_Keywords_Scanned: {
      type: [],
      required: true,
    },
    Flagged_Keywords: {
      type: Object,
      required: true,
    },
    Unflagged_Keywords: {
      type: Object,
      required: true,
    },
    Status_code: {
      type: Number,
      required: true,
    },
    Message: {
      type: String,
      required: true,
    },
    Request: {
      type: String,
      required: true,
    },
    Response: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
  },
  { timestamps: true }
);

const ScanResult = mongoose.model("ScanResult", scanResultSchema);
module.exports = ScanResult;
