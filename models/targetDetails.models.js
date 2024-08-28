const mongoose = require("mongoose");
const { Schema } = mongoose;

const apiSchema = new Schema({
  user_id: {
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
  apiKey: {
    type: String,
    required: true,
    unique: false,
  },
  apiEndpointURL: {
    type: String,
    required: true,
    unique: false,
  },
  hostURL: {
    type: String,
    required: true,
    unique: false,
  },
});

const api = mongoose.model("api", apiSchema);
module.exports = api;

// {
// 17138e27c-5e81-4118-9887-b48b02441a44
//   "user_id": "5fe7a33f-8448-4d80-b1d3-ed3d534a5174",
//   "apiOwnerName": "Sang David",
//   "apiOwnerEmail": "sang@gmail.com",
//   "apiName": "Linked User Data",
//   "apiDescription": "The API contains users data on profiles on Linked",
//   "apiKey": "123456789101112",
//   "apiURL": "www.example.com",
//   "uniqueIdOne":"1bf2b2b0-6b99-4a5e-9d54-1e1e324f0ea4",
//   "uniqueIdTwo":"38363b17-2779-46aa-8c24-d40e643c8a8e",
//   "apiKeywords1":"Cyber Attack",
//   "apiKeywords2":"Threats",
//   "apiKeywords3":"Cyber"
// }
