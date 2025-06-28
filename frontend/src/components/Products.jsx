import './pagination.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AllProducts } from '../features/productlice/productSlice';
import ProductCard from '../pages/ProductCard';
import Pagination from "react-js-pagination";
import { useDebounce } from 'use-debounce';
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import { FaFilter, FaTimes } from 'react-icons/fa';
import Cart from '/public/emptyCart.jpg'
import { useLocation } from 'react-router-dom';

function Products() {
    let location = useLocation()
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [queryKeyword, setQueryKeyword] = useState(location.state || '')
    const [selectcategorie, setSelectCategorie] = useState()
    const [price, setPrice] = useState([0, 5000]);
    const [debouncePrice] = useDebounce(price, 1000);
    const [showSidebar, setShowSidebar] = useState(false);
    const { products, loading, error, resultPerPage, filterProductCount } = useSelector(state => state.product);

    useEffect(() => {
        if (location.state) {
            setQueryKeyword(location.state)
        }
    }, [location.state])
    // console.log(queryKeyword)
    const Categories = [
        { name: '', icon: '📱' },
        { name: 'Electronics', icon: '📱' },
        { name: 'Fashion', icon: '👕' },
        { name: 'Home & Living', icon: '🏠' },
        { name: 'Books', icon: '📚' },
        { name: 'Sports', icon: '⚽' },
        { name: 'Beauty', icon: '💄' }
    ];

    const handleNextpage = (page) => {
        setCurrentPage(page);
    };

    const priceHandler = (e, newPrice) => {
        setPrice(newPrice);
    };

    useEffect(() => {
        dispatch(AllProducts({ keyword: queryKeyword, page: currentPage, price: debouncePrice, category: selectcategorie }));
    }, [debouncePrice, currentPage, dispatch, selectcategorie, queryKeyword]);




    if (loading) {
        return <div className="flex-col gap-4 flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
            <p className='text-xl font-bold text-gray-600'>Loading....</p>
        </div>
    }

    if (error) {
        return <p className="text-center text-red-600 font-semibold mt-10">{error}</p>
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-8 px-2 md:px-8">
            <div className="max-w-7xl   mx-auto">
                {/* Filter Toggler Button (md and above, left side) */}
                <div className="hidden md:flex justify-start mb-4">
                    <button
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors"
                        onClick={() => setShowSidebar(!showSidebar)}
                    >
                        <FaFilter />
                        Filter
                    </button>
                </div>
                <div className="flex flex-col md:flex-row gap-8 transition-all duration-300">
                    {/* Sidebar (md and above) */}
                    <div
                        className={`
                            hidden md:block
                            transition-all duration-300
                            ${showSidebar ? ' md:w-64 md:opacity-100 md:translate-x-0' : 'md:w-0 md:opacity-0 md:-translate-x-8'}
                            overflow-hidden
                        `}
                        style={{ minWidth: showSidebar ? '16rem' : '0' }}
                    >
                        <div className={`bg-white rounded-2xl shadow-md p-6 h-full relative transition-all duration-300 ${showSidebar ? '' : 'pointer-events-none'}`}>
                            <button
                                className="absolute top-3 right-3 text-gray-500 hover:text-blue-600 text-xl"
                                onClick={() => setShowSidebar(false)}
                                aria-label="Close filter"
                            >
                                <FaTimes />
                            </button>
                            <Typography className="!font-semibold !text-gray-700 !mb-2">Price Range</Typography>
                            <Slider
                                value={price}
                                onChange={priceHandler}
                                valueLabelDisplay='auto'
                                aria-labelledby='range-slider'
                                min={0}
                                max={5000}
                                sx={{ color: '#2563eb' }}
                            />
                            <div className="flex justify-between text-sm text-gray-500 mt-2">
                                <span>₹{price[0]}</span>
                                <span>₹{price[1]}</span>
                            </div>
                            <div className='mt-2'>
                                <Typography>Categories</Typography>
                                <ul className='text-sm font-semibold text-gray-600'>
                                    {Categories.map((categorie) => {
                                        return <li onClick={() => setSelectCategorie(categorie.name)} key={categorie.name} className='flex gap-1 cursor-pointer'>
                                            <input type='radio' name='name' id={categorie.name} />
                                            <label htmlFor={categorie.name}>{categorie.name === "" ? 'All' : `${categorie.name}`}</label>
                                        </li>
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                    {/* Price Filter always visible on sm screens */}
                    <div className="block md:hidden mb-6">
                        <div className="bg-white rounded-2xl shadow-md p-6">
                            <Typography className="!font-semibold !text-gray-700 !mb-2">Price Range</Typography>
                            <Slider
                                value={price}
                                onChange={priceHandler}
                                valueLabelDisplay='auto'
                                aria-labelledby='range-slider'
                                min={0}
                                max={5000}
                                sx={{ color: '#2563eb' }}
                            />
                            <div className="flex justify-between text-sm text-gray-500 mt-2">
                                <span>₹{price[0]}</span>
                                <span>₹{price[1]}</span>
                            </div>
                            <div className=''>
                                <Typography>Categories</Typography>
                                <ul className='text-sm font-semibold text-gray-600'>
                                    {Categories.map((categorie) => {
                                        return <li onClick={() => setSelectCategorie(categorie.name)} key={categorie.name} className='flex gap-1 cursor-pointer'>
                                            <input type='radio' name='name' id={categorie.name} />
                                            <label htmlFor={categorie.name}>{categorie.name}</label>
                                        </li>
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                    {/* Products Grid */}
                    <main className={`flex-1 transition-all duration-300 ${showSidebar ? 'md:w-3/4' : 'md:w-full'}`}>
                        {products.length === 0 ? (
                            <div className="flex flex-col items-center justify-center min-h-[300px]">
                                <img src={Cart} alt="No products" className="w-1/2 h-1/2 mb-4" />
                                <h2 className="text-xl font-semibold text-gray-600">No products found</h2>
                                <p className="text-gray-500 mt-2">Try adjusting your filters</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {products.map((product, index) => (
                                    <ProductCard key={product._id || index} product={product} />
                                ))}
                            </div>
                        )}
                        {/* Pagination */}
                        {resultPerPage < filterProductCount && <div className="flex flex-wrap justify-center gap-2 mt-10">
                            <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={resultPerPage}
                                totalItemsCount={20}
                                onChange={handleNextpage}
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
                        }

                    </main>
                </div>
            </div>
        </div>
    );
}

export default Products;
