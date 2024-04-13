const express = require('express');
const router = express.Router();
const tourController = require('./../controller/tourController');


// ! Completely same as app.use() but it has 4 params (extra with value)
// * Middleware router.param() only works if there is and id
router.param('id', tourController.checkID);
// router.param('', tourController.checkBody); // ! bu cur yazilis mumkun olmadiqi ucun cunki hem getAll-a aid olacaq hemde post-a onuncun router.post()-a yazdiq

// tourController.checkID = (request, response, next, value) => {
//     console.log(`Tour id is ${value}`);
//     next();
// }

router
    .route('/')
    .get(tourController.getAllTours)
    .post(tourController.checkBody, tourController.createTour);
router
    .route('/:id')
    .get(tourController.getTour)
    .patch(tourController.updateTour)
    .delete(tourController.deleteTour);

module.exports = router;