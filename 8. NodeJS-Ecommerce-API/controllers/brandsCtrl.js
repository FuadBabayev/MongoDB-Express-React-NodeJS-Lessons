import asyncHandler from "express-async-handler";
import Brand from "../model/Brand.js";

// * @desc            Create new Brand
// * @route           POST /api/v1/brands
// * @access          Private/Admin
export const createBrandCtrl = asyncHandler(async (req, res) => {
    const { name } = req.body;

    // Brand Exists
    const brandExists = await Brand.findOne({ name });
    if (brandExists) throw new Error('Brand already exists');

    // Create Brand
    const brand = await Brand.create({
        name: name.trim().toLowerCase(),
        user: req.userAuthId,
    });

    // Send response
    res.json({
        status: "success",
        message: "Brand created succesfully",
        brand,
    });
});


// * @desc            Get all Brands
// * @route           GET /api/v1/brands
// * @access          Public
export const getBrandsCtrl = asyncHandler(async (req, res) => {
    const brands = await Brand.find();
    res.json({
        status: "succes",
        message: "Brands fetched succesfully",
        brands,
    });
});


// * @desc            Get single Brand
// * @route           GET /api/v1/brands/:id
// * @access          Public
export const getBrandCtrl = asyncHandler(async (req, res) => {
    const brand = await Brand.findById(req.params.id);
    res.json({
        status: "success",
        message: "Brand fetched succesfully",
        brand,
    });
});


// * @desc            Update Brand
// * @route           PUT /api/v1/brands/:id
// * @access          Private/Admin
export const updateBrandCtrl = asyncHandler(async (req, res) => {
    const { name } = req.body;
    const brand = await Brand.findByIdAndUpdate(req.params.id, { name }, { new: true });
    res.json({
        status: "success",
        message: "Brand updated succesfully",
        brand,
    });
});


// * @desc            Delete Brand
// * @route           DELETE /api/v1/brands/:id
// * @access          Private/Admin
export const deleteBrandCtrl = asyncHandler(async (req, res) => {
    await Brand.findByIdAndDelete(req.params.id);
    res.json({
        status: "success",
        message: "Brand deleted succesfully",
    });
});