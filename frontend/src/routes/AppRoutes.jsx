import { createBrowserRouter } from 'react-router-dom';

import UserLayout from '../layouts/UserLayout';

export const router = createBrowserRouter([
  // Public Routes
  {
    path: '/',
    element: <UserLayout />,
    children: [
    ],
  },
]);