import { Link } from 'react-router-dom';
import { Store, Mail, ShieldCheck } from 'lucide-react';

/**
 * Footer Component
 * * Displays brand information, navigation links, and support details.
 * Implements a responsive grid layout that stacks on mobile 
 * and expands on tablet/desktop devices.
 */
const Footer = () => {
    return (
        <footer className="bg-slate-950 text-slate-400 border-t border-slate-900">
            <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">

                {/* Main Grid Layout: Responsive columns */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center sm:text-left">

                    {/* Brand Section */}
                    <div className="space-y-3">
                        <Link to="/" className="inline-flex items-center justify-center sm:justify-start space-x-2 text-lg font-bold text-slate-100 hover:text-indigo-400 transition-colors">
                            <Store className="h-6 w-6 text-indigo-400" />
                            <span>ecomerce</span>
                        </Link>
                        <p className="text-sm text-slate-500 max-w-xs mx-auto sm:mx-0">
                            Your trusted online shopping partner, delivering quality products to your doorstep.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="flex flex-col space-y-3">
                        <span className="font-semibold text-slate-200 uppercase tracking-wider text-xs">Quick Links</span>
                        <div className="flex flex-col space-y-2 text-sm">
                            <Link to="/" className="hover:text-indigo-400 transition-colors">Shop All</Link>
                            <Link to="/cart" className="hover:text-indigo-400 transition-colors">My Cart</Link>
                            <Link to="/orders" className="hover:text-indigo-400 transition-colors">Track Orders</Link>
                        </div>
                    </div>

                    {/* Contact & Security */}
                    <div className="flex flex-col space-y-3 items-center sm:items-start">
                        <span className="font-semibold text-slate-200 uppercase tracking-wider text-xs">Contact</span>
                        <div className="flex flex-col space-y-2 text-sm">
                            <a href="mailto:support@ecomerce.com" className="flex items-center justify-center sm:justify-start space-x-2 hover:text-indigo-400 transition-colors">
                                <Mail className="h-4 w-4 text-slate-500" />
                                <span>support@ecomerce.com</span>
                            </a>
                            <div className="flex items-center justify-center sm:justify-start space-x-2 text-emerald-500">
                                <ShieldCheck className="h-4 w-4" />
                                <span className="text-slate-500">Secure Checkout</span>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Bottom Copyright Bar */}
                <div className="mt-12 pt-8 border-t border-slate-900/60 text-center text-xs text-slate-600 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <span>&copy; {new Date().getFullYear()} ecomerce. All rights reserved.</span>
                    <div className="flex space-x-6">
                        <Link to="/privacy" className="hover:text-slate-400 transition-colors">Privacy Policy</Link>
                        <Link to="/terms" className="hover:text-slate-400 transition-colors">Terms of Service</Link>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;