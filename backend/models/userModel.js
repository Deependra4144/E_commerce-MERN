import mongoose from "mongoose";
import validator from "validator"
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import crypto from 'crypto'
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'name is required'],
            trim: true,
            maxLength: [30, 'name can note exceed 30 characters'],
            minLength: [4, 'name should have 5 characters']
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            validate: [validator.isEmail, 'Please enter a valid email address']
        },
        password: {
            type: String,
            required: [true, 'password is required'],
            minLength: [4, 'password should be greater then 4 character'],
            select: false
        },
        phone: {
            type: Number,
            required: [true, 'phone number is required'],
            match: [/^\d{10}$/, 'Phone number must be 10 digits']
        },
        avatar: {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            },
        },
        role: {
            type: String,
            default: "user"
        },
        resetPasswordToken: String,
        resetPasswordExpire: Date,


    }, { timestamps: true })

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.getJWTToken = function () {
    return jwt.sign({
        id: this._id
    }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    })
}

//compare password
userSchema.methods.comparePassword = async function (enterPassword) {

    return await bcrypt.compare(enterPassword, this.password)
}

//genrating password reset token
userSchema.methods.getResetPasswordToken = function () {
    // genrating token
    const resetToken = crypto.randomBytes(20).toString("hex")

    // Hashing and adding resetPasswordToken to userSchema
    this.resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");
    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    return resetToken;
}

export const User = mongoose.model('User', userSchema)