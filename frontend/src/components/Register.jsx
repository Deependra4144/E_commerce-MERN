import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Input from './common/Input';

const roles = [
    { value: '', label: 'Select Role' },
    { value: 'user', label: 'User' },
    { value: 'admin', label: 'Admin' },
];

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const onSubmit = (data) => {
        setLoading(true);
        setError('');
        // Simulate registration
        setTimeout(() => {
            setLoading(false);
            if (!data.name || !data.email || !data.phone || !data.password || !data.role) {
                setError('Please fill all fields.');
            } else {
                // Handle registration logic here
                alert('Registered!');
            }
        }, 1200);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 py-12 px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">Register</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Name Input */}
                    <Input
                        label="Name"
                        type="text"
                        placeholder="Name"
                        autoComplete="name"
                        error={errors.name?.message}
                        className={`peer px-4 py-3 focus:ring-2 focus:ring-blue-400 bg-transparent placeholder-transparent ${errors.name ? 'border-red-400' : 'border-gray-300'}`}
                        {...register('name', {
                            required: 'Name is required',
                            minLength: { value: 2, message: 'Name must be at least 2 characters' },
                        })}
                    />
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
                    {/* Phone Input */}
                    <Input
                        label="Phone"
                        type="tel"
                        placeholder="Phone"
                        autoComplete="tel"
                        error={errors.phone?.message}
                        className={`peer px-4 py-3 focus:ring-2 focus:ring-blue-400 bg-transparent placeholder-transparent ${errors.phone ? 'border-red-400' : 'border-gray-300'}`}
                        {...register('phone', {
                            required: 'Phone is required',
                            pattern: {
                                value: /^\d{10}$/,
                                message: 'Enter a valid 10-digit phone number',
                            },
                        })}
                    />
                    {/* Password Input */}
                    <div className="relative">
                        <Input
                            label="Password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Password"
                            autoComplete="new-password"
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
                    {/* Role Select */}
                    <div className="relative">
                        <select
                            id="role"
                            className={`peer w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-transparent ${errors.role ? 'border-red-400' : 'border-gray-300'}`}
                            {...register('role', {
                                required: 'Role is required',
                            })}
                            defaultValue=""
                        >
                            {roles.map((role) => (
                                <option key={role.value} value={role.value}>{role.label}</option>
                            ))}
                        </select>
                        <label htmlFor="role" className="absolute left-4 -top-4 text-gray-500 text-xs bg-white px-1 pointer-events-none">
                            Role
                        </label>
                        {errors.role && <span className="text-xs text-red-500 absolute left-4 -bottom-5">{errors.role.message}</span>}
                    </div>
                    {/* Error Message */}
                    {error && <div className="text-red-600 text-sm text-center">{error}</div>}
                    {/* Register Button */}
                    <button
                        type="submit"
                        className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
                        disabled={loading}
                    >
                        {loading ? (
                            <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                            </svg>
                        ) : null}
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register; 