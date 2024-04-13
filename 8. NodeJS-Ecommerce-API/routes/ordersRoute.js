import express from 'express';
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import { createOrderCtrl, getOrderCtrl, getOrdersCtrl, getOrderStatisticsCtrl, updateOrderCtrl } from '../controllers/ordersCtrl.js';

const ordersRoutes = express.Router();

ordersRoutes.post('/', isLoggedIn, createOrderCtrl);
ordersRoutes.get('/', isLoggedIn, getOrdersCtrl);
ordersRoutes.get('/sales/statistics', isLoggedIn, getOrderStatisticsCtrl);
ordersRoutes.get('/:id', isLoggedIn, getOrderCtrl);
ordersRoutes.put('/update/:id', isLoggedIn, updateOrderCtrl);

export default ordersRoutes;