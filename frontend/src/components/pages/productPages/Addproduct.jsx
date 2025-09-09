import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../../features/productlice/adminProductSlice';
import toast from 'react-hot-toast';
function Addproduct() {
    const [isLoading, setIsLoading] = useState(false)
    let dispatch = useDispatch()
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch
    } = useForm();
    let selectedImages = watch('images')
    const name = watch('name')
    const price = watch('price')
    const category = watch('category')
    const description = watch('description')
    const stock = watch('stock')



    const submitHandler = async (data) => {
        const formData = new FormData();
        console.log(data)
        // Append simple fields
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('price', data.price);
        formData.append('category', data.category);
        formData.append('stock', data.stock);

        // Append multiple images
        // console.log(data.images[0])
        Array.from(data.images).forEach((image) => {
            formData.append('images', image);
        });

        try {
            setIsLoading(true)
            // Dispatch formData
            let result = await dispatch(addProduct(formData)).unwrap();
            toast.success(result.message)
            // console.log(result)

            reset(); // Reset form

        } catch (err) {
            toast.error(err?.message || "Failed to add product Something went wrong !!")
        } finally {
            setIsLoading(false)
        }

    };


    return (
        <form
            onSubmit={handleSubmit((data) => { submitHandler(data) })}
            encType="multipart/form-data"
            className="md:mx-10 mx-5bg-white/70 backdrop-blur-md shadow-xl rounded-2xl p-6 sm:p-8"
        >
            <div className="mb-6 border-b pb-4">
                <h2 className="text-2xl font-bold text-gray-900">Add New Product</h2>
                <p className="text-sm text-gray-600 mt-1">Add product details, inventory and images.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Product Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                            <input
                                type="text"
                                {...register('name', { required: 'Product name is required' })}
                                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
                            />
                            {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>}
                        </div>

                        {/* Price */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                            <input
                                type="number"
                                {...register('price', {
                                    required: 'Price is required',
                                    max: { value: 99999999, message: 'Max price is 8 digits' },
                                })}
                                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
                            />
                            {errors.price && <p className="text-red-600 text-sm mt-1">{errors.price.message}</p>}
                        </div>

                        {/* Category */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                            <input
                                type="text"
                                {...register('category', { required: 'Category is required' })}
                                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
                            />
                            {errors.category && <p className="text-red-600 text-sm mt-1">{errors.category.message}</p>}
                        </div>

                        {/* Stock */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                            <input
                                type="number"
                                {...register('stock', {
                                    required: 'Stock is required',
                                    max: { value: 9999, message: 'Stock must not exceed 4 digits' },
                                })}
                                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
                            />
                            {errors.stock && <p className="text-red-600 text-sm mt-1">{errors.stock.message}</p>}
                        </div>
                    </div>

                    {/* Description */}
                    <div className="mt-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                            rows="5"
                            {...register('description', { required: 'Description is required' })}
                            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
                        ></textarea>
                        {errors.description && <p className="text-red-600 text-sm mt-1">{errors.description.message}</p>}
                    </div>

                    {/* Images */}
                    <div className="mt-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Images</label>
                        <label className="flex items-center justify-center w-full rounded-2xl border-2 border-dashed border-gray-300 bg-white/60 px-4 py-8 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition">
                            <div>
                                <p className="text-gray-700 font-medium">Click to upload</p>
                                <p className="text-xs text-gray-500">PNG, JPG up to 5MB each</p>
                            </div>
                            <input
                                type="file"
                                {...register('images', { required: 'At least one image is required' })}
                                accept="image/*"
                                multiple
                                className="hidden"
                            />
                        </label>
                        {errors.images && <p className="text-red-600 text-sm mt-1">{errors.images.message}</p>}
                    </div>

                    {/* Thumbnails */}
                    {selectedImages && (
                        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                            {Array.from(selectedImages).map((file, index) => (
                                <div key={index} className="aspect-square overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                                    <img
                                        src={URL.createObjectURL(file)}
                                        alt={`preview-${index}`}
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Submit Button */}
                    <div className="mt-6 flex gap-x-2 items-center justify-end">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-white font-semibold shadow-sm hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition"
                        >
                            {isLoading ? 'Adding...' : 'Add Product'}
                        </button>
                        <button
                            type="reset"
                            disabled={isLoading}
                            className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-white font-semibold shadow-sm hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition"
                            onClick={() => reset()}
                        >
                            Reset
                        </button>
                    </div>
                </div>

                {/* Live Preview Card */}
                <div className="lg:sticky lg:top-4 h-fit">
                    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                        <div className="bg-gray-50 px-5 py-3 border-b border-gray-200">
                            <p className="text-sm font-semibold text-gray-700">Live Preview</p>
                            <p className="text-xs text-gray-500">See how your product will appear</p>
                        </div>
                        <div className="p-5">
                            <div className="overflow-hidden rounded-xl border border-gray-200 bg-gray-100 aspect-video mb-4">
                                {selectedImages && selectedImages.length > 0 ? (
                                    <img
                                        src={URL.createObjectURL(selectedImages[0])}
                                        alt="primary-preview"
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <div className="h-full w-full flex items-center justify-center text-gray-400 text-sm">Image preview</div>
                                )}
                            </div>

                            <div className="space-y-2">
                                <h3 className="text-lg font-bold text-gray-900">{name || 'Product name'}</h3>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700 border border-blue-100">
                                        {category || 'Category'}
                                    </span>
                                    <span className="text-gray-300">•</span>
                                    <span>Stock: {stock || 0}</span>
                                </div>
                                <p className="text-blue-600 font-semibold text-base">{price ? `₹${price}` : '₹0.00'}</p>
                                <p className="text-sm text-gray-700 leading-6 line-clamp-4">
                                    {description || 'Product description will appear here as you type.'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default Addproduct
