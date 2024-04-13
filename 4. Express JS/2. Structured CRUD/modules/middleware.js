const fs = require('fs');
const express = require('express');
const app = express();
const port = 3000;

// Todo: 1. MIDDLEWARE
const morgan = require('morgan');             // ! Hazir kitabxanadir API-ler haqqinda melumatlar verir
// app.use(morgan('combined'));               // * ::ffff:127.0.0.1  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/123.0.0.0 Safari/537.36"
// app.use(morgan('common'));                 // * ::ffff:127.0.0.1 - - [02/Apr/2024:14:07:08 +0000] "GET /api/v1/tours HTTP/1.1" 200 8555
// app.use(morgan('short'));                  // * ::ffff:127.0.0.1 - GET /api/v1/tours HTTP/1.1 200 8555 - 3.627 ms
// app.use(morgan('tiny'));                   // * GET /api/v1/tours 200 8555 - 3.721 ms
app.use(morgan('dev'));                       // * GET /api/v1/tours 200 4.008 ms - 8555
app.use(express.json());

// ! Creating Custom Middleware (Global Middleware always defined at top, before all route handlers) Eger route-den sonra yazsaq hemin route-de oxumuyacaq
// * It definitely has 3 params (request, response, next) adlari deyisdirsend olar esas ozu oz sirasini bilir
// Todo: IF we did not write next() function, the request response cycle will get stuck in this middleware and can't move on to the next middleware 
app.use((request, response, next) => {
    console.log('Hello from Middleware 🖐️');
    next();                 // ! Always and Always write like that (oppisite of break in switch). Her zaman yazmalisanki novbetiye kecid ede bilsin
});
app.use((request, response, next) => {
    request.requestTime = new Date().toISOString();    // ! requestTime evezine istenilen ad qoy. Sonra onu getAllTours-da log-da gosterdik
    next();
});


// Todo: 2. ROUTE HANDLERS
let tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, 'utf-8'));

const getAllTours = (req, res) => {
    // console.log(req.requestTime);                // 2024-04-02T13:12:44.726Z
    res
        .status(200)
        .json({
            status: "success",
            createdAt: req.requestTime,
            results: tours.length,
            message: {
                data: tours
            }
        });
};


// Todo: 3. ROUTES
app.route('/api/v1/tours').get(getAllTours)

// Todo: 4. START SERVER
app.listen(port, () => console.log(`App running on port ${port}...`));