import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import CartProvider, { CartContext } from './context/CartContext.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
    <CartProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </CartProvider>
)

/* Brindar poderes para el context a toda la aplicaicon */