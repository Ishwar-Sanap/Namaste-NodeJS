const express = require("express");
const { userAuth, adminAuth } = require("./middleware/auth");
const app = express();

//Note : Each function in the chain receives the request and response objects, along with a next
// function that you call to pass control to the next handler.

/*

//Without Middleware, we have to write the admin authentication login multiple times for each route

app.get("/admin/getAllData", (req, res, next) => {
  //Before sending the response we have to verify that request is send by verifed admin
  const token = "NoTaskaree";
  const isAuthorized = token === "NoTaskaree";
  if (isAuthorized) {
    res.send("Send all data");
  } else {
    res.status(401).send("Unauthorized client..");
  }
});

app.get("/admin/deleteUser", (req, res, next) => {
  //Before sending the response we have to verify that request is send by verifed admin
  const token = "NoTaskaree";
  const isAuthorized = token === "NoTaskaree";
  if (isAuthorized) {
    res.send("User deleted successfully..");
  } else {
    res.status(401).send("Unauthorized client..");
  }
});

*/

// Using Middleware all admin routes get validated first
/*
app.use("/admin", (req, res, next) => {
  const token = "NoTaskaree";
  const isAuthorized = token === "NoTaskaree";
  if (isAuthorized) {
    next();
  } else {
    res.status(401).send("Unauthorized admin..");
  }
});

app.get("/admin/getAllData", (req, res, next) => {
  res.send("Send all data"); //It's gurantee that this route handler will only executed when admin isAuthorized
});

app.get("/admin/deleteUser", (req, res, next) => {
  res.send("User deleted successfully.."); //It's gurantee that this route handler will only executed when admin isAuthorized
});

//Only those request come for /user... route will be validate from here and then go next()
app.use("/user", (req, res, next) => {
  const token = "TrueUser";
  const isAuthorized = token == "TrueUser";
  if (isAuthorized) {
    next();
  } else {
    res.status(401).send("Unauthorized user...");
  }
});

app.get("/user/:id", (req, res, next) => {
  const uid = req.params.id;
  res.send("Sending data of userID : " + uid);
});

*/

//Better way to write middleware in wrting auth functionality in seperate auth file.

app.use("/admin", adminAuth);

app.get("/admin/getAllData", (req, res, next) => {
  res.send("Send all data"); //It's gurantee that this route handler will only executed when admin isAuthorized
});

app.get("/admin/deleteUser", (req, res, next) => {
  res.send("User deleted successfully.."); //It's gurantee that this route handler will only executed when admin isAuthorized
});

app.get("/user/:id", userAuth, (req, res, next) => {
  const uid = req.params.id;
//   throw new Error("Something went wrong");
  res.send("Sending data of userID : " + uid);
});

//Wild card error handling, catches all error, but error should be handled in try cath blok inside every route..
app.use("/", (err, req, res, next) => {
  if (err) res.status(500).send(err.message);
});

app.listen(3000, () => {
  console.log("server listening on port 3000");
});
