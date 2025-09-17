import { useState } from 'react';
import { useForm } from 'react-hook-form'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Input from '../../common/Input';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../../../features/auth/authSlice';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

function ResetPassword() {
    let { register, handleSubmit, getValues, formState: { errors } } = useForm()
    const [showPassword, setShowPassword] = useState(false);
    const { resetPasswordLoading, resetPasswordSuccess, resetPasswordError } = useSelector(state => state.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    let { token } = useParams()

    console.log(token)
    const submitNewPassword = (data) => {
        console.log(data)
        if (data) {
            dispatch(resetPassword({ token, data }))
        }
    }
    useEffect(() => {
        if (resetPasswordSuccess) {
            toast.success('password reset Successfully')
            navigate('/login')
        }
        if (resetPasswordError) {
            toast.error('somthinng went wrong')
        }


    }, [resetPasswordSuccess, resetPasswordError, navigate])


    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 py-12 px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">New Password</h2>
                <form onSubmit={handleSubmit(data => submitNewPassword(data))} className="space-y-8">
                    {/*New Password Input */}
                    <div className="relative">
                        <Input
                            label="New Password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="enter password"
                            autoComplete="current-password"
                            error={errors.newPassword?.message}
                            className={`peer px-4 py-3 bg-gray-100 focus:ring-2 focus:ring-blue-400 ${errors.password ? 'border-red-400' : 'border-gray-300'}`}
                            {...register('newPassword', {
                                required: 'Password is required',
                                minLength: {
                                    value: 6,
                                    message: 'Password must be at least 6 characters',
                                },
                            })}
                        />
                        <Input
                            label="Confrrm Password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="confirm password"
                            autoComplete="current-password"
                            error={errors.confirmPassword?.message}
                            className={`peer px-4 py-3 bg-gray-100 focus:ring-2 focus:ring-blue-400 ${errors.confirmPassword ? 'border-red-400' : 'border-gray-300'}`}
                            {...register('confirmPassword', {
                                required: 'confirmPassword is required',
                                validate: (value) => value === getValues('newPassword') || 'confirmPassword do not match'
                            })}
                        />

                    </div>
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-gray-700 ps-2 hover:text-blue-500 focus:outline-none flex gap-2 items-center"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                        {showPassword ? 'Hide password' : 'Show password'}
                    </button>
                    {/* submit Button */}
                    <button
                        type="submit"
                        className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
                        disabled={resetPasswordLoading}
                    >
                        {resetPasswordLoading ? 'Submit' : 'saving'}
                    </button>
                </form>
                {/* Register Link */}
                <div className="mt-6 text-center text-gray-600 text-sm">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-blue-600 hover:underline font-semibold">Register</Link>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword
