require("./test"); // Importing test.js file, but any function or variable is not imported here only the code is executed

const { calculateSum, name } = require("./calculateSum"); // require returns module.exports object from calculateSum.js file
const { sum, multiply } = require("./Math");  // Importing folder as a module..
const data = require('./data.json')

//// ES6 Module Import Syntax
// import {name, calculateSum} from './calculateSum.js';

//Entry point of application
console.log("Hello World! Welcome to Namaste NodeJS");

console.log(calculateSum(5, 10));
console.log(name);

console.log(sum(2, 4));
console.log(multiply(5, 4));

console.log(data.languages)
