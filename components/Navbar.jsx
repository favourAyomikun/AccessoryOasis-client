import React from "react";
import Link from "next/link";
import { Kelly_Slab } from "next/font/google";
import { HiOutlineShoppingCart } from "react-icons/hi";

const kellyslab = Kelly_Slab({ subsets: ["latin"], weight: "400" });

const Navbar = () => {
  return (
    <nav className="container max-w-full h-14 fixed flex items-center justify-around bg-[#1F3A93]">
      <h1
        className={`${kellyslab.className} text-[#E6A8A1] text-center text-[33px]`}
      >
        AccessoryOasis
      </h1>
      <Link href="/homepage/cartPage">
        <HiOutlineShoppingCart className="text-[35px] text-white" />
      </Link>
    </nav>
  );
};

export default Navbar;
