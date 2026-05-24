import React from "react";
import { Search } from "lucide-react";

const SearchBar = ({
    mobile = false,
    searchQuery,
    setSearchQuery,
    handleSearchSubmit,
}) => {
    return (
        <form
            onSubmit={handleSearchSubmit}
            className={
                mobile
                    ? "relative pt-2"
                    : "hidden md:flex flex-1 max-w-md mx-4"
            }
        >
            <div className="relative w-full group">

                {/* Search Icon */}
                <Search
                    className="
                        absolute left-4 top-1/2 -translate-y-1/2
                        w-4 h-4
                        text-slate-400
                        group-focus-within:text-indigo-500
                        transition-colors duration-200
                    "
                />

                {/* Input */}
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`
                        w-full
                        bg-slate-100/80
                        text-slate-800
                        text-sm

                        pl-11 pr-4

                        border border-transparent
                        outline-none

                        transition-all duration-200

                        focus:bg-white
                        focus:border-indigo-500
                        focus:ring-4 focus:ring-indigo-100

                        hover:bg-slate-200/70

                        placeholder:text-slate-400

                        ${mobile
                            ? "py-3 rounded-2xl"
                            : "py-2.5 rounded-full"
                        }
                    `}
                />

                {/* Glow Effect */}
                <div
                    className="
                        absolute inset-0 rounded-full
                        opacity-0 group-focus-within:opacity-100
                        transition-opacity duration-300
                        pointer-events-none
                    "
                />
            </div>
        </form>
    );
};

export default SearchBar;