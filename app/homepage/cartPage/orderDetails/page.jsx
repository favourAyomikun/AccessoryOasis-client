"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import PaystackPaymentIntegration from "@/components/PaymentIntegrationPage";

const OrderDetailsPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchCartItems = async () => {
      const userId = localStorage.getItem("userId");

      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/getCartItems?userId=${userId}`
        );
        const items = response.data.items || [];
        setCartItems(items);

        // Calculate and set the total price
        const total = items.reduce((acc, item) => {
          return acc + item.quantity * item.itemId.price;
        }, 0);
        setTotalPrice(total);
      } catch (error) {
        console.error("Failed to fetch cart items", error);
      }
    };

    fetchCartItems();
  }, []);

  return (
    <main className="bg-[#F5F5F5] h-[100%] w-full py-20">
      <h1 className="text-2xl font-bold text-center mb-6">Order Details</h1>
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div
                key={item.itemId._id}
                className="border p-4 rounded-md bg-white"
              >
                <img
                  src={`${process.env.NEXT_PUBLIC_API_URL}${item.itemId.image_url}`}
                  alt={item.itemId.name}
                  className="object-cover object-center w-32 h-32"
                />
                <h2 className="text-xl font-semibold mt-4">
                  {item.itemId.name}
                </h2>
                <p className="text-gray-600">Quantity: {item.quantity}</p>
                <p className="text-gray-600">Price: ${item.itemId.price}</p>
                <p className="text-gray-800 font-bold mt-2">
                  Total: ${item.quantity * item.itemId.price}
                </p>
              </div>
            ))
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div>
        <div className="mt-10">
          <h2 className="text-2xl font-bold">Total Price: ${totalPrice}</h2>
        </div>
      </div>

        <PaystackPaymentIntegration />
    </main>
  );
};

export default OrderDetailsPage;
