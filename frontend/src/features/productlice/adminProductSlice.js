import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../services/axiosInstance";

const getUserRoleFromThunk = (thunkApi) => {
    const state = thunkApi.getState();
    return state.auth.user?.role || null;
};

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
    let userRole = getUserRoleFromThunk(thunkApi);

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
    let userRole = getUserRoleFromThunk(thunkApi);
    // console.log(id)
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

export const getAllUsers = createAsyncThunk('getAllUsers', async (data, thunkApi) => {
    let userRole = getUserRoleFromThunk(thunkApi);
    if (userRole !== "admin") {
        return thunkApi.rejectWithValue('Unauthorized: Only admin can see all Users')
    }
    try {
        const res = await axiosInstance.get('/users/allUsers')
        return res.data
    } catch (err) {
        return thunkApi.rejectWithValue(err.response.data.message)
    }
})

export const deleteUser = createAsyncThunk('deleteUser', async (id, thunkApi) => {
    let userRole = getUserRoleFromThunk(thunkApi);

    if (userRole !== 'admin') {
        return thunkApi.rejectWithValue('Unauthorized: Only admin can see all Users')
    }

    try {
        let response = await axiosInstance.delete(`/users/user/${id}`)
        return response.data
    } catch (err) {
        return thunkApi.rejectWithValue(err.response.data.message)
    }
})

export const adminUpdateUser = createAsyncThunk('adminUpdateUser', async ({ id, data }, thunkApi) => {
    console.log(id, data)
    let userRole = getUserRoleFromThunk(thunkApi);

    if (userRole !== 'admin') {
        return thunkApi.rejectWithValue('Unauthorized: Only admin can update User')
    }
    try {
        let response = await axiosInstance.put(`/users/user/${id}`, data)
        return response.data
    } catch (err) {
        return thunkApi.rejectWithValue(err.response.data.message)
    }
})
let initialState = {
    product: null,
    isLoading: false,
    success: null,
    failed: null,

    // for All Users
    allUsers: [],
    usersLoading: false,
    usersError: null,
    usersSuccess: null,

    //deletUser
    deleteUserLoading: false,
    deleteUserError: null,
    deleteUserSuccess: null,

    //update user 
    updateUserLoading: false,
    updateUserError: null,
    updateUserSuccess: null
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

            // get All users --Admin
            .addCase(getAllUsers.pending, state => {
                state.usersLoading = true
                state.usersError = null
                state.usersSuccess = null
            })
            .addCase(getAllUsers.fulfilled, (state, actions) => {
                state.usersLoading = false
                state.allUsers = actions.payload.data
                state.usersSuccess = actions.payload.message || 'Featched All Users Successfully'
            })
            .addCase(getAllUsers.rejected, (state, actions) => {
                state.usersLoading = false
                state.allUsers = []
                state.usersError = actions.payload.message || 'Faild to fetch Users'
            })

            // delete user
            .addCase(deleteUser.pending, state => {
                state.deleteUserLoading = true
                state.deleteUserError = null
                state.deleteUserSuccess = null
            })
            .addCase(deleteUser.fulfilled, (state, actions) => {
                state.deleteUserLoading = false,
                    state.deleteUserSuccess = actions.payload.message || 'User Delete Successfully'
                state.allUsers = state.allUsers.filter(user => user._id !== actions.meta.arg) // remove deleted user
            })
            .addCase(deleteUser.rejected, (state, actions) => {
                state.deleteUserLoading = false
                state.deleteUserError = actions.payload || 'Failed to delete user'
            })

            //updateUser
            .addCase(adminUpdateUser.pending, state => {
                state.updateUserLoading = true
                state.updateUserError = null
                state.updateUserSuccess = null
            })
            .addCase(adminUpdateUser.fulfilled, (state, actions) => {
                state.updateUserLoading = false
                state.updateUserError = null
                state.updateUserSuccess = actions.payload.message || 'User Update Successfully'
            })
            .addCase(adminUpdateUser.rejected, (state, actions) => {
                state.updateUserLoading = false
                state.updateUserError = actions.payload || 'Failed to update user'
            })
    }
})

export default adminProductSlice.reducer