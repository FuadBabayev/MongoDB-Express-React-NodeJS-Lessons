import express from 'express';
import upload from '../config/fileUpload.js';
import { createProductCtrl, getProductsCtrl, getProductCtrl, updateProductCtrl, deleteProductCtrl } from '../controllers/productsCtrl.js';
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import isAdmin from '../middlewares/isAdmin.js';

const productsRoutes = express.Router();

productsRoutes.post('/', isLoggedIn, isAdmin, upload.array("files"), createProductCtrl);
productsRoutes.get('/', getProductsCtrl);
productsRoutes.get('/:id', getProductCtrl)
productsRoutes.put('/:id', isLoggedIn, isAdmin, updateProductCtrl);
productsRoutes.delete('/:id', isLoggedIn, isAdmin, deleteProductCtrl);

export default productsRoutes;