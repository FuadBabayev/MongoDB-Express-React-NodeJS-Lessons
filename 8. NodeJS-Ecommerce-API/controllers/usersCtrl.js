import User from "./../model/User.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import { getTokenFromHeader } from "../utils/getTokenFromHeader.js";
import { verifyToken } from "../utils/verifyToken.js";


// * @desc            Register user
// * @route           POST /api/v1/users/register
// * @access          Private/Admin
export const registerUserCtrl = asyncHandler(async (req, res) => {
    const { fullname, email, password } = req.body;

    // Check User Exists
    const userExists = await User.findOne({ email });
    if (userExists) {
        throw new Error("User already exists");
    }

    // hash password (for converting your password into strong random password like: $2a$10$H3ZfUZiQWXDj5cjHY66g2eL8A94/.r/fRW79SiDx9Iracvr8GIFri)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the User
    const user = await User.create({
        fullname,
        email,
        password: hashedPassword,
    });

    // Show details
    res.status(201).json({
        status: "success",
        message: "User registered succesfully",
        data: user,
    });
});


// * @desc            Login user
// * @route           POST /api/v1/users/login
// * @access          Public
export const loginUserCtrl = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Find User from DataBase by email
    const userFindByEmail = await User.findOne({ email });
    const userFindByPassword = await bcrypt.compare(password, userFindByEmail?.password);    // (password, userFindByEmail && userFindByEmail.password);  
    if (userFindByEmail && userFindByPassword) {
        res.json({
            status: "success",
            message: "User logged in successfully",
            data: userFindByEmail,
            token: generateToken(userFindByEmail?._id),
        });
    } else {
        throw new Error("Invalid login credentials");
    }
});


// * @desc            Get user profile 
// * @route           GET /api/v1/users/profile
// * @access          Private
export const getUserProfileCtrl = asyncHandler(async (req, res) => {
    // const token = getTokenFromHeader(req);
    // const verified = verifyToken(token);
    // res.json({
    //     msg: "Welcome to Profile Page",
    // });

    const user = await User.findById(req.userAuthId).populate("orders");
    res.json({
        status: "success",
        message: "User Profile fetched succesfully",
        user,
    });
});


// * @desc            Update user shipping address 
// * @route           PUT /api/v1/users/update/shipping
// * @access          Private
export const updateShippingAddressCtrl = asyncHandler(async (req, res) => {
    const { firstName, lastName, address, city, postalCode, province, phone } = req.body;
    const user = await User.findByIdAndUpdate(req.userAuthId, {
        shippingAddress: {
            firstName,
            lastName,
            address,
            city,
            postalCode,
            province,
            phone,
        },
        hasShippingAddress: true
    }, { new: true });

    res.json({
        status: "success",
        message: "User shipping address updated successfully",
        user,
    });
});
