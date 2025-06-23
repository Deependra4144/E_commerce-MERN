import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { productDetails } from "../features/productlice/productSlice";
import StarRatings from "react-star-ratings";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {
    FaTools,
    FaTruck,
    FaShieldAlt,
    FaMoneyBillWave,
    FaStar,
} from "react-icons/fa";
import Reviews from "./Reviews";


const ProductDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const { productDetail, loading, error } = useSelector((state) => state.product);
    // console.log(productDetail)
    useEffect(() => {
        dispatch(productDetails(id));
    }, [dispatch, id]);

    if (loading) return <p className="text-center mt-10 text-xl">Loading...</p>;
    if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;
    if (!productDetail) return null;

    return (
        <>
            <style>
                {`
        .carousel .thumb.selected,
        .carousel .thumb:focus {
          border: none !important;
          box-shadow: none !important;
        }
      `}
            </style>

            <div className="max-w-6xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

                    {/* Carousel with Thumbnails */}
                    <div>
                        <Carousel
                            showArrows={true}
                            showStatus={false}
                            showIndicators={false}
                            showThumbs={true}
                            thumbWidth={60}
                            dynamicHeight={false}
                            className="rounded-lg overflow-hidden"
                        >
                            {productDetail.images.map((img, index) => (
                                <div key={index}>
                                    <img
                                        src={img.url}
                                        alt={`${productDetail.name} ${index + 1}`}
                                        className="object-contain rounded-sm"
                                    />
                                </div>
                            ))}
                        </Carousel>
                        <p className="text-center text-sm text-blue-600 mt-2 cursor-pointer hover:underline">
                            Click to see full view
                        </p>
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-col gap-3">
                        <h1 className="text-2xl font-semibold text-gray-800">{productDetail.name}</h1>

                        <p className="text-blue-600 text-sm underline cursor-pointer">
                            Visit the {productDetail.brand} Store
                        </p>

                        <div className="flex items-center gap-2">
                            <StarRatings
                                rating={productDetail.rating}
                                starRatedColor="#facc15"
                                numberOfStars={5}
                                starDimension="20px"
                                starSpacing="2px"
                            />
                            <span className="text-sm text-gray-600">
                                ({productDetail.numOfReviews.toLocaleString()} ratings)
                            </span>
                        </div>

                        {/* Pricing */}
                        <div>
                            <span className="text-red-600 text-lg font-semibold mr-2">-62%</span>
                            <span className="text-3xl font-bold text-gray-800">₹{productDetail.price}</span>
                            <p className="text-sm line-through text-gray-500">M.R.P.: ₹999</p>
                            <p className="text-green-600 text-sm font-medium">Inclusive of all taxes</p>
                        </div>

                        {/* Offers */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                            <div className="border p-3 rounded-md">
                                <h4 className="font-semibold text-sm">Cashback</h4>
                                <p className="text-xs text-gray-600">Upto ₹11.00 cashback as Amazon Pay Balance</p>
                            </div>
                            <div className="border p-3 rounded-md">
                                <h4 className="font-semibold text-sm">Bank Offer</h4>
                                <p className="text-xs text-gray-600">Upto ₹1,250.00 discount on select Credit Cards</p>
                            </div>
                            <div className="border p-3 rounded-md">
                                <h4 className="font-semibold text-sm">Partner Offers</h4>
                                <p className="text-xs text-gray-600">Get GST invoice and save up to 28% on business purchases.</p>
                            </div>
                        </div>

                        {/* Features Icons */}
                        <div className="flex flex-wrap justify-center md:justify-normal gap-6 mt-6 text-sm text-gray-700">
                            <div className="flex flex-col items-center">
                                <FaTools size={24} className="text-blue-500" />
                                <span className="mt-1 text-center">7 days Service Centre</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <FaTruck size={24} className="text-green-500" />
                                <span className="mt-1 text-center">Free Delivery</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <FaShieldAlt size={24} className="text-purple-500" />
                                <span className="mt-1 text-center">1 Year Warranty</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <FaMoneyBillWave size={24} className="text-yellow-600" />
                                <span className="mt-1 text-center">Cash/Pay on Delivery</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <FaStar size={24} className="text-orange-400" />
                                <span className="mt-1 text-center">Top Brand</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-10">
                    <p className="border-b-2 w-1/4 mx-auto text-center font-semibold text-2xl">Reviews</p>

                    <div>
                        <Reviews reviews={productDetail.reviews} />
                    </div>
                </div>
            </div>

        </>
    );

};

export default ProductDetails;
