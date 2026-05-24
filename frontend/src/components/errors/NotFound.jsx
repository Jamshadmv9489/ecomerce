import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 px-6 py-12 text-center">
            <div className="space-y-6 max-w-lg">
                {/* 404 Heading - Responsive Text Size */}
                <h1 className="text-8xl md:text-9xl font-black text-black">
                    404
                </h1>

                {/* Error Message */}
                <h2 className="text-2xl md:text-3xl font-bold text-black">
                    Page Not Found
                </h2>

                <p className="text-base md:text-lg text-gray-700">
                    Oops! The page you are looking for does not exist or has been moved.
                </p>

                {/* Back Button */}
                <div className="pt-4">
                    <Link
                        to="/"
                        className="inline-block px-8 py-3 bg-black text-white rounded-xl font-medium hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl"
                    >
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFound;