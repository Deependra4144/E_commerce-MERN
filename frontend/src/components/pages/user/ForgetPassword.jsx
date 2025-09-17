import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { forgetPassword } from '../../../features/auth/authSlice'
import Input from '../../common/Input'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
function ForgetPassword() {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const { forgetPasswordLoading, forgetPasswordSuccess, forgetPasswordError } = useSelector(state => state.auth)
    let dispatch = useDispatch()
    const submitForgetPassword = (data) => {
        console.log(data)
        dispatch(forgetPassword(data))
    }
    useEffect(() => {
        if (forgetPasswordSuccess) {
            toast.success('Check your Email')
        }
        if (forgetPasswordError) {
            toast.error('error')
        }
    }, [forgetPasswordSuccess, forgetPasswordError])
    // console.log(forgetPasswordLoading, forgetPasswordSuccess, forgetPasswordError)
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 py-12 px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">Forget Password</h2>
                <form onSubmit={handleSubmit(data => submitForgetPassword(data))} className="space-y-6">
                    {/* Email Input */}
                    <Input
                        label="Email"
                        type="email"
                        placeholder="Email"
                        autoComplete="enter email"
                        error={errors.email?.message}
                        className={`peer px-4 py-3 bg-gray-100 focus:ring-2 focus:ring-blue-400 ${errors.email ? 'border-red-400' : 'border-gray-300'}`}
                        {...register('email', {
                            required: 'Email is required',
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: 'Enter a valid email address',
                            },
                        })}
                    />
                    {/* API Error Message */}
                    {/* {apiError && <div className="text-red-600 text-sm text-center">{apiError}</div>} */}
                    {/* Login Button */}
                    <button
                        type="submit"
                        className={`w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-60`}
                        disabled={forgetPasswordLoading}
                    >
                        Forget Password
                    </button>
                </form>
                {/* Register Link */}
                <div className="mt-6 text-center text-gray-600 text-sm flex gap-x-2 justify-center">
                    <Link to="/register" className="text-blue-600 hover:underline font-semibold">Register</Link>
                    <p className='text-blue-500'>| |</p>
                    <Link to="/login" className="text-blue-600 hover:underline font-semibold">Login</Link>
                </div>
            </div>
        </div>
    )
}

export default ForgetPassword
