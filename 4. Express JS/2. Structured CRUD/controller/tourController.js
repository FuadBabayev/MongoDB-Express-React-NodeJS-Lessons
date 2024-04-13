const fs = require('fs');
let tours = JSON.parse(fs.readFileSync(`${__dirname}/../database/tours.json`, 'utf-8'));

exports.getAllTours = (req, res) => {
    res.status(200).json({ status: "success", createdAt: req.requestTime, results: tours.length, message: { data: tours } });
};

exports.getTour = (req, res) => {
    const id = Number(req.params.id);
    const tour = tours.find((el) => el.id === id);
    if (!tour) return res.status(404).json({ status: "fail", message: `Sorry we cant find any data with id:${id}!` });
    res.status(200).json({ status: "success", message: { data: tour } });
};

exports.createTour = (req, res) => {
    const newTour = Object.assign({ id: tours[tours.length - 1].id + 1 }, req.body);
    tours.push(newTour);
    fs.writeFile(`${__dirname}/../database/tours.json`, JSON.stringify(tours), err => {
        res.status(201).json({ status: "success", message: { data: tours } });
    });
};

exports.updateTour = (req, res) => {
    const tour = tours.find((el) => el.id === Number(req.params.id));
    if (!tour) return res.status(404).json({ status: "fail", message: `Sorry we cant find any data with id:${Number(req.params.id)}!` });
    const updatedTour = Object.assign(tour, req.body);

    fs.writeFile(`${__dirname}/../database/tours.json`, JSON.stringify(tours), err => {
        res.status(200).json({ status: "success", message: { data: updatedTour } });
    });
};

exports.deleteTour = (req, res) => {
    const tour = tours.find((el) => el.id === Number(req.params.id));
    if (!tour) return res.status(404).json({ status: "fail", message: `Sorry we cant find any data with id:${Number(req.params.id)}!` });
    tours = tours.filter((tour) => tour.id !== Number(req.params.id));
    fs.writeFile(`${__dirname}/../database/tours.json`, JSON.stringify(tours), err => {
        res
            .status(204)
            .json({
                status: "success",
                message: null,
            });
    });
};