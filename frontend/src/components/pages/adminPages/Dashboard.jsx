
import { Link } from 'react-router-dom';
import Sidebar from '../../common/Sidebar';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getAllUsers } from '../../../features/productlice/adminProductSlice';
import { getProducts } from '../../../features/productlice/productSlice';

function Dashboard() {
    const dispatch = useDispatch();
    // Selectors
    const { allUsers, usersLoading, usersError } = useSelector(state => state.admin);
    const { products, isLoading: productsLoading, error: productsError } = useSelector(state => state.product);
    // You may have an orders slice, but not shown in context. If you do, add it here.

    useEffect(() => {
        dispatch(getAllUsers());
        dispatch(getProducts({ keyword: '', page: 1, price: [0, 100000], ratings: 0 }));
    }, [dispatch]);

    // Stats
    const totalUsers = allUsers?.length || 0;
    const totalProducts = products?.allProducts?.length || 0;
    // Placeholder for orders and revenue
    const totalOrders = 0; // Replace with real selector if you have orders slice
    const totalRevenue = 0; // Replace with real selector if you have revenue

    // Recent users/products
    const recentUsers = allUsers?.slice(-5).reverse() || [];
    const recentProducts = products?.allProducts?.slice(-5).reverse() || [];

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900">
            {/* Top Bar */}
            <header className="sticky top-0 z-30 bg-white border-b border-gray-200">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <h1 className="text-lg font-semibold">Admin Dashboard</h1>
                    <div className="flex items-center gap-3">
                        <input className="hidden md:block w-64 rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Search..." />
                        <Link to="/" className="text-sm text-indigo-600 hover:text-indigo-700">View site</Link>
                    </div>
                </div>
            </header>

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-6">
                {/* Sidebar */}
                <Sidebar />

                {/* Main Content */}
                <main className="space-y-6">
                    {/* Stats */}
                    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                            <p className="text-xs text-gray-500">Total Products</p>
                            <h2 className="mt-1 text-2xl font-semibold">{productsLoading ? '...' : totalProducts}</h2>
                            <p className="mt-2 text-xs text-green-600">{productsError ? productsError : ''}</p>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                            <p className="text-xs text-gray-500">Total Users</p>
                            <h2 className="mt-1 text-2xl font-semibold">{usersLoading ? '...' : totalUsers}</h2>
                            <p className="mt-2 text-xs text-green-600">{usersError ? usersError : ''}</p>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                            <p className="text-xs text-gray-500">Total Orders</p>
                            <h2 className="mt-1 text-2xl font-semibold">{totalOrders}</h2>
                            <p className="mt-2 text-xs text-green-600">(Add orders slice for live data)</p>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                            <p className="text-xs text-gray-500">Total Revenue</p>
                            <h2 className="mt-1 text-2xl font-semibold">${totalRevenue}</h2>
                            <p className="mt-2 text-xs text-green-600">(Add revenue logic)</p>
                        </div>
                    </section>

                    {/* Recent Users */}
                    <section className="bg-white border border-gray-200 rounded-lg">
                        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                            <h3 className="font-medium">Recent Users</h3>
                            <button className="text-sm text-indigo-600 hover:text-indigo-700">View all</button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-left text-sm">
                                <thead className="bg-gray-50 text-gray-600">
                                    <tr>
                                        <th className="px-4 py-3 font-medium">Name</th>
                                        <th className="px-4 py-3 font-medium">Email</th>
                                        <th className="px-4 py-3 font-medium">Role</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {usersLoading ? (
                                        <tr><td colSpan={3} className="px-4 py-3">Loading...</td></tr>
                                    ) : recentUsers.length === 0 ? (
                                        <tr><td colSpan={3} className="px-4 py-3">No users found</td></tr>
                                    ) : recentUsers.map(user => (
                                        <tr key={user._id} className="border-t">
                                            <td className="px-4 py-3">{user.name}</td>
                                            <td className="px-4 py-3">{user.email}</td>
                                            <td className="px-4 py-3">{user.role}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* Recent Products */}
                    <section className="bg-white border border-gray-200 rounded-lg mt-6">
                        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                            <h3 className="font-medium">Recent Products</h3>
                            <button className="text-sm text-indigo-600 hover:text-indigo-700">View all</button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-left text-sm">
                                <thead className="bg-gray-50 text-gray-600">
                                    <tr>
                                        <th className="px-4 py-3 font-medium">Name</th>
                                        <th className="px-4 py-3 font-medium">Price</th>
                                        <th className="px-4 py-3 font-medium">Category</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {productsLoading ? (
                                        <tr><td colSpan={3} className="px-4 py-3">Loading...</td></tr>
                                    ) : recentProducts.length === 0 ? (
                                        <tr><td colSpan={3} className="px-4 py-3">No products found</td></tr>
                                    ) : recentProducts.map(product => (
                                        <tr key={product._id} className="border-t">
                                            <td className="px-4 py-3">{product.name}</td>
                                            <td className="px-4 py-3">${product.price}</td>
                                            <td className="px-4 py-3">{product.category}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
}

export default Dashboard;
