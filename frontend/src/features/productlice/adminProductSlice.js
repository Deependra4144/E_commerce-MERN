import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../services/axiosInstance";

export const addProduct = createAsyncThunk('addNewProduct', async (productData, thunkApi) => {
    // console.log(productData)
    // for (let [key, value] of productData.entries()) {
    //     console.log(key, value);
    // }
    try {
        let response = await axiosInstance.post('/product/new', productData)
        return response.data
    } catch (error) {
        return thunkApi.rejectWithValue(error.response.data.message)
    }
})

export const deleteProduct = createAsyncThunk('deleteProduct', async (id, thunkApi) => {
    const state = thunkApi.getState();
    let userRole = state.auth.user?.role;

    if (userRole !== 'admin') {
        return thunkApi.rejectWithValue('Unauthorized: Only admins can delete products');
    }
    try {
        let response = await axiosInstance.delete(`/product/${id}`)
        return response.data.data;
    } catch (error) {
        return thunkApi.rejectWithValue(error.response.data.message)
    }
})

export const updateProduct = createAsyncThunk('updateProduct', async ({ id, formData }, thunkApi) => {
    const state = thunkApi.getState();
    let userRole = state.auth.user?.role;
    console.log(id)
    // for (const [key, value] of formData.entries()) {
    //     console.log(key, value)
    // }

    if (userRole !== 'admin') {
        return thunkApi.rejectWithValue('Unauthorized: Only admins can edit products');
    }
    try {
        let response = await axiosInstance.put(`/product/${id}`, formData)
        return response.data;
    } catch (error) {
        return thunkApi.rejectWithValue(error.response.data.message)
    }
})

let initialState = {
    product: null,
    isLoading: false,
    success: null,
    failed: null

}

const adminProductSlice = createSlice({
    name: 'addProduct',
    initialState,
    extraReducers: (builder) => {
        builder
            //add product
            .addCase(addProduct.pending, state => {
                state.isLoading = true
                state.success = null
                state.failed = null
            })
            .addCase(addProduct.fulfilled, (state, actions) => {
                state.isLoading = false
                state.product = actions.payload
                state.success = actions.payload.message
                state.failed = null

            })
            .addCase(addProduct.rejected, (state, actions) => {
                state.product = null
                state.error = actions.payload
                state.success = null
                state.failed = actions.payload.message
            })

            // delete Product by Admin
            .addCase(deleteProduct.pending, state => {
                state.isLoading = true
                state.success = null
                state.failed = null
            })
            .addCase(deleteProduct.fulfilled, (state, actions) => {
                state.isLoading = false
                state.product = actions.payload
                state.success = actions.payload.message
                state.error = null

            })
            .addCase(deleteProduct.rejected, (state, actions) => {
                state.isLoading = false
                state.error = actions.payload
                state.success = null
                state.failed = actions.payload.message
                state.product = null
            })

            // update Product --Admin
            .addCase(updateProduct.pending, state => {
                state.isLoading = true
                state.error = null
                state.success = null
                state.failed = null
            })
            .addCase(updateProduct.fulfilled, (state, actions) => {
                state.isLoading = false
                state.product = actions.payload
                state.success = actions.payload.message
                state.failed = null
            })
            .addCase(updateProduct.rejected, (state, actions) => {
                state.isLoading = false
                state.failed = actions.payload.message
                state.success = null
            })
    }
})

export default adminProductSlice.reducer