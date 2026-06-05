import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from '../../context/authContext';

import { Menu, Bell, LogOut } from 'lucide-react';

const AdminNavbar = ({ onToggle }) => {
    const { user, logout } = useAuth();
    const [showProfile, setShowProfile] = useState(false);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-30 w-full">
            {/* Toggle button: Hidden on desktop via 'md:hidden' */}
            <button
                onClick={onToggle}
                className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
                aria-label="Toggle Sidebar"
            >
                <Menu className="h-6 w-6 text-slate-600" />
            </button>

            <h2 className="text-lg font-semibold text-slate-800 ml-2 md:ml-0 cursor-default">
                Admin Dashboard
            </h2>

            <div className="flex items-center gap-4">
                {/* Notification Button with hover effect */}
                <button className="p-2 hover:bg-slate-800 rounded-full transition-all duration-200 group">
                    <Bell className="h-5 w-5 text-slate-400 group-hover:text-indigo-400 transition-colors" />
                </button>

                {/* User Profile Section */}
                <div className="relative">
                    <button
                        onClick={() => setShowProfile(!showProfile)}
                        className="flex items-center gap-2 cursor-pointer transition-transform hover:scale-105"
                    >
                        <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white shadow-sm font-bold">
                            {user?.name?.charAt(0).toUpperCase()}
                        </div>
                    </button>

                    {/* Dropdown Menu */}
                    {showProfile && (
                        <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-lg shadow-xl py-2 z-50">
                            <div className="px-4 py-2 border-b border-slate-100">
                                <p className="text-sm font-semibold text-slate-800">{user?.name}</p>
                            </div>
                            <Link to="*" className="block px-4 py-2 text-sm text-slate-600 hover:bg-slate-50">
                                View Profile
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                            >
                                <LogOut className="h-4 w-4" /> Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default AdminNavbar;