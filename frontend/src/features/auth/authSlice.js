import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosInstance } from "../../services/axiosInstance"

export const registerUser = createAsyncThunk('auth/register', async (userData, thunkApi) => {
    try {
        const response = await axiosInstance.post('/', userData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        console.log(response.data)
        return response.data
    } catch (error) {
        return thunkApi.rejectWithValue(error.response.data.message || 'registeration faild')
    }
})

export const loginUser = createAsyncThunk('auth/loginUser', async (credential, thunkApi) => {
    try {
        const response = await axiosInstance.put('/', credential, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        return response.data
    } catch (error) {
        return thunkApi.rejectWithValue(error.response.data.message)
    }
})



let initialState = {
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
                    state.user = actions.payload
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
                state.user = actions.payload
            })
            .addCase(loginUser.rejected, (state, actions) => {
                state.user = null
                state.loading = false
                state.error = actions.payload
            })

    }
})

export const { logout } = authSlice.actions
export default authSlice.reducer
