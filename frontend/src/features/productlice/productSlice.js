import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosInstance } from "../../services/axiosInstance"

export const AllProducts = createAsyncThunk('getProducts', async (pageNo, thunkApi) => {
    try {
        if (pageNo) {
            let response = await axiosInstance.get(`/products?&page=${pageNo}`)
            console.log(response.data)
            return response.data.data
        } else {
            let response = await axiosInstance.get('/products')
            // console.log(response.data)
            return response.data.data
        }
    } catch (error) {
        return thunkApi.rejectWithValue(error.response.data.message)
    }
})

export const productSearch = createAsyncThunk('searchProduct', async (keyword, thunkApi) => {
    try {
        let response = await axiosInstance.get(`/products?keyword=${keyword}`)
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
    error: null,
    productCount: null,
    resultPerPage: null

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
                state.productCount = actions.payload.productCount
                state.products = actions.payload.allProducts
                state.resultPerPage = actions.payload.resultPerPage
                // console.log(actions.payload)
            })
            .addCase(AllProducts.rejected, (state, actions) => {
                state.error = actions.payload
                state.products = null
                // state.loading = false
            })

            //search product
            .addCase(productSearch.pending, state => {
                state.loading = true
                state.error = null
            })
            .addCase(productSearch.fulfilled, (state, actions) => {
                state.loading = false
                state.productCount = actions.payload.productCount
                state.products = actions.payload.allProducts
                state.resultPerPage = actions.payload.resultPerPage
                // console.log(actions.payload)
            })
            .addCase(productSearch.rejected, (state, actions) => {
                state.error = actions.payload
                state.products = null
                // state.loading = false
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