import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../context/authContext';

import { motion } from 'framer-motion';

const ProductCard = ({ product }) => {
    const navigate = useNavigate();

    const { user } = useAuth();

    // Navigates the user to the specific product detail page
    const handleCardClick = () => {
        navigate(`/product-detail/${product.slug}`);
    };

    // Handles adding the item to the user's cart
    const handleAddToCart = (e) => {
        // Prevents the parent card click event from triggering
        e.stopPropagation();

        // 1. Check if the user is logged in before adding to the cart
        if (!user) {
            // Redirect to the login page if not authenticated:
            navigate('/login');
            return;
        }
        alert("Item added to cart successfully!");
    };

    return (
        <motion.div
            // Spring animation provides a natural, smooth movement
            whileHover={{ y: -8 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            whileTap={{ scale: 0.98 }}
            /* Responsive design:
               - w-full: Always takes full width of its parent grid column
               - max-w-[280px] at small screens, but behaves fluidly
               - mx-auto ensures centering in grid cells
            */
            className="group cursor-pointer bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 w-full max-w-[280px] mx-auto sm:max-w-none"
            onClick={handleCardClick}
            role="button"
            tabIndex={0}
            aria-label={`View details for ${product?.name}`}
        >
            {/* Product Image Display with responsive height */}
            <div className="w-full aspect-square bg-slate-100 overflow-hidden relative">
                <img
                    src={product?.images?.[0]?.url || 'default-image.jpg'}
                    alt={product?.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
            </div>

            <div className="p-3 sm:p-4">
                {/* Product Title adjusts font size for mobile vs desktop */}
                <h3 className="text-sm sm:text-lg font-semibold text-slate-800 truncate">
                    {product.name}
                </h3>

                <div className="flex items-center justify-between mt-3 sm:mt-4">
                    <span className="text-lg sm:text-xl font-bold text-blue-600">
                        ₹{product?.price}
                    </span>

                    {/* Add to cart button with touch-friendly padding */}
                    <button
                        disabled={product.stock === 0}
                        onClick={handleAddToCart}
                        className={`px-3 py-1.5 sm:px-4 sm:py-2 text-white text-xs sm:text-sm font-medium rounded-lg transition-colors active:scale-95 
        ${product.stock === 0
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-slate-900 hover:bg-emerald-600 cursor-pointer"}`}
                    >
                        {product.stock === 0 ? "Out of Stock" : "Add"}
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;