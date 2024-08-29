const mongoose = require("mongoose");
const { Schema } = mongoose;

const uniqueIdSchema = new Schema({
  user_id: {
    type: String,
    required: true,
    unique: false,
  },
  uniqueId: {
    type: [],
    required: true,
    unique: false,
  },
});

const uniqueIds = mongoose.model("unique-id", uniqueIdSchema);
module.exports = uniqueIds;
