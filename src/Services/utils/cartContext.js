import React, { createContext, useContext, useState, useEffect } from 'react';
import eventEmitter from '../utils/event';
import { get_list_cart_item } from '../utils/httpCartItem';
import { get_user_cart } from '../utils/httpCart';
import { getUserlocal } from '../utils/user__AsyncStorage';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [badgeCount, setBadgeCount] = useState(0);

  const fetchCartItems = async () => {
    try {
      const user = await getUserlocal();
      if (user == null || !user) {
        setBadgeCount(0); 
        return;
      }

      const userCart = await get_user_cart(user._id);
      if (!userCart || !userCart._id) {
        setBadgeCount(0);
        return;
      }

      const cartItems = await get_list_cart_item(userCart._id);
      setBadgeCount(cartItems.length); 
    } catch (error) {
      console.error('Error fetching cart items:', error.message);
    }
  };

  useEffect(() => {
    fetchCartItems();
    const cartListener = eventEmitter.on('cartUpdated', fetchCartItems);
    const loginListener = eventEmitter.on('userLoggedIn', fetchCartItems); 
    const logoutListener = eventEmitter.on('userLoggedOut', () => {
      setBadgeCount(0);
    });
    return () => {
      cartListener.removeListener();
      loginListener.removeListener(); 
      logoutListener.removeListener();
    };
  }, []);
  

  return (
    <CartContext.Provider value={{ badgeCount, fetchCartItems }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
