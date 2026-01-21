const fs = require("fs");

const crypto = require("crypto");

console.log("Hello NodeJs");

const multiply = (a, b) => {
  return a * b;
};

const rest = multiply(411, 9989);
console.log("Multiplication is : ", rest);

//This is synchronous function, to read the file, so it will block the main execution thread util read operation done
const data = fs.readFileSync("./test.txt", "utf-8"); // if it took 100ms then further code execution will be blocked till 100ms
console.log(data);
console.log("All file data read..");

//Password-Based Key Derivation Function 2 (PBKDF2)
const key = crypto.pbkdf2Sync("User@123", "salt", 5000000, 10, "sha512");
console.log("Generated key : ", key.toString("hex"));
