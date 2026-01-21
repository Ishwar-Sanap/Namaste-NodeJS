# << Namaste-NodeJS >> 🔥🚀

# What is NodeJS? 
- Node js is a JavaScript runtime built on chrome's v8 JavaScript engine.
- It allows us to run JavaScript code outside the browser environment.
- NodeJS is primarily used for building server-side applications and command-line tools.
- It provides a rich set of built-in modules and libraries for various functionalities like file system operations, networking, and more.

# Types of export/import Modules in NodeJS
1. CommonJS Modules (CJS)
   - This is the default module system in NodeJS.
   - We can also use CJS by using the `.cjs` file extension or setting `"type": "commonjs"` in the `package.json` file.
   - It uses `require()` to import modules and `module.exports` or `exports` to export them.
   - It is synchronous in nature. (i.e., modules are loaded one after another)
   - It works in non-strict mode by default. (i.e., variables can be used without declaring them)
   - Example:
     ```javascript
     // Exporting a module
     // math.js
     function add(a, b) {
       return a + b;
     }
     module.exports = { add }; // exporting as a object, so we can export multiple things if needed

     // Importing a module
     // app.js
     const {add} = require('./math'); // destructuring assignment to get add function out of the exported object
     console.log(add(2, 3)); // Output: 5
     ```

2. ECMAScript Modules (ESM)
   - This is the standardized module system introduced in ES6 (ECMAScript 2015).
   - We can use ESM in NodeJS by either using the `.mjs` file extension or setting `"type": "module"` in the `package.json` file.
   - It uses `import` and `export` statements for module management.
   - It supports both synchronous and asynchronous loading of modules. (i.e., modules can be loaded in parallel)
   - It works in strict mode by default. (i.e., variables must be declared before use)
   - Example:
     ```javascript
     // Exporting a module
     // math.js
     export function add(a, b) {
       return a + b;
     }

     // Importing a module
     // app.js
     import { add } from './math.js';
     console.log(add(2, 3)); // Output: 5
     ```
