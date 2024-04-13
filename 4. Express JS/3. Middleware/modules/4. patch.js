const fs = require('fs');
const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());

const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, 'utf-8'));

app.patch('/api/v1/tours/:id', (req, res) => {
    const tour = tours.find((el) => el.id === Number(req.params.id));
    if (!tour) return res.status(404).json({ status: "fail", message: `Sorry we cant find any data with id:${Number(req.params.id)}!` });

    const updatedTour = Object.assign(tour, req.body);

    fs.writeFile(`${__dirname}/../dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
        res
            .status(200)
            .json({
                status: "success",
                message: {
                    data: updatedTour,
                }
            });
    });
});

app.listen(port, () => console.log(`App running on port ${port}...`));