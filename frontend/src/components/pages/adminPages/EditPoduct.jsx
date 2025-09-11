import React, { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import Input from '../../common/Input'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { productDetails as getProduct } from '../../../features/productlice/productSlice'
import { updateProduct } from '../../../features/productlice/adminProductSlice'
import toast from 'react-hot-toast'

function EditProduct() {
    const { id } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { productiDetail, isLoading } = useSelector(state => state.product)
    const { success, failed } = useSelector(state => state.admin)
    const { register, handleSubmit, watch, reset, formState: { errors, isSubmitting } } = useForm({ images: [] })
    const imageFiles = watch('images')
    const category = watch('category')
    // console.log(category)
    const imagePreviews = useMemo(() => {
        if (imageFiles && imageFiles.length > 0) {
            return Array.from(imageFiles).map(file => URL.createObjectURL(file))
        } else {
            return []
        }
    }, [imageFiles])

    const onSubmit = async (data) => {
        const formData = new FormData()
        formData.append('name', data.name)
        formData.append('description', data.description)
        formData.append('price', data.price)
        formData.append('category', data.category)
        formData.append('stock', data.stock)

        if (data.images && data.images.length > 0) {
            Array.from(data.images).forEach(image => {
                formData.append('images', image)
            })
        } else (
            formData.append('images', productiDetail?.images || [])
        )

        // console.log('RAM RAM', id)
        try {
            let result = dispatch(updateProduct({ id, formData })).unwrap()
            console.log(result)
            toast.success(success)
            setTimeout(() => {
                navigate('/admin/allProduct')
            }, 1000);
        } catch (err) {
            console.log(err.message)
            toast.error(failed)

        }
    }

    useEffect(() => {
        dispatch(getProduct(id))
    }, [dispatch, id])
    useEffect(() => {
        if (productiDetail) {
            reset({
                name: productiDetail.name || "",
                description: productiDetail.description || "",
                price: productiDetail.price || "",
                category: productiDetail.category || "",
                stock: productiDetail.stock || "",
                isActive: productiDetail.isActive ?? true,
            })
        }
    }, [productiDetail, reset])

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[200px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        )
    }
    // console.log(imagePreviews)
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-6xl mx-auto bg-white/70 backdrop-blur-md shadow-xl rounded-2xl p-6 sm:p-8">
            <div className="mb-6 border-b pb-4">
                <h2 className="text-2xl font-bold text-gray-900">Edit Product</h2>
                <p className="text-sm text-gray-600 mt-1">Update product information, pricing, and inventory details.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Product Images */}
                <div className="lg:col-span-1">
                    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-5">
                        <p className="text-sm font-semibold text-gray-700 mb-4">Product Images</p>
                        <div className="flex flex-col gap-4">
                            {/* Image Preview Grid */}
                            <div className="grid grid-cols-2 gap-2">
                                {/* Existing Images */}
                                {(!imageFiles && productiDetail?.images?.length) && productiDetail?.images?.map((img, index) => (
                                    <div key={`existing-${index}`} className="w-full h-24 rounded-lg object-cover border border-gray-200 bg-gray-100">
                                        <img src={img} alt={`existing-${index}`} className="w-full h-full object-cover" />
                                    </div>
                                ))}

                                {/* New Image Preview */}
                                {imagePreviews.map((preview, index) => (
                                    <div key={`preview-${index}`} className="w-full h-24 rounded-lg overflow-hidden border boreder-gray-200 bg-gray-100">
                                        <img src={preview} alt={`preview-${index}`} className='w-full h-full object-cover' />
                                    </div>
                                ))}

                                {/* No Image Preview */}
                                {(!productiDetail?.images?.length && !imagePreviews.length) && (
                                    <div className="col-span-2 w-full h-24 rounded-lg border border-gray-200 bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
                                        No Images
                                    </div>
                                )}
                            </div>

                            <label className="w-full">
                                <span className="flex items-center justify-center w-full rounded-xl border-2 border-dashed border-gray-300 bg-white/60 px-4 py-3 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition text-sm text-gray-700">
                                    Upload Product Images
                                </span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    className="hidden"
                                    {...register('images')}
                                />
                            </label>
                            <p className="text-xs text-gray-500">PNG, JPG up to 5MB each (max 4 images)</p>
                        </div>
                    </div>
                </div>

                {/* Product Details */}
                <div className="lg:col-span-2">
                    <div className="space-y-6">
                        {/* Basic Information */}
                        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Basic Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-2">
                                    <Input
                                        label="Product Name *"
                                        type="text"
                                        placeholder="Enter product name"
                                        {...register('name', { required: 'Product name is required' })}
                                        error={errors.name?.message}
                                        className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <div>
                                        <label className="bg-white text-sm font-semibold relative left-2 top-2">Description *</label>
                                        <textarea
                                            rows="4"
                                            {...register('description', { required: 'Description is required' })}
                                            className="w-full outline-none border border-gray-200 rounded-xl bg-white px-4 py-2.5 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
                                            placeholder="Enter product description"
                                        />
                                        {errors.description && <p className="text-sm text-red-600">{errors.description.message}</p>}
                                    </div>
                                </div>

                                <div>
                                    <div>
                                        <label className="bg-white text-sm font-semibold relative left-2 top-2">Category *</label>
                                        <select
                                            {...register('category', { required: 'Category is required', value: category })}
                                            className="w-full outline-none border border-gray-200 rounded-xl bg-white px-4 py-2.5 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
                                        >
                                            <option value="">Select category</option>
                                            <option value="Electronics">Electronics</option>
                                            <option value="Clothing">Clothing</option>
                                            <option value="Home">Home & Garden</option>
                                            <option value="Sports">Sports</option>
                                            <option value="Books">Books</option>
                                            <option value="Toys">Toys</option>
                                            <option value="Beauty">Beauty</option>
                                            <option value="Automotive">Automotive</option>
                                        </select>
                                        {errors.category && <p className="text-sm text-red-600">{errors.category.message}</p>}
                                    </div>
                                </div>


                            </div>
                        </div>

                        {/* Pricing & Inventory */}
                        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Pricing & Inventory</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <div>
                                        <label className="bg-white text-sm font-semibold relative z-30 left-2 top-2">Price *</label>
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                                            <input
                                                type="number"
                                                step="0.01"
                                                min="0"
                                                {...register('price', {
                                                    required: 'Price is required',
                                                    min: { value: 0, message: 'Price must be positive' }
                                                })}
                                                className="w-full outline-none border border-gray-200 rounded-xl bg-white pl-8 pr-4 py-2.5 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
                                                placeholder="0.00"
                                            />
                                        </div>
                                        {errors.price && <p className="text-sm text-red-600">{errors.price.message}</p>}
                                    </div>
                                </div>

                                <div>
                                    <Input
                                        label="Stock Quantity *"
                                        type="number"
                                        placeholder="0"
                                        {...register('stock', {
                                            required: 'Stock quantity is required',
                                            min: { value: 0, message: 'Stock must be non-negative' }
                                        })}
                                        error={errors.stock?.message}
                                        className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
                                    />
                                </div>



                                {/* <div className="flex items-center">
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            {...register('isActive')}
                                            className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500/30"
                                        />
                                        <span className="ml-2 text-sm text-gray-700">Product is active</span>
                                    </label>
                                </div> */}
                            </div>
                        </div>


                    </div>

                    {/* Action Buttons */}
                    <div className="mt-8 flex items-center justify-end gap-3">
                        <button
                            type="button"
                            className="rounded-xl border border-gray-300 px-6 py-2.5 text-gray-700 hover:bg-gray-50 transition"
                            onClick={() => window.history.back()}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-2.5 text-white font-semibold shadow-sm hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition"
                        >
                            {isSubmitting ? 'Saving...' : 'Update Product'}
                        </button>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default EditProduct
