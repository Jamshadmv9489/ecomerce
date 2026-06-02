import { Menu, Bell, User } from 'lucide-react';

const AdminNavbar = ({ onToggle }) => {
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

                {/* User Profile with hover scale and ring effect */}
                <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white shadow-sm hover:scale-110 hover:ring-2 hover:ring-indigo-400 hover:ring-offset-2 hover:ring-offset-slate-950 transition-all duration-200 cursor-pointer">
                    <User className="h-5 w-5" />
                </div>
            </div>
        </header>
    );
};

export default AdminNavbar;