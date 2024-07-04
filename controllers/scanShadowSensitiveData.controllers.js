const api = require("../models/targetDetails.models");
const sensitiveKeywords = require("../models/keywords.models");
const uniqueIds = require("../models/uniqueIds.models");
const handleErrors = require("../utilities/handleErrors");

const axios = require("axios");

// To collect the basic Auth-N and Auth-Z credentials for the API to be scanned and its Owner
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

// To collect sensitive keywords for the shadow sensitive scan
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

// To collect the unque Ids for performing the BOLA scan
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

// To retrieve all the needed data from the databases for authentication and scans
exports.fetchUserApiDetails = async (req, res) => {
  try {
    const user_id = req.params.user_id;

    const apiDetails = await api.findOne({ user_id: user_id });
    const keywords = await sensitiveKeywords.findOne({ user_id: user_id });
    const uniqueId = await uniqueIds.findOne({ user_id: user_id });

    if (!apiDetails || !keywords || !uniqueId) {
      return "Sorry, couldn't find this user in any of our databases";
    } 
    else {
      const headers = {
        Authorization: `Bearer ${apiDetails.apiKey}`,
        "Content-Type": "application/json",
      };

      const response = await axios.get(`${apiDetails.apiURL}`, { headers });

      const apiData = response.data;
      const foundKeywords = {};

      keywords.forEach((keyword) => {
        if (apiData.includes(keyword)) {
          if (!foundKeywords[keyword]) {
            foundKeywords[keyword] = [];
          }
          foundKeywords[keyword].push(data[keyword]);
        }
      });

      return foundKeywords;
    }
  } catch (error) {
    console.log(error);
  }
};

// return res.status(200).send({
//   apiKey: apiDetails.apiKey,
//   apiUrl: apiDetails.apiURL,
//   apiKeyword1: keywords.apiKeyword1,
//   apiKeyword2: keywords.apiKeyword2,
//   apiKeyword3: keywords.apiKeyword3,
//   apiIdentifier1: uniqueId.uniqueId1,
//   apiIdentifier2: uniqueId.uniqueId2,
// });
