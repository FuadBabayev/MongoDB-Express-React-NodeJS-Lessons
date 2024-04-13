const fs = require('fs');
const express = require('express');
const app = express();
const port = 3000;


// ! READ
const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, 'utf-8'));

// ! JSEND
app.get('/api/v1/tours', (req, res) => {
    res
        .status(200)                                    // * OKAY
        .json({
            status: "success",
            results: tours.length,                      // * Adeten getAll-da yazirlar bu propertieni
            message: {
                data: tours
            }
        });
});

app.listen(port, () => console.log(`App running on port ${port}...`));