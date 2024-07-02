const api = require("../models/targetDetails.models");
const sensitiveKeywords = require("../models/keywords.models");
const uniqueIds = require("../models/uniqueIds.models");
const handleErrors = require("../utilities/handleErrors");

exports.saveApiCredentials = async (req, res) => {
  try {
    const {
      user_id,
      apiOwnerName,
      apiOwnerEmail,
      apiName,
      apiDescription,
      apiKey,
      apiURL,
    } = req.body;
    const newApi = new api({
      user_id,
      ...req.body,
    });

    await newApi.save();
    console.log(newApi);
    return res.status(201).send({
      Message: "API Credentials successfully stored",
      userData: newApi,
    });
  } catch (error) {
    console.log(error);
  }
};
exports.collectApiSensitiveKeywords = async (req, res) => {
  try {
    const { user_id, apiKeyword1, apiKeyword2, apiKeyword3 } = req.body;
    const collectApiSensitiveKeyword = new sensitiveKeywords({
      user_id,
      ...req.body,
    });

    await collectApiSensitiveKeyword.save();
    console.log(collectApiSensitiveKeyword);
    return res.status(201).send({
      Message: "API sensitive keywords successfully collected and stored",
      userData: collectApiSensitiveKeyword,
    });
  } catch (error) {
    console.log(error);
  }
};
exports.collectUniqueIds = async (req, res) => {
  try {
    const { user_id, uniqueId1, uniqueId2 } = req.body;
    const collectUniqueId = new uniqueIds({
      user_id,
      ...req.body,
    });

    await collectUniqueId.save();
    console.log(collectUniqueId);
    return res.status(201).send({
      Message: "API unique Identifiers collected and stored successfully",
      userData: collectUniqueId,
    });
  } catch (error) {
    console.log(error);
  }
};
