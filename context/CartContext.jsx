'use client'

import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [cartItems, setCartItems] = useState([]);

  // Fetch cart items and update total quantity 
  const fetchCartItems = async () => {
    const userId = localStorage.getItem("userId");

    if (userId) {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/getCartItems`, {
          params: { userId },
        });
        const items = response.data.items || [];
        setCartItems(items);

        // Calculate and update the total quantity
        const totalQty = items.reduce((acc, item) => acc + item.quantity, 0);
        setTotalQuantity(totalQty);
      } catch (error) {
        console.error("Failed to fetch cart items", error);
      }
    }
  };

  const handleAddToCart = async (accessoryId) => {
    const userId = localStorage.getItem("userId");

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/saveCartItems`, {
        userId,
        items: [{ itemId: accessoryId, quantity: 1 }],
      });

      // Fetch updated cart items after adding to cart
      await fetchCartItems();
    } catch (error) {
      console.error("Failed to add to cart", error);
    }
  };

  useEffect(() => {
    // Fetch the cart items when the context provider mounts
    fetchCartItems();
  }, []);

  return (
    <CartContext.Provider value={{ totalQuantity, cartItems, handleAddToCart, fetchCartItems }}>
      {children}
    </CartContext.Provider>
  );
};