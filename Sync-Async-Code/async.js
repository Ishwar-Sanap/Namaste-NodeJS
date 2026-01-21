const fs = require("fs");
const https = require("https");

/// NOTE : V8 Engine dont's know how to handle async task, so NodeJs handOver it to libuv i.e c library
// it is responsible to execute the async task. it uses EventLoop mechanism

console.log("Hello Node..");

//Reading the file asynchronously
//The callBack function is get's executed asynchronously by the libuv
fs.readFile("./test.txt", "utf-8", (err, data) => {
  console.log(data);
});

console.log("Line 17 executed.."); // It will be executed before the file data reads, since above readFile is async call..

//Async call to get the data from the API
https.get("https://dummyjson.com/user/1", (res) => {
  let data = "";
  res.on("data", (chunk) => {
    data += chunk;
  });
  res.on("end", () => {
    console.log("Data received from API: ", JSON.parse(data).bank);
  });
});

console.log("Line 30 executed");

//Async call
setTimeout(() => {
  console.log("call me after 3sec.");
}, 3000);

//Given delay 0MS but callback can't guranttee to be executed immediately. since it goes into callback queue
///and when call stack becomes emtpy and timer is over then it executescle
setTimeout(() => {
  console.log("delay 0ms");
}, 0); //Trust issue with setTimeOut :(

console.log("End here..")