//Node js is a JavaScript runtime built on chrome's v8 JavaScript engine.
// It allows us to run JavaScript code outside the browser environment.
// NodeJS is primarily used for building server-side applications and command-line tools.
// It provides a rich set of built-in modules and libraries for various functionalities like file system operations, networking, and more.


let a = 10;
let b = 20;

console.log("Sum is : ", a + b);

//In NodeJS
console.log(global)  // Global object in NodeJS only
console.log(this) // Empty object in NodeJS

// In Browser
// console.log(window)  // Global object in Browser only
// console.log(this) // In browser this will points to global object Window

//To Standardize the global object across different environments like NodeJS and Browser
// We can use "globalThis" object it is recently added by ECMAScript 2020

console.log(globalThis)

console.log(globalThis === global) // true in NodeJS
// console.log(globalThis === window) // true in Browser

// To Execute the node js code use below command : 
// node fileName.js  (ex: node IntroNode.js)