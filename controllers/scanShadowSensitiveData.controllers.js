const api = require("../models/targetDetails.models");
const sensitiveKeywords = require("../models/keywords.models");
const uniqueIds = require("../models/uniqueIds.models");
const ssdScanReports = require("../models/ssdScanReport.models");
const bolaScanReports = require("../models/bolaScanReport.models");
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
      apiEndpointURL,
      hostURL,
      apiKeywords,
      uniqueId1,
      uniqueId2,
    } = req.body;

    const newApi = new api({
      user_id,
      apiOwnerName,
      apiOwnerEmail,
      apiName,
      apiDescription,
      apiEndpointURL,
      apiKey,
      hostURL,
    });

    const newSensitiveKeywords = new sensitiveKeywords({
      user_id,
      apiKeywords,
    });

    const newUniqueIds = new uniqueIds({ user_id, uniqueId1, uniqueId2 });

    await newApi.save();
    await newSensitiveKeywords.save();
    await newUniqueIds.save();

    return res.status(201).send({
      Message: "API Credentials successfully stored",
      newAPI: newApi,
      newSensitiveKeywords: newSensitiveKeywords,
      newUniqueIds: newUniqueIds,
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

    // Check if the user_id or not
    if (!apiDetails || !keywords || !uniqueId) {
      return "Sorry, couldn't find any of these information in any of our databases";
    } else {
      const apiKeyHeader = apiDetails.apiKey;
      const hostURL = apiDetails.hostURL;
      const apiEndpointURL = apiDetails.apiEndpointURL;

      // API Key header
      const headers = apiKeyHeader;

      // API URL and the axios querying the API
      const apiUrl = `${hostURL}${apiEndpointURL}`;

      const response = await axios.get(apiUrl, { headers });

      const apiData = response.data;

      const apiKeywords = keywords.apiKeywords;

      const apiDataValues = collectApiDataValues(apiData);

      // Initialize Fuse.js with collected values
      const fuse = new Fuse(apiDataValues, {
        includeScore: true,
        threshold: 0.3,
      });

      const foundKeywords = {};
      const notFoundKeywords = {};

      // Scan for the array of keywords in the sensitveKeywords collection
      apiKeywords.forEach((keyword) => {
        const result = fuse.search(keyword);
        if (result.length > 0) {
          foundKeywords[keyword] = true;
        } else {
          notFoundKeywords[keyword] = false;
        }
      });

      const Impact = `The Impact of Shadow Sensitive Data Exposure in APIs include; \n 1. Financial and Reputational Damage. \n 2. Customer Distrust and massive drawbacks in ${apiDetails.apiName}'s growth leading to loss of customers or clients. \n 3. Business Operation Disruptions leading to finacial drawbacks and unreliability in ${apiDetails.apiName}'s mission and vision. \n 4. Sensitive Data Theft for malicious purposes. \n 5. Sensitive Data Exposure. \n 6. Potential Trade Secret Exposure that might have been embedded within ${apiDetails.apiName} \n 7. Potential Unauthorized modification of sensitive data leading to inaccuracy in ${apiDetails.apiName}'s data for predictions and use. \n 8. Increased attack surface for malicious actors to exploit. \n 9. Reduced System Rsilience against other Cyber, API, or Security Attacks targetting ${apiDetails.apiName} \n 10. Loss of Lives and Property as result of sensitive data that was exposed by your ${apiDetails.apiName}`;

      const Our_Recommendations = `The Recommended actions to mitigating and avoiding Shadow Sensitive Data Vulnerability within your API includes; \n 1. Conduct time to time Cyber Security Awareness to employees in order to foster the culture of security within them. \n 2. Enforce the concept of Shift Security Left in Developers, Software Engineers, or basically your Technical Team before, during, and after building API's, Web applications and when working on ${apiDetails.apiName}. \n 3. Conduct time to time Vulnerability Assessments on your Infrastructure (Applications, Network, People, Assets) to discover and effectively close loopholes or weakness within your ${apiDetails.apiName}. \n 4. Leverage the use of Fuzzing, SAST Tools and DAST Tools for Scanning, Testing and analysing requests and responses sent and received from ${apiDetails.apiName}. \n 5. Conduct Penetration Testing and Security Testing on ${apiDetails.apiName} during Development before sending to Production. \n 6. Ensure that the team of Technicians (Developers, Software Engineers, Cyber Security Experts) are using Secured, Updated and recently updated versions of Libraries, Modules or third Party componenents when building, Testing and modifying the structure of  ${apiDetails.apiName}. \n 7. Conduct thorough Risk Assessments, Risk Management, and Threat Evaluation on ${apiDetails.apiName} against the value it adds to your assets before sending to Prod. \n 8. Develop an Incidence Response Plan against unforseen business disruptions that might arise as a result of Avoided or Accepted Risks analysed on ${apiDetails.apiName}. \n 9. Ensure that There is a secured and brutally analysed Rollback state ${apiDetails.apiName} can fall back to incase of unforseen disruptions or attacks such that your reputation, customers and Business Flow is not masively affected.`;

      if (foundKeywords === null) {
        const vulnerable_Message =
          "This API is vulnerable to Shadow sensitive Data Exposure";
        if (response.status === 200) {
          apiScanTime = new Date().toLocaleString();
          apiOwnerName = `${apiDetails.apiOwnerName}`;
          apiOwnerEmail = `${apiDetails.apiOwnerEmail}`;
          apiName = `${apiDetails.apiName}`;
          apiDescription = `${apiDetails.apiDescription}`;
          apiEndpointScanned = `${apiDetails.apiEndpointURL}`;
          apiUrl = `${apiDetails.hostURL}`;
          apiScanType = "Shadow Sensitive Data Scan (SSDS)";
          apiScanDuration = "";
          Total_Keywords_Scanned = keywords.apiKeywords;
          Flagged_Keywords = foundKeywords;
          Unflagged_Keywords = notFoundKeywords;
          Status_code = 200;
          Feedback = vulnerable_Message;
          Request = apiUrl;
          Response = apiData;
          Impact_Of_Ssds = Impact;
          Recommendation_For_Ssds = Our_Recommendations;

          const newScanReport = new ssdScanReports({
            user_id,
            apiScanTime,
            apiOwnerName,
            apiOwnerEmail,
            apiName,
            apiDescription,
            apiEndpointScanned,
            apiUrl,
            apiScanType,
            apiScanDuration,
            Total_Keywords_Scanned,
            Flagged_Keywords,
            Unflagged_Keywords,
            Status_code,
            Feedback,
            Request,
            Response,
            Impact_Of_Ssds,
            Recommendation_For_Ssds,
          });

          const saveReportData = await newScanReport.save();

          return res.status(200).json({ newScanReport: saveReportData });
        }
      } else if (notFoundKeywords === null) {
        const not_Vulnerable_Message =
          "This API is not vulnerable to Shadow sensitive Data Exposure ";

        if (response.status === 200) {
          apiScanTime = new Date().toLocaleString();
          apiOwnerName = `${apiDetails.apiOwnerName}`;
          apiOwnerEmail = `${apiDetails.apiOwnerEmail}`;
          apiName = `${apiDetails.apiName}`;
          apiDescription = `${apiDetails.apiDescription}`;
          apiEndpointScanned = `${apiDetails.apiEndpointURL}`;
          apiUrl = `${apiDetails.hostURL}`;
          apiScanType = "Shadow Sensitive Data Scan (SSDS)";
          apiScanDuration = "";
          Total_Keywords_Scanned = keywords.apiKeywords;
          Flagged_Keywords = foundKeywords;
          Unflagged_Keywords = notFoundKeywords;
          Status_code = 200;
          Feedback = not_Vulnerable_Message;
          Request = apiUrl;
          Response = apiData;
          Impact_Of_Ssds = Impact;
          Recommendation_For_Ssds = Our_Recommendations;

          const newScanReport = new ssdScanReports({
            user_id,
            apiScanTime,
            apiOwnerName,
            apiOwnerEmail,
            apiName,
            apiDescription,
            apiEndpointScanned,
            apiUrl,
            apiScanType,
            apiScanDuration,
            Total_Keywords_Scanned,
            Flagged_Keywords,
            Unflagged_Keywords,
            Status_code,
            Feedback,
            Request,
            Response,
            Impact_Of_Ssds,
            Recommendation_For_Ssds,
          });

          const saveReportData = await newScanReport.save();

          return res.status(200).json({ newScanReport: saveReportData });
        }
      } else {
        return "Report data has not been saved";
      }
    }

    // Commented code for Includes for scanning for SSD
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
  } catch (error) {
    console.log(error);
  }
};

