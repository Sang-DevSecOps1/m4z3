const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  getOneUser,
  deleteUser,
} = require("../../controllers/users.controllers");

router.get("/getallusers", getAllUsers);
router.get("/getuser", getOneUser);
router.delete("/deleteuser", deleteUser);

module.exports = router;
