// ! MIDDLEWARE DECLARATION
const express = require('express');
const app = express();
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const morgan = require('morgan');

// Todo: Middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
app.use(express.json());
app.use((request, response, next) => {
    console.log('Hello from the Middleware 🤗');
    next();
});
app.use((request, response, next) => {
    request.requestTime = new Date().toISOString();
    next();
});
// Todo: Yuxaridaki butun routelere http://127.0.0.1:3000/api/v1/tours/ yazaraq hem browserden hemde POSTMAN-dan daxil ola bildik
// Todo: Amma Statuc filelere is route olmadiqlari ucun ancaq Browser-den daxil olmaq olur http://127.0.0.1:3000/overview.html, http://127.0.0.1:3000/img/pin.png
// * http://127.0.0.1:3000/public/overview.html Public yazanda islemir cunki URL-e daxil olarken butun app-i axtarir tapmayanda ozu avtomatik PUBLIC foldere gedir
app.use(express.static(`${__dirname}/public`)); // ! Serving Static file (Sitting in our file system but we cant access using route especially files in public folder)

// Todo: Routes
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;