import React from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { User, ChevronRight } from "lucide-react";

import SearchBar from "./SearchBar";
import { navLinks } from "./navLinks";
import { menuVariants, itemVariants } from "./nabBarVariants";

const MobileMenu = ({ isOpen, setIsOpen, searchQuery, setSearchQuery, handleSearchSubmit }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop overlay - Darkened for focus */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 bg-black/50 z-30 md:hidden"
                    />

                    {/* Menu Container */}
                    <motion.div
                        variants={menuVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        className="
                            fixed top-16 left-0 right-0 z-40 
                            md:hidden 
                            bg-white/95 
                            backdrop-blur-xl 
                            border-b border-slate-200 
                            shadow-xl 
                            px-4 pt-4 pb-6 
                            space-y-4
                        "
                    >
                        {/* Search */}
                        <motion.div variants={itemVariants}>
                            <SearchBar
                                mobile
                                searchQuery={searchQuery}
                                setSearchQuery={setSearchQuery}
                                handleSearchSubmit={handleSearchSubmit}
                            />
                        </motion.div>

                        {/* Navigation Links */}
                        <div className="space-y-2">
                            {navLinks.map((link) => (
                                <motion.div key={link.path} variants={itemVariants}>
                                    <NavLink
                                        to={link.path}
                                        onClick={() => setIsOpen(false)}
                                        className={({ isActive }) =>
                                            `group flex items-center justify-between w-full px-4 py-3 rounded-2xl text-sm font-medium transition-all ${isActive
                                                ? "bg-indigo-50 text-indigo-600 shadow-sm"
                                                : "text-slate-700 hover:bg-slate-100 hover:text-indigo-600"
                                            }`
                                        }
                                    >
                                        <span>{link.label}</span>
                                        <ChevronRight className="w-4 h-4 opacity-60 transition-transform group-hover:translate-x-1" />
                                    </NavLink>
                                </motion.div>
                            ))}
                        </div>

                        {/* Account Section */}
                        <motion.div variants={itemVariants} className="pt-2">
                            <Link
                                to="/account"
                                onClick={() => setIsOpen(false)}
                                className="group flex items-center justify-between px-4 py-3 rounded-2xl bg-slate-100 hover:bg-indigo-50 text-slate-700 hover:text-indigo-600 transition-all"
                            >
                                <div className="flex items-center space-x-3">
                                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-sm">
                                        <User className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold">My Account</p>
                                        <p className="text-xs text-slate-400">Profile & Orders</p>
                                    </div>
                                </div>
                                <ChevronRight className="w-4 h-4 opacity-60 group-hover:translate-x-1" />
                            </Link>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default MobileMenu;