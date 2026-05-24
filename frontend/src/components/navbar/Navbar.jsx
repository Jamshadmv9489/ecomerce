import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import { ShoppingBag, User, Menu, X } from "lucide-react";

import SearchBar from "./SearchBar";
import MobileMenu from "./MobileMenu";
import { navLinks } from "./navLinks";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const navigate = useNavigate();

    const handleSearchSubmit = (e) => {
        e.preventDefault();

        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
            setIsOpen(false);
        }
    };

    return (
        <nav className="sticky top-0 z-50 border-b border-white/20 bg-white/70 backdrop-blur-xl shadow-sm">

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="flex items-center justify-between h-16 gap-4">

                    {/* Logo */}
                    <Link
                        to="/"
                        onClick={() => setIsOpen(false)}
                        className="text-2xl font-black tracking-tight text-indigo-600 transition-transform duration-200 hover:scale-105"
                    >
                        E
                        <span className="text-slate-900">
                            store
                        </span>
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.path}
                                to={link.path}
                                className={({ isActive }) =>
                                    `relative py-2 text-sm font-medium transition-all duration-200 group
                                    ${isActive
                                        ? "text-indigo-600"
                                        : "text-slate-600 hover:text-indigo-600"
                                    }`
                                }
                            >
                                {link.label}

                                <span className="absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 rounded-full bg-indigo-600 transition-transform duration-300 group-hover:scale-x-100" />
                            </NavLink>
                        ))}
                    </div>

                    {/* Desktop Search */}
                    <SearchBar
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        handleSearchSubmit={handleSearchSubmit}
                    />

                    {/* Desktop Icons */}
                    <div className="hidden md:flex items-center space-x-3">

                        {/* Account */}
                        <Link
                            to="/account"
                            className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-200"
                        >
                            <User className="w-5 h-5" />
                        </Link>

                        {/* Cart */}
                        <Link
                            to="/cart"
                            className="relative flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-200"
                        >
                            <ShoppingBag className="w-5 h-5" />

                            <span className="absolute top-1.5 right-1.5 bg-indigo-600 text-white text-[10px] font-bold min-w-[16px] h-4 px-1 rounded-full flex items-center justify-center">
                                0
                            </span>
                        </Link>
                    </div>

                    {/* Mobile Buttons */}
                    <div className="md:hidden flex items-center space-x-2">

                        {/* Mobile Cart */}
                        <Link
                            to="/cart"
                            className="relative flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-200"
                        >
                            <ShoppingBag className="w-5 h-5" />

                            <span className="absolute top-1.5 right-1.5 bg-indigo-600 text-white text-[10px] font-bold min-w-[16px] h-4 px-1 rounded-full flex items-center justify-center">
                                0
                            </span>
                        </Link>

                        {/* Animated Menu Button */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-200"
                        >
                            <AnimatePresence mode="wait" initial={false}>
                                <motion.div
                                    key={isOpen ? "close" : "menu"}
                                    initial={{ rotate: -90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: 90, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {isOpen ? (
                                        <X className="w-5 h-5" />
                                    ) : (
                                        <Menu className="w-5 h-5" />
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <MobileMenu
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                handleSearchSubmit={handleSearchSubmit}
            />
        </nav>
    );
};

export default Navbar;