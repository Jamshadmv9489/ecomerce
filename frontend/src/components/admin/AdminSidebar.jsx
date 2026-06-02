import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    LayoutDashboard,
    Package,
    Users,
    Settings,
    X,
    FolderTree,
    ShoppingCart,
    Store
} from 'lucide-react';

const AdminSidebar = ({ isOpen, onClose }) => {
    const location = useLocation();

    // Tracks whether the viewport is currently at or above the 'md' breakpoint (768px)
    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

    useEffect(() => {
        // Updates the state whenever the window is resized
        const handleResize = () => setIsDesktop(window.innerWidth >= 768);

        window.addEventListener('resize', handleResize);

        // Cleanup event listener on component unmount
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
            {/* Overlay: Displays only on mobile devices when the sidebar is open */}
            {isOpen && !isDesktop && (
                <div onClick={onClose} className="fixed inset-0 bg-black/50 z-40" />
            )}

            <motion.aside
                // Disables initial animation on load to prevent layout shift/blinking
                initial={false}

                // Animation logic: Fixes sidebar in view for desktop; toggles visibility for mobile
                animate={isDesktop ? { x: 0 } : (isOpen ? { x: 0 } : { x: "-100%" })}

                // Defines the spring physics for the open/close animation
                transition={{ type: "spring", stiffness: 300, damping: 30 }}

                // Basic styling: Fixed for mobile overlay, static for desktop layout flow
                className="fixed md:static inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white h-screen shadow-xl flex flex-col"
            >
                {/* Header section with static Logo and mobile-only close button */}
                <div className="flex items-center justify-between p-6 border-b border-slate-800 flex-shrink-0">
                    {/* Logo Only (No Link/Pointer) */}
                    <div className="flex items-center space-x-2 text-xl font-extrabold tracking-wider bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent cursor-default select-none">
                        <Store className="h-6 w-6 text-indigo-400 flex-shrink-0" />
                        <span>ecommerce</span>
                    </div>

                    <button onClick={onClose} className="md:hidden p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Navigation links map */}
                <nav className="p-4 space-y-2 flex-1 overflow-y-auto">
                    {[
                        { title: 'Dashboard', path: '/admin', icon: LayoutDashboard },
                        { title: 'Categories', path: '/admin/categories', icon: FolderTree },
                        { title: 'Products', path: '/admin/products', icon: Package },
                        { title: 'Orders', path: '/admin/orders', icon: ShoppingCart },
                        { title: 'Users', path: '/admin/users', icon: Users },
                        { title: 'Settings', path: '/admin/settings', icon: Settings },
                    ].map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                // Only triggers onClose if the user is on a mobile device
                                onClick={() => !isDesktop && onClose()}
                                className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${isActive
                                        ? 'bg-indigo-600 text-white font-medium'
                                        : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                                    }`}
                            >
                                <item.icon className={`w-5 h-5 transition-colors ${isActive ? 'text-white' : 'text-slate-400'}`} />
                                <span>{item.title}</span>
                            </Link>
                        );
                    })}
                </nav>
            </motion.aside>
        </>
    );
};

export default AdminSidebar;
