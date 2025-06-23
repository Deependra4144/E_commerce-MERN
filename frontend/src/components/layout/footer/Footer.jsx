import React from 'react';
import logo from '/public/vite.svg';
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';

const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Products', href: '/products' },
];

function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-200 py-8 mt-16 animate-fadeInUp">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
                {/* Logo and Brand */}
                <div className="flex items-center space-x-3 group">
                    <img src={logo} alt="logo" className="h-8 w-8 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />
                    <span className="font-bold text-lg tracking-wide">MyBrand</span>
                </div>
                {/* Navigation Links */}
                <nav className="flex space-x-6">
                    {navLinks.map(link => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="relative px-2 py-1 hover:text-blue-400 transition-colors duration-300 group"
                        >
                            <span>{link.name}</span>
                            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></span>
                        </a>
                    ))}
                </nav>
                {/* Social Icons */}
                <div className="flex space-x-4">
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors duration-300">
                        <FaGithub className="w-5 h-5" />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors duration-300">
                        <FaTwitter className="w-5 h-5" />
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors duration-300">
                        <FaLinkedin className="w-5 h-5" />
                    </a>
                </div>
            </div>
            <div className="mt-8 text-center text-gray-400 text-sm">
                &copy; {new Date().getFullYear()} MyBrand. All rights reserved.
            </div>
        </footer>
    );
}

export default Footer; 