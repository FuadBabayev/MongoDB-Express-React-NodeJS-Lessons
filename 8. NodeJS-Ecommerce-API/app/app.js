import dotenv from "dotenv";
import Stripe from "stripe";
dotenv.config();
import express from "express";
import path from "path";
import dbConnect from "../config/dbConnect.js";
import userRoutes from "../routes/usersRoute.js";
import productsRoutes from "../routes/productsRoute.js";
import { globalErrhandler, notFound } from "../middlewares/globalErrHandler.js";
import categoriesRoutes from "../routes/categoriesRoute.js";
import brandsRoutes from "../routes/brandsRoute.js";
import colorsRoutes from "../routes/colorsRoute.js";
import reviewRoutes from "../routes/reviewRoute.js";
import ordersRoutes from "../routes/ordersRoute.js";
import Order from "../model/Order.js";
import couponsRoutes from "../routes/couponsRoute.js";

// db Connect
dbConnect();
const app = express();


// Stripe webhook
const stripe = new Stripe(process.env.STRIPE_KEY);
// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = "whsec_b22c3d5bee6f5be910a8c8a846e8bc42fc3711f2296d10a0aab192919c46ebe1";
app.post('/webhook', express.raw({ type: 'application/json' }), async (request, response) => {
    const sig = request.headers['stripe-signature'];
    let event;
    try {
        event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
        console.log('EVENT: ');
    } catch (err) {
        console.log('ERROR: ', err.message);
        response.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }

    if (event.type === 'checkout.session.completed') {
        // update order
        const session = event.data.object;
        const { orderId } = session.metadata;
        const paymentStatus = session.payment_status;
        const paymentMethod = session.payment_method_types[0];
        const totalAmount = session.amount_total;
        const currency = session.currency;
        // Find order
        const order = await Order.findByIdAndUpdate(JSON.parse(orderId), {
            totalPrice: totalAmount / 100,
            currency,
            paymentMethod,
            paymentStatus,
        }, { new: true });
    }
    else return;

    // Handle the event
    // switch (event.type) {
    //     case 'payment_intent.succeeded':
    //         const paymentIntentSucceeded = event.data.object;
    //         // Then define and call a function to handle the event payment_intent.succeeded
    //         break;
    //     // ... handle other event types
    //     default:
    //         console.log(`Unhandled event type ${event.type}`);
    // }



    // Return a 200 response to acknowledge receipt of the event
    response.send();
});



// By default Express does not pass the incoming payload into our server
app.use(express.json());

// Server Static Files
app.use(express.static('public'));
// Home Route
app.use('/', (req, res) => {
    res.sendFile(path.join('public', 'index.html'));
});

// Routes
app.use('/api/v1/users/', userRoutes);
app.use('/api/v1/products/', productsRoutes);
app.use('/api/v1/categories/', categoriesRoutes);
app.use('/api/v1/brands/', brandsRoutes);
app.use('/api/v1/colors/', colorsRoutes);
app.use('/api/v1/reviews/', reviewRoutes);
app.use('/api/v1/orders/', ordersRoutes);
app.use('/api/v1/coupons/', couponsRoutes);

// Error middleware (Always below Routes)
app.use(notFound);              // If there is error it will send it into globalErrhandler
app.use(globalErrhandler);

export default app;