// src/layouts/BaseLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';

import Navbar from '../components/navbar/Navbar';

import { usePageLoading } from '../hooks/usePageLoading';

import Footer from '../components/common/Footer';
import ScrollToTop from '../components/common/ScrollToTop';
import PageLoader from '../components/common/PageLoader';

const BaseLayout = () => {

    const isLoading = usePageLoading();

    return (
        <div className="relative flex flex-col min-h-screen bg-slate-50 text-slate-800 antialiased">

            {/* Show loader when navigation state is loading */}
            {isLoading && <PageLoader />}

            {/* Structural Scroll Reset */}
            <ScrollToTop />

            {/* Sticky Header */}
            <Navbar />

            {/* Main Content Area */}
            <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Outlet />
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default BaseLayout;
