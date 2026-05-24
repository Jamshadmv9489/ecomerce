import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

/**
 * PageLoader Component
 * Uses Framer Motion for smooth entrance/exit animations
 * and Lucide React for a modern, responsive icon.
 */
const PageLoader = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-md"
        >
            <motion.div
                className="flex flex-col items-center gap-4"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{
                    duration: 0.3,
                    ease: "easeInOut"
                }}
            >
                {/* 
                   Animated Icon:
                   - Loader2 from lucide-react
                   - rotate motion for infinite spin
                */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                        repeat: Infinity,
                        duration: 1.5,
                        ease: "linear"
                    }}
                >
                    <Loader2 className="w-12 h-12 text-slate-800" strokeWidth={1.5} />
                </motion.div>

                {/* Status Text with Pulse Animation */}
                <motion.span
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="text-xs font-bold text-slate-600 uppercase tracking-[0.2em]"
                >
                    Loading...
                </motion.span>
            </motion.div>
        </motion.div>
    );
};

export default PageLoader;