/**
 * Reusable Button component with loading state support.
 */
const Button = ({ children, type = "button", loading = false, className = "", ...props }) => {
    return (
        <button
            type={type}
            disabled={loading}
            className={`flex w-full items-center justify-center rounded-xl bg-indigo-600 px-4 py-3 font-semibold text-white transition-all duration-200 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-indigo-400 ${className}`}
            {...props}
        >
            {loading ? (
                <>
                    {/* Spinner icon */}
                    <svg className="mr-2 h-5 w-5 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Processing...
                </>
            ) : (
                children
            )}
        </button>
    );
};

export default Button;