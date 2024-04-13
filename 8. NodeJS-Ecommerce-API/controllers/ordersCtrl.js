import dotenv from "dotenv";
dotenv.config();
import asyncHandler from "express-async-handler";
import Stripe from "stripe";
import Order from "../model/Order.js";
import User from "../model/User.js";
import Product from "../model/Product.js";
import Coupon from "../model/Coupon.js";



// Stripe instance
const stripe = new Stripe(process.env.STRIPE_KEY);


// * @desc            Create new Order
// * @route           POST /api/v1/orders
// * @access          Private
export const createOrderCtrl = asyncHandler(async (req, res) => {
    // Get the Coupon
    const { coupon } = req?.query;
    const couponFound = await Coupon.findOne({
        code: coupon?.trim().toUpperCase()
    });
    if (couponFound?.isExpired) throw new Error("Coupon has expired");
    if (!couponFound) throw new Error("Coupon does not Exits");
    // Get Discount
    const discount = couponFound?.discount / 100;

    // Get the payload (customer, orderItems, shippingAddress, totalPrice);
    const { orderItems, shippingAddress, totalPrice } = req.body;

    // Find the User
    const user = await User.findById(req.userAuthId);
    // Check if user has shipping address
    if (!user?.hasShippingAddress) throw new Error("Please provide shipping address");

    // Check if order is not empty
    if (orderItems?.length <= 0) throw new Error("No order items");

    // Place/create order -> save into DataBase
    const order = await Order.create({
        user: user?._id,
        orderItems,
        shippingAddress,
        totalPrice: couponFound ? totalPrice - (totalPrice * discount) : totalPrice,
    });
    // Update the product quantity
    const products = await Product.find({ _id: { $in: orderItems } });
    orderItems?.map(async (order) => {
        const product = products?.find((product) => {
            return product?._id?.toString() === order?._id?.toString();
        });
        if (product) product.totalSold += order.qty;
        await product.save();
    });

    // push order into user and resave
    user.orders.push(order?._id);
    await user.save();

    // make payment (stripe)
    // convert order items to have same structure that stripe need
    const comvertedOrders = orderItems.map((item) => {
        return {
            price_data: {
                currency: "usd",
                product_data: {
                    name: item?.name,
                    description: item?.description,
                },
                unit_amount: item?.price * 100,
            },
            quantity: item?.qty,
        };
    });
    const session = await stripe.checkout.sessions.create({
        line_items: comvertedOrders,
        metadata: {
            orderId: JSON.stringify(order?._id),
        },
        mode: "payment",
        success_url: 'http://localhost:3000/success',
        cancel_url: 'http://localhost:3000/cancel',
    });
    res.send({ url: session.url });
    // Payment webhook
    // Update the user order 
    // res.json({
    //     success: true,
    //     message: "Order created succesfully",
    //     order,
    //     user,
    // });
});


// * @desc            Get all Orders
// * @route           GET /api/v1/orders
// * @access          Private
export const getOrdersCtrl = asyncHandler(async (req, res) => {
    // Find all Orders  
    const orders = await Order.find();
    res.json({
        succes: true,
        mesage: "All orders",
        orders,
    });
});


// * @desc            Get single Order
// * @route           GET /api/v1/orders/:id
// * @access          Private/Admin
export const getOrderCtrl = asyncHandler(async (req, res) => {
    // Find Single Orders  
    const order = await Order.findById(req.params.id);
    res.status(200).json({
        succes: true,
        mesage: "Single order",
        order,
    });
});


// * @desc            Update Order to delivered
// * @route           PUT /api/v1/orders/update/:id
// * @access          Private/Admin
export const updateOrderCtrl = asyncHandler(async (req, res) => {
    // Find Single Orders  
    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {
        status: req.body.status,
    }, { new: true });
    res.status(200).json({
        succes: true,
        mesage: "Order Updated",
        updatedOrder,
    });
});


// * @desc            Get sales sum of orders
// * @route           GET /api/v1/orders/sales/sum
// * @access          Private/Admin
export const getOrderStatisticsCtrl = asyncHandler(async (req, res) => {
    // Get order statistics
    const orders = await Order.aggregate([
        {
            $group: {
                _id: null,
                totalSales: {
                    $sum: "$totalPrice",
                },
                minimumSales: {
                    $min: "$totalPrice",
                },
                maximumSales: {
                    $max: "$totalPrice",
                },
                averageSales: {
                    $avg: "$totalPrice",
                },
            },
        },
    ]);

    // Get Date
    const date = new Date();
    const today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const saleToday = await Order.aggregate([
        {
            $match: {
                createdAt: {
                    $gte: today,
                },
            },
        },
        {
            $group: {
                _id: null,
                totalSales: {
                    $sum: "totalPrice",
                },
            },
        },
    ]);

    // Send response
    res.status(200).json({
        succes: true,
        mesage: "Sum of orders",
        orders,
        saleToday,
    });
});