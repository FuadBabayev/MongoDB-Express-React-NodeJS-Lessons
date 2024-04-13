### MongoDB library Mongoose
a. Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js, a higher level of abstraction;
b. Mongoose allows for rapid and simple development of mongoDB database interactions;
c. `Features:` schemas to model data and relationships, easy data validation, simple query API, middleware, etc; 
d. `Mongoose schema:` where we model our data, by describing the structure of the data, default values, and validation; 
e. `Mongoose model:` a wrapper for the schema, providing an interface to the database for CRUD operations.


1. Before Starting we must connect with Mongo Atlas
2. Try to always launch Mongod in terminal
3. `npm i mongoose@5` or `npm i mongoose`   Donwload MongoDB library Mongoose



**Mongoose** is all about models. **Model** is like a blueprint(same as class) that we use to `perform CRUD operation`. And in order to crate Model we need **Schema**.
Models are created out of Mongoose Schema. We use Schema to describe our data, to set default values.


### HEMiSE DIQQET ET
DATABASE=mongodb+srv://fuadeb:<PASSWORD>@cluster0.plnl37p.mongodb.net/natours?retryWrites=true
burada eger ....mongodb.net/natours?ret... eger natours (yeni hansisa Database adi qoymasan) avtomatik test **Database** yaradib onun icinde atacaq

const Tour = mongoose.model('Tour', tourSchema);             // * mongoose.model('modelName', Schema)
Burada modelName-ye hansi ad versek onun Plural formasinda **Collection** yaradacaq


# MVC Architecture (Model View Controller)

Mongoose Queries: https://mongoosejs.com/docs/queries.html

# Query String (console.log(req.query) => { duration: '7', maxGroupSize: '15' } )   
http://127.0.0.1:3000/api/v1/tours?duration=7&maxGroupSize=15