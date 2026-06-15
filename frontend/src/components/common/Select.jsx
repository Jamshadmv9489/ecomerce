const Select = ({ label, error, options = [], required, ...props }) => {
    return (
        <div className="space-y-1">
            {/* Field label */}
            <label className="block text-sm font-medium text-gray-700">
                {label}
            </label>

            {/* Select dropdown menu */}
            <select
                {...props}
                className={`w-full rounded-xl border px-4 py-3 text-sm transition-all focus:outline-none focus:ring-2 bg-white ${
                    error
                        ? "border-red-500 focus:ring-red-200"
                        : "border-gray-300 focus:ring-indigo-200"
                }`}
            >
                {/* Disabled placeholder option */}
                <option value="" disabled selected>
                    Select {label}
                </option>
                
                {/* Map through options array */}
                {options.map((option) => (
                    <option key={option.id} value={option.id}>
                        {option.name}
                    </option>
                ))}
            </select>

            {/* Validation error message */}
            {error && <p className="text-xs text-red-500">{error}</p>}
        </div>
    );
};

export default Select;