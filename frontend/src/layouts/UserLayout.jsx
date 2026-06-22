import { Outlet, useNavigation } from 'react-router-dom';

import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import Loader from '../components/common/Loader';

/**
 * UserLayout Component
 * 
 * Acts as the primary wrapper for user-facing pages.
 * Implements a flexbox-based sticky footer design to ensure the footer 
 * stays at the bottom of the viewport even when content is minimal.
 */
const UserLayout = () => {
  const navigation = useNavigation();
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900">

      {/* Persistent header containing the navigation bar */}
      <header className="sticky top-0 z-50">
        <Navbar />
      </header>

      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 relative min-h-[calc(100vh-140px)] flex flex-col">
        {navigation.state === "loading" ? (
          <Loader />
        ) : (
          <div className="flex-grow">
            <Outlet />
          </div>
        )}

      </main>

      {/* Persistent footer displayed at the bottom of the layout */}
      <footer className="w-full border-t border-slate-200">
        <Footer />
      </footer>

    </div>
  );
};

export default UserLayout;