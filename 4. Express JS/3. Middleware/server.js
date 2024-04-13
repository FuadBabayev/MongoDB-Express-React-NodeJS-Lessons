const dotenv = require('dotenv');
dotenv.config({
    path: './config.env'
});
const app = require('./app');

// ! Environment variables are global variables that are used to define the environment which node app is running 
// console.log(app.get('env'));            // ! It belongs to Express.js                       development
// console.log(process.env);               // ! It belongs to Node.js        {NODE_ENV=development, PORT=8000, USER=fuad, PASSWORD=123456, ...elave butun ozellikler}
// Todo: Bundan elave Terminaldada cagira bilerik NODE_ENV=development nodemon server.js

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});