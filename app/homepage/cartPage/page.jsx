"use client";

import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { CartContext } from "@/context/CartContext";
import { ImSpinner10 } from "react-icons/im";

const CartPage = () => {
  const { cartItems, handleRemoveItem, handleAddToCart } = useContext(CartContext);
  const [totalPrice, setTotalPrice] = useState(0);
  const [error, setError] = useState(null);
  const router = useRouter();

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
    const total = calculateTotalPrice(cartItems)
    setTotalPrice(total)
  }, [cartItems]);

  const handleCheckout = () => {
    router.push("/checkout");
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bg-[#FFFDD0] h-[100%]">
      <Navbar />

      <main className="pt-[105px] pb-10">
        <h1 className="text-center text-lg md:text-2xl font-bold text-[#333333] mb-5">
          Your Shopping Cart
        </h1>

        {!cartItems.length ? (
          <ImSpinner10 className="mx-auto animate-spin text-[48px] text-[#B76E79]" />
        ) : (
          <table className="container mx-auto table-fixed border-separate border-spacing-2 border-2 border-[#B76E79] rounded-lg shadow-md">
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
                  <td className="md:text-lg font-medium md:font-semibold text-[#1F3A93]">
                    {item.itemId.name}
                  </td>
                  <td className="text-sm md:text-base font-semibold">
                    Quantity: {item.quantity}
                  </td>
                  <td className="text-sm font-medium md:font-semibold md:tracking-wide text-[#1F3A93]">
                    ${item.itemId.price}
                  </td>
                  <td className="">
                    <button
                      onClick={() => handleRemoveItem(item.itemId._id)}
                      className="bg-[#1F3A93] px-[6px] w-[19px] rounded-sm font-semibold text-[#FFFDD0]"
                    >
                      -
                    </button>
                    <input
                      onChange={(e) => (e.target.value, item.itemId._id)}
                      type="number"
                      className="w-1/4 outline-none border border-[#1F3A93] rounded text-center bg-[#FFFDD0]"
                      value={item.quantity}
                    />
                    <button
                      onClick={() => handleAddToCart(item.itemId._id)}
                      className="bg-[#1F3A93] px-[4px] text-center rounded-sm font-semibold text-[#FFFDD0]"
                    >
                      +
                    </button>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        )}

        {totalPrice > 0 && (
          <main className="container mx-auto w-[30%] mt-2">
            <div className="border-t border-black w-[100%]"></div>
            <div>
              <p className="font-medium md:font-semibold mb-1 text-[#B76E79]">
                SubTotal: ${totalPrice}
              </p>
              <Link
                href={"/homepage/cartPage/orderDetails"}
                className="block text-center bg-[#1F3A93] px-2 py-2 md:py-3 leading-none rounded text-white text-sm md:text-base"
              >
                <button onClick={handleCheckout}>Proceed to Checkout</button>
              </Link>
            </div>
          </main>
        )}
      </main>
    </div>
  );
};

export default CartPage;