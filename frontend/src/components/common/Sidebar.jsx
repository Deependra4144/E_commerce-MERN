import { NavLink } from 'react-router-dom'

function Sidebar() {
    return (
        <aside className="bg-white border border-gray-200 rounded-lg h-max">
            <nav className="p-3">
                <ul className="space-y-1">
                    <li>
                        <NavLink
                            to="/admin/dashboard"
                            end
                            className={({ isActive }) =>
                                `flex items-center gap-2 rounded-md px-3 py-2 text-sm ${isActive
                                    ? 'bg-indigo-50 text-indigo-700 font-medium'
                                    : 'hover:bg-gray-50'
                                }`
                            }
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v8.25A2.25 2.25 0 006.75 20.25h10.5A2.25 2.25 0 0019.5 18V9.75" />
                            </svg>
                            <span>Overview</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/admin/allProduct"
                            className={({ isActive }) =>
                                `flex items-center gap-2 rounded-md px-3 py-2 text-sm ${isActive
                                    ? 'bg-indigo-50 text-indigo-700 font-medium'
                                    : 'hover:bg-gray-50'
                                }`
                            }
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                            </svg>
                            <span>All Products</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/admin/addProduct"
                            className={({ isActive }) =>
                                `flex items-center gap-2 rounded-md px-3 py-2 text-sm ${isActive
                                    ? 'bg-indigo-50 text-indigo-700 font-medium'
                                    : 'hover:bg-gray-50'
                                }`
                            }
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                            <span>Add Product</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/admin/orders"
                            className={({ isActive }) =>
                                `flex items-center gap-2 rounded-md px-3 py-2 text-sm ${isActive
                                    ? 'bg-indigo-50 text-indigo-700 font-medium'
                                    : 'hover:bg-gray-50'
                                }`
                            }
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2 2 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                            </svg>
                            <span>Orders</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/admin/allUsers"
                            className={({ isActive }) =>
                                `flex items-center gap-2 rounded-md px-3 py-2 text-sm ${isActive
                                    ? 'bg-indigo-50 text-indigo-700 font-medium'
                                    : 'hover:bg-gray-50'
                                }`
                            }
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                            </svg>
                            <span>All Users</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/admin/settings"
                            className={({ isActive }) =>
                                `flex items-center gap-2 rounded-md px-3 py-2 text-sm ${isActive
                                    ? 'bg-indigo-50 text-indigo-700 font-medium'
                                    : 'hover:bg-gray-50'
                                }`
                            }
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span>Settings</span>
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </aside>
    )
}

export default Sidebar
