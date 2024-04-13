import asyncHandler from "express-async-handler";
import Coupon from "../model/Coupon.js";

// * @desc            Create new Coupon
// * @route           POST /api/v1/coupons
// * @access          Private/Admin
export const createCouponCtrl = asyncHandler(async (req, res) => {
    const { code, startDate, endDate, discount } = req.body;
    //check if admin
    //check if coupon already exists
    const couponsExists = await Coupon.findOne({ code });
    if (couponsExists) throw new Error("Coupon already exists");
    //check if discount is a number
    if (isNaN(discount)) throw new Error("Discount value must be a number");
    //create coupon
    const coupon = await Coupon.create({
        code: code?.trim().toUpperCase(),
        startDate,
        endDate,
        discount,
        user: req.userAuthId,
    });
    //send the response
    res.status(201).json({
        status: "success",
        message: "Coupon created successfully",
        coupon,
    });
});


// * @desc            Get all Coupons
// * @route           GET /api/v1/coupons
// * @access          Public
export const getCouponsCtrl = asyncHandler(async (req, res) => {
    const coupons = await Coupon.find();
    res.json({
        status: "succes",
        message: "Coupons fetched succesfully",
        coupons,
    });
});

// * @desc            Get Single Coupon
// * @route           GET /api/v1/coupons/:id
// * @access          Public
export const getCouponCtrl = asyncHandler(async (req, res) => {
    const coupon = await Coupon.findById(req.params.id);
    res.json({
        status: "succes",
        message: "Coupon fetched succesfully",
        coupon,
    });
});


// * @desc            Update Coupon 
// * @route           PUT /api/v1/coupon/update/:id
// * @access          Private/Admin
export const updateCouponCtrl = asyncHandler(async (req, res) => {
    const { code, startDate, endDate, discount } = req.body;
    const updatedCoupon = await Coupon.findByIdAndUpdate(req.params.id, {
        code: code?.trim().toUpperCase(),
        discount,
        startDate,
        endDate,
    }, { new: true });
    res.json({
        status: "success",
        mesage: "Coupon Updated",
        updatedCoupon,
    });
});


// * @desc            Delete Coupon
// * @route           DELETE /api/v1/coupon/:id
// * @access          Private/Admin
export const deleteCouponCtrl = asyncHandler(async (req, res) => {
    await Coupon.findByIdAndDelete(req.params.id);
    res.json({
        status: "success",
        message: "Coupon deleted succesfully",
    });
});