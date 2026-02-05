const express = require("express");
const { connectDB } = require("./config/database");
const app = express();
const User = require("./models/user");

// It will work for every routes
app.use(express.json()); //middleware to parse JSON data

//By defulat schema validatino works only for post method
app.post("/signup", async (req, res) => {
  console.log(req.body);
  try {
    const userObj = new User(req.body);
    await userObj.save(); //saves this document by inserting a new document into the database
    res.send("User info saved.");
  } catch (err) {
    res.status(400).send("Failed to save user info, " + err.message);
  }
});

//Get all the user data from DB
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({}); //emtpy filter will give you all user data in array
    res.send(users);
  } catch (err) {
    res.status(400).send("Something went wrong try again..");
  }
});

//Update the document
//while updating you have to explictily set runValidators option true
app.patch("/user", async (req, res) => {
  try {
    const data = req.body;
    // in data we have extra field userID but mongoose will ignore that field and update only the fields that are present in the schema.

    // await User.findOneAndUpdate({ _id: req.body.userID }, data);
    // await User.findByIdAndUpdate(req.body.userID, data);

    // passing options to get the updated document in response
    const updatedUser = await User.findByIdAndUpdate(req.body.userID, data, {
      returnDocument: "after",
      runValidators: true,
    });
    // console.log("Updated User :", updatedUser);

    //updating user based on emailID

    // const updateUser = await User.findOneAndUpdate(
    //   { emailID: req.body.emailID },
    //   data,
    //   { returnDocument: "after" },
    // );
    // console.log(updateUser);

    res.send("user details updated");
  } catch (err) {
    res.status(400).send("Update failed," + err.message);
  }
});

//delete the document
app.delete("/user", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.body.userID);
    res.send("user deleted successfully..");
  } catch (err) {
    console.log("Something went wrong try again..");
  }
});

//Get user by emailID
app.get("/user", async (req, res) => {
  try {
    const userEmail = req.body.emailID;
    // const users = await User.find({ emailID: userEmail }); //return all the documents that matches the filter
    const user = await User.findOne({ emailID: userEmail }); // findOne will return single document that matches the filter. if multiple documents matches the filter it will return the first document it finds.
    res.send(user);
  } catch (err) {
    res.status(400).send("Something went wrong try again..");
  }
});

const PORT = 3000;
//When your database is Connected after that start listening requests..
connectDB()
  .then(() => {
    console.log("Database connection succeed..");
    app.listen(PORT, () => {
      console.log("Server is listening on port :", PORT);
    });
  })
  .catch(() => {
    console.error("Failed to connect database");
  });
