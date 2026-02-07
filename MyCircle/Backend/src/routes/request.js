const express = require("express");
const { userAuth } = require("../middleware/auth");
const { connectionRequestModel } = require("../models/connectionRequests");
const User = require("../models/user");

const requestRouter = express.Router();

requestRouter.post(
  "/request/send/:status/:userId",
  userAuth,
  async (req, res) => {
    try {
      const status = req.params?.status;
      const loggedInUser = req.user;

      const fromUserId = loggedInUser._id;
      const toUserId = req.params?.userId;

      //Scenarios when send connection request can't be happen..
      //1. A->B  (if B is not present in the database)
      //2. A->B or B->A  if connection request is already exist
      //3. A->A  (Can't send request to himself)  (Handled in Schema level using .pre("save", ...)
      //4. If request status is other than, "ignored", "interested" then you should not allowed to send request

      //4 Invalid Status
      const validStatus = ["ignored", "interested"];
      if (!validStatus.includes(status))
        throw new Error("Invalid status type, " + status);

      //1. Check B userID exist in DB or not (inside User collection)
      const userToSend = await User.findById(toUserId);
      if (!userToSend) throw new Error("User not found");

      //2. connection alredy exists
      const existedConnection = await connectionRequestModel.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });

      if (existedConnection) throw new Error("Connection already exist");

      //3. A->A can also be handle here, at API level

      const connectionRequest = new connectionRequestModel({
        fromUserId,
        toUserId,
        status,
      });

      await connectionRequest.save();
      res.send(
        loggedInUser.firstName +
          " send the connection request to " +
          userToSend.firstName,
      );
    } catch (err) {
      res.status(400).send("Error : " + err.message);
    }
  },
);

requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const status = req.params?.status;
      const requestId = req.params?.requestId;
      const loggedInUser = req.user;

      //Scenarios when review connection request can't be happen..
      // if Request doesn't exist in DB
      // If request status is other than, "accepted", "rejected" then you should not allowed to review request
      // If loggedIn user is other than to whom request is send them it should be not allowed to review request
      // If request status is other than intrested then it can't be reviewed

      const validStatus = ["accepted", "rejected"];
      if (!validStatus.includes(status))
        throw new Error("Invalid status type, " + status);

      const connectionRequest = await connectionRequestModel.findOne({
        _id: requestId,
        status: "interested",
        toUserId: loggedInUser._id,
      }); // check request exist in DB using query filter all condition should match..

      if (!connectionRequest) throw new Error("Connection request not found");

      connectionRequest.status = status;
      const data = await connectionRequest.save();
      res.json({ message: "Connection request " + status, data });

    } catch (err) {
      res.status(400).json({ message: "Error : " + err.message });
    }
  },
);
module.exports = requestRouter;