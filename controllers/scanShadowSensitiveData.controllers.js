const api = require("../models/targetDetails.models");
const sensitiveKeywords = require("../models/keywords.models");
const uniqueIds = require("../models/uniqueIds.models");
const handleErrors = require("../utilities/handleErrors");

const axios = require("axios");
const Fuse = require("fuse.js");

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

// This function will help collect all values from the response.data object into an array
const collectApiDataValues = (obj) => {
  let values = [];

  for (const key in obj) {
    if (typeof obj[key] === "object" && obj[key] !== null) {
      values = values.concat(collectApiDataValues(obj[key])); // Collect values from nested objects
    } else if (typeof obj[key] === "string") {
      values.push(obj[key]); // Directly add strings
    } else if (typeof obj[key] === "number") {
      values.push(JSON.stringify(obj[key])); // Convert the numbers to strings
    } else if (obj[key] instanceof Date) {
      values.push(obj[key].toISOString()); // Convert the dates to ISO string format
    } else {
      values.push(JSON.stringify(obj[key]));
    }
  }
  return values;
};

// To retrieve all the needed data from the databases for authentication and scans
exports.fetchUserApiDetailsAndScanForShadowSensitiveData = async (req, res) => {
  try {
    const user_id = req.params.user_id;

    const apiDetails = await api.findOne({ user_id: user_id });
    const keywords = await sensitiveKeywords.findOne({ user_id: user_id });
    const uniqueId = await uniqueIds.findOne({ user_id: user_id });

    if (!apiDetails || !keywords || !uniqueId) {
      return "Sorry, couldn't find this user in any of our databases";
    } else {
      const apiKeyHeader = apiDetails.apiKey;

      const headers = apiKeyHeader;

      const apiURL = `${apiDetails.hostURL}${apiDetails.apiEndpointURL}`;
      const response = await axios.get(apiURL, { headers });

      const apiData = response.data;
      const apiKeywords = keywords.apiKeywords;
      const apiDataValues = collectApiDataValues(apiData);

      // Initialize Fuse.js with collected values
      const fuse = new Fuse(apiDataValues, {
        includeScore: true,
        threshold: 0.3, // Adjust the threshold as needed
      });

      const foundKeywords = {};
      const notFoundKeywords = {};

      apiKeywords.forEach((keyword) => {
        const result = fuse.search(keyword);
        if (result.length > 0) {
          foundKeywords[keyword] = true;
        } else {
          notFoundKeywords[keyword] = false;
        }
      });
      return res.status(200).json({
        "Found Keywords": foundKeywords,
        "Not Found Keywords": notFoundKeywords,
        Message:
          "This scan for Shadow sensitive data in your API's was successful",
      });
    }

    // const apiDataString = JSON.stringify(apiData);
    // console.log(apiData, apiDataString);

    // Seach for the Keywords within the API retrieved with the GET method
    //   const foundKeywords = {};
    //   apiKeywords.forEach((apiKeyword) => {
    //     if (apiDataString.includes(apiKeyword)) {
    //       foundKeywords[apiKeyword] = true;
    //       return foundKeywords;
    //     } else {
    //       console.log(
    //         "API doesn't contain this specific keywords exposed to the public"
    //       );
    //     }
    //   });
    //   return foundKeywords;
    // }
  } catch (error) {
    console.log(error);
  }
};
