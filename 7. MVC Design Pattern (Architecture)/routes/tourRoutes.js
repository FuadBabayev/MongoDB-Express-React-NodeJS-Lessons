const express = require('express');
const router = express.Router();
const tourController = require('./../controller/tourController');
const { getAllTours } = require('./../controller/betterTourController');

router
    .route('/')
    // .get(tourController.getAllTours)
    .get(getAllTours)
    .post(tourController.createTour);
router
    .route('/:id')
    .get(tourController.getTour)
    .patch(tourController.updateTour)
    .delete(tourController.deleteTour);

module.exports = router;