const express = require("express");
const { userAuth } = require("../middleware/auth");
const { connectionRequestModel } = require("../models/connectionRequests");
const userRouter = express.Router();

const SAFE_USER_DETAILS = [
  "firstName",
  "lastName",
  "skills",
  "profilePhotoUrl",
  "about",
];
//Get all the pending requests recieved to the user
userRouter.get("/user/requests/recieved", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const requests = await connectionRequestModel
      .find({
        toUserId: loggedInUser._id,
        status: "interested",
      })
      .populate("fromUserId", SAFE_USER_DETAILS);

    res.json({ message: "Data fetched successfully", data: requests });
  } catch (err) {
    res.status(400).json({ message: "Error : " + err.message });
  }
});

//Get the the all connections
userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const requests = await connectionRequestModel
      .find({
        $or: [
          {
            toUserId: loggedInUser._id,
            status: "accepted",
          },
          {
            fromUserId: loggedInUser._id,
            status: "accepted",
          },
        ],
      })
      .populate("fromUserId", SAFE_USER_DETAILS)
      .populate("toUserId", SAFE_USER_DETAILS);

    const data = requests.map((row) => {
      if (row.fromUserId._id.equals(loggedInUser._id)) return row.toUserId;
      return row.fromUserId;
    });

    res.json({ message: "Data fetched successfully", data });
  } catch (err) {
    res.status(400).json({ message: "Error : " + err.message });
  }
});

module.exports = userRouter;
