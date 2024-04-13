### Express JS
`Why use it`

1. Express is most popular Node JS framework, so that it is written 100% using node.js code
2. Express contains a very robust set of features: routing, request, response, middleware, server-side rendering and etc...
3. Express allows for rapid development of Node.js App (we dont have repeat same code again and again)
4. Express makes it easier to organize our application into the MVC architecture

**Postman** is a tool that allows us to do API testing especially working with Express JS

# Starting Application (Try to use app.js instead of index.js while working with Express)
1. `npm init` Create package.json file
2. `npm i express` or `npm i express@4` Download ExpressJS package

**API** `Application Programming Interface`: a piece of software that can be used by another piece of sotfware, in order to allow applications to talk to each other
**The REST Architecture**
1. Separate API into logical resources
2. Expose structured, resource-based URLs
3. Use HTTP methods (CRUD)
4. Send data as JSON (usually)
5. Be stateless

# JSON                                                                          JSEND
```bash                                                                  Response Formatting
{                                                                       {
    "id" : 777,                                                           "status" : "success",
    "name" : "Fuad",                                                      "data" : {
    "age" : 25,                                                             "id" : 777,
    "isEmployee" : false,                                                   "name" : "Fuad",
    "friend" : ["Rauf", "Ayhan", "Elsen"],                                  "age" : 25,
    "guides" : { "name" : "A.A", "role" : 1 }                               "friend" : ["Rauf", "Ayhan", "Elsen"],
}                                                                        }
```

**Endpoints**
https://www.natours.dev/api/v1/tours                        /api/v1/tours           Endpoints


### Status Code
200         Okay        
201         Created     (Update)
204         No Content  (Delete)
404         Error

# Middleware (In Express everything is middleware even routes)
`express.json()` **middleware** used for get acces to the request.body
**Middleware** `app.use(express.json());` is function that can modify the incoming request data **(stands in the middle of request and response)**
Eger middleware olmasa POSTMAN ve ya diger yerden Body/raw/JSON yerinden send etdiyimiz datalar `undefined` verecek