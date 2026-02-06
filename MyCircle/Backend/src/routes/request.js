const express = require("express")
const { userAuth } = require("../middleware/auth");

const requestRouter = express.Router();

requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
  try {
    const user = req.user; // from userAuth middleware user is added into req object..
    res.send(user.firstName + " send the connection request");
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});

module.exports = requestRouter;