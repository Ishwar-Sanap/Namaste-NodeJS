const jwt = require("jsonwebtoken");
const User = require("../models/user")

const userAuth =  async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) throw new Error("invalid token");
    const decodedObj = jwt.verify(token, "SecreateCode@123");
    const {userID} = decodedObj;
    const user = await User.findById(userID);
    if(!user) throw new Error("user not found");

    req.user = user; //adding user details in req
    next(); // it will call next request handler..
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
};

module.exports = {
  userAuth,
};
