import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { useAuth } from '../../context/authContext';

import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Package, LogIn, Menu, X, Store, Search, LogOut } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const location = useLocation();
    const navigate = useNavigate();


    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    // Prevent background scrolling when mobile menu is open
    useEffect(() => {
        if (isOpen) {
            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight = `${scrollbarWidth}px`;
        } else {
            document.body.style.overflow = 'unset';
            document.body.style.paddingRight = '0px';
        }
        // Cleanup function to restore scrolling when component unmounts
        return () => {
            document.body.style.overflow = 'unset';
            document.body.style.paddingRight = '0px';
        };
    }, [isOpen]);

    const authLinks = user ? [
        { title: user.name, path: '/profile', icon: null },
    ] : [
        { title: 'Login', path: '/login', isButton: true, icon: LogIn },
    ];

    const navLinks = [
        { title: 'Home', path: '/', icon: Store },
        { title: 'Cart', path: '/cart', icon: ShoppingCart },
        { title: 'Orders', path: '/orders', icon: Package },
    ];

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
            setSearchQuery('');
            setIsOpen(false);
        }
    };

    return (
        <nav className="bg-slate-950/80 backdrop-blur-md text-slate-100 shadow-lg sticky top-0 z-50 border-b border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">

                    {/* Logo Section */}
                    <div className="flex-shrink-0">
                        <Link to="/" className="flex items-center space-x-2 text-xl font-extrabold tracking-wider bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent hover:opacity-90 transition-opacity">
                            <Store className="h-6 w-6 text-indigo-400" />
                            <span>ecomerce</span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-1">
                        {/* Search Form */}
                        <form onSubmit={handleSearch} className="relative group mr-4">
                            <button type="submit" className="absolute inset-y-0 left-0 pl-3 flex items-center">
                                <Search className="h-4 w-4 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                            </button>
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="bg-slate-900 border border-slate-700 text-slate-100 text-sm rounded-lg pl-10 pr-4 py-1.5 w-40 focus:w-64 transition-all duration-300 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder:text-slate-600"
                            />
                        </form>

                        {/* Navigation Links */}
                        {navLinks.map((link) => {
                            const Icon = link.icon;
                            const isActive = location.pathname === link.path;
                            return (
                                <Link key={link.path} to={link.path} className="relative p-1">
                                    {isActive && !link.isButton && (
                                        <motion.div layoutId="activeNav" className="absolute inset-0 bg-slate-800 rounded-lg -z-10" transition={{ type: "spring", stiffness: 380, damping: 30 }} />
                                    )}
                                    <motion.span
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className={link.isButton
                                            ? "flex items-center space-x-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-2 rounded-lg text-sm font-semibold ml-2 shadow-md hover:shadow-indigo-500/40 transition-all"
                                            : `flex items-center space-x-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive ? 'text-indigo-400' : 'text-slate-400 hover:text-slate-100'}`}>
                                        <Icon className="h-4 w-4" />
                                        <span>{link.title}</span>
                                    </motion.span>
                                </Link>
                            );
                        })}

                        {authLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={link.isButton
                                    ? "flex items-center space-x-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-2 rounded-lg text-sm font-semibold ml-2 shadow-md hover:shadow-indigo-500/40 transition-all"
                                    : "flex items-center space-x-2 ml-4 p-1 pr-3 bg-slate-900 rounded-full hover:bg-slate-800 transition-colors border border-slate-700"
                                }
                            >
                                {user ? (
                                    <>
                                        <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                                            {user.name.charAt(0).toUpperCase()}
                                        </div>
                                        <span className="text-sm font-medium text-slate-200">{user.name}</span>
                                    </>
                                ) : (
                                    <>
                                        <LogIn className="h-4 w-4" />
                                        <span>{link.title}</span>
                                    </>
                                )}
                            </Link>
                        ))}

                        {user && (
                            <button
                                onClick={handleLogout}
                                className="flex items-center space-x-2 ml-4 p-2 px-4 bg-slate-900 rounded-full hover:bg-red-900/30 text-slate-400 hover:text-red-400 transition-colors border border-slate-700"
                            >
                                <LogOut className="h-4 w-4" />
                                <span className="text-sm font-medium">Logout</span>
                            </button>
                        )}
                    </div>

                    {/* Mobile Menu Toggle Button */}
                    <div className="md:hidden">
                        <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-slate-400 hover:text-white">
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-slate-950 border-b border-slate-800 overflow-hidden h-screen"
                    >
                        <div className="px-4 py-4 space-y-3">
                            <form onSubmit={handleSearch}>
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search products..."
                                    className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2.5 px-4 text-sm text-slate-100 focus:border-indigo-500 outline-none"
                                />
                            </form>

                            {/* Mobile Menu Auth Links */}
                            {authLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    onClick={() => setIsOpen(false)}
                                    className={link.isButton
                                        ? "flex items-center space-x-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-2 rounded-lg text-sm font-semibold ml-2 shadow-md hover:shadow-indigo-500/40 transition-all"
                                        : "flex items-center space-x-2 ml-2 p-1 pr-3 bg-slate-900 rounded-full hover:bg-slate-800 transition-colors border border-slate-700"
                                    }
                                >
                                    {user ? (
                                        <>
                                            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                                                {user.name.charAt(0).toUpperCase()}
                                            </div>
                                            <span className="text-sm font-medium text-slate-200">{user.name}</span>
                                        </>
                                    ) : (
                                        <>
                                            <LogIn className="h-4 w-4" />
                                            <span>{link.title}</span>
                                        </>
                                    )}
                                </Link>
                            ))}

                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    onClick={() => setIsOpen(false)}
                                    className={`flex items-center space-x-3 px-4 py-2.5 rounded-lg text-base font-medium ${location.pathname === link.path ? 'bg-slate-900 text-indigo-400' : 'text-slate-400'}`}
                                >
                                    <link.icon className="h-5 w-5" />
                                    <span>{link.title}</span>
                                </Link>
                            ))}

                            {user && (
                                <button
                                    onClick={() => { handleLogout(); setIsOpen(false); }}
                                    className="flex items-center space-x-3 px-4 py-2.5 rounded-lg text-base font-medium text-red-500 hover:bg-red-900/20 w-full"
                                >
                                    <LogOut className="h-5 w-5" />
                                    <span>Logout</span>
                                </button>
                            )}

                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;