// ! 1. Create Model
import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    fullname: String
});
const User = mongoose.model('User', UserSchema);
export default User;


// ! 2. Create Controller
import User from "./../model/User.js";
export const registerUserCtrl = async (req, res) => {
    const { fullname, email, password } = req.body;
    const user = await User.create({
        fullname,
        email,
        password,
    });
    res.status(201).json({
        status: "success",
        message: "User registered succesfully",
        data: user,
    });
};


// ! 3. Create Route
import express from 'express';
const userRoutes = express.Router();
import { registerUserCtrl } from '../controllers/usersCtrl.js';
userRoutes.post('/api/v1/users/register', registerUserCtrl);
export default userRoutes;


// ! 4. Create App
import express from "express";
import userRoutes from "../routes/usersRoute.js";
const app = express();
app.use(express.json());
app.use('/', userRoutes);
export default app;


// ! 5. Create Server
import http from 'http';
import app from './app/app.js';
const server = http.createServer(app);
server.listen(8000, console.log(`Server is up and running on port 8000`));
