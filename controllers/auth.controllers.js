const User = require("../models/auth.models");
const handleErrors = require("../utilities/handleErrors");
const jsonwebtoken = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const dotenv = require("dotenv");
dotenv.config();

exports.signUpUser = async (req, res) => {
  try {
    const user_id = uuidv4();

    const { user_name, user_email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      user_id,
      ...req.body,
      password: hashedPassword,
    });

    await newUser.save();

    console.log(newUser);
    return res.status(201).send({
      Message: "User Registration was succesfully",
      userData: newUser,
    });
  } catch (error) {
    if (error.code === "23505") {
      return res.status(409).json({ error: "User email already exists" });
    } else {
      console.log(error);
    }
  }
};

exports.logInUser = async (req, res) => {
  try {
    const { user_email, password } = req.body;
    const user = await User.findOne({ user_email }, { password: 1 });

    if (!user) {
      return res.status(404).json({ Message: "User not found" });
    } else {
      const isPasswordsMatch = await bcrypt.compare(password, user.password);
      if (isPasswordsMatch) {
        const userToSend = {
          userEmail: User.user_email,
          Password: User.password,
        };
        const userToken = jsonwebtoken.sign(userToSend, process.env.TOKEN_KEY);

        return res.status(200).json({
          Message: "User Logged in Sucessfully",
          userDetails: userToSend,
        });
        // .cookie("accessToken", userToken, {
        //   httpOnly: true,
        //   sameSite: "none",
        //   secure: true,
        // }, {Message: "User Log in Successful"})
        // .status(200)
        // .send(userToSend);
      } else {
        console.log("Invalid Credentials");
      }
    }
  } catch (error) {
    console.log(error);
  }
};

exports.logout = async (req, res) => {
  res
    .clearCookie("accessToken", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .send("Logged out successfully.");
};

exports.changePassword = async (req, res, next) => {
  try {
    const { user_id } = req.params;
    const { currentPassword, newPassword } = req.body;

    if (user.rows.length !== 0) {
      const hashedPassword = user.rows[0].password;

      const comparePassword = await bcrypt.compare(
        currentPassword,
        hashedPassword
      );

      if (comparePassword) {
        const hashNewPassword = await bcrypt.hash(newPassword, 10);
        const myPassword = await db.query(
          `UPDATE users SET password = $1 WHERE user_id = $2 RETURNING *`,
          [hashNewPassword, user_id]
        );
        if (myPassword) {
          return res.status(200).json({
            message: "Password Changed Successfully",
            user: { data: newPassword, hash: hashNewPassword },
          });
        }
        return res.status(200).json({
          message: "Password and hash are not the same.",
        });
      }
    }
  } catch (error) {
    console.log(error);
    return res
      .status(404)
      .json({ error: "Server is having error changing password." });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (user.rows[0] === 0) {
      return res.status(401).json({ message: "Invalid Email" });
    }
    if (!password) {
      return res.status(400).json({ Message: "Password Required" });
    }

    const { user_id } = req.params;

    const newPassword = await bcrypt.hash(password, 10);
    const result = await db.query(
      "UPDATE users SET  password = $1 WHERE user_id = $2 RETURNING *",
      [newPassword, user_id]
    );
    return res.status(200).json({
      message: "New Password Generated Successfully",
      newPassword,
      data: { user: result.rows[0].password },
    });
  } catch (error) {
    console.error("Error while Creating New Password:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
