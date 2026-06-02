import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import AdminNavbar from '../components/admin/AdminNavbar';
import AdminSidebar from '../components/admin/AdminSidebar';

const AdminLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-slate-100">
            {/* Sidebar receives the toggle state */}
            <AdminSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            <div className="flex flex-col flex-1 w-full min-w-0 overflow-hidden">
                {/* Navbar toggle button controls the sidebar */}
                <AdminNavbar onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />

                <main className="flex-1 p-6 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;