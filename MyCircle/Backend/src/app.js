const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Welcome to MyCircle");
});


//Route not matches
app.get("/{*splat}", (req, res) => {
  res.status(404).send("404 - not found");
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log("Server is listening on port :", PORT);
});
