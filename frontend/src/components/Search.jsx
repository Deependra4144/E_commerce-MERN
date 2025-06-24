import React from 'react'
// import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import ProductCard from '../pages/ProductCard'

function Search() {
    // const dispatch = useDispatch()
    const { products, loading, error } = useSelector(state => state.product)
    // console.log(products)

    if (loading) {
        return <div className="flex-col gap-4 flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
            <p className='text-xl font-bold text-gray-600'>Loading....</p>
        </div>
    }
    if (error) {
        return <p className='text-xl font-bold text-gray-600'>404 product not found</p>
    }
    return (
        <>
            <div className="px-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product, index) => (
                    <ProductCard key={product._id || index} product={product} />
                ))}
            </div>
        </>
    )
}

export default Search
