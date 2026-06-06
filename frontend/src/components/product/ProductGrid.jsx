import { motion } from 'framer-motion';
import ProductCard from './ProductCard';

// Stagger animation configuration
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

// Child item entry animation
const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
};

const ProductGrid = ({ products }) => {
    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            // Responsive grid: 2 cols mobile, 3 tablet, 4 desktop
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
        >
            {products.map((product) => (
                <motion.div key={product.id} variants={itemVariants}>
                    <ProductCard product={product} />
                </motion.div>
            ))}
        </motion.div>
    );
};

export default ProductGrid;