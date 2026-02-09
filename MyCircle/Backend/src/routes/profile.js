const express = require("express");
const { userAuth } = require("../middleware/auth");
const { validateEditRequestData } = require("../utils/dataValidation");
const bcrypt = require("bcrypt");
const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user; // from userAuth middleware user is added into req object..
    res.send(user);
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user; // from userAuth middleware user is added into req object..
    if (!validateEditRequestData(req.body))
      throw new Error("Invalid edit request");

    //update the user details
    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

    await loggedInUser.save();
    res.json({ message: "User info edited successfully", data: loggedInUser }); //sending json as response
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});

profileRouter.patch("/profile/edit/password", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const oldPassword = req.body?.password;
    const newPassword = req.body?.newPassword;
    if(!oldPassword || !newPassword) throw new Error("Invalid inputs");
    if(newPassword.length > 20) throw new Error("Password is to large");
    const isValidPassword = await loggedInUser.validatePassword(oldPassword);
    if (!isValidPassword) throw new Error("Invalid password");

    //Encrypt the password and then stored into DB
    const hashPassword = await bcrypt.hash(newPassword, 10); // 10 is saltRounds
    loggedInUser.password = hashPassword;
    await loggedInUser.save();

    res.send("Password updated successfully");
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});

module.exports = profileRouter;
