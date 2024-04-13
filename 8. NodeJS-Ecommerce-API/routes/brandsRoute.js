import express from 'express';
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import { createBrandCtrl, deleteBrandCtrl, getBrandsCtrl, getBrandCtrl, updateBrandCtrl } from '../controllers/brandsCtrl.js';
import isAdmin from '../middlewares/isAdmin.js';

const brandsRoutes = express.Router();

brandsRoutes.post('/', isLoggedIn, isAdmin, createBrandCtrl);
brandsRoutes.get('/', getBrandsCtrl);
brandsRoutes.get('/:id', getBrandCtrl);
brandsRoutes.put('/:id', isLoggedIn, isAdmin, updateBrandCtrl);
brandsRoutes.delete('/:id', isLoggedIn, isAdmin, deleteBrandCtrl);

export default brandsRoutes;