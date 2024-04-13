### MONGO DB
**MongoDB** is a document database with the scalability and flexibility that you want with the querying and indexing that you need.
`Key MongoDB features`
1. **Document based:** MongoDB stores data in documents (field-value pair data structures, NoSQL); 
2. **Scalable:** Very easy to distribute data across multiple machines as your users and amount of data grows; 
3. **Flexible:** No document data schema required, so each document can have different number and type of fields; 
4. **Performant:** Embedded data models, indexing, sharding, flexible documents, native duplication, etc.

**BSON: (JS object)** Data format MongoDB uses for data storage. `Like JSON, but typed.` So MongoDB documents are typed.

1. Download MongoDB Community Edition           https://www.mongodb.com/try/download/community 
2. Download MongoDB Compass (GUI)               https://www.mongodb.com/try/download/compass
3. Download MongoDB Shell                       https://www.mongodb.com/try/download/shell


### MongoDB Commands
`cd ../../Program Files/MongoDB/Server/7.0/bin + mongod` Launch MongoDB ve Compasla isleyerken ilk once bu commandi etsen daha yaxsi olar
`mongosh`                                            In CMD terminal write this and it will open mongosh.exe terminal
`cls, ctrl + l`                                      Clear mongosh terminal
`quit(), ctrl + c, ctrl + d`                         Automatically exit program
`show dbs`                                           Shows all active DataBases            admin   40.00 KiB       config  12.00 KiB        local   72.00 KiB
`show collections`                                   Shows all collections of current database           tours...
`use dbsName`                                        Switched to dbsName (if dbsName not exits it will create new database)
`db.collectionName.mongoshMethods`                   db.tours (db => current place and .tours => collection name, ...MongoDB methods)
`db.abc.insertOne({ad: "A", "yas" : 7})`             You can put dbl "" to key if you want, but you must put dbl "" to value

`db.name.insertOne({})`                              Add **one** product to database
`db.name.insertMany([{}, {}])`                       Add **many** product to database

`db.name.find()`                                     Display **all** products
`db.name.find().pretty()`                            Display **all** products **clearly**
`db.name.find({key: "value"})`                       Display **all** products with appropriate **key:value**
`db.abc.find({age : {$gt: 25}})`                     Display **all** products which have Greater Than ($gt) age 25 ($lte - lower than equal)
`db.abc.find({age : {$gt: 25}, wage: {$lte: 700}})`  Display **all** products which age > 25 **AND** wage <= 700    (her iki terefi eyni anda odeyenleri getirir)
`db.tours.find({$or: [{age : {$gt: 25}}, {wage: {$lte: 700}}]})` Display **all** products which age > 25 **OR** wage <= 700 (ferqi yoxdu 1-ni odese getirir ) 
`db.name.findOne()`                                  Display **first** product
`db.name.findOne({key: "value"})`                    Display **first** product with appropriate **key:value**

`db.name.updateOne({k: "v"}, {$set: {Nk: "Nv"}})`    Update **first** product with appropriate **key:value**
`db.name.updateMany({k: "v"}, {$set: {Nk: "Nv"}})`   Update **all** products with appropriate **key:value**

`db.name.deleteOne({key: "value"})`                  Delete **first** product with appropriate **key:value**
`db.name.deleteMany({key: "value"})`                 Delete **all** products with appropriate **key:value**
`db.name.deleteMany({})`                             Delete **all and all** products 

`db.name.replaceOne({key: "value"}, {Nk: "Nv"})`     Scopenin icinde ne yazsan ancaq onu elave edecek