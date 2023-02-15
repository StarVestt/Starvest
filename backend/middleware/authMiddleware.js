const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken")
const Profile = require("../model/profileModel")

const authHandler = asyncHandler(async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await Profile.findById(decoded._id).select("-password")

            next();
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error("Not Authorized, token not valid");
        }
    }

    if (!token) {
        res.status(401)
        throw new Error("Not Authorized, token undefined");
    }
})

module.exports = authHandler