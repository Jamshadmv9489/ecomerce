import {
    LayoutDashboard,
    ShoppingBag,
    Shapes,
    ShoppingCart,
    Users,
    Settings,
} from "lucide-react";

export const adminLinks = [
    {
        label: "Dashboard",
        path: "/admin",
        icon: LayoutDashboard,
    },

    {
        label: "Categories",
        path: "/admin/categories",
        icon: Shapes,
    },

    {
        label: "Products",
        path: "/admin/products",
        icon: ShoppingBag,
    },

    {
        label: "Orders",
        path: "/admin/orders",
        icon: ShoppingCart,
    },

    {
        label: "Users",
        path: "/admin/users",
        icon: Users,
    },

    {
        label: "Settings",
        path: "/admin/settings",
        icon: Settings,
    },
];