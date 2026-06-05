/**
 * AuthLayout component provides a consistent wrapper for authentication pages.
 * It centers content within a card-style container.
 */
const AuthLayout = ({ title, subtitle, children }) => {
    return (
        <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
            {/* Container card */}
            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200">

                {/* Header section with title and optional subtitle */}
                <header className="mb-8 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
                        {title}
                    </h1>
                    {subtitle && (
                        <p className="mt-2 text-sm text-gray-600">{subtitle}</p>
                    )}
                </header>

                {/* Page specific content */}
                <section>{children}</section>
            </div>
        </main>
    );
};

export default AuthLayout;