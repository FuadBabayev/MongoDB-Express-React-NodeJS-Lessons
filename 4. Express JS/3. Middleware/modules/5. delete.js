const fs = require('fs');
const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());

let tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, 'utf-8'));

app.delete('/api/v1/tours/:id', (req, res) => {
    const tour = tours.find((el) => el.id === Number(req.params.id));
    if (!tour) return res.status(404).json({ status: "fail", message: `Sorry we cant find any data with id:${Number(req.params.id)}!` });
    tours = tours.filter((tour) => tour.id !== Number(req.params.id));
    fs.writeFile(`${__dirname}/../dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
        res
            // .status(204)                                    // ! 204 No Content ona gorede hecne gostermiyecek
            .status(200)
            .json({
                status: "success",
                // message : null,
                message: `Data with id:${Number(req.params.id)} was succesfully deleted`,
            });
    });
});

app.listen(port, () => console.log(`App running on port ${port}...`));