import express from 'express';
import { createReviewCtrl } from '../controllers/reviewsCtrl.js';
import { isLoggedIn } from "../middlewares/isLoggedIn.js";

const reviewRoutes = express.Router();

reviewRoutes.post('/:productID', isLoggedIn, createReviewCtrl);

export default reviewRoutes;