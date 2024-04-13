import cloudinaryPackage from "cloudinary";
import dotenv from "dotenv";
dotenv.config();
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
// const cloudinary = require("cloudinary").v2;
const cloudinary = cloudinaryPackage.v2;

//configure cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET_KEY,
});


// Create storage engine for Multer
const storage = new CloudinaryStorage({
    cloudinary,
    allowedFormats: ["jpg", "png"],
    params: {
        folder: "blog-api",
    },
});

// Init Multer with the storage engine
const upload = multer({ storage: storage });

export default upload;











