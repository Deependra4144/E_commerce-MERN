import React, { useState, useMemo, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../../../features/productlice/productSlice'
import Pagination from 'react-js-pagination'
import StarRatings from 'react-star-ratings'
import { deleteProduct } from '../../../features/productlice/adminProductSlice'
import { Link } from 'react-router-dom'
function AllProducts() {

    const [selectedProduct, setSelectedProduct] = useState(null)
    const [refresh, setRefresh] = useState(false)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [searchQuery, setSearchQuery] = useState('')
    const dispatch = useDispatch()
    const { products, resultPerPage, filterProductCount } = useSelector(state => state.product)



    const openDialog = (product) => {
        setSelectedProduct(product)
        setIsDialogOpen(true)
    }

    const closeDialog = () => {
        setIsDialogOpen(false)
        setSelectedProduct(null)
    }

    const filteredProducts = useMemo(() => {
        const query = searchQuery.trim().toLowerCase()
        if (!query) return products
        return products.filter(p =>
            p.name.toLowerCase().includes(query) ||
            p.category.toLowerCase().includes(query)
        )
    }, [products, searchQuery])

    const handleNextpage = (page) => {
        setCurrentPage(page);
    };

    const handleProductDelete = async () => {
        try {
            await dispatch(deleteProduct(selectedProduct._id));
            setRefresh(prev => !prev)
            closeDialog()
        } catch (err) {
            console.log(err.message)
        }

    }
    useEffect(() => {
        dispatch(getProducts({
            keyword: searchQuery,
            page: currentPage,
            price: [0, 200000],
            category: '',
            ratings: 0
        }));
    }, [searchQuery, currentPage, dispatch, refresh]);

    return (
        <div className="px-4 py-6">
            <div className="mb-5 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">All Products</h2>
                        <p className="text-sm text-gray-500">Browse, search, and manage your catalog.</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 ring-1 ring-gray-200">{filteredProducts.length} shown</span>
                        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 ring-1 ring-gray-200">{products.length} total</span>
                    </div>
                </div>
                <div className="mt-4">
                    <div className="relative w-full sm:w-96">
                        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                                <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 4.262 11.934l3.777 3.777a.75.75 0 1 0 1.06-1.06l-3.777-3.777A6.75 6.75 0 0 0 10.5 3.75Zm-5.25 6.75a5.25 5.25 0 1 1 10.5 0 5.25 5.25 0 0 1-10.5 0Z" clipRule="evenodd" />
                            </svg>
                        </span>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1) }}
                            placeholder="Search by name or category..."
                            className="w-full rounded-md border border-gray-300 bg-white px-10 py-2 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => { setSearchQuery(''); setCurrentPage(1) }}
                                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-gray-500 hover:bg-gray-100"
                                aria-label="Clear search"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                                    <path fillRule="evenodd" d="M6.72 6.72a.75.75 0 0 1 1.06 0L12 10.94l4.22-4.22a.75.75 0 1 1 1.06 1.06L13.06 12l4.22 4.22a.75.75 0 1 1-1.06 1.06L12 13.06l-4.22 4.22a.75.75 0 1 1-1.06-1.06L10.94 12 6.72 7.78a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                                </svg>
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto rounded-xl border border-gray-100 bg-white shadow-sm">
                <table className="min-w-full divide-y divide-gray-100">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">Image</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">Name</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">Category</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">Price</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">Stock</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">Rating</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {products.map(product => (
                            <tr key={product._id} className="hover:bg-gray-50">
                                <td className="px-4 py-3">
                                    <img src={product.images[0]} alt={product.name} className="h-12 w-12 rounded-lg object-cover ring-1 ring-gray-200" />
                                </td>
                                <td className="px-4 py-3">
                                    <button onClick={() => openDialog(product)} className="text-left font-medium text-indigo-600 hover:underline">
                                        {product.name}
                                    </button>
                                    <div className="mt-0.5 text-xs text-gray-500">ID: {product.id}</div>
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-700">
                                    <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-700 ring-1 ring-gray-200">{product.category}</span>
                                </td>
                                <td className="px-4 py-3 text-sm font-medium text-gray-900">${product.price.toFixed(2)}</td>
                                <td className="px-4 py-3 text-sm">
                                    <span className={`${product.stock > 20 ? 'bg-emerald-50 text-emerald-700 ring-emerald-200' : product.stock > 5 ? 'bg-amber-50 text-amber-700 ring-amber-200' : 'bg-red-50 text-red-700 ring-red-200'} inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ring-1`}>
                                        Stock: {product.stock}
                                    </span>
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-700">
                                    <span className="font-medium text-gray-900">
                                        <StarRatings
                                            rating={product.ratings}
                                            starRatedColor="#facc15"
                                            numberOfStars={5}
                                            starDimension="20px"
                                            starSpacing="2px"
                                        />
                                    </span>
                                </td>
                                <td className="px-4 py-3">
                                    <button onClick={() => openDialog(product)} className="inline-flex items-center gap-1 rounded-lg bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-indigo-700">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-4 w-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v8.25A2.25 2.25 0 006.75 20.25h10.5A2.25 2.25 0 0019.5 18V9.75" />
                                        </svg>
                                        View
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mt-4 flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
                <p className="text-sm text-gray-600">Page {currentPage} of {''}</p>
                <div className="flex items-center gap-1.5">

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
                </div>
            </div>

            {isDialogOpen && selectedProduct && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black/50" onClick={closeDialog} />
                    <div className="relative z-10 w-full max-w-5xl rounded-lg bg-white shadow-xl">
                        <div className="flex items-start gap-4 p-6">
                            <img src={selectedProduct.images[0]} alt={selectedProduct.name} className="h-40 w-40 rounded object-cover" />
                            <div className="flex-1">
                                <div className="flex items-start justify-between">
                                    <h3 className="text-xl font-semibold">{selectedProduct.name}</h3>
                                    <button onClick={closeDialog} className="rounded p-1 text-gray-500 hover:bg-gray-100">✕</button>
                                </div>
                                <p className="mt-1 text-sm text-gray-600">{selectedProduct.description}</p>
                                <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-gray-700">
                                    <div>
                                        <span className="font-medium">Category: </span>{selectedProduct.category}
                                    </div>
                                    <div>
                                        <span className="font-medium">Price: </span>${selectedProduct.price.toFixed(2)}
                                    </div>
                                    <div>
                                        <span className="font-medium">Stock: </span>{selectedProduct.stock}
                                    </div>
                                    <div>
                                        <span className="font-medium">Rating: </span>{selectedProduct.rating}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-end gap-3 border-t px-6 py-4">
                            <button className="rounded border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50" onClick={closeDialog}>Close</button>
                            <Link to={`/admin/products/edit/${selectedProduct._id}`} className="rounded bg-yellow-500 px-4 py-2 font-medium text-white hover:bg-yellow-600">Edit Product</Link>
                            <button className="rounded bg-red-600 px-4 py-2 font-medium text-white hover:bg-red-700" onClick={handleProductDelete}>Delete Product</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AllProducts
