import asyncHandler from "express-async-handler";
import Review from "../model/Review.js";
import Product from "../model/Product.js";

// * @desc            Create new Review
// * @route           POST /api/v1/reviews
// * @access          Private/Admin
export const createReviewCtrl = asyncHandler(async (req, res) => {
    const { product, user, message, rating } = req.body;

    // Find the Product
    const { productID } = req.params;
    const productFound = await Product.findById(productID).populate('reviews');
    if (!productFound) throw new Error("Product not Found");

    // Check if user already reviewed this product
    const hasReviewed = productFound?.reviews?.find((review) => {
        return review?.user?.toString() === req?.userAuthId?.toString();
    });
    if(hasReviewed) throw new Error("You have already reviewed this product");

    // Create Review
    const review = await Review.create({
        message,
        rating,
        product: productFound?._id,
        user: req.userAuthId
    });

    // Push review into Product Found
    productFound.reviews.push(review?._id);

    // Resave
    await productFound.save();

    res.status(201).json({
        success: true,
        message: "Review created succesfully"
    });
});