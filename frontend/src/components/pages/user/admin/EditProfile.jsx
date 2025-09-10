import React, { useMemo } from 'react'
import { useForm } from 'react-hook-form'

function EditProfile() {
    const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm()
    const avatarFiles = watch('avatar')

    const avatarPreview = useMemo(() => {
        if (avatarFiles && avatarFiles.length > 0) {
            return URL.createObjectURL(avatarFiles[0])
        }
        return null
    }, [avatarFiles])

    const onSubmit = async (data) => {
        const formData = new FormData()
        formData.append('name', data.name)
        formData.append('email', data.email)
        formData.append('phone', data.phone || '')
        formData.append('bio', data.bio || '')
        if (data.avatar && data.avatar[0]) {
            formData.append('avatar', data.avatar[0])
        }
        // TODO: Hook up to API/dispatch when available
        console.log('EditProfile submitted', data)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto bg-white/70 backdrop-blur-md shadow-xl rounded-2xl p-6 sm:p-8">
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
                            <div className="w-32 h-32 rounded-full overflow-hidden border border-gray-200 bg-gray-100">
                                {avatarPreview ? (
                                    <img src={avatarPreview} alt="avatar-preview" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">No image</div>
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

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                            <textarea
                                rows="4"
                                {...register('bio')}
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

