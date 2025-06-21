import express from 'express';
import {
    createProduct,
    createProductReview,
    deleteReview,
    deleteProduct,
    getAllReviews,
    getAllProducts,
    getProductDetails,
    updateProduct
} from '../controllers/productController.js'
import { isAuthenticatedUser, authorizeRoles } from '../middleware/auth.js';

const router = express.Router()

router.route('/product/new').post(isAuthenticatedUser, authorizeRoles('admin'), createProduct)
router.route('/products').get(getAllProducts);
router.route('/product/:id').get(getProductDetails);
router.route('/product/:id')
    .put(isAuthenticatedUser, authorizeRoles('admin'), updateProduct)
    .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteProduct);
router.route("/review").put(isAuthenticatedUser, createProductReview)
router.route("/getReviews/:productId")
    .get(isAuthenticatedUser, getAllReviews)
    .delete(isAuthenticatedUser, deleteReview)
export default router