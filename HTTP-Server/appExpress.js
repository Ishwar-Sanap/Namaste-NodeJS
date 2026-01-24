const express = require("express");

//express in NodeJS framework to create server and handle routing easily
//It is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. 
// built on top of the Node.js HTTP module, Express simplifies the process of handling requests, routing, and middleware integration.
//npm install express

const app = express();

const PORT = 8090;

const usersData = [
  {
    id: 1,
    name: "Akshay",
    age: 28,
  },
  {
    id: 2,
    name: "Arjun",
    age: 19,
  },
  {
    id: 3,
    name: "Pranit",
    age: 30,
  },
];

app.get("/", (req, res) => {
  res.send("Hello from the Express Server");
});

app.get("/api/users", (req, res) => {
  res.json(usersData); // sending the json response
});

// Catch all other routes
app.get("/{*splat}", (req, res) => {
  res.status(404).send("404 - not found");
});

app.listen(PORT, () => {
  console.log("Express Server listening on port :  ", PORT);
});
