const Tour = require('./../models/tourModel');

exports.getAllTours = async (req, res) => {
    try {
        // ! Query String http://127.0.0.1:3000/api/v1/tours?duration=7&maxGroupSize=15 buradaki ? isaresinden sonraki butun datalari getirir
        // console.log(req.query);                         // Todo: { duration: '7', maxGroupSize: '15' }

        // ? BUILDING QUERY
        // ? 1. Filtering
        const queryObj = { ...req.query };                         // * Copy etmeliyik Tour.find()-e gonderende temizlenmisi lazimdi ama ORIGINAL variant qorunmalidir
        const excludedFields = ['page', 'sort', 'limit', 'fields'];
        // ! Bunlari ona gore yazdiqki query Stringde goturmesin cunki qarisdiracaq http://127.0.0.1:3000/api/v1/tours?duration=7&page=15 burada page lazim deyil
        excludedFields.forEach(element => delete queryObj[element]);    // Todo: Delete ['page', 'sort', 'limit', 'fields'] in  Query string (qarisdirmamaq ucun)
        // console.log(req.query, queryObj);            //  http://127.0.0.1:3000/api/v1/tours?duration=5&difficulty=easy&page=2&limit=no%20limit
        // req.query => { duration: '5', difficulty: 'easy', page: '2', limit: 'no limit' },   queryObj => { duration: '5', difficulty: 'easy' }


        // ? 2. Advanced Filtering
        // Todo: http://127.0.0.1:3000/api/v1/tours?duration[lt]=5 biz eslinde bu linki yazanda  { duration: {$lt: 5} } bunu almaliyiq ama uzun prosesden sonra
        // console.log(req.query);    // { duration: { lte: '5' } } and we must convert it into { duration: {$lt: 5} }  and also all (gt, lt, gte, lte)
        let queryStr = JSON.stringify(queryObj);    // console.log(queryStr);                     // ! { duration: { lte: '5' } 
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);                // ! it will add $ into all gt,gte,lt,lte with `$${match}`
        // console.log(JSON.parse(queryStr));                                                     // ! { duration: { '$lte': '5' } }


        // Todo: Best way of writing a Query
        // const tours = await Tour.find(queryObj); // ! If we write like that there is no way to implement other features like sorting, limiting, paging
        const query = Tour.find(JSON.parse(queryStr));

        // ? EXECUTING QUERY
        const tours = await query;
        // Todo: First way of writing a Query
        // const tours = await Tour.find({
        //     duration: 5,
        //     difficulty: "easy"
        // });
        // Todo: Second way of writing a Query 
        // const tours = await Tour.find()                                      
        //     .where("duration")
        //     .lte(5)
        //     .where("difficulty")
        //     .equals("easy");

        // ? SEND RESPONSE
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

