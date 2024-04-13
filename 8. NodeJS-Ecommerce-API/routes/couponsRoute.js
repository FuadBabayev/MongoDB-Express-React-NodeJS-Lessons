import express from 'express';
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import { createCouponCtrl, deleteCouponCtrl, getCouponCtrl, getCouponsCtrl, updateCouponCtrl } from '../controllers/couponsCtrl.js';
import isAdmin from '../middlewares/isAdmin.js';

const couponsRoutes = express.Router();

couponsRoutes.post('/', isLoggedIn, isAdmin, createCouponCtrl);
couponsRoutes.get('/', getCouponsCtrl);
couponsRoutes.get('/:id', getCouponCtrl);
couponsRoutes.put('/update/:id', isLoggedIn, isAdmin, updateCouponCtrl);
couponsRoutes.delete('/delete/:id', isLoggedIn, isAdmin, deleteCouponCtrl);
export default couponsRoutes;