const express = require("express");
const { connectDB } = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");

// It will work for every routes
app.use(express.json()); //middleware to parse JSON data
app.use(cookieParser()); // cookie-parser middleware to parse the cookie

app.use("/", authRouter)
app.use("/", profileRouter)
app.use("/",requestRouter)
app.use("/", userRouter)

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
