import { User } from "../models/userModel.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"


export const isAuthenticatedUser = asyncHandler(async (req, res, next) => {
    const { token } = req.cookies;
    // console.log(token)
    if (!token) {
        throw new ApiError(401, 'please login to access this resource')
    }
    const decodedData = jwt.verify(token, process.env.JWT_SECRET)
    // console.log(decodedData)
    let user = await User.findById(decodedData.id);
    // console.log('15', user)
    req.user = user;
    next();

})

export const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        // If user role is NOT included in the allowed roles, throw error
        // console.log(req.user)
        if (!roles.includes(req.user.role)) {
            return next(new ApiError(403, `Role: ${req.user.role} is not allowed to access this resource`));
        }

        // Role is authorized, proceed
        next();
    }
}
