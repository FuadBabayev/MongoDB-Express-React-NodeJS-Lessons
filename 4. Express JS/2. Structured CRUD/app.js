// ! MIDDLEWARE DECLARATION
const express = require('express');
const app = express();
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const morgan = require('morgan');

// Todo: Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use((request, response, next) => {
    console.log('Hello from the Middleware 🤗');
    next();
});
app.use((request, response, next) => {
    request.requestTime = new Date().toISOString();
    next();
});

// Todo: Routes
app.use('/tours', tourRouter);
app.use('/users', userRouter);

module.exports = app;