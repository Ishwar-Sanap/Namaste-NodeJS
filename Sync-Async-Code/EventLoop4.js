const fs = require("fs")

setImmediate(() => console.log("setimmediate"));
setTimeout(() => console.log("settimeout"));
Promise.resolve("Promise").then(console.log);

fs.readFile("./test.txt", "utf-8", (err, data) => {
    console.log("File read");
})

//Microtask queues are fully drained before continuing.  (i.e all callback are executed from them before moving further)
process.nextTick(() => {
    process.nextTick(() => console.log("inner nexttick"));
    console.log("process.nexttick")
})

console.log("last line of program");

/* OUTPUT :

Last line of program
process.nexttick
inner nexttick
Promise
settimeout
setimmediate
File read
*/