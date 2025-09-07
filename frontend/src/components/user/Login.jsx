import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../common/Input';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../features/auth/authSlice';
import { useEffect } from 'react';

const Login = () => {
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const { isAuthenticate, user, isLoading, error } = useSelector(state => state.auth)
    let dispatch = useDispatch()

    const submitToLogin = (data) => {
        // console.log(data)
        dispatch(loginUser(data))

    }

    useEffect(() => {
        if (isAuthenticate && user) {
            navigate('/userAccount');
        }
    }, [isAuthenticate, user, navigate]);

    if (isLoading) {
        <p className="text-sm text-gray-600 text-center">Loggin....</p>
    }
    if (error) {
        { error && <p className="text-sm text-red-600 text-center">{error}</p> }
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 py-12 px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">Login</h2>
                <form onSubmit={handleSubmit(data => submitToLogin(data))} className="space-y-6">
                    {/* Email Input */}
                    <Input
                        label="Email"
                        type="email"
                        placeholder="Email"
                        autoComplete="email"
                        error={errors.email?.message}
                        className={`peer px-4 py-3 focus:ring-2 focus:ring-blue-400 bg-transparent placeholder-transparent ${errors.email ? 'border-red-400' : 'border-gray-300'}`}
                        {...register('email', {
                            required: 'Email is required',
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: 'Enter a valid email address',
                            },
                        })}
                    />
                    {/* Password Input */}
                    <div className="relative">
                        <Input
                            label="Password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Password"
                            autoComplete="current-password"
                            error={errors.password?.message}
                            className={`peer px-4 py-3 focus:ring-2 focus:ring-blue-400 bg-transparent placeholder-transparent ${errors.password ? 'border-red-400' : 'border-gray-300'}`}
                            {...register('password', {
                                required: 'Password is required',
                                minLength: {
                                    value: 6,
                                    message: 'Password must be at least 6 characters',
                                },
                            })}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-9 text-gray-400 hover:text-blue-500 focus:outline-none"
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                    {/* API Error Message */}
                    {/* {apiError && <div className="text-red-600 text-sm text-center">{apiError}</div>} */}
                    {/* Login Button */}
                    <button
                        type="submit"
                        className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
                        disabled={false}
                    >
                        {/* {false ? (
                            <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                            </svg>
                        ) : null} */}
                        Login
                    </button>
                </form>
                {/* Register Link */}
                <div className="mt-6 text-center text-gray-600 text-sm">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-blue-600 hover:underline font-semibold">Register</Link>
                </div>
            </div>
        </div>
    );
};

export default Login; 