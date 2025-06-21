import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/userModel.js";
import sendToken from "../utils/jwtToken.js";
import { sendEmail } from "../utils/sendEmail.js"
import crypto from "crypto"

//Register User
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, phone, password, role } = req.body;

    let existedUser = await User.findOne({ email })
    // console.log('yes')
    if (existedUser) {
        throw new ApiError(400, 'user allready exist !!')
    }

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

const logOutUser = asyncHandler(async (_, res) => {

    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json(
        new ApiResponse(200, {}, 'user logout successfully !!')
    )
})

// forget password
const forgetPassword = asyncHandler(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        throw new ApiError(404, 'user not found')
    }

    // get resetPassword token
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });
    console.log(user.resetPasswordToken)

    const resetPasswordURL = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`

    const message = `your password resetToken is :- \n\n ${resetPasswordURL} \n\n if you have not requested this email then please ignore it`

    try {
        await sendEmail({
            email: user.email,
            subject: 'E-commerce password recovery',
            message: message
        })

        res.status(200).json(
            new ApiResponse(200, {}, `Email sent to ${user.email} successfully !!`)
        )
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });
        return next(new ApiError(500, error.message))
    }
})

const resetPassword = asyncHandler(async (req, res) => {

    // creating token hash
    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex")
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    })

    if (!user) {
        throw new ApiError(404, "resetPassword Token is invalid or has been expired")
    }

    if (req.body.password !== req.body.confirmPassword) {
        throw new ApiError(400, 'confirm password dos not match')
    }

    user.password = req.body.password
    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined

    await user.save();
    sendToken(user, 200, res)
})

const getUserDetails = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id);

    res.status(200).json(
        new ApiResponse(
            200,
            user,
            "user details fatched are successfully !!"
        )
    )
})

// updatePassword
const updatePassword = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id).select("+password");

    const isPasswordMatch = await user.comparePassword(req.body.oldPassword);

    if (!isPasswordMatch) {
        throw new ApiError(404, 'old password is incorrect')
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
        throw new ApiError(401, 'confirm password dose not match')
    }

    user.password = req.body.newPassword;
    await user.save()

    sendToken(user, 200, res)



    res.status(200).json(
        new ApiResponse(
            200,
            user,
            "password update successfully !!"
        )
    )
})

//updateProfile
const updateProfile = asyncHandler(async (req, res) => {

    const newUserData = {
        name: req.body.name,
        email: req.body.email
    }

    // we will add cloudinary later

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    res.status(200).json(
        new ApiResponse(
            200,
            user,
            "user update successfully !!"
        )
    )
})

// getAllUser (Admin)

const getAllUser = asyncHandler(async (req, res) => {
    const users = await User.find()
    console.log(users)
    res.status(200).json(
        new ApiResponse(
            200,
            users,
            'all users fatched successfully'
        )
    )
})

// get sigle user (Admin)
const sigleUserDetails = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)

    if (!user) {
        throw new ApiError(404, `User dose not exist with Id : ${req.params.id}`)
    }
    res.status(200).json(
        new ApiResponse(
            200,
            user,
            `user ${user.name} fatched successfully`
        )
    )
})

//update User Role
const updateUserRole = asyncHandler(async (req, res) => {

    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    }

    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    res.status(200).json(
        new ApiResponse(
            200,
            user,
            "user update successfully !!"
        )
    )
})

// delete user by admin 
const deleteUser = asyncHandler(async (req, res) => {
    let user = await User.findById(req.params.id)

    if (!user) {
        throw new ApiError(404, `user dose note exist with this id ${req.params.id}`)
    }

    await User.findByIdAndDelete(user.id)

    res.status(200).json(
        new ApiResponse(
            200,
            {},
            'user delete successfully !!'
        )
    )

})

export {
    registerUser,
    loginUser,
    logOutUser,
    forgetPassword,
    resetPassword,
    getUserDetails,
    updatePassword,
    updateProfile,
    getAllUser,
    sigleUserDetails,
    updateUserRole,
    deleteUser
}