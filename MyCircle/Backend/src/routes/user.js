const express = require("express");
const { userAuth } = require("../middleware/auth");
const { connectionRequestModel } = require("../models/connectionRequests");
const User = require("../models/user");
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

//Get the all connections
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

//Get the other users profiles in loggedIn user feed
userRouter.get("/user/feed", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = limit > 10 ? 10 : limit;

    const skip = (page - 1) * limit;

    /*
      Which User should be displayed in the feed??
      - User other than loggedInUser
      - Those users who don't have connection with loggedInUser Yet
      - If loggedInUser mark's any user profile ignored or Interested then it should not be come in feed
    */

    //Finding All connections of loggedInUser A  ex: A->B  or B->A
    const connections = await connectionRequestModel
      .find({
        $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
      })
      .select("fromUserId toUserId");

    const hiddenUsersFromFeed = new Set();
    connections.forEach((connection) => {
      hiddenUsersFromFeed.add(connection.fromUserId.toString());
      hiddenUsersFromFeed.add(connection.toUserId.toString());
    });

    //Using pagination to fetch the data in chuncks
    /*

    GET /user/feed?page=1&limit=10  --> skip(0) limit(10) return the records from 1 to 10
    GET /user/feed?page=2&limit=10  --> skip(10) limit(10) return the records from 11 to 20
    GET /user/feed?page=3&limit=10  --> skip(20) limit(10) return the records from 21 to 30

    Offset pagination assumes constant limit 
    Changing limit mid-way breaks continuity.

    */

    const feedData = await User.find({
      $and: [
        { _id: { $ne: loggedInUser._id } },
        { _id: { $nin: Array.from(hiddenUsersFromFeed) } },
      ],
    })
      .select(SAFE_USER_DETAILS)
      .skip(skip)
      .limit(limit);

    res.json({ message: "Data fetched successfully", data: feedData });
  } catch (err) {
    res.status(400).json({ message: "Error : " + err.message });
  }
});
module.exports = userRouter;
