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
});
userTargets.addEventListener("click", () => {
  target.style.display = "block";
  dashboard.style.display = "none";
  scans.style.display = "none";
  vulnerabilities.style.display = "none";
});
userScans.addEventListener("click", () => {
  scans.style.display = "block";
  dashboard.style.display = "none";
  target.style.display = "none";
  vulnerabilities.style.display = "none";
});
userVulnerabilities.addEventListener("click", () => {
  vulnerabilities.style.display = "block";
  dashboard.style.display = "none";
  target.style.display = "none";
  scans.style.display = "none";
});

