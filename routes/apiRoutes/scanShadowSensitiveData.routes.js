const express = require("express");
const router = express.Router();

const {
  saveApiCredentials,
} = require("../../controllers/scanShadowSensitiveData.controllers");

router.post("/api/saveAPIData", saveApiCredentials);
module.exports = router;
