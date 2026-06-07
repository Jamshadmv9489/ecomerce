import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { ProductProvider } from './context/ProductContext.jsx'
import { AuthProvider } from './context/authContext.jsx'

import App from './App.jsx'

import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ProductProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ProductProvider>
  </StrictMode>,
)
