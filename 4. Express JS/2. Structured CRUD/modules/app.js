const fs = require('fs');
const express = require('express');
const app = express();
const port = 3000;

// Todo: 1. MIDDLEWARE
const morgan = require('morgan');
app.use(morgan('dev'));
app.use(express.json());

app.use((request, response, next) => {
    request.requestTime = new Date().toISOString();
    next();
});


// Todo: 2. ROUTE HANDLERS
// * Tours
// ! READ all Tours from File   (Evvelce const ile yazmisdiq DELETE edende value deyisdiyi ucun onu let ile evezledik)
let tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, 'utf-8'));

// ! GET all Tours
const getAllTours = (req, res) => {
    res.status(200).json({ status: "success", createdAt: req.requestTime, results: tours.length, message: { data: tours } });
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
    fs.writeFile(`${__dirname}/../dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
        res.status(201).json({ status: "success", message: { data: tours } });
    });
};

// ! PATCH Tour
const updateTour = (req, res) => {
    const tour = tours.find((el) => el.id === Number(req.params.id));
    if (!tour) return res.status(404).json({ status: "fail", message: `Sorry we cant find any data with id:${Number(req.params.id)}!` });
    const updatedTour = Object.assign(tour, req.body);

    fs.writeFile(`${__dirname}/../dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
        res.status(200).json({ status: "success", message: { data: updatedTour } });
    });
};

// ! DELETE Tour
const deleteTour = (req, res) => {
    const tour = tours.find((el) => el.id === Number(req.params.id));
    if (!tour) return res.status(404).json({ status: "fail", message: `Sorry we cant find any data with id:${Number(req.params.id)}!` });
    tours = tours.filter((tour) => tour.id !== Number(req.params.id));
    fs.writeFile(`${__dirname}/../dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
        res
            .status(204)
            .json({
                status: "success",
                message: null,
            });
    });
};

// * Users
const getAllUsers = (req, res) => {
    res.status(500).json({ status: "error", message: "This route is not yet defined!" });
}
const getUser = (req, res) => {
    res.status(500).json({ status: "error", message: "This route is not yet defined!" })
}
const createUser = (req, res) => {
    res.status(500).json({ status: "error", message: "This route is not yet defined!" })
}
const updateUser = (req, res) => {
    res.status(500).json({ status: "error", message: "This route is not yet defined!" })
}
const deleteUser = (req, res) => {
    res.status(500).json({ status: "error", message: "This route is not yet defined!" })
}


// Todo: 3. ROUTES
// ! Esas yazilis bu curdur ama CHAIN etmek olmur
// app.get('/api/v1/tours', getAllTours); app.get('/api/v1/tours/:id', getTour); app.post('/api/v1/tours', createTour);
// app.patch('/api/v1/tours/:id', updateTour);   app.delete('/api/v1/tours/:id', deleteTour);
// ! Bele yazanda ise chain etmek mumkundur
// app.route('/api/v1/tours').get(getAllTours).post(createTour);
// app.route('/api/v1/tours/:id').get(getTour).patch(updateTour).delete(deleteTour);
// app.route('/api/v1/users').get(getAllUsers).post(createUser);
// app.route('/api/v1/users/:id').get(getUser).patch(updateUser).delete(deleteUser);
// ! En sonda We convert Routes into express.Router() as middleware and like this we create sub application
// Todo: A. Creating Routers
const tourRouter = express.Router();
const userRouter = express.Router();

// Todo: B. Set Routers
tourRouter
    .route('/')
    .get(getAllTours)
    .post(createTour);
tourRouter
    .route('/:id')                          // * buradaki slash(/) app.use('/api/v1/tours') ile birlesir
    .get(getTour)
    .patch(updateTour)
    .delete(deleteTour);

userRouter
    .route('/')
    .get(getAllUsers)
    .post(createUser);
userRouter
    .route('/:id')
    .get(getUser)
    .patch(updateUser)
    .delete(deleteUser);

// Todo: C. Mounting Routers
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// Todo: 4. START SERVER
// ! LISTEN on PORT http://127.0.0.1:3000
app.listen(port, () => console.log(`App running on port ${port}...`));