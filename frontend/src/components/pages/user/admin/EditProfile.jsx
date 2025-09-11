import React, { useMemo } from 'react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { updateProfile } from '../../../../features/auth/authSlice'
import toast from 'react-hot-toast'
function EditProfile() {
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.auth)
    const { register, handleSubmit, watch, reset, formState: { errors, isSubmitting } } = useForm()
    const avatarFile = watch('avatar')

    const avatarPreview = useMemo(() => {

        if (avatarFile) {
            return URL.createObjectURL(avatarFile[0])
        }
        return null
    }, [avatarFile])

    const onSubmit = async (data) => {

        const formData = new FormData()
        formData.append('name', data.name)
        formData.append('email', data.email)
        formData.append('phone', data.phone || '')
        if (data.avatar && data.avatar[0]) {
            formData.append('avatar', data.avatar[0])
        } else {
            formData.append('avatar', user.avatar)
        }

        try {
            let result = await dispatch(updateProfile(formData))
            console.log(result)
            toast.success('Profile update Successfuly')
        } catch (err) {
            toast.error(err.message)
        }
    }

    useEffect(() => {
        if (user) {
            reset({
                name: user.name || '',
                email: user.email || '',
                phone: user.phone || '',
            })
        }
    }, [user, reset])

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full bg-white/70 backdrop-blur-md shadow-xl rounded-2xl p-4 sm:p-6 md:p-8">
            <div className="mb-6 border-b pb-4">
                <h2 className="text-2xl font-bold text-gray-900">Edit Profile</h2>
                <p className="text-sm text-gray-600 mt-1">Update your personal information and avatar.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Avatar */}
                <div className="lg:col-span-1">
                    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-5">
                        <p className="text-sm font-semibold text-gray-700 mb-4">Profile Picture</p>
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-40 h-40 rounded-full overflow-hidden border border-gray-200 bg-gray-100">
                                {/* Existing avater */}
                                {!avatarPreview && user?.avatar && (
                                    <img src={user.avatar} alt="Current Avatar" className="w-full h-full object-cover" />
                                )}
                                {/* New avater preview */}
                                {avatarPreview && (
                                    <img src={avatarPreview} alt="Current Avatar" className="w-full h-full object-cover" />
                                )}

                                {/* No image preview */}
                                {!avatarPreview && !user?.avatar && (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                                        No Image
                                    </div>
                                )}
                            </div>
                            <label className="w-full">
                                <span className="flex items-center justify-center w-full rounded-xl border-2 border-dashed border-gray-300 bg-white/60 px-4 py-3 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition text-sm text-gray-700">
                                    Click to upload avatar
                                </span>
                                <input type="file" accept="image/*" className="hidden" {...register('avatar')} />
                            </label>
                            <p className="text-xs text-gray-500">PNG, JPG up to 2MB</p>
                        </div>
                    </div>
                </div>

                {/* Details */}
                <div className="lg:col-span-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                            <input
                                type="text"
                                {...register('name', { required: 'Name is required' })}
                                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
                            />
                            {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input
                                type="email"
                                {...register('email', { required: 'Email is required' })}
                                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
                            />
                            {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                            <input
                                type="tel"
                                {...register('phone')}
                                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
                            />
                        </div>


                    </div>

                    <div className="mt-6 flex items-center justify-end gap-3">
                        <button
                            type="button"
                            className="rounded-xl border border-gray-300 px-5 py-2.5 text-gray-700 hover:bg-gray-50 transition"
                            onClick={() => window.history.back()}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-2.5 text-white font-semibold shadow-sm hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition"
                        >
                            {isSubmitting ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default EditProfile

