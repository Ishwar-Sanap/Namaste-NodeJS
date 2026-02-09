const express = require("express");
const bcrypt = require("bcrypt"); // npm package to hash password..
const { validateSignUp } = require("../utils/dataValidation");
const User = require("../models/user");

const authRouter = express.Router();

//NEVER trust on req.body data always sanitize the input and check the proper validations if everyting is fine
// then only store the data into DB else throw an appropriate error..

//By defulat schema validatino works only for post method
authRouter.post("/signup", async (req, res) => {
  try {
    const data = req.body;

    //validate the data
    validateSignUp(data);
    const { firstName, lastName, emailID, password } = data;

    //Encrypt the password and then stored into DB
    const hashPassword = await bcrypt.hash(password, 10); // 10 is saltRounds

    const userObj = new User({
      firstName,
      lastName,
      emailID,
      password: hashPassword,
    });

    await userObj.save(); //saves this document by inserting a new document into the database
    res.send("User info saved.");
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});

//Login API
authRouter.post("/login", async (req, res) => {
  try {
    const { emailID, password } = req.body;

    const user = await User.findOne({ emailID: emailID });
    if (!user) throw new Error("Invalid credentials");

    const isValidPassword = await user.validatePassword(password);

    if (!isValidPassword) throw new Error("Invalid credentials");

    //If login credentials are correct then create JWT(JSON Web Token) token and send to the client
    // so when client make any subsequest request token will be used to autheticate the valid client requests..
    const jwtToken = user.getJWT(); //getJWT() define in use schema for refactoring. we can also write here..
    res.cookie("token", jwtToken); //send  jsonWebToken to client

    res.send(user);
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});

authRouter.post("/logout", (req, res) => {
  res.cookie("token", null, { expires: new Date(Date.now()) });
  res.send("Logout successfully");
});

module.exports = authRouter;
