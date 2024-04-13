const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('./models/tourModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
    .then(() => console.log('DB connection succesfull!'));



// Read JSON file
const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, 'utf-8'));

// Import Data into Database
const importData = async () => {
    try {
        await Tour.create(tours);
        console.log('Data Successfully Loaded!');
    } catch (error) {
        console.log(error);
    }
    process.exit();                                     // ! Avtomatic isler bitenden sonra terminali sonlandirir (Auto Ctrl + c)
};

// Delete all data from Database
const deleteData = async () => {
    try {
        await Tour.deleteMany();
        console.log('Data Successfully Deleted!');
    } catch (error) {
        console.log(error);
    }
    process.exit();
};


// ! In Terminal write  node .\dev-data\data\import-dev-data.js to process and add --import or --delete to deep process
console.log(process.argv);    // *  [ 'C:\\Program Files\\nodejs\\node.exe', 'C:\\Users\\user\\Desktop\\6. Mongoose\\dev-data\\data\\import-dev-data.js'  ]
if (process.argv[2] === '--import') importData();        // Todo: it will run if you write       node .\dev-data\data\import-dev-data.js --import
if (process.argv[2] === '--delete') deleteData();        // Todo: it will run if you write       node .\dev-data\data\import-dev-data.js --delete
