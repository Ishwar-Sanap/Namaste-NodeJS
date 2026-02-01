const express = require("express");

const app = express();

/*
app.get()
   -  It only handles GET requests.
   -  It matches the exact path specified.
   -  It does not support middleware functionality.

   app.get("/hello", (req, res) => {
  res.send("Hello ");
});

app.use() 
   -  It supports all HTTP methods (GET, POST, PUT, DELETE, etc.).
   -  It matches the path prefix, meaning it will handle requests that start with the specified path.
   -  order of writing matters, it will execute in the order they are defined.
   - It is commonly used for middleware functions that need to be applied to multiple routes.
   - If you not write next() in the middleware, the request will be terminated there. no further routes will be processed.

    app.use("/hello", (req, res) => {
    res.send("Hello ");
  });
*/


app.get("/user", (req, res)=>{
  res.send({id : "1", name : "Akshay" })
})

const PORT = 3000;

app.listen(PORT, () => {
  console.log("Server is listening on port :", PORT);
});
