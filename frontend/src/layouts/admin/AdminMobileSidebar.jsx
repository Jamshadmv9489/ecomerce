import React from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { adminLinks } from "./adminLinks";

const AdminMobileSidebar = ({ isOpen, onClose }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Background overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    />

                    {/* Mobile drawer */}
                    <motion.aside
                        initial={{ x: "-100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "-100%" }}
                        transition={{ type: "tween", duration: 0.3 }}
                        className="fixed top-0 left-0 bottom-0 z-50 w-64 bg-slate-950 p-5 md:hidden"
                    >
                        {/* Header */}
                        <div className="flex justify-between items-center mb-10">
                            <div>
                                <h1 className="text-2xl font-black text-indigo-500">Admin</h1>
                                <p className="text-xs text-slate-500 mt-1">Dashboard Panel</p>
                            </div>
                            <button onClick={onClose} className="text-slate-400">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Navigation links */}
                        <nav className="space-y-2">
                            {adminLinks.map((link) => {
                                const Icon = link.icon;
                                return (
                                    <NavLink
                                        key={link.path}
                                        to={link.path}
                                        onClick={onClose}
                                        className={({ isActive }) =>
                                            `flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all
                                            ${isActive ? "bg-indigo-500 text-white" : "text-slate-400 hover:bg-slate-900 hover:text-white"}`
                                        }
                                    >
                                        <Icon className="w-5 h-5" />
                                        {link.label}
                                    </NavLink>
                                );
                            })}
                        </nav>
                    </motion.aside>
                </>
            )}
        </AnimatePresence>
    );
};

export default AdminMobileSidebar;