import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosInstance } from "../../services/axiosInstance"

export const getProducts = createAsyncThunk('getProducts', async (filter, thunkApi) => {
    // console.log(filter)
    try {
        if (filter.category) {
            let response = await axiosInstance.get(`/products?keyword=${filter.keyword}&page=${filter.page}&price[gte]=${filter.price[0]}&price[lte]=${filter.price[1]}&category=${filter.category}&ratings[gte]=${filter.ratings}`)
            return response.data.data

        }
        let response = await axiosInstance.get(`/products?keyword=${filter.keyword}&page=${filter.page}&price[gte]=${filter.price[0]}&price[lte]=${filter.price[1]}&ratings[gte]=${filter.ratings}`)
        return response.data.data
        // console.log(response.data)
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
    productinDetail: null,
    isLoading: false,
    error: null,
    productCount: 0,
    resultPerPage: 0,
    filterProductCount: 0

}

const productSlice = createSlice({
    name: 'productSlice',
    initialState,
    extraReducers: (builder) => {
        builder
            //get All Products , priceFilter, pagination
            .addCase(getProducts.pending, state => {
                state.isLoading = true
                state.error = null
            })
            .addCase(getProducts.fulfilled, (state, actions) => {
                state.isLoading = false
                state.products = actions.payload.allProducts || []
                state.productCount = actions.payload.productCount || 0
                state.resultPerPage = actions.payload.resultPerPage || 0
                state.filterProductCount = actions.payload.filterProductCount || 0
                // console.log(actions.payload)
            })
            .addCase(getProducts.rejected, (state, actions) => {
                state.error = actions.payload
                state.products = null
                state.isLoading = false
            })



            //product Details
            .addCase(productDetails.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(productDetails.fulfilled, (state, action) => {
                state.isLoading = false;
                state.productDetail = action.payload;
            })
            .addCase(productDetails.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

    }
})

export default productSlice.reducer