
const http = require("http");

// http module
//Older way to create a server in Node.js
//http module: Low-level, you manually handle routing, request parsing, and responses.

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

//Creating HTTP server
const server = http.createServer((req, res) => {
  console.log(req.url);

  if (req.url === "/api/users") {
    res.writeHead(200, { "Content-Type": "application/json" }); // Setting header for JSON response, default is text/html
    res.end(JSON.stringify(usersData));
    return;
  }

  res.end("Hello from the HTTP server");
});

server.listen(8090);

console.log("Server listening on port 8090");
