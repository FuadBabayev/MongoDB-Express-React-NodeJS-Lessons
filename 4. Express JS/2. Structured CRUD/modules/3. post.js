const fs = require('fs');
const express = require('express');
const app = express();
const port = 3000;
// * Eger bu middleware olmasa POSTMAN ve ya diger yerden Body/raw/JSON yerinden send etdiyimiz datalar undefined verecek
app.use(express.json());                    // ! Middleware is function that can modify the incoming request data (stands in the middle of request and response)

// ! READ
const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, 'utf-8'));

// ! we firstly need middleware "app.use(express.json())" in order to set POST method
app.post('/api/v1/tours', (req, res) => {
    // console.log(req.body);                        // ! Senin gondereceyin datalar { name: 'Test Tour', duration: 10, difficulty: 'easy' }
    const newTour = Object.assign({ id: tours[tours.length - 1].id + 1 }, req.body);   // ! OR { id: tours[tours.length - 1].id + 1, ...req.body }
    // console.log(newTour);                         // ! { id: 9, name: 'Test Tour', duration: 10, difficulty: 'easy' }
    tours.push(newTour);


    // ! JSON.stringify(tours) -> tours gonderirik ki, yeniden silib hamisini yazsin eger newTour gonderseydik diger datalarin hamsini silib tekce newTour yazardi
    fs.writeFile(`${__dirname}/../dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
        res                                 // * Prosess gedenden (datalar gonderildikden sonra) sonraki geri qayidan ekran gorsenen melumatlar
            .status(201)                    // * CREATED
            .json({
                status: "success",
                message: {
                    data: tours,
                }
            });
    });

    // If you see this message it means you have wrote .send more than 1 // ! Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client 
    // res.send('New Tour Successfully Created!');
});

app.listen(port, () => console.log(`App running on port ${port}...`));