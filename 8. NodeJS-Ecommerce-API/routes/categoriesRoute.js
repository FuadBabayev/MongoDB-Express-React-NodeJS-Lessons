import express from 'express';
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import { createCategoryCtrl, deleteCategoryCtrl, getCategoriesCtrl, getCategoryCtrl, updateCategoryCtrl } from '../controllers/categoriesCtrl.js';
import categoryFileUpload from '../config/categoryUpload.js';

const categoriesRoutes = express.Router();

categoriesRoutes.post('/', isLoggedIn, categoryFileUpload.single("file"), createCategoryCtrl);
categoriesRoutes.get('/', getCategoriesCtrl);
categoriesRoutes.get('/:id', getCategoryCtrl);
categoriesRoutes.put('/:id', isLoggedIn, updateCategoryCtrl);
categoriesRoutes.delete('/:id', isLoggedIn, deleteCategoryCtrl);

export default categoriesRoutes;