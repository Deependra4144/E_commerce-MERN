import { useDispatch, useSelector } from 'react-redux';
import { FaUser, FaEnvelope, FaPhone, FaCalendarAlt, FaEdit, FaShieldAlt, FaCartPlus } from 'react-icons/fa';
import { logOutUser, updatePassword } from '../../features/auth/authSlice';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../common/Input'
import { useForm } from 'react-hook-form'
import { useState } from 'react';


const AccountDetail = () => {
    const [showForm, setShowForm] = useState(false)
    const { register, handleSubmit, watch, reset } = useForm()
    let {
        isAuthenticate,
        userRole,
        user,
        isLoading,
        error
    } = useSelector(state => state.auth)

    let navigate = useNavigate()
    let newPassword = watch('newPassword')
    let dispatch = useDispatch()


    const handleLogOut = () => {
        dispatch(logOutUser())
    }
    useEffect(() => {
        if (!isAuthenticate || !user) {
            navigate('/login')
        }
    }, [isAuthenticate, navigate, user])

    const handleShowForm = () => {
        setShowForm((prev) => !prev)
        setTimeout(() => {
            reset()
        }, 3000);
    }


    // console.log(newPassword)
    const handlePasswordUpdate = (data) => {
        // console.log(data)
        dispatch(updatePassword(data))
    }
    if (isLoading) {
        return <p className="text-sm text-gray-600 text-center">Updating password...</p>
    }
    if (error) {
        return <p className="text-sm text-red-600 text-center">{error}</p>
    }
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            {/* Header Section */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Account Details</h1>
                            <p className="text-gray-600 mt-1">Manage your profile information</p>
                        </div>
                        <Link to="/edit-profile" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2">
                            <FaEdit className="text-sm" />
                            Edit Profile
                        </Link>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Profile Card */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                            <div className="relative flex flex-col">
                                <div className='group relative flex justify-center items-center'>
                                    <img
                                        src={user.avatar}
                                        alt={user.name}
                                        className="group-hover:opacity-60 w-40 h-40 rounded-full object-center border-4 border-blue-100 shadow-lg"
                                    />
                                    <label htmlFor='avatarUpload' className='w-full h-full group-hover:grid place-content-center hidden group-hover:cursor-pointer absolute font-bold text-gray-700'>Update Avatar</label>
                                    <div className="absolute -bottom-2 -right-2 bg-green-500 w-8 h-8 rounded-full border-4 border-white flex items-center justify-center">
                                        <div className="w-2 h-2 bg-white rounded-full"></div>
                                    </div>
                                </div>
                                {showForm && <form className='px-16 flex flex-col gap-y-2 mt-6' onSubmit={handleSubmit(data => handlePasswordUpdate(data))}>
                                    <Input
                                        {...register('oldPassword', { required: { value: true, message: 'oldPassword is required' } })}
                                        type='password'
                                        placeholder='enter old Password'
                                        active='true'
                                        className="!border-0 !border-b-2 !border-gray-300 focus:!border-blue-500 focus:!ring-0"
                                    />
                                    <Input
                                        {...register('newPassword', {
                                            required: { value: true, message: 'newPassword is required' }
                                        })}
                                        type="password"
                                        placeholder='enter new Password'
                                        className="!border-0 !border-b-2 !border-gray-300 focus:!border-blue-500 focus:!ring-0"
                                    />
                                    <Input
                                        {...register('confirmPassword', {
                                            required: { value: true, message: 'confirmPassword is required' },
                                            validate: value => value === watch("newPassword") || "Password dose not match"
                                        })}
                                        type="password"
                                        placeholder='Confirm Password'
                                        className="!border-0 !border-b-2 !border-gray-300 focus:!border-blue-500 focus:!ring-0"
                                    />

                                    {newPassword &&
                                        <button type='submit' className="bg-green-200 text-blue-700 px-4 py-2 rounded-lg text-sm font-medium">Update</button>
                                    }
                                </form>}
                            </div>

                            <h2 className="text-2xl font-bold text-gray-900 mt-4">{user.name}</h2>
                            <div className="flex items-center justify-center gap-2 mt-2">
                                <FaShieldAlt className="text-blue-600" />
                                <span className="text-blue-600 font-medium capitalize">{user.role}</span>
                            </div>

                            <div className="mt-6 flex flex-col gap-2">
                                <button onClick={handleShowForm}
                                    className={`bg-green-50 ${!showForm ? 'text-green-700' : 'text-red-700'} px-4 py-2 rounded-lg text-sm font-medium`}
                                >
                                    {!showForm ? 'Update Password' : 'Cancel'}
                                </button>

                                <div onClick={handleLogOut} className="bg-green-50 text-red-700 cursor-pointer px-4 py-2 rounded-lg text-sm font-medium">
                                    Log Out
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Account Information */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl shadow-lg p-8">
                            <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                                <FaUser className="text-blue-600" />
                                Personal Information
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div className="bg-gray-50 rounded-xl p-4">
                                        <div className="flex items-center gap-3 mb-2">
                                            <FaEnvelope className="text-blue-600 text-lg" />
                                            <span className="text-sm font-medium text-gray-600">Email Address</span>
                                        </div>
                                        <p className="text-gray-900 font-medium">{user.email}</p>
                                    </div>

                                    <div className="bg-gray-50 rounded-xl p-4">
                                        <div className="flex items-center gap-3 mb-2">
                                            <FaPhone className="text-blue-600 text-lg" />
                                            <span className="text-sm font-medium text-gray-600">Phone Number</span>
                                        </div>
                                        <p className="text-gray-900 font-medium">{user.phone}</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="bg-gray-50 rounded-xl p-4">
                                        <div className="flex items-center gap-3 mb-2">
                                            <FaCalendarAlt className="text-blue-600 text-lg" />
                                            <span className="text-sm font-medium text-gray-600">Account Created</span>
                                        </div>
                                        <p className="text-gray-900 font-medium">
                                            {new Date(user.createdAt).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </p>
                                    </div>

                                    <div className="bg-gray-50 rounded-xl p-4">
                                        <div className="flex items-center gap-3 mb-2">
                                            <FaCalendarAlt className="text-blue-600 text-lg" />
                                            <span className="text-sm font-medium text-gray-600">Last Updated</span>
                                        </div>
                                        <p className="text-gray-900 font-medium">
                                            {new Date(user.updatedAt).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Account Statistics */}
                        {userRole === 'user' && <div className="mt-8 bg-white rounded-2xl shadow-lg p-8">
                            <h3 className="text-xl font-semibold text-gray-900 mb-6">Account Statistics</h3>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                                    <div className="text-3xl font-bold text-blue-600 mb-2">0</div>
                                    <div className="text-gray-600 font-medium">My Orders</div>
                                </div>

                                <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                                    <div className="text-3xl font-bold text-green-600 mb-2">0</div>
                                    <div className="text-gray-600 font-medium">Reviews Written</div>
                                </div>

                                <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                                    <div className="text-3xl font-bold text-purple-600 mb-2">0</div>
                                    <div className="text-gray-600 font-medium flex justify-center items-center gap-2">Wishlist Items <FaCartPlus fontSize={24} /></div>
                                </div>
                            </div>
                        </div>}

                        {/* Quick Actions of admin */}
                        {userRole === "admin" && <div className="mt-8 bg-white rounded-2xl shadow-lg p-8">
                            <h3 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <Link to='/admin/addProduct' className="p-4 text-center bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl transition-colors duration-200 font-medium">
                                    Add Product
                                </Link>
                                <Link to='/admin/allProduct' className="text-center p-4 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl transition-colors duration-200 font-medium">
                                    All Products
                                </Link>
                                <button className="p-4 bg-green-50 hover:bg-green-100 text-green-700 rounded-xl transition-colors duration-200 font-medium">
                                    My Reviews
                                </button>
                                <button className="p-4 bg-orange-50 hover:bg-orange-100 text-orange-700 rounded-xl transition-colors duration-200 font-medium">
                                    Settings
                                </button>
                            </div>
                        </div>}

                    </div>
                </div>
            </div>
        </div >
    );
};

export default AccountDetail;
