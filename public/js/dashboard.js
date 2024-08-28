// Calling ID's for navigating the target section
const saveAPIOwnerCredentials1 = document.getElementById(
  "target-credentials-next-button1"
);
const saveAPIOwnerCredentials2 = document.getElementById(
  "target-credentials-next-button2"
);
const saveAPIOwnerCredentials3 = document.getElementById(
  "target-credentials-next-button3"
);
const saveAPIOwnerCredentials4 = document.getElementById(
  "target-credentials-next-button4"
);
const saveAPIOwnerCredentials5 = document.getElementById(
  "target-credentials-next-button5"
);

const APIOwnerCredentialsDiv = document.getElementById("currentApiOwner");
const collectAPICredentialsDiv = document.getElementById("targetApiDetails");
const collectSensitiveAPICredentialsDiv = document.getElementById(
  "sensitiveAPIDataCollection"
);
const collectAPIEndpointURL = document.getElementById("api-endpoint-url");
const collectApiIdDiv = document.getElementById("api-scan-id-div");
const collectAPIKeywordsDiv = document.getElementById(
  "api-shadow-sensitive-scan-params-div"
);

const previousButton1 = document.getElementById("currentApiOwnerForm");
const previousButton2 = document.getElementById("targetApiDetailsForm");
const previousButton3 = document.getElementById("apiEndpointURLForm");
const previousButton4 = document.getElementById(
  "sensitiveAPIDataCollectionForm"
);
const previousButton5 = document.getElementById("api-scan-id-div-form");

const userDashboard = document.getElementById("users-dashboard");
const userTargets = document.getElementById("user-targets");
const userScans = document.getElementById("user-scans");
const userVulnerabilities = document.getElementById("user-vulnerabilities");
const dashboard = document.getElementById("user-dashboard");
const target = document.getElementById("dashboard-target");
const scans = document.getElementById("dashboard-scan");
const vulnerabilities = document.getElementById("dashboard-vulnerabilities");
const reports = document.getElementById("get-report");

userDashboard.addEventListener("click", () => {
  dashboard.style.display = "block";
  target.style.display = "none";
  scans.style.display = "none";
  vulnerabilities.style.display = "none";
  window.location = "#users-dashboard";
});
userTargets.addEventListener("click", () => {
  target.style.display = "block";
  dashboard.style.display = "none";
  scans.style.display = "none";
  vulnerabilities.style.display = "none";
  window.location = "#user-targets";
});
userScans.addEventListener("click", () => {
  scans.style.display = "block";
  dashboard.style.display = "none";
  target.style.display = "none";
  vulnerabilities.style.display = "none";
  window.location = "#user-scans";
});
userVulnerabilities.addEventListener("click", () => {
  vulnerabilities.style.display = "block";
  dashboard.style.display = "none";
  target.style.display = "none";
  scans.style.display = "none";
  window.location = "#user-vulnerabilities";
});
reports.addEventListener("click", () => {
  reports.style.display = "block";
  dashboard.style.display = "none";
  target.style.display = "none";
  scans.style.display = "none";
  vulnerabilities.style.display = "none";
  window.location = "#get-report";
});

// Navigating to the next form for API Credentials
saveAPIOwnerCredentials1.addEventListener("click", (event) => {
  event.preventDefault();
  collectAPICredentialsDiv.style.display = "block";
  APIOwnerCredentialsDiv.style.display = "none";
  collectSensitiveAPICredentialsDiv.style.display = "none";
  collectAPIEndpointURL.style.display = "none";
  collectApiIdDiv.style.display = "none";
  collectAPIKeywordsDiv.style.display = "none";
});
saveAPIOwnerCredentials2.addEventListener("click", (event) => {
  event.preventDefault();
  collectAPICredentialsDiv.style.display = "none";
  APIOwnerCredentialsDiv.style.display = "none";
  collectSensitiveAPICredentialsDiv.style.display = "block";
  collectAPIEndpointURL.style.display = "none";
  collectApiIdDiv.style.display = "none";
  collectAPIKeywordsDiv.style.display = "none";
});
saveAPIOwnerCredentials3.addEventListener("click", (event) => {
  event.preventDefault();
  collectAPICredentialsDiv.style.display = "none";
  APIOwnerCredentialsDiv.style.display = "none";
  collectSensitiveAPICredentialsDiv.style.display = "none";
  collectAPIEndpointURL.style.display = "block";
  collectApiIdDiv.style.display = "none";
  collectAPIKeywordsDiv.style.display = "none";
});
saveAPIOwnerCredentials4.addEventListener("click", (event) => {
  event.preventDefault();
  collectAPICredentialsDiv.style.display = "none";
  APIOwnerCredentialsDiv.style.display = "none";
  collectSensitiveAPICredentialsDiv.style.display = "none";
  collectAPIEndpointURL.style.display = "none";
  collectApiIdDiv.style.display = "block";
  collectAPIKeywordsDiv.style.display = "none";
});
saveAPIOwnerCredentials5.addEventListener("click", (event) => {
  event.preventDefault();
  collectAPICredentialsDiv.style.display = "none";
  APIOwnerCredentialsDiv.style.display = "none";
  collectSensitiveAPICredentialsDiv.style.display = "none";
  collectAPIEndpointURL.style.display = "none";
  collectApiIdDiv.style.display = "none";
  collectAPIKeywordsDiv.style.display = "block";
});

