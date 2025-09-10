import '../../pagination.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../../features/productlice/productSlice';
import ProductCard from '../productPages/ProductCard';
import Pagination from "react-js-pagination";
import { useDebounce } from 'use-debounce';
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import { FaFilter, FaTimes, FaRupeeSign, FaStar, FaTags } from 'react-icons/fa';
import Cart from '/public/emptyCart.jpg'
import { useLocation } from 'react-router-dom';

function Products() {
    let location = useLocation()
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [ratings, setRatings] = useState(0)
    const [queryKeyword, setQueryKeyword] = useState(location.state || '')
    const [selectcategorie, setSelectCategorie] = useState('')
    const [price, setPrice] = useState([0, 200000]);
    const [debouncePrice] = useDebounce(price, 800);
    const [showSidebar, setShowSidebar] = useState(false);
    const { products, isLoading, error, resultPerPage, filterProductCount } = useSelector(state => state.product);


    const Categories = [
        { name: '', icon: '🏠', label: 'All Categories' },
        { name: 'Electronics', icon: '📱', label: 'Electronics' },
        { name: 'Fashion', icon: '👕', label: 'Fashion' },
        { name: 'Home & Living', icon: '🏠', label: 'Home & Living' },
        { name: 'Books', icon: '📚', label: 'Books' },
        { name: 'Sports', icon: '⚽', label: 'Sports' },
        { name: 'Beauty', icon: '💄', label: 'Beauty' }
    ];

    const handleNextpage = (page) => {
        setCurrentPage(page);
    };

    console.log(location.state, products)

    useEffect(() => {
        if (location.state) {
            setQueryKeyword(location.state)
        }
    }, [location.state])
    useEffect(() => {
        dispatch(getProducts({
            keyword: queryKeyword,
            page: currentPage,
            price: debouncePrice,
            category: selectcategorie,
            ratings
        }));

    }, [
        debouncePrice,
        currentPage,
        dispatch,
        selectcategorie,
        queryKeyword,
        ratings
    ]);
    // console.log(products)
    // products.forEach(pr => pr.images.forEach(img => console.log(img)))
    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p className='text-xl font-bold text-gray-600'>Loading products...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center px-4">
                <div className="text-center bg-white rounded-xl p-6 shadow-lg">
                    <p className="text-red-600 font-semibold text-lg">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-4 sm:py-6 lg:py-8 px-3 sm:px-4 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Filter Toggler Button (all screen sizes) */}
                <div className={`flex justify-start transition-all duration-300 ${showSidebar ? 'mb-4 sm:mb-6' : 'mb-0 sm:mb-8 lg:mb-4'}`}>
                    <button
                        className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300 hover:shadow-lg text-sm font-medium"
                        onClick={() => setShowSidebar(!showSidebar)}
                    >
                        <FaFilter className="text-sm" />
                        <span className="hidden sm:inline">{showSidebar ? 'Hide' : 'Show'} Filters</span>
                        <span className="sm:hidden">{showSidebar ? 'Hide' : 'Filter'}</span>
                    </button>
                </div>

                <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8 transition-all duration-300">
                    {/* Sidebar (all screen sizes) */}
                    <div
                        className={`
                                    ${showSidebar ? 'block' : 'hidden'}
                                     h-full w-4/5 sm:w-3/5 bg-white p-4 sm:p-6 rounded-r-xl shadow-lg transition-all duration-300
                                    lg:static lg:block lg:w-64 lg:rounded-xl lg:shadow-xl lg:translate-x-0
                                `}
                    >

                        <div className={`rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 h-fit lg:sticky lg:top-6 transition-all duration-300 ${showSidebar ? '' : 'pointer-events-none hidden'}`}>
                            {/* Header */}
                            <div className="flex items-center md:justify-between mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-gray-100">
                                <div className="flex items-center gap-2 sm:gap-3">
                                    <FaFilter className="text-blue-600 text-lg sm:text-xl" />
                                    <h3 className="text-lg sm:text-xl font-bold text-gray-800">Filters</h3>
                                </div>
                                <button
                                    className="p-1.5 sm:p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                    onClick={() => setShowSidebar(false)}
                                    aria-label="Close filter"
                                >
                                    <FaTimes className="text-sm sm:text-base" />
                                </button>
                            </div>

                            {/* Price Range Section */}
                            <div className="mb-4 sm:mb-6">
                                <div className="flex items-center gap-2 mb-2 sm:mb-3">
                                    <FaRupeeSign className="text-blue-600 text-sm sm:text-base" />
                                    <Typography className="!font-semibold !text-gray-800 !text-sm sm:!text-base">Price Range</Typography>
                                </div>
                                <Slider
                                    value={price}
                                    onChange={(e, newPrice) => setPrice(newPrice)}
                                    valueLabelDisplay='auto'
                                    aria-labelledby='range-slider'
                                    min={0}
                                    max={200000}
                                    sx={{
                                        color: '#2563eb',
                                        '& .MuiSlider-thumb': {
                                            backgroundColor: '#2563eb',
                                            boxShadow: '0 2px 8px rgba(37, 99, 235, 0.3)',
                                        },
                                        '& .MuiSlider-track': {
                                            backgroundColor: '#2563eb',
                                        }
                                    }}
                                />
                                <div className="flex justify-between text-xs text-gray-600 mt-2 px-1">
                                    <span className="font-medium">₹{price[0].toLocaleString()}</span>
                                    <span className="font-medium">₹{price[1].toLocaleString()}</span>
                                </div>
                            </div>

                            {/* Categories Section */}
                            <div className="mb-4 sm:mb-6">
                                <div className="flex items-center gap-2 mb-2 sm:mb-3">
                                    <FaTags className="text-blue-600 text-sm sm:text-base" />
                                    <Typography className="!font-semibold !text-gray-800 !text-sm sm:!text-base">Categories</Typography>
                                </div>
                                <div className="space-y-1.5 sm:space-y-2">
                                    {Categories.map((category) => (
                                        <label
                                            key={category.name}
                                            className={`flex items-center gap-2 p-1.5 sm:p-2 rounded-lg cursor-pointer transition-all duration-200 hover:bg-blue-50 ${selectcategorie === category.name ? 'bg-blue-100 border border-blue-200' : 'hover:border-blue-200'
                                                }`}
                                        >
                                            <input
                                                type="radio"
                                                name="category"
                                                value={category.name}
                                                checked={selectcategorie === category.name}
                                                onChange={() => setSelectCategorie(category.name)}
                                                className="w-3 h-3 text-blue-600 border-gray-300 focus:ring-blue-500"
                                            />
                                            <span className="text-base sm:text-lg">{category.icon}</span>
                                            <span className="font-medium text-gray-700 text-xs sm:text-sm">{category.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Ratings Section */}
                            <div className="mb-4 sm:mb-6">
                                <div className="flex items-center gap-2 mb-2 sm:mb-3">
                                    <FaStar className="text-blue-600 text-sm sm:text-base" />
                                    <Typography className="!font-semibold !text-gray-800 !text-sm sm:!text-base">Minimum Rating</Typography>
                                </div>
                                <div className="px-1">
                                    <Slider
                                        value={ratings}
                                        onChange={(e, newRating) => setRatings(newRating)}
                                        min={0}
                                        max={5}
                                        step={0.5}
                                        valueLabelDisplay='auto'
                                        aria-labelledby='rating-slider'
                                        sx={{
                                            color: '#fbbf24',
                                            '& .MuiSlider-thumb': {
                                                backgroundColor: '#fbbf24',
                                                boxShadow: '0 2px 8px rgba(251, 191, 36, 0.3)',
                                            },
                                            '& .MuiSlider-track': {
                                                backgroundColor: '#fbbf24',
                                            }
                                        }}
                                    />
                                    <div className="flex justify-between text-xs text-gray-600 mt-2">
                                        <span className="font-medium">Any Rating</span>
                                        <span className="font-medium flex items-center gap-1">
                                            {ratings} <FaStar className="text-yellow-400 text-xs" />
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Clear Filters Button */}
                            <button
                                className="w-full py-2.5 sm:py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg sm:rounded-xl hover:bg-gray-200 transition-colors text-sm sm:text-base"
                                onClick={() => {
                                    setPrice([0, 200000]);
                                    setRatings(0);
                                    setSelectCategorie('');
                                }}
                            >
                                Clear All Filters
                            </button>
                        </div>
                    </div>

                    {/* Products Grid */}
                    <main className={`flex-1 transition-all duration-300 ${showSidebar ? 'lg:w-3/4' : 'w-full'}`}>
                        {products.length === 0 ? (
                            <div className="flex flex-col items-center justify-center min-h-[250px] sm:min-h-[300px] px-4">
                                <img src={Cart} alt="No products" className="w-48 h-48 sm:w-64 sm:h-64 mb-4 opacity-60" />
                                <h2 className="text-lg sm:text-xl font-semibold text-gray-600 text-center">No products found</h2>
                                <p className="text-gray-500 mt-2 text-center text-sm sm:text-base">Try adjusting your filters</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
                                {products.map((product, index) => (
                                    <ProductCard key={product._id || index} product={product} />
                                ))}
                            </div>
                        )}

                        {/* Pagination */}
                        {resultPerPage < filterProductCount && (
                            <div className="flex flex-wrap justify-center gap-1 sm:gap-2 mt-6 sm:mt-10">
                                <Pagination
                                    activePage={currentPage}
                                    itemsCountPerPage={resultPerPage}
                                    totalItemsCount={20}
                                    onChange={handleNextpage}
                                    nextPageText="Next"
                                    prevPageText="Prev"
                                    nextClass={products.length < 8 ? 'disabled-pagination' : ''}
                                    prevClass={currentPage === 1 ? 'disabled-pagination' : ''}
                                    itemClass="mx-1 sm:mx-2"
                                    linkClass="px-2 sm:px-3 py-1 border text-xs sm:text-sm rounded text-blue-600 border-blue-300 hover:bg-blue-100"
                                    activeClass="bg-blue-200 text-gray-600"
                                    activeLinkClass="text-green-500 font-bold"
                                />
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}

export default Products;
