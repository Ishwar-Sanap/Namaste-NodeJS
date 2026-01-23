const fs = require("fs");

setImmediate(() => console.log("1st setImmediate"));

setTimeout(() => console.log("1st timer"), 0);

Promise.resolve("promise").then(console.log);

//File reading might take few ms so read complete file
// so this callback will be executed in future poll phase cycle when reading is completed 

//If file is not exist, then might be executed in current poll phase

fs.readFile("./test.txt", "utf-8", (err, data) => {
  setTimeout(() => console.log("2nd timer"), 0);

  process.nextTick(() => console.log("2nd Process.nexttick"));

  setImmediate(() => console.log("2nd setImmediate"));

  console.log("file read");
});

process.nextTick(() => console.log("1st Process.nexttick"));

console.log("last line of program");

/* OUTPUT 

last line of program
1st Process.nexttick
Promise
1St timer
1st setImmediate
file read
2nd Process.nexttick
2nd setImmediate
2nd timer

*/
