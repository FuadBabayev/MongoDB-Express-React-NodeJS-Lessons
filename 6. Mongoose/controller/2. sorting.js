const Tour = require('./../models/tourModel');

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
        if (req.query.sort) {                                                         // ! Link yerinde Sort varsa eger 
            const sortBy = req.query.sort.split(',').join(' ');                       // * Priceler eyni olanda duration-a gore sort edir
            query = query.sort(sortBy);                                               // ! Hazir metoddur
            // Todo: http://127.0.0.1:3000/api/v1/tours?sort=price,duration           Ascending  Order (First sort by price then duration)
            // Todo: http://127.0.0.1:3000/api/v1/tours?sort=-price,duration          Descending Order Price, Ascending Orde Duration
        } else {                                                                      // ! Default yeni Link yerinde Sort olmasa avtomatik Time gore sort etsin
            query = query.sort('-createdAt');                                         // ! Axirinci daxil edilen deyer en irelide olur
        }
        // ! EXECUTE QUERY
        const tours = await query;

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
            message: error
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

