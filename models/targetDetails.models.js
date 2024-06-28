const mongoose = require("mongoose");
const { Schema } = mongoose;

const apiSchema = new Schema({
  user_id: {
    type: String,
    required: true,
    unique: true,
  },
  apiOwnerName: {
    type: String,
    required: true,
    unique: true,
  },
  apiOwnerEmail: {
    type: String,
    required: true,
    unique: true,
  },
  apiName: {
    type: String,
    required: true,
    unique: true,
  },
  apiDescription: {
    type: String,
    required: true,
    unique: true,
  },
  apiKey: {
    type: String,
    required: true,
    unique: true,
  },
  apiURL: {
    type: String,
    required: true,
    unique: true,
  },
  uniqueIdOne: {
    type: String,
    required: true,
    unique: true,
  },
  uniqueIdTwo: {
    type: String,
    required: true,
    unique: true,
  },
  apiKeywords1: {
    type: String,
    required: true,
    unique: true,
  },
  apiKeywords2: {
    type: String,
    required: true,
    unique: true,
  },
  apiKeywords3: {
    type: String,
    required: true,
    unique: true,
  },
});

const api = mongoose.model("api", apiSchema);
module.exports = api;
