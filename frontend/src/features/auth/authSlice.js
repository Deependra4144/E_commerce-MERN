import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosInstance } from "../../services/axiosInstance"

export const registerUser = createAsyncThunk('auth/register', async (userData, thunkApi) => {
    // console.log('Sending userData:', userData)
    // for (let [key, value] of userData.entries()) {
    //     console.log(`${key}:`, value);
    // }
    try {
        const response = await axiosInstance.post('/users/register', userData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        console.log('Registration response:', response.data)
        return response.data
    } catch (error) {
        // console.error('Registration error:', error)
        // console.error('Error response:', error.response?.data)
        // console.error('Error status:', error.response?.status)
        return thunkApi.rejectWithValue(error.response?.data?.message || error.message || 'Registration failed')
    }
})

export const loginUser = createAsyncThunk('auth/loginUser', async (credential, thunkApi) => {
    try {
        const response = await axiosInstance.post('/users/login', credential, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        console.log(response.data)
        return response.data
    } catch (error) {
        // console.log(error.message)
        return thunkApi.rejectWithValue(error.response.data.message)
    }
})

export const isLogin = createAsyncThunk('auth/me', async (_, thunkapi) => {
    try {
        let response = await axiosInstance.get('/users/me')
        return response.data
    } catch (error) {
        return thunkapi.rejectWithValue(error.response.data.message)
    }
})

export const logOutUser = createAsyncThunk('auth/logOut', async (_, thunkApi) => {
    try {
        let response = await axiosInstance.get('/users/logout')
        return response.data
    } catch (error) {
        return thunkApi.rejectWithValue(error.response.data.message)
    }
})

export const updateProfile = createAsyncThunk('auth/updateProfile', async (userData, thunkApi) => {
    try {
        let response = await axiosInstance.put('/users/me/updateProfile', userData)
        return response.data
    } catch (error) {
        return thunkApi.rejectWithValue(error.response.data.message)
    }
})

let initialState = {
    isAuthenticate: false,
    user: null,
    isLoading: false,
    error: null,
    userRole: null
}
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // register
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true,
                    state.error = null
            })
            .addCase(registerUser.fulfilled, (state, actions) => {
                state.isLoading = false
                state.user = actions.payload.data
                state.userRole = state.user.role
                // console.log(actions.payload.data)
            })
            .addCase(registerUser.rejected, (state, actions) => {
                state.user = null
                state.error = actions.payload
            })

            //login
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(loginUser.fulfilled, (state, actions) => {
                state.isLoading = false
                state.user = actions.payload.data
                state.isAuthenticate = true
                state.userRole = state.user.role
            })
            .addCase(loginUser.rejected, (state, actions) => {
                state.user = null
                state.isLoading = false
                state.isAuthenticate = false;

                state.error = actions.payload
            })

            // get user Details if user is allreday login
            .addCase(isLogin.pending, state => {
                state.isLoading = true
                state.error = null
            })
            .addCase(isLogin.fulfilled, (state, actions) => {
                state.isLoading = false
                state.error = null
                state.isAuthenticate = true
                state.user = actions.payload.data
                state.userRole = state.user.role
            })
            .addCase(isLogin.rejected, (state, actions) => {
                state.isLoading = false
                state.error = actions.payload
                state.isAuthenticate = false
                state.user = null
            })

            //update profile
            .addCase(updateProfile.pending, state => {
                state.isLoading = true
                state.error = null
            })
            .addCase(updateProfile.fulfilled, (state, actions) => {
                state.isLoading = false
                state.user = actions.payload
                state.user = actions.payload.data;
                state.userRole = state.user.role
            })
            .addCase(updateProfile.rejected, (state, actions) => {
                state.error = actions.payload
                state.isLoading = false
            })

            //log out user
            .addCase(logOutUser.pending, state => {
                state.isLoading = true
                state.error = null
            })
            .addCase(logOutUser.fulfilled, (state) => {
                state.isLoading = false
                state.user = null
                state.isAuthenticate = false
                state.userRole = null
            })
            .addCase(logOutUser.rejected, (state, actions) => {
                state.isLoading = false
                state.error = actions.payload
            })
    }
})

export const { logout } = authSlice.actions
export default authSlice.reducer
