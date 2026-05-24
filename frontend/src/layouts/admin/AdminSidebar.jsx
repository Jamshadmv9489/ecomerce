import React from "react";
import { NavLink } from "react-router-dom";

import { adminLinks } from "./adminLinks";

const AdminSidebar = () => {
    return (
        <aside
            className="
                hidden md:flex
                flex-col
                w-64
                bg-slate-950
                border-r border-white/10
                min-h-screen
                p-5
            "
        >
            {/* Logo */}
            <div className="mb-10">
                <h1 className="text-2xl font-black text-indigo-500">
                    Admin
                </h1>

                <p className="text-xs text-slate-500 mt-1">
                    Dashboard Panel
                </p>
            </div>

            {/* Links */}
            <nav className="space-y-2">

                {adminLinks.map((link) => {
                    const Icon = link.icon;

                    return (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            className={({ isActive }) =>
                                `
                                flex items-center gap-3
                                px-4 py-3
                                rounded-2xl
                                text-sm font-medium
                                transition-all duration-200

                                ${isActive
                                    ? "bg-indigo-500 text-white"
                                    : "text-slate-400 hover:bg-slate-900 hover:text-white"
                                }
                                `
                            }
                        >
                            <Icon className="w-5 h-5" />

                            {link.label}
                        </NavLink>
                    );
                })}
            </nav>
        </aside>
    );
};

export default AdminSidebar;