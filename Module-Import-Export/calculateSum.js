const calculateSum = (a, b) => {
  return a + b;
};

let name = "Namaste NodeJS";

//without module.exports we can't use functions or variables outside this file due to module scope in NodeJS

// Exporting multiple functions or variables as object
module.exports = { calculateSum, name };

//ES6 Module export syntax..
// export { name , calculateSum};