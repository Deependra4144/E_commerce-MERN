import express, { Router } from 'express'
import multer from 'multer';
import {
    deleteUser,
    forgetPassword,
    getAllUser,
    getUserDetails,
    loginUser,
    logOutUser,
    registerUser,
    resetPassword,
    sigleUserDetails,
    updatePassword,
    updateProfile,
    updateUserRole
} from '../controllers/userController.js'
import { authorizeRoles, isAuthenticatedUser } from '../middleware/auth.js'
import { upload } from '../middleware/multer.js'
const router = Router()

router.route('/users/register').post(upload.single("avatar"), registerUser)
router.route('/users/login').post(loginUser)
router.route('/users/me').get(isAuthenticatedUser, getUserDetails)

router.route('/password/forgot').post(forgetPassword)
router.route('/password/reset/:token').put(resetPassword)
router.route('/password/updatePassword').put(isAuthenticatedUser, updatePassword)
router.route('/users/me/updateProfile').put(isAuthenticatedUser, updateProfile)
router.route('/users/allUsers').get(isAuthenticatedUser, authorizeRoles('admin'), getAllUser)
router.route('/users/user/:id')
    .get(isAuthenticatedUser, authorizeRoles('admin'), sigleUserDetails)
    .put(isAuthenticatedUser, authorizeRoles('admin'), updateUserRole)
    .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteUser);

router.route('/users/logout').get(logOutUser)


export default router