const Tour = require('../models/tourModel');

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
        // * page=3&limit=10 === query.skip(20).limit(10),           ==>             1-10 = page1, 11-20 = page2, 21-30 = page3
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        query = query.skip(skip).limit(limit);
        // Todo     http://127.0.0.1:3000/api/v1/tours?page=3&limit=3       =>       7ci elemetnden basliyacaq           1-3 = page1, 4-6 = page2, 7-9 = page3 
        // Todo     http://127.0.0.1:3000/api/v1/tours?page=4&limit=3       =>       Hecne gostermeyecek          1-3 = page1, 4-6 = page2, .... 10-12 = page4
        if (req.query.page) {
            const numTours = await Tour.countDocuments();                           // ! Hazir metoddur ve database-de olan butun datalarin length-ini verir
            if (skip >= numTours) throw new Error('This page does not exist!');     // ! TryCatch blokun olduqu ucun ERROR goren kimi catch-a dusecek
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

