// ! MIDDLEWARE DECLARATION
const express = require('express');
const app = express();
const tourRouter = require('./../routes/tourRoutes');

// Todo: Middleware
app.use(express.json());                    // ! Bu olmasa POST undefined verir ve proses davam etmir
app.use((request, response, next) => {
    console.log('Hello from the Middleware 🤗');
    next();
});

// Todo: Routes
app.use('/tours', tourRouter);

module.exports = app;