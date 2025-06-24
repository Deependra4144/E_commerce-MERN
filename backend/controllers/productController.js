import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { Product } from '../models/productModel.js'
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiFeatures } from '../utils/ApiFeatures.js'

// create product --Admin
const createProduct = asyncHandler(async (req, res) => {
    req.body.user = req.user.id;
    const product = await Product.create(req.body);
    // console.log(product)
    if (!product) {
        throw new ApiError(400, 'product note create something went wrong')
    }
    res.status(201).json(
        new ApiResponse(200, product, "product added successfully !!")
    )
})

// update product --Admin
const updateProduct = asyncHandler(async (req, res) => {
    let product = await Product.findById(req.params.id)

    if (!product) {
        throw new ApiError(500, 'product not found')
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true, useFindAndModify: false })

    res.status(200).json(
        new ApiResponse(
            200,
            product,
            "product update successfully"
        )
    )

})

//getProducts
const getAllProducts = asyncHandler(async (req, res) => {

    let resultPerPage = 8;
    const productCount = await Product.countDocuments();
    const apiFeatures = new ApiFeatures(Product.find(), req.query)
        .search()
        .filter()
        .pagination(resultPerPage);
    // console.log('api', apiFeatures)
    const allProducts = await apiFeatures.query;

    // console.log('Number of products found:', allProducts.length);
    // console.log('Products:', allProducts);

    if (!allProducts) {
        throw ApiError(404, 'all product not get something went wrong')
    }

    res.status(200).json(
        new ApiResponse(200, { allProducts, productCount, resultPerPage }, "all product fetch successfully")
    )
})

//delete product
const deleteProduct = asyncHandler(async (req, res) => {
    const existedProduct = await Product.findById(req.params.id);

    if (!existedProduct) {
        throw new ApiError(404, 'product note found while product delete')
    }
    await existedProduct.deleteOne();

    res.status(200).json(
        new ApiResponse(
            200,
            {},
            'product delete successfully !!'
        )
    )


})

const getProductDetails = asyncHandler(async (req, res) => {
    let product = await Product.findById(req.params.id)

    if (!product) {
        throw new ApiError(404, 'product details not found')
    }

    res.status(200).json(
        new ApiResponse(200,
            product,
            'get product details found successfully'
        )
    )
})

// create new review or update the review
const createProductReview = asyncHandler(async (req, res) => {
    const { rating, comment, productId } = req.body;
    // console.log('hello', rating, comment, productId);

    const product = await Product.findById(productId);
    if (!product) {
        throw new ApiError(404, `Product not found with this id: ${productId}`);
    }

    const review = {
        user: req.user.id,
        name: req.user.name,
        rating: Number(rating),
        comment,
        productId
    };

    const isReviewed = product.reviews.find(
        rev => rev.user?.toString() === req.user?.id?.toString()
    );

    if (isReviewed) {
        product.reviews.forEach(rev => {
            if (rev.user?.toString() === req.user?.id?.toString()) {
                rev.rating = Number(rating);
                rev.comment = comment;
            }
        });
    } else {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
    }

    let avg = 0;
    product.reviews.forEach(rev => {
        avg += rev.rating;
    });
    product.ratings = avg / product.reviews.length;

    await product.save({ validateBeforeSave: false });

    res.status(200).json(
        new ApiResponse(200, {}, 'Your review was uploaded successfully!')
    );
});

// get All Reviews
const getAllReviews = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.productId)
    if (!product) {
        throw new ApiError(404, 'Product not found, Some thing went wrong while getAllReviews')
    }
    let allReviews = [...product.reviews]
    res.status(200).json(
        new ApiResponse(
            200,
            allReviews,
            'All reviews get successfully'
        )
    )
})

// delete reviews
const deleteReview = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.productId);

    if (!product) {
        throw new ApiError(404, 'Product not found')
    }

    console.log('Review ID to delete:', req.query.id)

    const reviews = product.reviews.filter((rev) => {
        return rev._id?.toString() !== req.query.id?.toString()
    })
    console.log('Reviews after filtering:', reviews)

    // Update the product with filtered reviews
    product.reviews = reviews;
    product.numOfReviews = reviews.length;

    // Recalculate average rating
    let avg = 0;
    if (reviews.length > 0) {
        reviews.forEach(rev => {
            avg += rev.rating;
        });
        product.ratings = avg / reviews.length;
    } else {
        product.ratings = 0;
    }

    // Save the updated product
    await product.save({ validateBeforeSave: false });

    res.status(200).json(
        new ApiResponse(
            200,
            {},
            "Review Delete Successfully !!"
        )
    )
})

export {
    createProduct,
    createProductReview,
    deleteProduct,
    deleteReview,
    getAllProducts,
    getProductDetails,
    getAllReviews,
    updateProduct,
}