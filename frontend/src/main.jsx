import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { CategoryProvider } from './context/CategoryContext.jsx'
import { ProductProvider } from './context/ProductContext.jsx'
import { AuthProvider } from './context/authContext.jsx'
import { CartProvider } from './context/CartContext.jsx'
import { OrderProvider } from './context/OrderContext.jsx'

import App from './App.jsx'

import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CategoryProvider>
      <ProductProvider>
        <AuthProvider>
          <CartProvider>
            <OrderProvider>
              <App />
            </OrderProvider>
          </CartProvider>
        </AuthProvider>
      </ProductProvider>
    </CategoryProvider>
  </StrictMode>,
)
