// ! MongoDB is most importantly a database. You can store all kind of datas including Nested data types and more flexible datas (But in SQL Datas must be strict)
// ! OverAll document size is Max 16mb/document because we only store text there NOT files and others
// * You can also Start/Stop MongoDB Server from Services or from CMD 'net start/stop MongoDB'
// Todo: Time to Get Started 
// Todo: 1.  Launch Mongosh 
// Todo: 2.  Please enter a MongoDB connection string: mongodb://localhost/     (or just press enter)
// Todo: 3.  show dbs                    admin   40.00 KiB       config  12.00 KiB        local   72.00 KiB
// Todo: 3A. show collections            tours and etc.
// Todo: 4.  use shop                    switched to db shop or if not create new database
// Todo: 4A. db.collectionName...        db.tours (db => current place and .tours => collection name, ...MongoDB methods)
// Todo: 5.  Add One Product             db.abc.insertOne({name: "Fuad", "price" : 12}) (You can put dbl "" to key if you want, but you must put dbl "" to value)
// Todo: 5A. Add Many Products           db.abc.insertMany([{}, {}])
// Todo: 6.  Get All Products            db.abc.find()   or for clearly display db.abc.find().pretty()
// Todo: 6A. Get One Products            db.abc.findOne()                   findOne datani Object halinda getirir
// Todo: 6B. Get Proper Product          db.abc.find({key : "value"})       find dayani Array halinda getirir 
// Todo: 6C. Get All Products Clearly    db.abc.find().pretty()             This works with cursor (more datas) NOT with one data
// Todo: 7.  Delete One Product          db.abc.deleteOne({key: "value"})          Istediyimiz keyi vere bilerik ve uygun olan ilk elementi silir
// Todo: 7A. Delete Many Products        db.abc.deleteMany({key: "value"})         Istediyimiz keyi vere bilerik ve uygun olan butun elementleri silir
// Todo: 8.  Update One Product          db.abc.updateOne({key: "value"}, {$set: {newKey: "newValue"}})  $set olmasa Update islemez
// Todo: 8A. Update Many Product         db.abc.updateMany({key: "value"}, {$set: {newKey: "newValue"}})  newKey yoxdursa yenisi yaradir, varsa update edir
// Todo: 8B. Update Product              db.abc.update({}) === db.abc.updateMany({$set:}) main difference there is no need $set key in db.abc.update({})
// Todo: 8C. Update/Delete Product       db.abc.replaceOne({}) Scopenin icine ne qoysan sadece onlari yazacaq digerlerini silecek
// Todo: 9.  CRUD ALL                    db.abc.insertMany([{}, {} .... {}])      db.abc.deleteMany({})         db.abc.updateMany({}, {$set: {....}})
// Todo: 10. Projection                  db.abc.find({}, {name : 1})  return all name values with _id    1: INCLUDING  0: EXCLUDING

// ! Terminal commands
// Todo: 1. Start MongoDB Server


// ! You can use operators when querying your data with MONGOSH methods, the ATLAS UI, or COMPASS.
// ! Query Selectors        https://www.mongodb.com/docs/manual/reference/operator/query/
// ! Mongosh Commands       https://www.mongodb.com/docs/manual/reference/method/



// * db.abc.find({age : {$gt: 25}})              Display All datas which have Greater Than ($gt) age 25
// * db.abc.find({age : {$lt: 25}})              Display All datas which have Lower Than ($lt) age 25

// ! Hints
// 1. db.abc.find() methods only show first 20 documents automatically, However db.abc.find().toArray() show all datas in array
// 2. db.abc.find().forEach((datas) => {printjson(datas)})    show all datas in cursor
// 3. db.abc.find({}, {name : 1, surname : 1, _id : 0})       show all data with name and surname only NOT id
// 4. db.abc.findOne({name : "Fuad"}).age                     FindOne Obyekt getirdiyi ucun .property yaza bilerik ama Find Array getirdiyi ucun yaza bilmerik
// 5. db.abc.find({"status.description": "on-time"})          Show datas has Status prop. and Description prop. in it with "on-time" value // ! use "status.descript" 



// Todo: Exercise
// ! Inserting One patient 
db.patients.insertOne({ firstName: "Max", lastName: "Schwarzmueller", age: 29, history: [{ "disease": "cold", treatment: 1 }] });
// ! Inserting Many patients
db.patients.insertMany([{ firstName: "Fuad", lastName: "Babayev", age: 25, history: [{ "disease": "sad", treatment: 2 }] },
                        { firstName: "Mecid", lastName: "Abbasli", age: 21, history: [{ disease: "hungry", treatment: 3 }] }]);
// ! Updating One patient
db.patients.updateOne({ /*_id: ObjectId('65c9d1')*/ firstName: "Mecid"}, { $set: { firstName: "Rauf", age: 26, history: [{ disease: "starving", treatment: 31 }]}});
// ! Show all patients who are older/younger 27
db.patients.find({ age: { $gt: 27 /* Greater Than */, $lte : 27  /* Lower Than Equal */ }});
// ! Delete All patients who have 'cold' disease
db.patients.deleteMany({ "history.disease": "cold" /* Always use quotation marks "" while write history.disease DOT Notation */});