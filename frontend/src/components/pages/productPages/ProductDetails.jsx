import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { productDetails } from "../../../features/productlice/productSlice";
import StarRatings from "react-star-ratings";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Reviews } from "../../Index";
import {
    FaTools,
    FaTruck,
    FaShieldAlt,
    FaMoneyBillWave,
    FaStar,
    FaHeart,
    FaShare,
    FaShoppingCart
} from "react-icons/fa";

const ProductDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(1);

    const { productiDetail, loading, error } = useSelector((state) => state.product);

    useEffect(() => {
        dispatch(productDetails(id));

    }, [dispatch, id]);

    const handleQuantityChange = (change) => {
        setQuantity(prev => Math.max(1, Math.min(10, prev + change)));
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    );

    if (error) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="bg-red-50 p-4 rounded-lg">
                <p className="text-red-600">{error}</p>
            </div>
        </div>
    );

    if (!productiDetail) return null;

    const discountPercentage = Math.round(((999 - productiDetail.price) / 999) * 100);

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
                        {/* Left Column - Image Gallery */}
                        <div className="space-y-4">
                            <div className="relative">
                                <Carousel
                                    showArrows={true}
                                    showStatus={false}
                                    showIndicators={true}
                                    showThumbs={true}
                                    thumbWidth={60}
                                    dynamicHeight={false}
                                    className="rounded-xl overflow-hidden"
                                    renderArrowPrev={(clickHandler, hasPrev) => (
                                        hasPrev && (
                                            <button
                                                onClick={clickHandler}
                                                className="absolute left-0 z-10 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-r-lg shadow-md"
                                            >
                                                ❮
                                            </button>
                                        )
                                    )}
                                    renderArrowNext={(clickHandler, hasNext) => (
                                        hasNext && (
                                            <button
                                                onClick={clickHandler}
                                                className="absolute right-0 z-10 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-l-lg shadow-md"
                                            >
                                                ❯
                                            </button>
                                        )
                                    )}
                                >
                                    {productiDetail.images.map((img, index) => (
                                        <div key={index} className="aspect-square">
                                            <img
                                                src={img}
                                                alt={`${productiDetail.name} ${index + 1}`}
                                                className="object-contain w-full h-full"
                                            />
                                        </div>
                                    ))}
                                </Carousel>
                            </div>

                            <div className="flex justify-center gap-4">
                                <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
                                    <FaHeart className="text-red-500" />
                                    <span>Save</span>
                                </button>
                                <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
                                    <FaShare className="text-blue-500" />
                                    <span>Share</span>
                                </button>
                            </div>
                        </div>

                        {/* Right Column - Product Info */}
                        <div className="space-y-6">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">{productiDetail.name}</h1>
                                <a href="#" className="text-blue-600 hover:underline text-sm">
                                    Visit the {productiDetail.brand} Store
                                </a>
                            </div>

                            <div className="">
                                <div className="flex items-center gap-3">
                                    <StarRatings
                                        rating={productiDetail.rating}
                                        starRatedColor="#facc15"
                                        numberOfStars={5}
                                        starDimension="20px"
                                        starSpacing="2px"
                                    />
                                    <span className="text-sm text-gray-600">
                                        {productiDetail.numOfReviews.toLocaleString()} ratings
                                    </span>
                                </div>

                                {productiDetail.stock > 3 ?
                                    <span className="text-sm text-gray-600">{productiDetail.stock.toLocaleString()} items left
                                    </span>
                                    :
                                    <span className="text-sm text-red-600">{productiDetail.stock.toLocaleString()} items left herry up
                                    </span>
                                }


                            </div>

                            <div className="border-t border-b py-4">
                                <div className="flex items-baseline gap-2 mb-1">
                                    <span className="text-4xl font-bold text-gray-900">₹{productiDetail.price}</span>
                                    <span className="text-lg text-red-600 font-semibold">-{discountPercentage}%</span>
                                </div>
                                <p className="text-sm line-through text-gray-500">M.R.P.: ₹999</p>
                                <p className="text-green-600 text-sm font-medium mt-1">Inclusive of all taxes</p>
                            </div>

                            {/* Quantity Selector */}
                            <div className="flex items-center gap-4">
                                <span className="text-gray-700">Quantity:</span>
                                <div className="flex items-center border rounded-lg">
                                    <button
                                        onClick={() => handleQuantityChange(-1)}
                                        className="px-3 py-1 hover:bg-gray-100"
                                    >
                                        -
                                    </button>
                                    <span className="px-4 py-1 border-x">{quantity}</span>
                                    <button
                                        onClick={() => handleQuantityChange(1)}
                                        className="px-3 py-1 hover:bg-gray-100"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-4">
                                <button className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors">
                                    <FaShoppingCart />
                                    Add to Cart
                                </button>
                                <button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                                    Buy Now
                                </button>
                            </div>

                            {/* Offers Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h4 className="font-semibold text-sm text-gray-900">Cashback</h4>
                                    <p className="text-xs text-gray-600 mt-1">Upto ₹11.00 cashback as Amazon Pay Balance</p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h4 className="font-semibold text-sm text-gray-900">Bank Offer</h4>
                                    <p className="text-xs text-gray-600 mt-1">Upto ₹1,250.00 discount on select Credit Cards</p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h4 className="font-semibold text-sm text-gray-900">Partner Offers</h4>
                                    <p className="text-xs text-gray-600 mt-1">Get GST invoice and save up to 28% on business purchases.</p>
                                </div>
                            </div>

                            {/* Features Icons */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 pt-4 border-t">
                                <div className="flex flex-col items-center text-center p-2 rounded-lg hover:bg-gray-50">
                                    <FaTools size={24} className="text-blue-500 mb-2" />
                                    <span className="text-sm">7 Days Service</span>
                                </div>
                                <div className="flex flex-col items-center text-center p-2 rounded-lg hover:bg-gray-50">
                                    <FaTruck size={24} className="text-green-500 mb-2" />
                                    <span className="text-sm">Free Delivery</span>
                                </div>
                                <div className="flex flex-col items-center text-center p-2 rounded-lg hover:bg-gray-50">
                                    <FaShieldAlt size={24} className="text-purple-500 mb-2" />
                                    <span className="text-sm">1 Year Warranty</span>
                                </div>
                                <div className="flex flex-col items-center text-center p-2 rounded-lg hover:bg-gray-50">
                                    <FaMoneyBillWave size={24} className="text-yellow-600 mb-2" />
                                    <span className="text-sm">Cash on Delivery</span>
                                </div>
                                <div className="flex flex-col items-center text-center p-2 rounded-lg hover:bg-gray-50">
                                    <FaStar size={24} className="text-orange-400 mb-2" />
                                    <span className="text-sm">Top Brand</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Reviews Section */}
                    <div className="border-t bg-gray-50">
                        <div className="max-w-4xl mx-auto py-8 px-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                                Customer Reviews
                            </h2>
                            <Reviews reviews={productiDetail.reviews} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
