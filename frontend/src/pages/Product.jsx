import { Link } from "react-router-dom";
import StarRatings from 'react-star-ratings';

const ProductCard = ({ product }) => {
    return (
        <Link
            to={`/${product._id}`}
            className="relative group border-2 block w-1/5 pt-2 bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-3 transition-all duration-300 overflow-hidden"
        >

            <img
                src={product.images[0].url}
                alt={product.name}
                className="w-60 mx-auto object-cover mt-3 group-hover:scale-105 transition-all duration-300"
            />

            <div className="p-4">
                <p className="text-lg font-semibold text-gray-800 truncate">
                    {product.name}
                </p>

                <div className="">
                    <StarRatings
                        rating={product.rating}
                        starRatedColor="#ffd700"
                        numberOfStars={5}
                        starDimension="15px"
                        starSpacing="1px"
                    />
                    <p className="text-xs text-gray-500">(256 reviews)</p>
                </div>

                <span className="block mt-3 text-xl font-bold text-blue-600">
                    ₹{product.price}
                </span>
            </div>
        </Link>
    );
};

export default ProductCard;
