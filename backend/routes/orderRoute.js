import express from 'express'
import { isAuthenticatedUser, authorizeRoles } from "../middleware/auth.js"
import {
    allOrders,
    deleteOrder,
    getSingleOrder,
    myOrders,
    newOrder,
    updateOrderStatus

} from '../controllers/orderController.js'

const router = express.Router()

router.route('/order/new').post(isAuthenticatedUser, newOrder)
router.route('/order/:id').post(isAuthenticatedUser, getSingleOrder)
router.route('/order/me').get(isAuthenticatedUser, myOrders)
router.route('/admin/orders').get(isAuthenticatedUser, authorizeRoles('admin'), allOrders)
router
    .route('/admin/order/:id')
    .put(isAuthenticatedUser, authorizeRoles('admin'), updateOrderStatus)
    .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteOrder)


export default router