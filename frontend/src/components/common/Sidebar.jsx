import { NavLink } from "react-router-dom";
import { useState } from "react";

function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Mobile Toggle Button */}
            <div className="lg:hidden p-4">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md focus:outline-none"
                >
                    {isOpen ? "Close Menu" : "Open Menu"}
                </button>
            </div>

            {/* Sidebar */}
            <aside
                className={`fixed lg:static inset-y-0 left-0 transform ${isOpen ? "translate-x-0" : "-translate-x-full"
                    } lg:translate-x-0 transition-transform duration-300 ease-in-out bg-white border-r border-gray-200 lg:w-64 w-64 h-full shadow-lg z-50`}
            >
                <div className="flex items-center justify-center py-6 border-b">
                    <h1 className="text-xl font-bold text-indigo-700 tracking-wide">
                        Admin Panel
                    </h1>
                </div>

                <nav className="p-4">
                    <ul className="space-y-2">
                        <li>
                            <NavLink
                                to="/admin/dashboard"
                                end
                                className={({ isActive }) =>
                                    `flex items-center gap-3 rounded-md px-3 py-2 text-sm transition ${isActive
                                        ? "bg-indigo-100 text-indigo-700 font-semibold"
                                        : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                                    }`
                                }
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-5 h-5"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v8.25A2.25 2.25 0 006.75 20.25h10.5A2.25 2.25 0 0019.5 18V9.75"
                                    />
                                </svg>
                                <span>Overview</span>
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to="/admin/allProduct"
                                className={({ isActive }) =>
                                    `flex items-center gap-3 rounded-md px-3 py-2 text-sm transition ${isActive
                                        ? "bg-indigo-100 text-indigo-700 font-semibold"
                                        : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                                    }`
                                }
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-5 h-5"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                                    />
                                </svg>
                                <span>All Products</span>
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to="/admin/addProduct"
                                className={({ isActive }) =>
                                    `flex items-center gap-3 rounded-md px-3 py-2 text-sm transition ${isActive
                                        ? "bg-indigo-100 text-indigo-700 font-semibold"
                                        : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                                    }`
                                }
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-5 h-5"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 4.5v15m7.5-7.5h-15"
                                    />
                                </svg>
                                <span>Add Product</span>
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to="/admin/orders"
                                className={({ isActive }) =>
                                    `flex items-center gap-3 rounded-md px-3 py-2 text-sm transition ${isActive
                                        ? "bg-indigo-100 text-indigo-700 font-semibold"
                                        : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                                    }`
                                }
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-5 h-5"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08..."
                                    />
                                </svg>
                                <span>Orders</span>
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to="/admin/allUsers"
                                className={({ isActive }) =>
                                    `flex items-center gap-3 rounded-md px-3 py-2 text-sm transition ${isActive
                                        ? "bg-indigo-100 text-indigo-700 font-semibold"
                                        : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                                    }`
                                }
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-5 h-5"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15 19.128a9.38 9.38 0 002.625.372..."
                                    />
                                </svg>
                                <span>All Users</span>
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to="/admin/settings"
                                className={({ isActive }) =>
                                    `flex items-center gap-3 rounded-md px-3 py-2 text-sm transition ${isActive
                                        ? "bg-indigo-100 text-indigo-700 font-semibold"
                                        : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                                    }`
                                }
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-5 h-5"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M9.594 3.94c.09-.542.56-.94 1.11-.94..."
                                    />
                                </svg>
                                <span>Settings</span>
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </aside>
        </>
    );
}

export default Sidebar;
