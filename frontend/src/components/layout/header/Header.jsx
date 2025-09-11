import React, { useState, useEffect } from 'react'
import { FaHamburger, FaRegUser, FaSearch } from "react-icons/fa";
import { BsCart3 } from "react-icons/bs";
import { HiMenu, HiX } from "react-icons/hi";
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { isAuthenticate, user, isLoading, error } = useSelector(state => state.auth)
    // console.log(isAuthenticate, isLoading, user, error)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { name: 'Home', to: '/' },
        { name: 'Products', to: '/products' },
        { name: 'About', to: '/about' },
        { name: 'Contact', to: '/contact' },
    ];

    if (isLoading) {
        <p className="text-sm text-gray-600 text-center">Loggin...</p>

    }
    if (error) {
        <p className="text-sm text-red-600 text-center">{error}</p>

    }
    return (
        <nav className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200'
            : 'bg-transparent'
            }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16 lg:h-20">
                    {/* Logo */}
                    <div className="flex-shrink-0 group">
                        <FaHamburger className="h-8 w-8 lg:h-10 lg:w-10 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            {navItems.map((item, index) => (
                                <NavLink
                                    key={item.name}
                                    to={item.to}
                                    style={{ animationDelay: `${index * 100}ms` }}
                                    className={({ isActive }) =>
                                        `relative px-3 py-2 text-sm  transition-all duration-300 group ${isActive ? 'text-blue-600 font-bold' : 'text-gray-700 font-medium hover:text-blue-600'
                                        }`
                                    }
                                >
                                    {({ isActive }) => (
                                        <>
                                            <span className="relative z-10">{item.name}</span>
                                            <span
                                                className={`absolute bottom-0 left-0 h-0.5 bg-blue-600 transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'
                                                    }`}
                                            ></span>
                                        </>
                                    )}
                                </NavLink>
                            ))}
                        </div>
                    </div>


                    {/* Desktop Icons */}
                    <div className="hidden md:flex items-center space-x-6">
                        <button className="p-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all duration-300 hover:scale-110 group">
                            <FaSearch className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                        </button>
                        <Link to='/cart' className="relative p-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all duration-300 hover:scale-110 group">
                            <BsCart3 className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                                3
                            </span>
                        </Link>
                        {isAuthenticate ?
                            <Link to='/userAccount' className='p-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all duration-300 hover:scale-110 group'>
                                <img src={user.avatar} alt="" className="w-7 h-7 group-hover:scale-110 transition-transform rounded-full duration-300" />
                            </Link>
                            :
                            <Link to="/login" className="p-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all duration-300 hover:scale-110 group">
                                <FaRegUser className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                            </Link>
                        }

                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="p-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-all duration-300"
                        >
                            {isMobileMenuOpen ? (
                                <HiX className="w-6 h-6" />
                            ) : (
                                <HiMenu className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                <div className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                    <div className="px-2 pt-2 pb-3 space-y-1 bg-white/95 backdrop-blur-md rounded-lg mt-2 shadow-lg">
                        {navItems.map((item, index) => (
                            <a
                                key={item.name}
                                href={item.href}
                                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-all duration-300 transform hover:translate-x-2"
                                style={{ animationDelay: `${index * 50}ms` }}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {item.name}
                            </a>
                        ))}
                        <div className="flex items-center justify-center space-x-4 pt-4 border-t border-gray-200">
                            <button className="p-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all duration-300">
                                <FaSearch className="w-5 h-5" />
                            </button>
                            <button className="p-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all duration-300">
                                <FaRegUser className="w-5 h-5" />
                            </button>
                            <button className="relative p-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all duration-300">
                                <BsCart3 className="w-5 h-5" />
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                    3
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Header
