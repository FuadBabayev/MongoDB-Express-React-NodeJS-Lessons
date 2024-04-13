import express from 'express';
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import { createColorCtrl, deleteColorCtrl, getColorsCtrl, getColorCtrl, updateColorCtrl } from '../controllers/colorsCtrl.js';
import isAdmin from '../middlewares/isAdmin.js';

const colorsRoutes = express.Router();

colorsRoutes.post('/', isLoggedIn, isAdmin, createColorCtrl);
colorsRoutes.get('/', getColorsCtrl);
colorsRoutes.get('/:id', getColorCtrl);
colorsRoutes.put('/:id', isLoggedIn, isAdmin, updateColorCtrl);
colorsRoutes.delete('/:id', isLoggedIn, isAdmin, deleteColorCtrl);

export default colorsRoutes;