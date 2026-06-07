import { motion } from 'framer-motion';

/**
 * Fade-in animation variants for consistent design across the app.
 * This can be moved to a separate 'animations.js' file later.
 */
const fadeVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" }
    }
};

const HeroSection = () => {
    return (
        <motion.section
            initial="hidden"
            animate="visible"
            variants={fadeVariants}
            className="bg-gradient-to-r from-emerald-600 to-teal-700 p-8 md:p-16 rounded-2xl text-white shadow-lg"
        >
            <div className="max-w-2xl">
                <h1 className="text-3xl md:text-5xl font-bold">
                    New Arrivals
                </h1>
                <p className="mt-4 text-emerald-100 text-lg md:text-xl">
                    Discover our latest collection of premium products,
                    curated just for you.
                </p>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-8 px-8 py-3 bg-white text-emerald-700 font-bold rounded-lg shadow-md cursor-pointer transition-colors hover:bg-emerald-50"
                >
                    Shop Now
                </motion.button>
            </div>
        </motion.section>
    );
};

export default HeroSection;