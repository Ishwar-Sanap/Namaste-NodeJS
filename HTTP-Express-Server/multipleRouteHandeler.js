const express = require("express");
const app = express();

/*
Tips to use multiple route handlers :

- You can pass multiple callback functions (route handlers) to app.use(), app.get(), app.post(), etc.
- These functions will be executed in the order they are defined.
- Each function in the chain receives the request and response objects, along with a next function that you call to pass control to the next handler.
- If you want to send a response from a handler, you can do so using res.send(), res.json(), etc., and you should not call next() afterward.
- If you want to pass control to the next handler without sending a response, you must call next().
- If you don't call next() and don't send a response, the request will hang and eventually time out.
- If a handler does not call next(), the request-response cycle ends there, and no subsequent handlers are executed.
- This is useful for tasks like authentication, logging, or preprocessing requests before they reach the final handler.
- You can have as many handlers as needed, allowing for modular and reusable code.
- If there are all handlers that call next(), the last handler in the chain should send the response to avoid hanging requests.
- If last handler also calls next(), it will result in an error as there are no more handlers to process the request.

- General Example:
 app.use('/path', routeHandler1, routeHandler2, ..., routeHandlerN);

 we can also use arrays of middleware functions as route handlers or mix them with individual functions:
 app.use('/path', [routeHandler1, routeHandler2], routeHandler3, ..., routeHandlerN]);

- All above syntax are valid. and execute in the order they are defined.

- Express checks the routes from top to bottom, so the order of route definitions matters.
if a request matches multiple routes, the first matching route will be executed, and subsequent routes will be ignored unless next() is called.

- The in between route hander that call next() can be used for various purposes like logging, authentication, validation, etc., before reaching the final handler that sends the response.
and middle functions called as middleware functions.
*/

app.use(
  "/users",
  (req, res, next) => { // middleware
    // res.send("Response 1");
    next();
  },

  (req, res,next) => { // middleware
    // res.send("Response 2");
    next();
  },

  (req, res,next) => {
    res.send("Response 3");
  }
);

app.listen(3000, () => {
  console.log("Server listen on port 3000");
});
