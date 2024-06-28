const express = require("express");
const router = express.Router();

const {
  saveApiCredentials,
} = require("../../controllers/scanShadowSensitiveData.controllers");

module.exports = router;
