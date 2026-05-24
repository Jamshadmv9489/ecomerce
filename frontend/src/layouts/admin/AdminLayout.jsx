import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import AdminSidebar from "./AdminSidebar"; // Desktop version
import AdminMobileSidebar from "./AdminMobileSidebar"; // Mobile version
import AdminTopbar from "./AdminTopbar";
import { usePageLoading } from "../../hooks/usePageLoading";
import PageLoader from "../../components/common/PageLoader";

const AdminLayout = () => {
    // Mobile sidebar visibility state
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const isLoading = usePageLoading();

    return (
        <div className="relative min-h-screen bg-slate-100 flex">

            {/* Show loader when navigation state is loading */}
            {isLoading && <PageLoader />}

            {/* Desktop sidebar */}
            <div className="hidden md:block">
                <AdminSidebar />
            </div>

            {/* Mobile sidebar drawer */}
            <AdminMobileSidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />

            {/* Main content area */}
            <div className="flex-1 flex flex-col">

                {/* Pass toggle function to topbar */}
                <AdminTopbar onMenuClick={() => setIsSidebarOpen(true)} />

                {/* Page content */}
                <main className="flex-1 p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;