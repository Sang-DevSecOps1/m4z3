const authRoutes = require("./authRoutes/auth.routes.js");
const userRoutes = require("./userRoutes/user.routes.js");
const apiScans = require("./apiRoutes/scanShadowSensitiveData.routes.js");

module.exports = { authRoutes, userRoutes, apiScans };





// isVulnerableScanReport = {};
// isNotVulnerableScanReport = {};
// app.get("/report", (req, res) => {
//   res.render("technicalReport.ejs", "executiveReport.ejs", { scanResults });
// });
