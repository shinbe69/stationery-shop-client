import { useState, createContext } from 'react';
import { Outlet } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import './index.css';
import Popup from './components/popup/popup';
import Header from './components/header/header';
import Footer from './components/footer/footer'

export const CartQuantityContext = createContext()
export const CartContext = createContext()
export const MessageContext = createContext()

export default function AppContainer() {
    const [cartQuantity, setCartQuantity] = useState(0)
    const [cart, setCart] = useState({ cartItems: [], totalQuantity: 0 })
    const [message, setMessage] = useState("")

  return (
    <CookiesProvider>
      <CartQuantityContext.Provider value={[cartQuantity, setCartQuantity]}>
        <CartContext.Provider value={[cart, setCart]}>
          <Popup message={ message }/>
          <MessageContext.Provider value={ [message, setMessage] }>
            <Header />
            <Outlet />
            <Footer />
          </MessageContext.Provider>
        </CartContext.Provider>
      </CartQuantityContext.Provider>
    </CookiesProvider>
  );
}