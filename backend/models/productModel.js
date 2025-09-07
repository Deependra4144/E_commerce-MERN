import mongoose from 'mongoose';

const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'please enter product name'],
            trim: true
        },
        description: {
            type: String,
            required: [true, 'please enter product description']
        },
        price: {
            type: Number,
            required: [true, 'please enter product price'],
            maxLength: [8, "price cannot exceed 8 characters"]
        },
        ratings: {
            type: Number,
            default: 0
        },
        images: [
            {
                type: String,
                required: true
            }
        ],
        category: {
            type: String,
            required: [true, 'please enter product category']
        },
        stock: {
            type: Number,
            required: [true, 'please enter product stock'],
            maxLength: [4, "stock cannot exceed 4 characters"],
            default: 1
        },
        numOfReviews: {
            type: Number,
            default: 0
        },
        reviews: [
            {
                user: {
                    type: mongoose.Schema.ObjectId,
                    ref: "User",
                    required: true
                },
                name: {
                    type: String,
                    required: true
                },
                rating: {
                    type: Number,
                    required: true
                },
                comment: {
                    type: String,
                    required: true
                }
            }

        ],
        user: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        }

    })

export const Product = mongoose.model("Product", productSchema);