import './home.css'
import { FaMouse } from 'react-icons/fa'
import Product from '../pages/Product'
import { AllProducts } from '../features/productlice/productSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

function Home() {
    let dispatch = useDispatch()
    const { products, loading } = useSelector(state => state.product)

    useEffect(() => {
        dispatch(AllProducts())
    }, [])


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
                {!loading ? (<div className='flex flex-wrap gap-10 justify-center'>
                    {products.map((product, index) => {
                        return <Product key={index} product={product} />

                    })}
                </div>) : (<p className='text-center text-2xl font-semibold'>Loading....</p>)}
            </div>

        </>
    )
}

export default Home
