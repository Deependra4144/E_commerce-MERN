import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosInstance } from "../../services/axiosInstance"
import toast from 'react-hot-toast';

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

export const updateProfile = createAsyncThunk('auth/updateProfile', async (userData, thunkApi) => {
    try {
        let response = await axiosInstance.put('/users/me/updateProfile', userData)
        return response.data
    } catch (error) {
        return thunkApi.rejectWithValue(error.response.data.message)
    }
})

export const forgetPassword = createAsyncThunk('auth/forgetPassword', async (email, thunkApi) => {
    try {
        let response = await axiosInstance.post('/password/forgot', email)
        return response.data
    } catch (err) {
        thunkApi.rejectWithValue(err.response.data.message || 'something went wrong while forget password')
    }
})

export const updatePassword = createAsyncThunk('auth/updateAvatar', async (data, thunkApi) => {
    let isAuthenticate = thunkApi.getState().auth.isAuthenticate
    // console.log(isAuthenticate)
    if (!isAuthenticate) {
        return thunkApi.rejectWithValue('is not Authenticate')
    }
    try {
        let response = await axiosInstance.put('/password/updatePassword', data)
        // console.log(response.data)
        return response.data
    } catch (err) {
        console.log(err.response.data)
        return thunkApi.rejectWithValue(err.response?.data)
    }
})

export const resetPassword = createAsyncThunk('auth/resetPassword', async ({ token, data }, thunkApi) => {
    console.log(token, data, 'authSlice')
    try {
        let response = await axiosInstance.put(`/password/reset/${token}`, data)
        return response.data
    } catch (err) {
        console.log(err)
        thunkApi.rejectWithValue()
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



let initialState = {
    isAuthenticate: false,
    user: null,
    isLoading: false,
    error: null,
    userRole: null,

    //updateAvatar
    updatePasswordLoading: false,
    updatePasswordSuccess: null,
    updatePasswordError: null,

    //forget password
    forgetPasswordLoading: false,
    forgetPasswordSuccess: null,
    forgetPasswordError: null,

    //reset Password
    resetPasswordLoading: false,
    resetPasswordSuccess: null,
    resetPasswordError: null,

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
                state.user = actions.payload
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
                console.log(actions.payload)
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

            //updatePassword
            .addCase(updatePassword.pending, state => {
                state.updatePasswordLoading = true
                state.updatePasswordSuccess = null
                toast.loading('updating password...', { id: 'pending' })

            })
            .addCase(updatePassword.fulfilled, (state) => {
                state.updatePasswordLoading = false
                state.updatePasswordSuccess = true
                state.updatePasswordError = null
                toast.dismiss('pending')
                toast.success('password update successfully', { id: 'success' })
            })
            .addCase(updatePassword.rejected, (state, actions) => {
                state.updatePasswordLoading = false
                state.updatePasswordSuccess = null
                state.updatePasswordError = actions.payload || 'Something went wrong authSlice 188'
                toast.dismiss('pending')
                console.log(actions.payload)
                toast.error(actions.payload.data.message || 'xyz')
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

            //forget Password
            .addCase(forgetPassword.pending, state => {
                state.forgetPasswordLoading = true,
                    state.forgetPasswordSuccess = null,
                    state.forgetPasswordError = null
            })
            .addCase(forgetPassword.fulfilled, (state, actions) => {
                state.forgetPasswordLoading = false,
                    state.forgetPasswordSuccess = actions.payload,
                    state.forgetPasswordError = null
                console.log(state.forgetPasswordSuccess)
            })
            .addCase(forgetPassword.rejected, (state, actions) => {
                state.forgetPasswordLoading = false,
                    state.forgetPasswordSuccess = null,
                    state.forgetPasswordError = actions.payload
                // console.log(state.forgetPasswordError)
            })

            //resetPassword
            .addCase(resetPassword.pending, state => {
                state.resetPasswordLoading = true,
                    state.resetPasswordSuccess = null,
                    state.resetPasswordError = null
            })
            .addCase(resetPassword.fulfilled, (state, actions) => {
                state.resetPasswordLoading = false,
                    state.resetPasswordSuccess = actions.payload,
                    state.resetPasswordError = null
                console.log(state.resetPasswordSuccess)
            })
            .addCase(resetPassword.rejected, (state, actions) => {
                state.resetPasswordLoading = false,
                    state.resetPasswordSuccess = null,
                    state.resetPasswordError = actions.payload
                console.log(state.resetPasswordError)
            })


    }
})

export const { logout } = authSlice.actions
export default authSlice.reducer
