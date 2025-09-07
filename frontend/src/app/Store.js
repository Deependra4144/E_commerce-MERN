import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import productReducer from "../features/productlice/productSlice";
import adminReducer from "../features/productlice/adminProductSlice"

export const Store = configureStore({
    reducer: {
        auth: authReducer,
        product: productReducer,
        admin: adminReducer
    }
})