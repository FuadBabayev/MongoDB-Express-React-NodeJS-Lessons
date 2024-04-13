import asyncHandler from "express-async-handler";
import Category from "../model/Category.js";

// * @desc            Create new Category
// * @route           POST /api/v1/categories
// * @access          Private/Admin
export const createCategoryCtrl = asyncHandler(async (req, res) => {
    const { name } = req.body;

    // Category Exists
    const categoryExists = await Category.findOne({ name });
    if (categoryExists) throw new Error('Category already exists');

    // Create Category
    const category = await Category.create({
        name: name.trim().toLowerCase(),
        user: req.userAuthId,
        image: req.file.path,
    });

    // Push the product into category
    // Send response
    res.json({
        status: "success",
        message: "Category created succesfully",
        category,
    });
});


// * @desc            Get all Categories
// * @route           GET /api/v1/categories
// * @access          Public
export const getCategoriesCtrl = asyncHandler(async (req, res) => {
    const categories = await Category.find();
    res.json({
        status: "succes",
        message: "Categories fetched succesfully",
        categories,
    });
});


// * @desc            Get single Category
// * @route           GET /api/v1/categories/:id
// * @access          Public
export const getCategoryCtrl = asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);
    res.json({
        status: "success",
        message: "Category fetched succesfully",
        category,
    });
});


// * @desc            Update Category
// * @route           PUT /api/v1/categories/:id
// * @access          Private/Admin
export const updateCategoryCtrl = asyncHandler(async (req, res) => {
    const { name } = req.body;
    const category = await Category.findByIdAndUpdate(req.params.id, { name }, { new: true });
    res.json({
        status: "success",
        message: "Category updated succesfully",
        category,
    });
});


// * @desc            Delete Category
// * @route           DELETE /api/v1/categories/:id
// * @access          Private/Admin
export const deleteCategoryCtrl = asyncHandler(async (req, res) => {
    await Category.findByIdAndDelete(req.params.id);
    res.json({
        status: "success",
        message: "Category deleted succesfully",
    });
});