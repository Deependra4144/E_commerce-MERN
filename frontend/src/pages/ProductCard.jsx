import { Link } from "react-router-dom";
import StarRatings from 'react-star-ratings';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaShoppingCart, FaHeart, FaEye } from 'react-icons/fa';

const ProductCard = ({ product }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
    };

    const calculateDiscount = () => {
        const mrp = 999; // This should come from product data
        const discount = ((mrp - product.price) / mrp) * 100;
        return Math.round(discount);
    };

    return (
        <div className="group bg-gray-100 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300">
            {/* Product Image */}
            <div className="relative overflow-hidden rounded-t-2xl aspect-square">
                <Slider {...settings}>
                    {product.images.map((img, index) => (
                        <div key={index} className="aspect-square">
                            <img
                                src={img.url}
                                alt={img.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ))}
                </Slider>

                {/* Quick Action Buttons */}
                <div className="absolute top-4 right-4 flex flex-col gap-2 transform translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                    <button className="p-2 bg-white rounded-full shadow-md hover:bg-blue-50 transition-colors">
                        <FaHeart className="text-red-500 w-5 h-5" />
                    </button>
                    <Link to={`/product/${product._id}`} className="p-2 bg-white rounded-full shadow-md hover:bg-blue-50 transition-colors">
                        <FaEye className="text-blue-500 w-5 h-5" />
                    </Link>
                </div>

                {/* Discount Badge */}
                <div className="absolute top-4 left-4">
                    <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        {calculateDiscount()}% OFF
                    </span>
                </div>
            </div>

            {/* Product Info */}
            <div className="p-4">
                <Link to={`/product/${product._id}`} className="block">
                    <h3 className="text-lg font-medium text-gray-800 hover:text-blue-600 transition-colors line-clamp-2 min-h-[3.6rem]">
                        {product.name}
                    </h3>
                </Link>

                <div className="mt-2 flex items-center gap-2">
                    <StarRatings
                        rating={product.rating}
                        starRatedColor="#facc15"
                        numberOfStars={5}
                        starDimension="16px"
                        starSpacing="1px"
                    />
                    <span className="text-sm text-gray-500">
                        ({product.numOfReviews})
                    </span>
                </div>

                <div className="mt-3 space-y-1">
                    <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
                        <span className="text-sm text-gray-500 line-through">₹999</span>
                    </div>
                    <p className="text-sm text-green-600">Free Delivery</p>
                </div>

                {/* Add to Cart Button */}
                {/* <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors">
                    <FaShoppingCart />
                    <span>Add to Cart</span>
                </button> */}
            </div>
        </div>
    );
};

export default ProductCard;
