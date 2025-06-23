import './home.css'
import { FaMouse } from 'react-icons/fa'
import Product from './Product'

function Home() {
    const product = {
        name: "Blue T-Shirt",
        images: [{ url: 'https://i.pinimg.com/474x/89/47/f9/8947f943d58bd5d8e5aaaa0f0bb0cb51.jpg' }],
        price: 2399,
        _id: "SiyaRam",
        rating: 5
    }
    return (
        <>

            <div className="relative flex justify-center items-center bg-blue-500 min-h-screen overflow-hidden">
                {/* Decorative clipped shape at the bottom */}
                <div
                    className="absolute left-0 bottom-0 w-full"
                    style={{
                        height: '100vmin',
                        backgroundColor: 'white',
                        clipPath: 'polygon(100% 65%, 0% 100%, 100% 100%)',
                        zIndex: 1,
                    }}
                />
                <div className="relative z-10 text-center flex justify-center items-center flex-col space-y-6 w-full">
                    <p className="text-xl font-semibold text-white">Welcome to Ecommerce</p>
                    <h1 className="text-3xl font-bold text-white">Find Amezing Products</h1>
                    <a href="#container">
                        <button className="rounded-full px-4 font-semibold hover:bg-blue-400 transition-all duration-500 hover:text-white py-2 flex items-center gap-1 bg-white">
                            Scroll <FaMouse />
                        </button>
                    </a>
                </div>

            </div>
            <div id="container" className='md:px-4 '>
                <h2 className='w-1/6 text-center mb-10 mx-auto border-b-2 border-blue-400 text-gray-600 font-bold text-2xl'>Featured Product</h2>
                <div className='flex flex-wrap gap-10 justify-center'>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((num, index) => {
                        return <Product key={index} product={product} />

                    })}
                </div>
            </div>

        </>
    )
}

export default Home
