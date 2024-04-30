const user = require("../models/auth.models");
const dotenv = require("dotenv");
dotenv.config();

exports.getAllUsers = async (req, res) => {
  try {
    const allUsers = await db.query("SELECT * FROM users RETURNING *");

    return res.status(200).json({
      allUsersMessage: "Users fetch successful",
      users: allUsers,
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};

exports.getOneUser = async (req, res) => {
  try {
    const user_email = req.params.user_email;

    const oneUser = await db.query(
      "SELECT * FROM users WHERE user_email = $1 RETURNING *",
      [user_email]
    );

    if (user_email) {
      return res.status(200).json({
        userMessage: "Yes, User exists",
        user: oneUser.rows[0],
      });
    } else {
      console.log("Invalid Email");
      return "Invalid Email";
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user_email = req.params.user_email;

    const deleteUser = await db.query(
      "DELETE from users WHERE user_email =$1 RETURNING *",
      [user_email]
    );

    if (user_email) {
      return res.status(200).json({
        deleteMessage: "Deletion successful",
        deletedUser: deleteUser.rows[0],
      });
    } else {
      console.log("Invalid Email, user deletion not successful");
      return "Invalid Email";
    }
  } catch (error) {}
};
