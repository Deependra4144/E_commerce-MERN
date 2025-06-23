import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosInstance } from "../../services/axiosInstance"

export const AllProducts = createAsyncThunk('getProducts', async (_, thunkApi) => {
    try {
        let response = await axiosInstance.get('/products')
        // console.log(response.data)
        return response.data.data
    } catch (error) {
        return thunkApi.rejectWithValue(error.response.data.message)
    }
})

export const productDetails = createAsyncThunk('getProductDetails', async (id, thunkApi) => {
    try {
        let response = await axiosInstance.get(`/product/${id}`)
        // console.log(response.data)
        return response.data.data;
    } catch (error) {
        return thunkApi.rejectWithValue(error.response.data.message)
    }
})

let initialState = {
    products: [],
    productDetail: null,
    loading: false,
    error: null

}

const productSlice = createSlice({
    name: 'productSlice',
    initialState,
    extraReducers: (builder) => {
        builder
            //get All Products
            .addCase(AllProducts.pending, state => {
                state.loading = true
                state.error = null
            })
            .addCase(AllProducts.fulfilled, (state, actions) => {
                state.loading = false
                state.products = actions.payload
                // console.log(actions.payload.data)
            })
            .addCase(AllProducts.rejected, (state, actions) => {
                state.error = actions.payload
                state.products = null
            })

            //product Details
            .addCase(productDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(productDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.productDetail = action.payload;
            })
            .addCase(productDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})

export default productSlice.reducer