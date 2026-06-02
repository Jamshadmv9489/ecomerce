import { createBrowserRouter } from 'react-router-dom';

import UserLayout from '../layouts/UserLayout';
import AdminLayout from '../layouts/AdminLayout';

import Login from '../components/forms/Login';
import Register from '../components/forms/Register';

import Home from '../pages/user/Home';
import Products from '../pages/user/Products';
import ProductDetail from '../pages/user/ProductDetail';
import Categories from '../pages/user/Categories';

export const router = createBrowserRouter([
  // Public Routes
  {
    path: '/',
    element: <UserLayout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'products',
        element: <Products />
      },
      {
        path: 'product-detail',
        element: <ProductDetail />
      },
      {
        path: 'categories',
        element: <Categories />
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'register',
        element: <Register />
      },
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