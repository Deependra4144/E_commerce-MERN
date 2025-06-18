import express, { Router } from 'express'
import {
    loginUser,
    registerUser
} from '../controllers/userController.js'

const router = Router()

router.route('/users/register').post(registerUser)
router.route('/users/login').post(loginUser)


export default router