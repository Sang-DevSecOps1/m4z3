const mongoose = require("mongoose");
const { Schema } = mongoose;

const sensitiveKeywordsSchema = new Schema({
  user_id: {
    type: String,
    required: true,
  },
  apiKeywords: {
    type: [],
    required: true,
  },
});

const sensitiveKeywords = mongoose.model(
  "sensitive-keyword",
  sensitiveKeywordsSchema
);
module.exports = sensitiveKeywords;
