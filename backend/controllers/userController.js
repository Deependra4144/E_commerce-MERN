import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import sendToken from "../utils/jwtToken.js";

//Register User
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, phone, password, role } = req.body;

    if ([name, email, phone, password, role].some(v => !v)) {
        throw new ApiError(400, 'Invalid credentials');
    }

    const user = await User.create({
        name,
        email,
        phone,
        password,
        role,
        avatar: {
            public_id: 'this is sample id',
            url: 'profileURL'
        }
    });

    if (!user) {
        throw new ApiError(400, 'User not registered. Internal server error');
    }

    sendToken(user, 201, res)
});

const loginUser = asyncHandler(async (req, res) => {
    let { email, password } = await req.body

    if (!email || !password) {
        throw new ApiError(400, 'password or email is required')
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        throw new ApiError(401, 'invalid password or email')
    }

    const isPasswordMatch = await user.comparePassword(password);
    // console.log(isPasswordMatch)
    if (!isPasswordMatch) {
        throw new ApiError(401, 'invalid password or email')
    }

    sendToken(user, 200, res)
})


export {
    registerUser,
    loginUser
}