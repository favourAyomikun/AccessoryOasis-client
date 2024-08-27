'use client';

import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { createContext, useEffect, useState } from 'react';

export const ShopAccessoryContext = createContext(null);

export const ShopAccessoryContextProvider = (props) => {
  const [cartAccessoryItems, setCartAccessoryItems] = useState({});
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

  // Fetch accessories data
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

  // Fetch cart data from backend
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
        // Convert response to a format suitable for cartAccessoryItems
        const cartItems = response.data.reduce((acc, item) => {
          acc[item.itemId] = item.quantity;
          return acc;
        }, {});
        setCartAccessoryItems(cartItems);
      } catch (error) {
        console.error('Error fetching cart', error);
      }
    };

    fetchCart();
  }, [userId]);

  // Save cart data to the backend
  const saveCartToDatabase = async (cartData) => {
    try {
      const token = localStorage.getItem('authToken');
      await axios.post('http://localhost:4000/api/saveCart', {
        userId,
        items: Object.keys(cartData).map(itemId => ({
          itemId,
          quantity: cartData[itemId],
        })),
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('Cart saved successfully');
    } catch (error) {
      console.error('Error saving cart:', error);
    }
  };

  // Add item to cart
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

  // Remove item from cart
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

  // Calculate total amount of items in cart
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartAccessoryItems) {
      if (cartAccessoryItems[itemId] > 0) {
        const item = accessoriesData.find((i) => i._id === itemId);
        if (item) {
          totalAmount += cartAccessoryItems[itemId] * item.price;
        }
      }
    }
    return totalAmount;
  };

  const accessoryContextValue = {
    cartAccessoryItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    accessoriesData,
  };

  return (
    <ShopAccessoryContext.Provider value={accessoryContextValue}>
      {props.children}
    </ShopAccessoryContext.Provider>
  );
};
