const mongoose = require("mongoose");

const bolaScanResultSchema = new mongoose.Schema(
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
      unique: false,
    },
    apiDescription: {
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
    Unique_Identifiers_Used: {
      type: [],
      required: true,
      unique: false,
    },
    Status_code: {
      type: Number,
      required: true,
      unique: false,
    },
    Vulnerable_Message: {
      type: String,
      required: true,
      unique: false,
    },
    Not_Vulnerable_Message: {
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
  },
  { timestamps: true }
);

const bolaScanResult = mongoose.model("bolaScanResult", bolaScanResultSchema);
module.exports = bolaScanResult;
