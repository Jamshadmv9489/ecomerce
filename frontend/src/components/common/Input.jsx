import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

/**
 * Reusable Input component with optional password visibility toggle
 * and error state styling.
 */
const Input = ({ label, error, type = "text", ...props }) => {
    const [show, setShow] = useState(false);

    // Handle password visibility logic
    const isPassword = type === "password";
    const inputType = isPassword ? (show ? "text" : "password") : type;

    return (
        <div className="space-y-1">
            {/* Label */}
            <label className="block text-sm font-medium text-gray-700">
                {label}
            </label>

            <div className="relative">
                {/* Input field */}
                <input
                    {...props}
                    type={inputType}
                    className={`w-full rounded-xl border px-4 py-3 text-sm transition-all focus:outline-none focus:ring-2 ${error
                        ? "border-red-500 focus:ring-red-200"
                        : "border-gray-300 focus:ring-indigo-200"
                        }`}
                />

                {/* Visibility toggle button for passwords */}
                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setShow(!show)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                    >
                        {show ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                )}
            </div>

            {/* Error message */}
            {error && <p className="text-xs text-red-500">{error}</p>}
        </div>
    );
};

export default Input;