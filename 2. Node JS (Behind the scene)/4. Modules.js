// ! Arguments is array in JavaScript and contains all the value that were passed into function
// Todo: this wrapper function has 5 arguments: 1.export 2.require 3.module 4.fileName 5.directoryName
console.log(require('module').wrapper);                 // [ '(function (exports, require, module, __filename, __dirname) { ','\n});' ]
console.log(arguments);
// [Arguments] {
// '0': {},
// '1': [Function: require] { main: { id: '.', path: 'C:\\Users\\user\\Desktop\\MongoDB, Express, Node JS\\02. How Node JS works'},
// '2': { id: '.', path: 'C:\\Users\\user\\Desktop\\MongoDB, Express, Node JS\\02. How Node JS works', ... },
// '3': 'C:\\Users\\user\\Desktop\\MongoDB, Express, Node JS\\02. How Node JS works\\4. Modules.js',
// '4': 'C:\\Users\\user\\Desktop\\MongoDB, Express, Node JS\\02. How Node JS works'
// }


// Todo: module.exports (import without {} in React)
const Calculator = require('./moduleA');                // console.log(require('./moduleA'));           // ! [class Calculator]
const calculator = new Calculator();                    // console.log(Calculator, calculator);         // ! [class Calculator] Calculator {}
console.log(calculator.add(12, 4));                     //  16
console.log(calculator.multiply(12, 4));                //  48
console.log(calculator.divide(12, 4));                  //  3


// Todo: exports (import with {} in React)
const calculator2 = require('./moduleB');               // console.log(require('./moduleB'));           // ! { add, multiply, divide }
console.log(calculator2.add(12, 4));                    //  16 
console.log(calculator2.multiply(12, 4));               //  48
console.log(calculator2.divide(12, 4));                 //  3
// ! OR with Destructuring
const { add, multiply, divide } = require('./moduleB');
console.log(add(12, 4));                                 //  16 
console.log(multiply(12, 4));                            //  48
console.log(divide(12, 4));                              //  3


// Todo: Caching (as result you can see "Hello from the module" render once, "Log this beautiful text 😍" render many times because of caching)
require('./moduleC')();                                      // we just call this anonimous function () => console.log('Log this beautiful text 😍');
require('./moduleC')();
require('./moduleC')();