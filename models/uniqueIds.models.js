const mongoose = require("mongoose");
const { Schema } = mongoose;

const uniqueIdSchema = new Schema({
  user_id: {
    type: String,
    required: true,
  },
  uniqueId1: {
    type: String,
    required: true,
  },
  uniqueId2: {
    type: String,
    required: true,
  },
});

const uniqueIds = mongoose.model("unique-id", uniqueIdSchema);
module.exports = uniqueIds;
