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

let initialState = {
    product: null,
    isLoading: false,
    error: null,

}

const adminProductSlice = createSlice({
    name: 'addProduct',
    initialState,
    extraReducers: (builder) => {
        builder
            //add product
            .addCase(addProduct.pending, state => {
                state.isLoading = true
                state.error = null
            })
            .addCase(addProduct.fulfilled, (state, actions) => {
                state.isLoading = false
                state.product = actions.payload
            })
            .addCase(addProduct.rejected, (state, actions) => {
                state.product = null
                state.error = actions.payload
            })

            // delete Product by Admin
            .addCase(deleteProduct.pending, state => {
                state.error = true
                state.error = null
            })
            .addCase(deleteProduct.fulfilled, (state, actions) => {
                state.isLoading = false
                state.product = actions.payload
                state.error = null
                console.log(actions.payload)
            })
            .addCase(deleteProduct.rejected, (state, actions) => {
                state.isLoading = false
                state.error = actions.payload
                state.product = null
            })
    }
})

export default adminProductSlice.reducer