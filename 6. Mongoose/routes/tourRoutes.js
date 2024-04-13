const express = require('express');
const router = express.Router();
const tourController = require('./../controller/tourController');
// const { getAllTours } = require('./../controller/1. filtering');
// const { getAllTours } = require('./../controller/2. sorting');
// const { getAllTours } = require('./../controller/3. limiting');
// const { getAllTours } = require('./../controller/4. pagination');
const { getAllTours, aliasTopTours } = require('../controller/betterTourController');

router
    .route('/top-5-cheap')
    .get(aliasTopTours, getAllTours);                  // ! We add aliasTopTours Middleware before getAllTours cunki birinci Middlewareni isletsin sonra digerini

router
    .route('/')
    // .get(tourController.getAllTours)
    .post(tourController.createTour)
    .get(getAllTours);                          // ! Comes form Filtering, Sorting, Limiting, Paginating
router
    .route('/:id')
    .get(tourController.getTour)
    .patch(tourController.updateTour)
    .delete(tourController.deleteTour);

module.exports = router;