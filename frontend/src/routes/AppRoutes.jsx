import { createBrowserRouter } from 'react-router-dom';

import UserLayout from '../layouts/UserLayout';
import AdminLayout from '../layouts/AdminLayout';

import Login from '../components/forms/Login';
import Register from '../components/forms/Register';

import PublicRoute from './PublicRoute';
import ProtectedRoute from './ProtectedRoute';
import AdminGuard from './adminGuard';
import AdminRoute from './AdminRoute';

import Home from '../pages/user/Home';
import Products from '../pages/user/Products';
import ProductDetail from '../pages/user/ProductDetail';
import Categories from '../pages/user/Categories';
import UserProfile from '../pages/user/UserProfile';
import EditProfile from '../pages/user/EditProfile';
import Cart from '../pages/user/Cart';
import Checkout from '../pages/user/Checkout';
import Address from '../components/forms/Address';
import Orders from '../pages/user/Orders';
import OrderDetail from '../pages/user/OrderDetail';
import PaymentPage from '../pages/user/PaymentPage';

import Dashboard from '../pages/admin/Dashboard';
import ManageCategories from '../pages/admin/ManageCategories';
import ManageProducts from '../pages/admin/ManageProducts';
import ManageUsers from '../pages/admin/ManageUsers';
import ManageOrders from '../pages/admin/ManageOrders';
import NotFound from '../pages/NotFound';

const rootLoader = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return null;
};

export const router = createBrowserRouter([
  // Public Routes
  {
    path: '/',
    element: (
      <AdminGuard>
        <UserLayout />
      </AdminGuard>
    ),
    children: [
      {
        index: true,
        element: <Home />,
        loader: rootLoader,

      },
      {
        path: 'products',
        element: <Products />,
        loader: rootLoader,
      },
      {
        path: 'product-detail/:slug',
        element: <ProductDetail />,
        loader: rootLoader,

      },
      {
        path: 'categories',
        element: <Categories />,
        loader: rootLoader,

      },
      {
        element: <PublicRoute />,
        children: [

          {
            path: 'login',
            element: <Login />,
            loader: rootLoader,

          },
          {
            path: 'register',
            element: <Register />,
            loader: rootLoader,

          },
        ]
      },


      // Protected User Routes
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/profile",
            element: <UserProfile />,
            loader: rootLoader,

          },
          {
            path: "/update-profile",
            element: <EditProfile />,
            loader: rootLoader,

          },
          {
            path: "/cart",
            element: <Cart />,
            loader: rootLoader,

          },
          {
            path: "/checkout",
            element: <Checkout />,
            loader: rootLoader,

          },
          {
            path: "/address",
            element: <Address />,
            loader: rootLoader,

          },
          {
            path: "/orders",
            element: <Orders />,
            loader: rootLoader,

          },
          {
            path: "/orders/:orderId",
            element: <OrderDetail />,
            loader: rootLoader,

          },
          {
            path: "/payment",
            element: <PaymentPage />,
            loader: rootLoader,

          },
          {
            path: '*',
            element: <NotFound />,
            loader: rootLoader,

          }
        ],
      },
    ],
  },

  // Admin Routes
  {
    element: <AdminRoute />,
    children: [
      {
        path: "/admin",
        element: <AdminLayout />,
        loader: rootLoader,
        children: [
          {
            index: true,
            element: <Dashboard />,
            loader: rootLoader,
          },
          {
            path: 'categories',
            element: <ManageCategories />,
            loader: rootLoader,
          },
          {
            path: 'products',
            element: <ManageProducts />,
            loader: rootLoader,
          },
          {
            path: 'users',
            element: <ManageUsers />,
            loader: rootLoader,
          },
          {
            path: 'orders',
            element: <ManageOrders />,
            loader: rootLoader,
          },
          {
            path: '*',
            element: <NotFound />,
            loader: rootLoader,
          }
        ]
      }
    ]
  }

]);