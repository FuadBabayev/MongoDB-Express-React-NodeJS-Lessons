const fs = require('fs');

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, 'utf-8')
);

// ! Bu funksiya id teleb eden butun funksiyalarda avtomatik olaraq yerlesdirilecek cunki router.param('id', tourController.checkID)-dan gelir ve id teleb edir
exports.checkID = (req, res, next, val) => {
    console.log(`Tour id is: ${val}`);
    if (req.params.id * 1 > tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: `Sorry we cant find any data with id:${val}!`
        });
    }
    next();
};

// ! Bu funksiya req.body teleb eden lakin id teleb etmiyen butun funksiyalarda "createTour" avtomatik olaraq yerlesdirilecek
exports.checkBody = (req, res, next) => {
    if (!req.body.name || !req.body.price) {
        return res.status(400).json({
            status: 'fail',
            message: 'Missing name or price'
        });
    }
    next();
};


exports.getAllTours = (req, res) => {
    res.status(200).json({
        status: 'success',
        createdAt: req.requestTime,
        results: tours.length,
        message: {
            data: tours
        }
    });
};

exports.getTour = (req, res) => {
    const id = Number(req.params.id);
    const tour = tours.find((el) => el.id === id);
    // ! DRY prinsipini qorumaq ucun yuxarida checkID() funksiyasini cagirib bura aid etdik
    // if (!tour) {
    //     return res.status(404).json({
    //         status: 'fail',
    //         message: `Sorry we cant find any data with id:${id}!`
    //     });
    // }
    res.status(200).json({
        status: 'success',
        message: {
            data: tour
        }
    });
};

exports.createTour = (req, res) => {
    const newTour = Object.assign({ id: tours[tours.length - 1].id + 1 }, req.body);
    tours.push(newTour);
    fs.writeFile(`${__dirname}/../dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
        res.status(201).json({ status: "success", message: { data: tours } });
    });
};

exports.updateTour = (req, res) => {
    // ! DRY prinsipini qorumaq ucun yuxarida checkID() funksiyasini cagirib bura aid etdik
    // const tour = tours.find((el) => el.id === Number(req.params.id));
    // if (!tour) return res.status(404).json({ status: "fail", message: `Sorry we cant find any data with id:${Number(req.params.id)}!` });
    // const updatedTour = Object.assign(tour, req.body);
    // fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
    //     res.status(200).json({ status: "success", message: { data: updatedTour } });
    // });
    res.status(200).json({ status: 'success', message: { data: '<Updated tour here...>' } });
};

exports.deleteTour = (req, res) => {
    // ! DRY prinsipini qorumaq ucun yuxarida checkID() funksiyasini cagirib bura aid etdik
    // const tour = tours.find((el) => el.id === Number(req.params.id));
    // if (!tour) return res.status(404).json({ status: "fail", message: `Sorry we cant find any data with id:${Number(req.params.id)}!` });
    // tours = tours.filter((tour) => tour.id !== Number(req.params.id));
    // fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => res.status(204).json({ status: "success", message: null, }));
    res.status(204).json({ status: 'success', message: null });
};

