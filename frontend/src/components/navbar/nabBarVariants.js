export const menuVariants = {
    closed: {
        opacity: 0,
        y: -10,
        scaleY: 0.98,
        transition: {
            duration: 0.2,
            when: "afterChildren",
            staggerChildren: 0.03,
            staggerDirection: -1,
        },
    },

    open: {
        opacity: 1,
        y: 0,
        scaleY: 1,
        transition: {
            duration: 0.25,
            when: "beforeChildren",
            staggerChildren: 0.05,
        },
    },
};

export const itemVariants = {
    closed: {
        opacity: 0,
        x: -15,
    },

    open: {
        opacity: 1,
        x: 0,
        transition: {
            type: "spring",
            stiffness: 260,
            damping: 20,
        },
    },
};