import { createBrowserRouter } from 'react-router-dom';

import UserLayout from '../layouts/UserLayout';
import AdminLayout from '../layouts/AdminLayout';

import Login from '../components/forms/Login';
import Register from '../components/forms/Register';

import ProtectedRoute from './ProtectedRoute';
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


      // Protected User Routes
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/profile",
            element: <UserProfile />,
          },
          {
            path: "/update-profile",
            element: <EditProfile />,
          },
          {
            path: "/cart",
            element: <Cart />
          },
          {
            path: "/checkout",
            element: <Checkout />
          },
          {
            path: "/address",
            element: <Address />
          },
          {
            path: "/orders",
            element: <Orders />
          },
          {
            path: "/orders/:orderId",
            element: <OrderDetail />
          },
          {
            path: "/payment",
            element: <PaymentPage />
          },
          {
            path: '*',
            element: <NotFound />
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
        children: [
          {
            index: true,
            element: <Dashboard />
          },
          {
            path: '/admin/categories',
            element: <ManageCategories />
          },
          {
            path: '/admin/products',
            element: <ManageProducts />
          },
          {
            path: '/admin/users',
            element: <ManageUsers />
          },
          {
            path: '/admin/orders',
            element: <ManageOrders />
          },
          {
            path: '*',
            element: <NotFound />
          }
        ]
      }
    ]
  }

]);