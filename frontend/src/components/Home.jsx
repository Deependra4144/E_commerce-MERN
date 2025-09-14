import './home.css'
import { FaMouse, FaSearch, FaShoppingBag, FaChevronRight } from 'react-icons/fa'
import { getProducts } from '../features/productlice/productSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ProductCard from './pages/productPages/ProductCard'

const categories = [
    { name: 'Electronics', icon: '📱' },
    { name: 'Fashion', icon: '👕' },
    { name: 'Home & Living', icon: '🏠' },
    { name: 'Books', icon: '📚' },
    { name: 'Sports', icon: '⚽' },
    { name: 'Beauty', icon: '💄' }
];

function Home() {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { products, isLoading, error } = useSelector(state => state.product);
    const [searchQuery, setSearchQuery] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/products', { state: searchQuery });
    };

    useEffect(() => {
        dispatch(getProducts({
            keyword: '',
            page: 1,
            price: [0, 200000],
            category: '',
            ratings: 0
        }));
    }, [dispatch]);
    console.log(error)
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-r from-blue-600 to-blue-400 min-h-[80vh] flex items-center overflow-hidden">
                {/* Decorative SVG Background */}
                <div className="absolute inset-0 bg-blue-600 opacity-10">
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage:
                                'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%239C92AC\' fill-opacity=\'0.15\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                        }}
                    ></div>
                </div>

                {/* Hero Content */}
                <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center text-white">
                    <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold leading-tight">
                        Discover Amazing Products
                    </h1>
                    <p className="text-lg sm:text-xl md:text-2xl mt-4 text-blue-100">
                        Shop the latest trends with confidence
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-xl mx-auto mt-8">
                        <form onSubmit={handleSubmit} className="relative">
                            <input
                                type="search"
                                placeholder="Search products..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full px-6 py-3 pr-12 rounded-full text-gray-800 bg-white shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                            <button
                                type="submit"
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                            >
                                <FaSearch />
                            </button>
                        </form>
                    </div>

                    {/* Scroll Button */}
                    <a
                        href="#featured-products"
                        className="inline-block mt-10"
                    >
                        <button className="group bg-white text-blue-600 rounded-full px-6 py-3 font-semibold hover:bg-blue-50 transition-all duration-300 flex items-center gap-2">
                            Explore Products
                            <FaMouse className="group-hover:translate-y-1 transition-transform" />
                        </button>
                    </a>
                </div>

                {/* Wave Shape */}
                <div className="absolute bottom-0 left-0 right-0">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                        <path
                            fill="#f9fafb"
                            fillOpacity="1"
                            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L0,320Z"
                        ></path>
                    </svg>
                </div>
            </div>

            {/* Categories Section */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Shop by Category</h2>
                    <p className="text-gray-600 mt-2 text-sm sm:text-base">Find what you're looking for</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                    {categories.map((category, index) => (
                        <button
                            key={index}
                            className="p-4 sm:p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col items-center gap-2 group"
                        >
                            <span className="text-3xl sm:text-4xl">{category.icon}</span>
                            <span className="text-sm sm:text-base font-medium text-gray-700 group-hover:text-blue-600 flex items-center gap-1">
                                {category.name}
                                <FaChevronRight className="opacity-0 group-hover:opacity-100 transition-opacity" size={12} />
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Featured Products Section */}
            <div id="featured-products" className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-10">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Featured Products</h2>
                    <div className="w-20 h-1 bg-blue-500 mx-auto rounded-full"></div>
                </div>

                {isLoading ? (
                    <div className="flex justify-center items-center min-h-[200px]">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {products?.map((product, index) => (
                            <ProductCard key={product._id || index} product={product} />
                        ))}
                    </div>
                )}
                {error &&
                    <div>To See Product Login First</div>
                }
            </div>

            {/* Newsletter Section */}
            <div className="bg-blue-50 py-12 sm:py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-2xl mx-auto text-center">
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">Stay Updated</h2>
                        <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">
                            Subscribe to our newsletter for exclusive offers and updates
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Home;
