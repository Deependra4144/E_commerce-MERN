import { Order } from '../models/orderModel.js';
import { Product } from '../models/productModel.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';

async function updateStock(id, quantity) {
    const product = await Product.findById(id);
    product.stock -= quantity
    await product.save({ validateBeforeSave: false })
}

// new Order
const newOrder = asyncHandler(async (req, res) => {
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice
    } = req.body
    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        paidAt: Date.now(),
        user: req.user._id
    })

    res.status(201).json(
        new ApiResponse(
            201,
            order,
            'new Order successfully !!'
        )
    )
})

// get singleOrder
const getSingleOrder = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate("user", "name email")

    if (!order) {
        throw new ApiError(404, `some thing went wrong with this Order ${req.params.id}`)
    }

    res.status(200).json(
        new ApiResponse(
            200,
            order,
            'oreder get successfully'
        )
    )
})
// get logedin user order
const myOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user.id })
    // console.log('order', orders)
    if (!orders) {
        throw new ApiError(404, `some thing went wrong with when get user order`)
    }

    res.status(200).json(
        new ApiResponse(
            200,
            orders,
            'oreders get successfully'
        )
    )
})

// get All orders --Admin
const allOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find()
    // console.log('order', orders)
    if (!orders) {
        throw new ApiError(404, `some thing went wrong with when get all order by admin`)
    }

    let totalAmount = 0;

    orders.forEach((order) => {
        totalAmount += order.totalPrice
    })

    res.status(200).json(
        new ApiResponse(
            200,
            { orders, totalAmount },
            'oreders get successfully'
        )
    )
})
// get update order status --Admin
const updateOrderStatus = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
    console.log('order', order)
    if (order.orderStatus === "Delivered") {
        throw new ApiError(404, `you have allready delivered this order`)
    }

    order.orderItems.forEach(async (order) => {
        await updateStock(order.product, order.quantity)
    })

    order.orderStatus = req.body.status;

    if (req.body.status === "Delivered") {
        order.deliveredAt = Date.now()
    }

    await order.save({ validateBeforeSave: false })
    res.status(200).json(
        new ApiResponse(
            200,
            order,
            'oreders get successfully'
        )
    )
})

// delete order
const deleteOrder = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
    // console.log('order', orders)
    if (!order) {
        throw new ApiError(404, `some thing went wrong  when order delete`)
    }

    await order.deleteOne()


    res.status(200).json(
        new ApiResponse(
            200,
            order,
            'oreders get successfully'
        )
    )
})

export {
    allOrders,
    deleteOrder,
    getSingleOrder,
    myOrders,
    newOrder,
    updateOrderStatus

}