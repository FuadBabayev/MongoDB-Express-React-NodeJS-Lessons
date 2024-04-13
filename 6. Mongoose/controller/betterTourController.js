const Tour = require('../models/tourModel');

// Todo 5. Aliasing  (aliasTopTours Middleware)
exports.aliasTopTours = (req, res, next) => {
    // Todo: http://127.0.0.1:3000/api/v1/tours?limit=5&sort=-ratingsAverage,price yazmaq evezine http://127.0.0.1:3000/api/v1/tours/top-5-cheap yazacaqsan
    req.query.limit = '5';
    req.query.sort = '-ratingsAverage,price';
    req.query.fields = 'name,price,ratingAverage,summary,difficulty';
    next();
};

exports.getAllTours = async (req, res) => {
    try {
        // ! BUILD QUERY
        // Todo 1A. Filtering
        const queryObj = { ...req.query };
        const excludedFields = ['page', 'sort', 'limit', 'fields'];
        excludedFields.forEach(element => delete queryObj[element]);

        // Todo 1B. Advanced Filtering
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
        let query = Tour.find(JSON.parse(queryStr));

        // Todo 2. Sorting 
        if (req.query.sort) query = query.sort(req.query.sort.split(',').join(' '));
        else query = query.sort('-createdAt price');

        // Todo 3. Field Limiting
        if (req.query.fields) query = query.select(req.query.fields.split(',').join(' '));
        else query = query.select('-__v');

        // Todo 4. Pagination
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        query = query.skip(skip).limit(limit);
        if (req.query.page) {
            const numTours = await Tour.countDocuments();
            if (skip >= numTours) throw new Error('This page does not exist!');
        }

        // ! EXECUTE QUERY
        const tours = await query;
        // * query.sort().select().skip().limit() 

        res.status(200).json({
            status: 'success',
            results: tours.length,
            data: {
                tours
            }
        });
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message
        });
    }
};

exports.getTour = async (req, res) => {
    try {
        // Todo: Same as Tour.findOne({ _id: req.params.id});
        const tour = await Tour.findById(req.params.id);
        res.status(200).json({
            status: 'success',
            data: {
                tour
            }
        });
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error
        });
    }
};

exports.createTour = async (req, res) => {
    // ! Actually we can write like this but there is a better way in below Tour.create({}) === const newTour = new Tour({}).save()
    // const newTour = new Tour({});
    // newTour.save();
    // Tour.create({}).then()               // ! ve bu funksiyalar PROMISE qaytardiqi ucun biz createTour funksiyasinin Async yazmaliyiq

    try {
        const newTour = await Tour.create(req.body);
        res.
            status(201)
            .json({
                status: "success",
                data: {
                    tour: newTour
                }
            });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            // message: error
            message: 'Invalid data send!'
        });
    }
};

exports.updateTour = async (req, res) => {
    try {
        const updatedTour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        res
            .status(200)
            .json({
                status: 'success',
                data: {
                    updatedTour
                }
            });
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error
        });
    }
};

exports.deleteTour = async (req, res) => {
    try {
        await Tour.findByIdAndDelete(req.params.id);
        res
            .status(204)
            .json({
                status: 'success',
                message: null
            })
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error
        });
    }
};

