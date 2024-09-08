"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import PaystackPaymentIntegration from "@/components/PaymentIntegrationPage";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { ImSpinner10 } from "react-icons/im";

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
        console.log(items)

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
    <div className="bg-[#FFFDD0] h-[100%]">
      <Navbar />

      <main className="pt-[105px] pb-10">
        <h1 className="text-center text-lg md:text-2xl font-bold text-[#333333] mb-5">
          Order Details
        </h1>

        {!cartItems.length ? (
          <ImSpinner10 className="mx-auto animate-spin text-[48px] text-[#B76E79]" />
        ) : (
          <table className="w-[90%] container mx-auto table-fixed border-separate border-spacing-2 border border-[#B76E79] rounded-lg shadow-md">
            {cartItems.map((item) => (
              <tbody key={item.itemId._id}>
                <tr>
                  <td>
                    <Image
                      src={`${process.env.NEXT_PUBLIC_API_URL}${item.itemId.image_url}`}
                      unoptimized
                      alt={item.itemId.name}
                      height={150}
                      width={150}
                      className="w-48 h-20 md:h-40 rounded-lg object-cover object-center"
                    />
                  </td>
                  <td className="text-[15px] md:text-lg font-medium md:font-semibold text-[#1F3A93]">
                    {item.itemId.name}
                  </td>
                  <td className="text-sm font-medium md:font-semibold md:tracking-wide text-[#1F3A93]">
                    ${item.itemId.price}
                  </td>
                  <td className="text-sm md:text-base font-semibold">
                    Quantity: {item.quantity}
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        )}

        {totalPrice > 0 && (
          <div className="container mx-auto w-[30%] mt-4">
            <div className="border-t border-black w-[100%]"></div>
            <p className="font-medium md:font-semibold mb-1 text-[#B76E79]">
              Total: ${totalPrice}
            </p>
          </div>
        )}

      <PaystackPaymentIntegration />
      </main>
    </div>
  );
};

export default OrderDetailsPage;
