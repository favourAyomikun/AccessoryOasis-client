"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [error, setError] = useState(null);
  const router = useRouter();

    const fetchCartItems = async () => {
      const userId = localStorage.getItem("userId");
      console.log(userId);

      if (!userId) {
        setError("User ID is not found.");
        return;
      }

      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/getCartItems?userId=${userId}`
        );
        console.log(cartItems);
        console.log(response.data);

        const items = response.data.items || [];
        setCartItems(items); // The backend returns the items directly

        // Calculate and set the total price
        const total = calculateTotalPrice(items);
        setTotalPrice(total);
      } catch (error) {
        setError("Error fetching cart items. Please try again.");
        console.error("Failed to fetch cart items", error);
      }
    };



  const calculateTotalPrice = (items) => {
    // Ensure items is an array
    if (!Array.isArray(items)) {
      console.error("Expected an array of items.");
      return 0;
    }

    // Calculate total price
    const total = items.reduce((acc, item) => {
      // Ensure item and item.itemId are valid
      if (
        item &&
        item.itemId &&
        typeof item.quantity === "number" &&
        typeof item.itemId.price === "number"
      ) {
        return acc + item.quantity * item.itemId.price;
      }
      return acc;
    }, 0);

    return total;
  };

    // Fetch cart items on component mount
    useEffect(() => {
      fetchCartItems();
    }, []);

  const handleRemoveItem = async (itemId) => {
    const userId = localStorage.getItem("userId");

    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/removeCartItem/${itemId}`, {
        data: { userId },
      });
fetchCartItems()
      // const updatedItems = cartItems.filter((item) => item._id !== itemId);
      // setCartItems(updatedItems);
      // calculateTotalPrice(updatedItems);
    } catch (error) {
      setError("Error removing item from cart. Please try again.");
      console.error("Failed to remove item from cart", error);
    }

  };

  const handleCheckout = () => {
    router.push("/checkout");
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <main className="bg-[#F5F5F5] h-[100%] w-full pt-6">
      <h1 className="text-2xl font-bold text-center mb-6">
        Your Shopping Cart
      </h1>
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.isArray(cartItems) && cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div
                key={item.itemId._id}
                className="border p-4 rounded-md bg-white"
              >
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}${item.itemId.image_url}`}
                  unoptimized
                  alt={item.itemId.name}
                  height={150}
                  width={150}
                  className="object-cover object-center"
                />
                <h2 className="text-xl font-semibold mt-4">
                  {item.itemId.name}
                </h2>
                <p className="text-gray-600">Quantity: {item.quantity}</p>
                <p className="text-gray-600">Price: ${item.itemId.price}</p>
                <p className="text-gray-800 font-bold mt-2">
                  Total: ${item.quantity * item.itemId.price}
                </p>
                <button
                  className="mt-4 bg-red-500 text-white py-2 px-4 rounded"
                  onClick={() => handleRemoveItem(item.itemId._id)}
                >
                  Remove
                </button>
              </div>
            ))
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div>
        <div className="mt-10">
          <h2 className="text-2xl font-bold">Total Price: ${totalPrice}</h2>
          <button
            className="mt-4 bg-green-500 text-white py-3 px-6 rounded"
            onClick={handleCheckout}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </main>
  );
};

export default CartPage;
