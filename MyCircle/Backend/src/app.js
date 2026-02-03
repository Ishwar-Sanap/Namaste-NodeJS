const express = require("express");
const { connectDB } = require("./config/database");
const app = express();
const User = require("./models/user");

// It will work for every routes
app.use(express.json()); //middleware to parse JSON data

app.post("/signup", async (req, res) => {
  console.log(req.body);
  try {
    const userObj = new User(req.body);
    await userObj.save(); //saves this document by inserting a new document into the database
    res.send("User info saved.");
  } catch (err) {
    res.status(400).send("Failed to save user info.");
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
