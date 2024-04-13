const fs = require('fs');
const express = require('express');
const app = express();
const port = 3000;


// ! READ
const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, 'utf-8'));

app.get('/api/v1/tours', (req, res) => {
    res
        .status(200)                                    // * OKAY
        .json({
            status: "success",
            results: tours.length,
            message: {
                data: tours
            }
        });
});

app.get('/api/v1/tours/:id', (req, res) => {
    // * app.get('tours/:id/:x/:y/:z?' ... ) hemcinin belede yaza bilerdik ama gerek butun datalari doldurmaq lazimdir tekce Z (optional olduqu ucun) bos ola biler
    // console.log(req.params);                               // ! { id: '/what you wrote' } alway in string values then we must convert it into number
    const id = Number(req.params.id);
    const allId = tours.map((tour) => tour.id);

    if (allId.includes(id)) {
        res
            .status(200)
            .json({
                status: "success",
                message: {
                    data: tours.find((tour) => tour.id === Number(req.params.id)),              // ! Numbere cevirmesek string kimi basa dusur ve tapa bilmir
                }
            });
    }
    else {
        res
            .status(404)
            .json({
                status: "fail",
                message: `Sorry we cant find data with id:${id}!`
            });
    }
});

app.listen(port, () => console.log(`App running on port ${port}...`));