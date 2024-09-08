import React, { useContext } from "react";
import Link from "next/link";
import { Kelly_Slab } from "next/font/google";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { CartContext } from "@/context/CartContext";
import { useRouter } from "next/navigation";

const kellyslab = Kelly_Slab({ subsets: ["latin"], weight: "400" });

const Navbar = () => {
  // Get totalQuantity from context
  const { totalQuantity } = useContext(CartContext);
  const router = useRouter();

  // sign out function
  const handleSignOut = () => {
    // remove the jwt token and userId from local storage
    localStorage.removeItem("token");
    localStorage.removeItem("userId");

    // redirect to sign in page
    router.push("/");
  };

  return (
    <nav className="container max-w-full h-14 fixed flex items-center justify-between px-10 md:px-40 bg-[#1F3A93]">
      <Link
        href={"/homepage"}
        className={`${kellyslab.className} text-[#E6A8A1] text-[30px] md:text-[33px]`}
      >
        AccessoryOasis
      </Link>
      <div className="flex space-x-5">
        <Link href="/homepage/cartPage" className="relative">
          <HiOutlineShoppingCart className="text-[30px] md:text-[35px] text-white" />
          {totalQuantity > 0 && (
            <span className="absolute -top-1 left-7 bg-#E6A8A1] text-white text-sm rounded-full px-2">
              {totalQuantity}
            </span>
          )}
        </Link>
        <button
          onClick={handleSignOut}
          className={`${kellyslab.className} text-[#E6A8A1] text-[21px] md:text-[23px]`}
        >
          Log Out
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