// For navigating to the previous information on target
previousButton1.addEventListener("click", (event) => {
  event.preventDefault();
  collectAPICredentialsDiv.style.display = "none";
  APIOwnerCredentialsDiv.style.display = "block";
  collectSensitiveAPICredentialsDiv.style.display = "none";
  collectAPIEndpointURL.style.display = "none";
  collectApiIdDiv.style.display = "none";
  collectAPIKeywordsDiv.style.display = "none";
});
previousButton2.addEventListener("click", (event) => {
  event.preventDefault();
  collectAPICredentialsDiv.style.display = "block";
  APIOwnerCredentialsDiv.style.display = "none";
  collectSensitiveAPICredentialsDiv.style.display = "none";
  collectAPIEndpointURL.style.display = "none";
  collectApiIdDiv.style.display = "none";
  collectAPIKeywordsDiv.style.display = "none";
});
previousButton3.addEventListener("click", (event) => {
  event.preventDefault();
  collectAPICredentialsDiv.style.display = "none";
  APIOwnerCredentialsDiv.style.display = "none";
  collectSensitiveAPICredentialsDiv.style.display = "block";
  collectAPIEndpointURL.style.display = "none";
  collectApiIdDiv.style.display = "none";
  collectAPIKeywordsDiv.style.display = "none";
});
previousButton4.addEventListener("click", (event) => {
  event.preventDefault();
  collectAPICredentialsDiv.style.display = "none";
  APIOwnerCredentialsDiv.style.display = "none";
  collectSensitiveAPICredentialsDiv.style.display = "none";
  collectAPIEndpointURL.style.display = "block";
  collectApiIdDiv.style.display = "none";
  collectAPIKeywordsDiv.style.display = "none";
});
previousButton5.addEventListener("click", (event) => {
  event.preventDefault();
  collectAPICredentialsDiv.style.display = "none";
  APIOwnerCredentialsDiv.style.display = "none";
  collectSensitiveAPICredentialsDiv.style.display = "none";
  collectAPIEndpointURL.style.display = "none";
  collectApiIdDiv.style.display = "block";
  collectAPIKeywordsDiv.style.display = "none";
});

// Collect API Form Data for storing and scanning
const targetApiForm = document.getElementById("targetApiForm");
targetApiForm.addEventListener("submit", (event) => {
  event.preventDefault();
  saveApiDataFunction();
});

async function saveApiDataFunction() {
  const apiOwnerName = document.getElementById("apiOwnerName").value;
  const apiOwnerEmail = document.getElementById("apiOwnerEmail").value;
  const apiName = document.getElementById("apiName").value;
  const apiDescription = document.getElementById("apiDescription").value;
  const apiKey = document.getElementById("apiKey").value;
  const apiEndpointURL = document.getElementById("apiEndpointURL").value;
  const hostURL = document.getElementById("hostURL").value;
  const uniqueId1 = document.getElementById("uniqueIdOne").value;
  const uniqueId2 = document.getElementById("uniqueIdTwo").value;
  const apiKeywords1 = document.getElementById("apiKeywords1").value;
  const apiKeywords2 = document.getElementById("apiKeywords2").value;
  const apiKeywords3 = document.getElementById("apiKeywords3").value;

  try {
    const user_id = sessionStorage.getItem("user_id");

    const apiKeywords = [ apiKeywords1, apiKeywords2, apiKeywords3 ];
    const apiData = {
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
    };

    const response = await fetch(
      `http://localhost:3000/api/api/save-api-credentials`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiData),
      }
    );

    alert("Hello sang");
    if ((response.status = 201)) {
      const newApi = await response.json();
      alert("Api Data stored sucesssfully");
      window.location = "#user-scan";

      const user_id = newApi.user_id;
      const apiOwnerName = newApi.apiOwnerName;
      const apiOwnerEmail = newApi.apiOwnerEmail;
      const apiDescription = newApi.apiDescription;
      const apiKey = newApi.apiKey;
      const apiEndpointURL = newApi.apiEndpointURL;
      const hostURL = newApi.apiURL;
      const uniqueId1 = newApi.uniqueId1;
      const uniqueId2 = newApi.uniqueId2;
      const apiKeywords1 = newApi.apiKeywords1;
      const apiKeywords2 = newApi.apiKeywords2;
      const apiKeywords3 = newApi.apiKeywords3;
    } else {
      alert("Something went wrong!!");
    }
  } catch (error) {
    console.log(error);
  }
}
