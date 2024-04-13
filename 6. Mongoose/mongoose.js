const dotenv = require('dotenv');
const app = require('./app');
dotenv.config({ path: './config.env' });

// ! CONNECTING OUR DATABASE WITH EXPRESS JS
const mongoose = require('mongoose');
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
mongoose.connect(DB, {                                             // ! Mongo Atlas-dan HOSTED olan datalari getirir
    // mongoose.connect(process.env.DATABASE_LOCAL, {                  // ! LOCAL-dan olan datalari getirir
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then((con) => {
    // console.log(con.connections);      // ! { name: 'natours', host: 'ac-jtf7u-00.plnl37p.mongodb.net', port: 27017, user: 'fuadeb', pass: 'gXcpDJ56xyipjtLZ' ... }
    console.log('DB connection succesfull!');
});




// ! Creating Mongoose Schema (Describing Data)
const tourSchema = new mongoose.Schema({
    // name: String,                                                 // ! You can simplye write that if you want or
    name: {                                                          // ! Schema type options
        type: String,
        required: [true, 'A tour must have a name'],                 // ! [true, errorString]
        unique: true
    },
    rating: {
        type: Number,
        default: 4.5                                                 // ! If you did not write it, Schema will automatically write
    },
    price: {
        type: Number,
        required: [true, 'A Tour must have a price']
    }
});
// ! Creating Mongoose Model (JS Class, always write Capitalize) 
const Tour = mongoose.model('Tour', tourSchema);             // * mongoose.model('modelName', Schema)
// Todo: 1. Create new Variable
const testTour = new Tour({                                  // * Instance of Tour Model 
    name: "The Forest Hiker",
    rating: 4.7,
    price: 497,
});
// Todo: Interact with Database (This save it to the tours collection in the database)
testTour.save()
    .then(document => console.log(document))
    .catch(error => console.log('ERROR 💥: ', error));






const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`App running on port ${port}...`));

