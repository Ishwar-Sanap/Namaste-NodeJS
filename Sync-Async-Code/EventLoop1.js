const fs = require("fs");
const a = 999;

setImmediate(() => console.log("setImmediate"));

//File reading might take few ms so read complete file
// so this callback will be executed in future poll phase cycle when reading is completed 

//If file is not exist, then might be executed in current poll phase

fs.readFile("./test.txt", "utf-8", (err, data) => {
  console.log("File read");
});

setTimeout(() => console.log("set timeout"), 0);

function printA() {
  console.log("a = " + a);
}
printA();

console.log("Last line of program");

///All synchronous code will be excuted first then asynchronous code excuted based on phase of event loop
//Phase of Nodejs Event loop are different than Browser Event loop...

/*
Phase 1 : Timer 
	- setTimeOut callback
	- SetInterval  callback
	
Phase 2 : Poll
	- I/O Callback
	- Incoming connections
	- Data
	- fs, cryptop, https.get

Phase 3 : Check
	- setImmediate callback

Phase4 : close
	- Socket.on('close')
	- Cleanup logic


• JavaScript main thread executes only synchronous code
• Async APIs (like fs.readFile, setTimeout) delegate work to libuv, not the event loop
• The callback is registered, not queued immediately

• The event loop continuously runs and:
    ○ Executes callbacks only when the call stack is empty
    ○ Picks callbacks from queues based on the current phase

Microtasks (Highest Priority)
	• After:
		○ synchronous code
		○ each callback execution
		○ each phas Node executes all microtasks before moving on
Execution order:
	1. process.nextTick() queue (highest priority)
	2. Promise callbacks (.then, await)
⚠️ These queues are fully drained before continuing.  (i.e all callback are executed from them before moving further)


*/

/* Output :
a = 999
Last line of program
Set timeout
setImmediate
File read.

*/
