// src/App.jsx
import React from "react";
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/AppRoutes';

function App() {
  // Providing the router configuration to the application
  return <RouterProvider router={router} />;
}

export default App