import { useEffect, useState } from 'react';
import { Outlet, useNavigation } from 'react-router-dom';

import AdminNavbar from '../components/admin/AdminNavbar';
import AdminSidebar from '../components/admin/AdminSidebar';

import Loader from '../components/common/Loader';

const AdminLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const navigation = useNavigation();

    useEffect(() => {
        console.log("Navigation State:", navigation.state);
    }, [navigation.state]);

    return (
        <div className="flex min-h-screen bg-slate-100">
            {/* Sidebar receives the toggle state */}
            <AdminSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            <div className="flex flex-col flex-1 w-full min-w-0 overflow-hidden">
                {/* Navbar toggle button controls the sidebar */}
                <AdminNavbar onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />

                <main className="flex-1 p-6 overflow-y-auto relative">

                    {navigation.state === "loading" && <Loader />}
                    
                    <div className={`transition-opacity duration-200 ${navigation.state === "loading" ? "opacity-0" : "opacity-100"}`}>
                        <Outlet />
                    </div>

                </main>
            </div>
        </div>
    );
};

export default AdminLayout;