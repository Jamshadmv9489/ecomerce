import { createBrowserRouter } from 'react-router-dom';

import UserLayout from '../layouts/UserLayout';
import AdminLayout from '../layouts/AdminLayout';

export const router = createBrowserRouter([
  // Public Routes
  {
    path: '/',
    element: <UserLayout />,
    children: [
    ],
  },

  // Admin Routes
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
    ],
  },
]);