exports.fetchUserApiDetailsAndScanForBrokenObjectLevelAuthorisation = async (
  req,
  res
) => {
  try {
    const user_id = req.params.user_id;
    const apiDetails = await api.findOne({ user_id: user_id });
    const uniqueIds = await uniqueId.findOne({ user_id: user_id });

    // Check if details exist or not
    if (!apiDetails || !uniqueIds) {
      return "Sorry, couldn't find any of these information in any of our databases collections";
    } else {
      const forEachUniqueId = async (uniqueId) => {
        const hostURL = apiDetails.hostURL;
        const apiEndpointURL = apiDetails.apiEndpointURL;
        // const uniqueId = uniqueIds.uniqueId;
        const apiUrl = `${hostURL}${apiEndpointURL}`;
        console.log(apiUrl);

        const response = await axios.get(`apiUrl,{ uniqueId }`);
        const apiData = response.data;
        console.log(`API Response for unique Identifier: ${uniqueId}`, apiData);
      };

      // Loop through unique identifiers in the database array
      for (const uniqueId of uniqueIds) {
        await forEachUniqueId(uniqueId);
      }

      const Impact = `The Impact of Broken Object Level Authorization Vulnerability Includes; \n 1. Sensitive Data Exposure. \n 2. Unauthorized access to data by unauthorized individuals. \n 3. Unauthorizd Modification of Data. \n 4. Data Theft. \n 5. Data Destruction leading to Breach of Availability. \n 6. Financial and Reputational Damage. \n 7. Customer Distrust. \n 8. Buisness Operations Disruptions. \n 9. Unreliability in ${apiDetails.apiName}'s accuracy by Third Party clients, Customers, clients, and potential clients. \n 10. Financial loss due to payment of huge fines to Compliance Standards. \n 11. Probable shutdown of ${apiDetails.apiName} by compliance standards if impact of breach is massive on customers. \n 12. Increased attack surface for malicious actors to exploit. \n 13. Reduced System Rsilience against other Cyber, API, or Security Attacks targetting ${apiDetails.apiName}`;

      const Our_Recommendations = `The Recommended actions to mitigating and avoiding Shadow Sensitive Data Vulnerability within your API includes; \n 1. Conduct time to time Cyber Security Awareness to employees in order to foster the culture of security within organization. \n 2. Enforce the concept of Shift Security Left in Developers, Software Engineers, or basically your Technical Team before, during, and after building API's, Web applications and when working on ${apiDetails.apiName}. \n 3. Conduct time to time Vulnerability Assessments on your Infrastructure (Applications, Network, People, Assets) to discover and effectively close loopholes or weakness within your ${apiDetails.apiName}. \n 4. Leverage the use of Fuzzing, SAST Tools and DAST Tools for Scanning, Testing and analysing requests and responses sent and received from ${apiDetails.apiName}. \n 5. Conduct Penetration Testing and Security Testing on ${apiDetails.apiName} during Development before sending to Production. \n 6. Ensure that the team of Technicians (Developers, Software Engineers, Cyber Security Experts) are using Secured, Updated and recently updated versions of Libraries, Modules or third Party componenents when building, Testing and modifying the structure of  ${apiDetails.apiName}. \n 7. Conduct thorough Risk Assessments, Risk Management, and Threat Evaluation on ${apiDetails.apiName} against the value it adds to your assets before sending to Prod. \n 8. Develop an Incidence Response Plan against unforseen business disruptions that might arise as a result of Avoided or Accepted Risks analysed on ${apiDetails.apiName}. \n 9. Ensure that There is a secured and brutally analysed Rollback state ${apiDetails.apiName} can fall back to incase of unforseen disruptions or attacks such that your reputation, customers and Business Flow is not masively affected.`;

      if (response.status === 200) {
        apiScanTime = new Date().toLocaleString();
        apiOwnerName = `${apiDetails.apiOwnerName}`;
        apiOwnerEmail = `${apiDetails.apiOwnerEmail}`;
        apiName = `${apiDetails.apiName}`;
        apiDescription = `${apiDetails.apiDescription}`;
        apiEndpointScanned = `${apiDetails.apiEndpointURL}`;
        apiUrl = `${apiDetails.hostURL}`;
        apiScanType = "Broken Object Level Authorization Scans (BOLA)";
        apiScanDuration = "";
        Unique_Identifiers_Used = uniqueIds.uniqueId;
        Status_code = 200;
        Feedback = "";
        Request = apiUrl;
        Response = apiData;
        Impact_Of_Bola = Impact;
        Recommendation_For_Bola = Our_Recommendations;

        if (Flagged_Keywords === null) {
          const newScanReport = new bolaScanReports({
            user_id,
            apiScanTime,
            apiOwnerName,
            apiOwnerEmail,
            apiName,
            apiDescription,
            apiEndpointScanned,
            apiUrl,
            apiScanType,
            apiScanDuration,
            Unique_Identifiers_Used,
            Status_code,
            Feedback,
            Request,
            Response,
            Impact_Of_Bola,
            Recommendation_For_Bola,
          });

          const saveReportData = await newScanReport.save();

          return res.status(200).json({
            savedData: saveReportData,
            Message:
              "API BOLA Scan conducted, checkout report for more information",
          });
        }
      } else {
        return "Report data has not been saved";
      }
    }
  } catch (error) {
    console.log(error);
  }
};
