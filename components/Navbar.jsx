import React, { useContext } from "react";
import Link from "next/link";
import { Kelly_Slab } from "next/font/google";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { CartContext } from "@/context/CartContext";

const kellyslab = Kelly_Slab({ subsets: ["latin"], weight: "400" });

const Navbar = () => {
  const { totalQuantity } = useContext(CartContext); // Get totalQuantity from context
  console.log(totalQuantity);
  

  return (
    <nav className="container max-w-full h-14 fixed flex items-center justify-around bg-[#1F3A93]">
      <Link
        href={"/homepage"}
        className={`${kellyslab.className} text-[#E6A8A1] text-[33px]`}
      >
        AccessoryOasis
      </Link>
      <Link href="/homepage/cartPage" className="relative">
        <HiOutlineShoppingCart className="text-[35px] text-white" />
        {totalQuantity > 0 && (
          <span className="absolute -top-1 left-7 bg-#E6A8A1] text-white text-sm rounded-full px-2">
            {totalQuantity}
          </span>
        )}
      </Link>
      <Link
        href={""}
        className={`${kellyslab.className} text-[#E6A8A1] text-[23px]`}
      >
        Log Out
      </Link>
    </nav>
  );
};

export default Navbar;
