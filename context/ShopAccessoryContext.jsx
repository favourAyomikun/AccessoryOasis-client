'use client'

import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const ShopAccessoryContext = createContext(null);

export const ShopAccessoryContextProvider = (props) => {
    const [cartAccessoryItems, setCartAccessoryItems] = useState({})
    const [userId, setUserId] = useState(null)

    useEffect(() => {
        // fetch cart-accessory items from the backend when the component mounts
        const fetchCart = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/cart', {
                    headers: {
                        Authorization: `Bearer ${localStorage.get('token')}`
                    },
                })
                setCartAccessoryItems(response.data)
            } catch (error) {
                console.error('Error fetching cart', error)
            }
        }

        fetchCart()
    }, [])


    const saveCartToDatabase = async (accessoryItems) => {
        try {
            await axios.post('http://localhost:4000/api/cart', 
                { accessoryItems },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.get('token')}`
                    },
                }
            )
        } catch (error) {
            console.error('Error saving cart item', error)
        }
    }

    const addToCart = async (accessoryItemId) => {
        setCartAccessoryItems(prevItems => {
            const updatedCart = {
                ...prevItems, 
                [itemId]: prevItems[itemId] ? prevItems[itemId] + 1 : 1,
            }
            saveCartToDatabase(updatedCart)
            return updatedCart;
        })
    }

    const removeFromCart = async (accessoryItemId) => {
        setCartAccessoryItems((prevItems) => {
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
        let totalAmount = 0;
        for (const itemId in cartItems) {
          if (cartItems[itemId] > 0) {
            // Assuming you have item details like price fetched from the backend
            const item = items.find((i) => i.id === Number(itemId));
            if (item) {
              totalAmount += cartItems[itemId] * item.price;
            }
          }
        }
        return totalAmount;
      };

    const accessoryContextValue = {
        cartAccessoryItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount
    }

    return (
        <ShopAccessoryContext.Provider value={accessoryContextValue}>
            {props.children}
        </ShopAccessoryContext.Provider>
    )
}