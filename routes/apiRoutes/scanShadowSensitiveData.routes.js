const express = require("express");
const router = express.Router();

const {
  saveApiCredentials,
  collectApiSensitiveKeywords,
  collectUniqueIds,
} = require("../../controllers/scanShadowSensitiveData.controllers");

router.post("/api/save-api-credentials", saveApiCredentials);
router.post("/api/save-api-keywords", collectApiSensitiveKeywords);
router.post("/api/save-api-identifiers", collectUniqueIds);
module.exports = router;
