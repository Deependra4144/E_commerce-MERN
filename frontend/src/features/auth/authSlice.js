import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosInstance } from "../../services/axiosInstance"

export const registerUser = createAsyncThunk('auth/register', async (userData, thunkApi) => {
    console.log('Sending userData:', userData)
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



let initialState = {
    isAuthenticate: false,
    user: null,
    loading: false,
    error: null
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
                state.loading = true,
                    state.error = null
            })
            .addCase(registerUser.fulfilled, (state, actions) => {
                state.loading = false,
                    state.user = actions.payload.data
                // console.log(actions.payload.data)
            })
            .addCase(registerUser.rejected, (state, actions) => {
                state.user = null
                state.error = actions.payload
            })

            //login
            .addCase(loginUser.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(loginUser.fulfilled, (state, actions) => {
                state.loading = false
                state.user = actions.payload.data
                state.isAuthenticate = true
                localStorage.setItem('token', actions.payload.token)
            })
            .addCase(loginUser.rejected, (state, actions) => {
                state.user = null
                state.loading = false
                state.isAuthenticate = false;

                state.error = actions.payload
            })

    }
})

export const { logout } = authSlice.actions
export default authSlice.reducer
