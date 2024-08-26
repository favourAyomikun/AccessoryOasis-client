'use client';

import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";

export const ShopAccessoryContext = createContext(null);

export const ShopAccessoryContextProvider = (props) => {
  const [cartAccessoryItems, setCartAccessoryItems] = useState([]);
  const [accessoriesData, setAccessoriesData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Extract user ID from token
  const getUserIdFromToken = () => {
    if (typeof window !== 'undefined') { // Check if running in the browser
      const token = localStorage.getItem('authToken');
      if (token) {
        const decoded = jwtDecode(token);
        return decoded.userId;
      }
    }
    return null;
  };

  const userId = getUserIdFromToken();

  useEffect(() => {
    const fetchAccessories = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/accessories');
        setAccessoriesData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching accessories', error);
        setLoading(false);
      }
    };

    fetchAccessories();
  }, []);

  useEffect(() => {
    const fetchCart = async () => {
      if (!userId) return;

      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get('http://localhost:4000/api/cart', {
          headers: {
            Authorization: `Bearer ${token}`
          },
          params: { userId }
        });
        setCartAccessoryItems(response.data);
      } catch (error) {
        console.error('Error fetching cart', error);
      }
    };

    fetchCart();
  }, [userId]);

  const saveCartToDatabase = async (accessoryItems) => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token || !userId) return;

      const response = await axios.post(
        'http://localhost:4000/api/cart',
        { items: accessoryItems, userId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Cart saved to the database:', response.data);
    } catch (error) {
      console.error('Error saving cart item:', error);
    }
  };

  const addToCart = async (accessoryItemId) => {
    setCartAccessoryItems(prevItems => {
      const updatedCart = {
        ...prevItems,
        [accessoryItemId]: prevItems[accessoryItemId] ? prevItems[accessoryItemId] + 1 : 1,
      };
      saveCartToDatabase(updatedCart);
      return updatedCart;
    });
  };

  const removeFromCart = async (accessoryItemId) => {
    setCartAccessoryItems(prevItems => {
      const updatedCart = { ...prevItems };
      if (updatedCart[accessoryItemId] > 1) {
        updatedCart[accessoryItemId] -= 1;
      } else {
        delete updatedCart[accessoryItemId];
      }
      saveCartToDatabase(updatedCart);
      return updatedCart;
    });
  };

  const getTotalCartAmount = () => {
    return cartAccessoryItems.reduce((totalAmount, itemId) => {
      const item = accessoriesData.find((i) => i._id === itemId);
      if (item) {
        return totalAmount + cartAccessoryItems[itemId] * item.price;
      }
      return totalAmount;
    }, 0);
  };

  const accessoryContextValue = {
    cartAccessoryItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    accessoriesData
  };

  return (
    <ShopAccessoryContext.Provider value={accessoryContextValue}>
      {props.children}
    </ShopAccessoryContext.Provider>
  );
};
