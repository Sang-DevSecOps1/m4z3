const express = require("express");
const router = express.Router();

const {
  signUpUser,
  logInUser,
  logout,
} = require("../../controllers/auth.controllers");

router.post("/api/signup", signUpUser);
router.post("/api/login", logInUser);
router.post("/api/logout", logout);

module.exports = router;
