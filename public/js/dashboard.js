// Calling ID's for navigating the target section
const saveAPIOwnerCredentials1 = document.getElementById("target-credentials-next-button1");
const saveAPIOwnerCredentials2 = document.getElementById("target-credentials-next-button2");
const saveAPIOwnerCredentials3 = document.getElementById("target-credentials-next-button3");
const saveAPIOwnerCredentials4 = document.getElementById("target-credentials-next-button4");
const APIOwnerCredentialsDiv = document.getElementById("currentApiOwner");
const collectAPICredentialsDiv = document.getElementById("targetApiDetails");
const collectSensitiveAPICredentialsDiv = document.getElementById("sensitiveAPIDataCollection");
const collectApiIdDiv = document.getElementById("api-scan-id-div");
const collectAPIKeywordsDiv = document.getElementById("api-shadow-sensitive-scan-params-div");
const previousButton1 = document.getElementById("currentApiOwnerForm");
const previousButton2 = document.getElementById("targetApiDetailsForm");
const previousButton3 = document.getElementById("sensitiveAPIDataCollectionForm");
const previousButton4 = document.getElementById("api-scan-id-div-form");
const userDashboard = document.getElementById("users-dashboard");
const userTargets = document.getElementById("user-targets");
const userScans = document.getElementById("user-scans");
const userVulnerabilities = document.getElementById("user-vulnerabilities");
const dashboard = document.getElementById("user-dashboard");
const target = document.getElementById("dashboard-target");
const scans = document.getElementById("dashboard-scan");
const vulnerabilities = document.getElementById("dashboard-vulnerabilities");


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

// Navigating to the next form for API Credentials
saveAPIOwnerCredentials1.addEventListener('click', (event) => {
  event.preventDefault();
  collectAPICredentialsDiv.style.display = "block";
  APIOwnerCredentialsDiv.style.display = "none";
  collectSensitiveAPICredentialsDiv.style.display = "none"
  collectApiIdDiv.style.display = "none";
  collectAPIKeywordsDiv.style.display = "none"
});
saveAPIOwnerCredentials2.addEventListener('click', (event) => {
  event.preventDefault();
  collectAPICredentialsDiv.style.display = "none";
  APIOwnerCredentialsDiv.style.display = "none";
  collectSensitiveAPICredentialsDiv.style.display = "block"
  collectApiIdDiv.style.display = "none";
  collectAPIKeywordsDiv.style.display = "none"
});
saveAPIOwnerCredentials3.addEventListener('click', (event) => {
  event.preventDefault();
  collectAPICredentialsDiv.style.display = "none";
  APIOwnerCredentialsDiv.style.display = "none";
  collectSensitiveAPICredentialsDiv.style.display = "none"
  collectApiIdDiv.style.display = "block";
  collectAPIKeywordsDiv.style.display = "none"
});
saveAPIOwnerCredentials4.addEventListener('click', (event) => {
  event.preventDefault();
  collectAPICredentialsDiv.style.display = "none";
  APIOwnerCredentialsDiv.style.display = "none";
  collectSensitiveAPICredentialsDiv.style.display = "none"
  collectApiIdDiv.style.display = "none";
  collectAPIKeywordsDiv.style.display = "block"
});

// For navigating to the previous information on target
previousButton1.addEventListener('click', (event) => {
  event.preventDefault();
  collectAPICredentialsDiv.style.display = "none";
  APIOwnerCredentialsDiv.style.display = "block";
  collectSensitiveAPICredentialsDiv.style.display = "none";
  collectApiIdDiv.style.display = "none";
  collectAPIKeywordsDiv.style.display = "none";
});
previousButton2.addEventListener('click', (event) => {
  event.preventDefault();
  collectAPICredentialsDiv.style.display = "block";
  APIOwnerCredentialsDiv.style.display = "none";
  collectSensitiveAPICredentialsDiv.style.display = "none"
  collectApiIdDiv.style.display = "none";
  collectAPIKeywordsDiv.style.display = "none"
});
previousButton3.addEventListener('click', (event) => {
  event.preventDefault();
  collectAPICredentialsDiv.style.display = "none";
  APIOwnerCredentialsDiv.style.display = "none";
  collectSensitiveAPICredentialsDiv.style.display = "block"
  collectApiIdDiv.style.display = "none";
  collectAPIKeywordsDiv.style.display = "none"
});
previousButton4.addEventListener('click', (event) => {
  event.preventDefault();
  collectAPICredentialsDiv.style.display = "none";
  APIOwnerCredentialsDiv.style.display = "none";
  collectSensitiveAPICredentialsDiv.style.display = "none"
  collectApiIdDiv.style.display = "block";
  collectAPIKeywordsDiv.style.display = "none"
});

// Collect API Form Data for storing and scanning
const createScanButton = document.getElementById("create-scan-button").value;
const apiOwnerName = document.getElementById("apiOwnerName").value;
const apiOwnerEmail = document.getElementById("apiOwnerEmail").value;
const apiName = document.getElementById("apiName").value;
const apiDescription = document.getElementById("apiDescription").value;
const apiKey = document.getElementById("apiKey").value;
const apiURL = document.getElementById("apiURL").value;
const uniqueIdOne = document.getElementById("uniqueIdOne").value;
const uniqueIdTwo = document.getElementById("uniqueIdTwo").value;
const apiKeywords1 = document.getElementById("apiKeywords1").value;
const apiKeywords2 = document.getElementById("apiKeywords2").value;
const apiKeywords3 = document.getElementById("apiKeywords3").value;

createScanButton.addEventListener('submit', (event) => {
  event.preventDefault();

  async function saveApiData() {
    const apiData = { user_id, apiOwnerName, apiOwnerEmail, apiName, apiDescription, apiKey, apiURL, uniqueIdOne, uniqueIdTwo, apiKeywords1, apiKeywords2, apiKeywords3 }
    try {
      const response = await fetch (`http://localhost:3000/api/api-data`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiData),
      });

      if (response.status = 201) {
        const newApi = await response.json();

        alert("Api Data stored sucesssfully");
        window.location = "#user-scan";

        const user_id = newApi.user_id;
        const apiOwnerName = newApi.apiOwnerName;
        const apiOwnerEmail = newApi.apiOwnerEmail;
        const apiDescription = newApi.apiDescription;
        const apiKey = newApi.apiKey;
        const apiURL = newApi.apiURL;
        const uniqueIdOne = newApi.uniqueIdOne;
        const uniqueIdTwo = newApi.uniqueIdTwo;
        const apiKeywords1 = newApi.apiKeywords1;
        const apiKeywords2 = newApi.apiKeywords2;
        const apiKeywords3 = newApi.apiKeywords3;
      }
      else{
        alert("Something went wrong!!");
      }
    } catch (error) {
      console.log(error);
    }
  }
})


