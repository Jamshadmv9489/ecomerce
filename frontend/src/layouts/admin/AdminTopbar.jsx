import { Bell, UserCircle2, Menu } from "lucide-react"; // Import Menu icon

const AdminTopbar = ({ onMenuClick }) => { // Receive prop
    return (
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-40">
            <div className="flex items-center gap-4">
                {/* Mobile menu trigger */}
                <button
                    onClick={onMenuClick}
                    className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                    <Menu className="w-6 h-6" />
                </button>

                <h2 className="text-lg font-bold text-slate-800">Admin Dashboard</h2>
            </div>

            <div className="flex items-center gap-4">
                <button className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                    <Bell className="w-5 h-5 text-slate-600" />
                </button>
                <button className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                    <UserCircle2 className="w-6 h-6" />
                </button>
            </div>
        </header>
    );
};

export default AdminTopbar;