import React from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../features/productlice/adminProductSlice';

function Addproduct() {
    // const [productImg, setProductImg] = useState([])
    let dispatch = useDispatch()
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch
    } = useForm();
    let selectedImages = watch('images')


    const submitHandler = (data) => {
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


        // Dispatch formData
        dispatch(addProduct(formData));

        // reset(); // Reset form
    };


    return (
        <form
            onSubmit={handleSubmit((data) => { submitHandler(data) })}
            className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8 space-y-6"
        >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Create Product</h2>

            {/* Product Name */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                <input
                    type="text"
                    {...register('name', { required: 'Product name is required' })}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>}
            </div>

            {/* Description */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                    rows="4"
                    {...register('description', { required: 'Description is required' })}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
                {errors.description && <p className="text-red-600 text-sm mt-1">{errors.description.message}</p>}
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
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.price && <p className="text-red-600 text-sm mt-1">{errors.price.message}</p>}
            </div>

            {/* Category */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <input
                    type="text"
                    {...register('category', { required: 'Category is required' })}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.stock && <p className="text-red-600 text-sm mt-1">{errors.stock.message}</p>}
            </div>

            {/* Images */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Images</label>
                <input
                    type="file"
                    {...register('images', { required: 'At least one image is required' })}
                    accept="image/*"
                    multiple
                    className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.images && <p className="text-red-600 text-sm mt-1">{errors.images.message}</p>}
            </div>
            {/* Show selected images immediately below input */}
            {selectedImages && (
                <div className="image-preview" style={{ marginTop: "15px", display: "flex", flexWrap: "wrap", gap: "10px" }}>
                    {Array.from(selectedImages).map((file, index) => (
                        <img
                            key={index}
                            src={URL.createObjectURL(file)}
                            alt={`preview-${index}`}
                            width={100}
                            height={100}
                            style={{ objectFit: "cover", borderRadius: "8px", border: "1px solid #ccc" }}
                        />
                    ))}
                </div>
            )}
            {/* Submit Button */}
            <div className="text-center">
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-200 font-semibold"
                >
                    Submit Product
                </button>
            </div>
        </form>
    );
};

export default Addproduct
