import asyncHandler from "express-async-handler";
import Color from "../model/Color.js";

// * @desc            Create new Color
// * @route           POST /api/v1/colors
// * @access          Private/Admin
export const createColorCtrl = asyncHandler(async (req, res) => {
    const { name } = req.body;

    // Color Exists
    const colorExists = await Color.findOne({ name });
    if (colorExists) throw new Error('Color already exists');

    // Create Color
    const color = await Color.create({
        name: name.trim().toLowerCase(),
        user: req.userAuthId,
    });

    // Send response
    res.json({
        status: "success",
        message: "Color created succesfully",
        color,
    });
});


// * @desc            Get all Colors
// * @route           GET /api/v1/colors
// * @access          Public
export const getColorsCtrl = asyncHandler(async (req, res) => {
    const colors = await Color.find();
    res.json({
        status: "succes",
        message: "Colors fetched succesfully",
        colors,
    });
});


// * @desc            Get single Color
// * @route           GET /api/v1/colors/:id
// * @access          Public
export const getColorCtrl = asyncHandler(async (req, res) => {
    const color = await Color.findById(req.params.id);
    res.json({
        status: "success",
        message: "Color fetched succesfully",
        color,
    });
});


// * @desc            Update Color
// * @route           PUT /api/v1/colors/:id
// * @access          Private/Admin
export const updateColorCtrl = asyncHandler(async (req, res) => {
    const { name } = req.body;
    const color = await Color.findByIdAndUpdate(req.params.id, { name }, { new: true });
    res.json({
        status: "success",
        message: "Color updated succesfully",
        color,
    });
});


// * @desc            Delete Color
// * @route           DELETE /api/v1/colors/:id
// * @access          Private/Admin
export const deleteColorCtrl = asyncHandler(async (req, res) => {
    await Color.findByIdAndDelete(req.params.id);
    res.json({
        status: "success",
        message: "Color deleted succesfully",
    });
});