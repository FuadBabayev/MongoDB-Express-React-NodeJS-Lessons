const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({
    path: './config.env'
});
const app = require('./app/app');        // ! Always try to write APP after DOTENV (after reading the environment variable). In order to get access 

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
    .then(() => console.log('DB connection succesfull!'));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`App running on port ${port}...`));