import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";

export const Store = configureStore({
    reducer: {
        auth: authReducer
    }
})