import React from 'react';
import StarRatings from "react-star-ratings";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

function Reviews({ reviews }) {
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

            <Carousel
                showArrows={true}
                showStatus={false}
                showIndicators={false}
                showThumbs={false}
                dynamicHeight={false}
                className="rounded-lg overflow-hidden"
            >
                {reviews ? (reviews.map((review, index) => (
                    <div key={index} className="flex justify-center py-6 px-4 bg-white">
                        <div className="max-w-md w-full border rounded-lg shadow-md p-5">
                            {/* User Info */}
                            <div className="flex flex-col justify-center items-center gap-4 mb-4">
                                <div className='w-20 h-20'>
                                    <img
                                        src={'https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D'}
                                        alt='user image'
                                        className="w-full h-full rounded-full object-cover"
                                    />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-lg text-gray-800">{review.name}</h4>
                                    <StarRatings
                                        rating={review.rating}
                                        starRatedColor="#facc15"
                                        numberOfStars={5}
                                        starDimension="18px"
                                        starSpacing="2px"
                                    />
                                </div>
                            </div>

                            {/* Comment */}
                            <p className="text-gray-700 text-sm leading-relaxed">{review.comment} snfok sdfof sfoif askfsiofs siofas asidfsad sfiosaf asfasjd smsbj ssjdfs asdfbsd fsofs fsofk sfaskdf sdfsaf safioasf asfsjkf mdsfbdsjkfbadsfjkds sdjfsd .vsjfk .dsfjksd fsdkf sddssdkl sdk </p>
                        </div>
                    </div>
                ))) : <p className='text-center font-semibold text-xl'>No Reviews Yet !!</p>}
            </Carousel>
        </>
    );
}

export default Reviews;
