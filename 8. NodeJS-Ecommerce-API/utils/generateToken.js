import jwt from "jsonwebtoken";

// * JWT.IO allows you to decode, verify and generate JWT.
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_KEY, { expiresIn: "3d"});
};

export default generateToken;