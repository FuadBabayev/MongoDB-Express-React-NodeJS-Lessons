// ! It is just like exports default in React and we import it in another page without {}
class Calculator {
    add(a, b) { return a + b; }
    multiply(a, b) { return a * b; }
    divide(a, b) { return a / b; }
}
module.exports = Calculator;

// ! Also you can write like that shortly
// module.exports = class {
//     add(a, b) { return a + b; }
//     multiply(a, b) { return a * b; }
//     divide(a, b) { return a / b; }
// }