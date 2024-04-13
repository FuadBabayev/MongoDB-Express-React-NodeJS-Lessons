const Tour = require('./../models/tourModel');

exports.getAllTours = async (req, res) => {
    try {
        const tours = await Tour.find();
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

