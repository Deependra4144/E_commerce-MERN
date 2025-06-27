import './pagination.css';
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AllProducts } from '../features/productlice/productSlice'
import ProductCard from '../pages/ProductCard'
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import Pagination from "react-js-pagination";
import { useState } from 'react';
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";


function Products() {
    let dispatch = useDispatch()
    const [currentPage, setCurrentPage] = useState(1)
    const [price, setPrice] = useState([0, 25000])

    const { products, loading, error, resultPerPage } = useSelector(state => state.product)
    console.log(products.length)

    const handleNextpage = (page) => {
        dispatch(AllProducts(page))
        setCurrentPage(page)
    }
    // http://localhost:4000/api/v1/products?&page=2

    const priceHandler = (e, newPrice) => {
        setPrice(newPrice)

    }
    useEffect(() => {
        dispatch(AllProducts())
    }, [])

    if (loading) {
        // console.log(loading)
        return <div className="flex-col gap-4 flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
            <p className='text-xl font-bold text-gray-600'>Loading....</p>
        </div>
    }

    if (error) {
        return <p>{error}</p>
    }
    return (
        <>

            <div className="px-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product, index) => (
                    <ProductCard key={product._id || index} product={product} />
                ))}
            </div>

            {/* {price filter-box} */}

            <div className="w-32">
                <Typography>Price</Typography>
                <Slider
                    value={price}
                    onChange={priceHandler}
                    valueLabelDisplay='auto'
                    aria-labelledby='range-slider'
                    min={0}
                    max={25000}
                />
            </div>
            <div className="flex flex-wrap justify-center gap-2 mt-10">
                <Pagination
                    activePage={currentPage}
                    itemsCountPerPage={resultPerPage}
                    totalItemsCount={20}
                    onChange={(page) => { handleNextpage(page) }}  // Fix: Function, not number
                    nextPageText="Next"
                    prevPageText="Prev"
                    nextClass={products.length < 8 ? 'disabled-pagination' : ''}
                    prevClass={currentPage === 1 ? 'disabled-pagination' : ''}
                    itemClass="mx-2"
                    linkClass="px-3 py-1 border text-sm rounded text-blue-600 border-blue-300 hover:bg-blue-100"
                    activeClass="bg-blue-200 text-gray-600"
                    activeLinkClass="text-green-500 font-bold"
                />
            </div>

        </>
    )
}

export default Products
