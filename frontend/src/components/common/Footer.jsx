import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-slate-950 border-t border-white/10 text-slate-400">

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Top */}
                <div className="py-10 flex flex-col md:flex-row items-center justify-between gap-8">

                    {/* Logo & Text */}
                    <div className="text-center md:text-left">

                        <Link
                            to="/"
                            className="text-2xl font-black tracking-tight text-indigo-500"
                        >
                            E
                            <span className="text-white">
                                store
                            </span>
                        </Link>

                        <p className="mt-3 text-sm text-slate-500 max-w-sm">
                            Modern ecommerce experience with fast delivery
                            and secure shopping.
                        </p>
                    </div>

                    {/* Links */}
                    <div className="flex flex-wrap items-center justify-center gap-6 text-sm">

                        <Link
                            to="/products"
                            className="hover:text-white transition-colors"
                        >
                            Products
                        </Link>

                        <Link
                            to="/categories"
                            className="hover:text-white transition-colors"
                        >
                            Categories
                        </Link>

                        <Link
                            to="/privacy"
                            className="hover:text-white transition-colors"
                        >
                            Privacy
                        </Link>

                        <Link
                            to="/terms"
                            className="hover:text-white transition-colors"
                        >
                            Terms
                        </Link>

                        <Link
                            to="/contact"
                            className="hover:text-white transition-colors"
                        >
                            Contact
                        </Link>
                    </div>
                </div>

                {/* Bottom */}
                <div className="border-t border-white/10 py-5 text-center text-xs text-slate-500">

                    © {new Date().getFullYear()}{" "}
                    <span className="text-white font-medium">
                        Estore
                    </span>
                    . All rights reserved.

                </div>
            </div>
        </footer>
    );
};

export default Footer;