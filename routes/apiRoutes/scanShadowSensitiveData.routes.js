const express = require("express");
const router = express.Router();

const {
  saveApiCredentials,
  collectApiSensitiveKeywords,
  collectUniqueIds,
  fetchUserApiDetailsAndScanForShadowSensitiveData,
  fetchUserApiDetailsAndScanForBrokenObjectLevelAuthorisation
} = require("../../controllers/scanShadowSensitiveData.controllers");

router.post("/api/save-api-credentials", saveApiCredentials);
router.post("/api/save-api-keywords", collectApiSensitiveKeywords);
router.post("/api/save-api-identifiers", collectUniqueIds);
router.get(
  "/api/get-all-api-data/:user_id",
  fetchUserApiDetailsAndScanForShadowSensitiveData
);
router.post("/api/scan-for-bola", fetchUserApiDetailsAndScanForBrokenObjectLevelAuthorisation);


module.exports = router;
