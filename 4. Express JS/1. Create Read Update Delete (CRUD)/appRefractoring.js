const fs = require('fs');
const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());

// ! READ all Tours from File   (Evvelce const ile yazmisdiq DELETE edende value deyisdiyi ucun onu let ile evezledik)
let tours = JSON.parse(fs.readFileSync(`${__dirname}/db/tours.json`, 'utf-8'));

// ! GET all Tours
const getAllTours = (req, res) => {
    res.status(200).json({ status: "success", results: tours.length, message: { data: tours } });
};

// ! GET Specific Tour
const getTour = (req, res) => {
    const id = Number(req.params.id);
    const tour = tours.find((el) => el.id === id);
    if (!tour) return res.status(404).json({ status: "fail", message: `Sorry we cant find any data with id:${id}!` });
    res.status(200).json({ status: "success", message: { data: tour, } });
};

// ! POST New Tour
const createTour = (req, res) => {
    const newTour = Object.assign({ id: tours[tours.length - 1].id + 1 }, req.body);
    tours.push(newTour);
    fs.writeFile(`${__dirname}/db/tours.json`, JSON.stringify(tours), err => {
        res.status(201).json({ status: "success", message: { data: tours } });
    });
};

// ! PATCH Tour
const updateTour = (req, res) => {
    const tour = tours.find((el) => el.id === Number(req.params.id));
    if (!tour) return res.status(404).json({ status: "fail", message: `Sorry we cant find any data with id:${Number(req.params.id)}!` });
    const updatedTour = Object.assign(tour, req.body);

    fs.writeFile(`${__dirname}/db/tours.json`, JSON.stringify(tours), err => {
        res.status(200).json({ status: "success", message: { data: updatedTour } });
    });
};

// ! DELETE Tour
const deleteTour = (req, res) => {
    const tour = tours.find((el) => el.id === Number(req.params.id));
    if (!tour) return res.status(404).json({ status: "fail", message: `Sorry we cant find any data with id:${Number(req.params.id)}!` });
    tours = tours.filter((tour) => tour.id !== Number(req.params.id));
    fs.writeFile(`${__dirname}/db/tours.json`, JSON.stringify(tours), err => {
        res
            .status(204)
            .json({
                status: "success",
                message: null,
            });
    });
};

// ! Esas yazilis bu curdur ama CHAIN etmek olmur
// app.get('/tours', getAllTours);
// app.get('/tours/:id', getTour);
// app.post('/tours', createTour);
// app.patch('/tours/:id', updateTour);
// app.delete('/tours/:id', deleteTour);

// ! Bele yazanda ise chain etmek mumkundur
app
    .route('/tours')
    .get(getAllTours)
    .post(createTour);

app
    .route('/tours/:id')
    .get(getTour)
    .patch(updateTour)
    .delete(deleteTour);

// ! LISTEN on PORT http://127.0.0.1:3000
app.listen(port, () => console.log(`App running on port ${port}...`));