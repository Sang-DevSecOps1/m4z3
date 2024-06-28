const api = require("../models/targetDetails.models");
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
      uniqueIdOne,
      uniqueIdTwo,
      apiKeywords1,
      apiKeywords2,
      apiKeywords3,
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
