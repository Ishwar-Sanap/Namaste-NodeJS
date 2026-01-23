const fs = require("fs");
const a = 999;

setImmediate(() => console.log("setImmediate"));

Promise.resolve("promise").then(console.log)

fs.readFile("./test.txt", "utf-8", (err, data) => {
    console.log("File read");
})

setTimeout(() => console.log("setimeout"), 0)

process.nextTick(() => console.log("Process.nexttick"))

function printA() {
    console.log("a = " + a);
}
printA();
console.log("last line of program")

/* OUTPUT

a = 999
last line of program
Process.nexttic
Promise
setTimeOut
setImmediate
File read

*/