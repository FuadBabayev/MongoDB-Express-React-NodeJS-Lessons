import asyncHandler from "express-async-handler";
import Product from "../model/Product.js";
import Category from "../model/Category.js";
import Brand from "../model/Brand.js";


// * @desc            Create new Products
// * @route           POST /api/v1/products
// * @access          Private/Admin
export const createProductCtrl = asyncHandler(async (req, res) => {
    // Comes from Cloudinary
    const convetedImages = req.files.map((file) => file.path);

    const { name, description, brand, category, sizes, colors, price, totalQty } = req.body;
    // Product Exists
    const productExists = await Product.findOne({ name });
    if (productExists) throw new Error('Product already exists');

    // Find the category
    const categoryFound = await Category.findOne({ name: category?.trim().toLowerCase() });
    if (!categoryFound) throw new Error("Category not Found, Please create category first or check category name");

    // Find the Brand
    const brandFound = await Brand.findOne({ name: brand?.trim().toLowerCase() });
    if (!brandFound) throw new Error("Brand not Found, Please create brand first or check brand name");

    // Create product
    const product = await Product.create({
        name,
        description,
        brand,
        category,
        sizes,
        colors,
        user: req.userAuthId,
        price,
        totalQty,
        images: convetedImages,
    });

    // Push the product into category, brand
    categoryFound.products.push(product._id);
    brandFound.products.push(product._id);

    // resave
    await categoryFound.save();
    await brandFound.save();

    // Send response
    res.json({
        status: "success",
        message: "Product created succesfully",
        product,
    });
});


// * @desc            Get all Products
// * @route           GET /api/v1/products
// * @access          Public
export const getProductsCtrl = asyncHandler(async (req, res) => {
    // query string
    let productQuery = Product.find();

    // Filtering
    if (req.query.name) productQuery = productQuery.find({ name: { $regex: req.query.name, $options: "i" } });                      // By Name
    if (req.query.brand) productQuery = productQuery.find({ brand: { $regex: req.query.brand, $options: "i" } });                   // By Brand
    if (req.query.category) productQuery = productQuery.find({ category: { $regex: req.query.category, $options: "i" } });          // By Category
    if (req.query.color) productQuery = productQuery.find({ colors: { $regex: req.query.color, $options: "i" } });                  // By Color
    if (req.query.size) productQuery = productQuery.find({ sizes: { $regex: req.query.size, $options: "i" } });                     // By Size

    // Advanced Filtering by Price
    if (req.query.price) {
        const priceRange = req.query.price.split('-');
        productQuery = productQuery.find({ price: { $gte: priceRange[0], $lte: priceRange[1] } });
    };

    // Pagination
    const page = parseInt(req.query.page) ? parseInt(req.query.page) : 1;
    const limit = parseInt(req.query.limit) ? parseInt(req.query.limit) : 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Product.countDocuments();
    productQuery = productQuery.skip(startIndex).limit(limit);
    let pagination = {};
    if (endIndex < total) {
        pagination.next = {
            page: page + 1,
            limit,
        };
    };
    if (startIndex > 0) {
        pagination.prev = {
            page: page - 1,
            limit,
        };
    };

    // await query
    const products = await productQuery.populate('reviews');

    res.json({
        status: "succes",
        total,
        results: products.length,
        pagination,
        message: "Products fetched succesfully",
        products,
    });
});


// * @desc            Get single Product
// * @route           GET /api/v1/products/:id
// * @access          Public
export const getProductCtrl = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id).populate('reviews');
    if (!product) throw new Error("Product not Found!");
    res.json({
        status: "success",
        message: "Product fetched succesfully",
        product,
    });
});


// * @desc            Update Product
// * @route           PUT /api/v1/products/:id
// * @access          Private/Admin
export const updateProductCtrl = asyncHandler(async (req, res) => {
    const { name, description, brand, category, sizes, colors, price, totalQty } = req.body;
    const product = await Product.findByIdAndUpdate(req.params.id, { name, description, brand, category, sizes, colors, price, totalQty }, { new: true });
    res.json({
        status: "success",
        message: "Product updated succesfully",
        product,
    });
});


// * @desc            Delete Product
// * @route           DELETE /api/v1/products/:id
// * @access          Private/Admin
export const deleteProductCtrl = asyncHandler(async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.json({
        status: "success",
        message: "Product deleted succesfully",
    });
});