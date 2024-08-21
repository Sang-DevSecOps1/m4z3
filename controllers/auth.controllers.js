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
    // console.log(req.body);
    const user = await User.findOne({ user_email }, { _id: 1, password: 1 });

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
          userDetails: { user_email, password, user_id: user._id },
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
