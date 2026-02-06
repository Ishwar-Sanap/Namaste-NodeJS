const express = require("express");
const { userAuth } = require("../middleware/auth");
const { validateEditRequestData } = require("../utils/dataValidation");
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
    res.json({ message: "user info edited successfully", data: loggedInUser });  //sending json as response

  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});

module.exports = profileRouter;
