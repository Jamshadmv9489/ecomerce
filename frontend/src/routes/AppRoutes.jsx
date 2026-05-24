// src/routes/AppRoutes.jsx
import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import BaseLayout from '../layouts/BaseLayout';
import AdminLayout from '../layouts/admin/AdminLayout';

import NotFound from '../components/errors/NotFound';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <BaseLayout />,
    children: [
    ],
  },

  /* Admin Routes */
  {
    path: "/admin",
    element: <AdminLayout />,

    children: [
    ],
  },
  {
    path: "*",
    element: <NotFound />
  }
]);