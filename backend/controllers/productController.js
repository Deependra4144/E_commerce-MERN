import { ApiError } from '../../../You_tube/src/utils/ApiError.js';
import { asyncHandler } from '../../../You_tube/src/utils/asyncHandler.js';
import { Product } from '../models/productModel.js'
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiFeatures } from '../utils/ApiFeatures.js'

// create product --Admin
const createProduct = asyncHandler(async (req, res) => {
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

    let resutPerPage = 5;
    const productCount = await Product.countDocuments();
    const apiFeatures = new ApiFeatures(Product.find(), req.query)
        .search()
        .filter()
        .pagination(resutPerPage);
    // console.log('api', apiFeatures)
    const allProducts = await apiFeatures.query;

    console.log('Number of products found:', allProducts.length);
    console.log('Products:', allProducts);

    if (!allProducts) {
        throw ApiError(404, 'all product not get something went wrong')
    }

    res.status(200).json(
        new ApiResponse(200, allProducts, "all product fetch successfully", productCount)
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

export {
    createProduct,
    updateProduct,
    getAllProducts,
    deleteProduct,
    getProductDetails
}