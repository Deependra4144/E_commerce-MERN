import { Link } from 'react-router-dom'
import Sidebar from '../../common/Sidebar'

function Dashboard() {
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
                            <p className="text-xs text-gray-500">Total Revenue</p>
                            <h2 className="mt-1 text-2xl font-semibold">$24,320</h2>
                            <p className="mt-2 text-xs text-green-600">+12% from last month</p>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                            <p className="text-xs text-gray-500">Orders</p>
                            <h2 className="mt-1 text-2xl font-semibold">1,284</h2>
                            <p className="mt-2 text-xs text-green-600">+3% from last week</p>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                            <p className="text-xs text-gray-500">Customers</p>
                            <h2 className="mt-1 text-2xl font-semibold">8,912</h2>
                            <p className="mt-2 text-xs text-red-600">-1% churn</p>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                            <p className="text-xs text-gray-500">Conversion</p>
                            <h2 className="mt-1 text-2xl font-semibold">2.4%</h2>
                            <p className="mt-2 text-xs text-green-600">+0.2% WoW</p>
                        </div>
                    </section>

                    {/* Charts Placeholder */}
                    <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                        <div className="bg-white border border-gray-200 rounded-lg p-4 lg:col-span-2 h-64 flex items-center justify-center text-gray-400 text-sm">
                            Sales Chart (placeholder)
                        </div>
                        <div className="bg-white border border-gray-200 rounded-lg p-4 h-64 flex items-center justify-center text-gray-400 text-sm">
                            Traffic Sources (placeholder)
                        </div>
                    </section>

                    {/* Recent Orders */}
                    <section className="bg-white border border-gray-200 rounded-lg">
                        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                            <h3 className="font-medium">Recent Orders</h3>
                            <button className="text-sm text-indigo-600 hover:text-indigo-700">View all</button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-left text-sm">
                                <thead className="bg-gray-50 text-gray-600">
                                    <tr>
                                        <th className="px-4 py-3 font-medium">Order</th>
                                        <th className="px-4 py-3 font-medium">Customer</th>
                                        <th className="px-4 py-3 font-medium">Status</th>
                                        <th className="px-4 py-3 font-medium">Total</th>
                                        <th className="px-4 py-3 font-medium">Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[1, 2, 3, 4, 5].map(id => (
                                        <tr key={id} className="border-t">
                                            <td className="px-4 py-3">#{1000 + id}</td>
                                            <td className="px-4 py-3">Alex Johnson</td>
                                            <td className="px-4 py-3"><span className="inline-flex items-center rounded-full bg-green-50 px-2 py-0.5 text-xs text-green-700">Paid</span></td>
                                            <td className="px-4 py-3">$120.00</td>
                                            <td className="px-4 py-3">2025-09-01</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    )
}

export default Dashboard
