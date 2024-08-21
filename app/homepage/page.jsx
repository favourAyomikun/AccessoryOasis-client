"use client";

import { Kelly_Slab, Taviraj } from "next/font/google";
import Image from "next/image";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ImSpinner10 } from "react-icons/im";
import { HiOutlineShoppingCart } from "react-icons/hi";
import Link from "next/link";

const kellyslab = Kelly_Slab({ subsets: ["latin"], weight: "400" });
const taviraj = Taviraj({ subsets: ["latin"], weight: "300" });

export default function HomePage() {
  // set different state in a varaible
  const [accessoriesData, setAccessoriesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAccessories = async () => {
      try {
        // fetch data from the server
        const response = await axios.get(
          "http://localhost:4000/api/accessories"
        );
        setAccessoriesData(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (error) {
        // catch default error or unexpected error
        console.error("Error fetching accessories", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchAccessories();
  }, []);

  if (loading) {
    return <ImSpinner10 className="animate-spin text-[100px] text-center" />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <main className={`${taviraj.className} bg-[#E5E5E5] h-[100%] w-full pt-6`}>
      <nav className="flex items-center justify-around border border-blue-400">
        <h1
          className={`${kellyslab.className} text-[#d84727] text-center text-[33px]`}
        >
          AccessoryOasis
        </h1>
        <Link href='/homepage/cartPage'>
          <HiOutlineShoppingCart className="text-[35px]" />
        </Link>
      </nav>

      <section className="container w-[80%] py-10 mx-auto flex items-center justify-around bg-[#F1DDC9] border border-blue-400 mt-12 rounded-md">
        <h2 className="flex text-center text-[#333333] w-[40%] font-semibold tracking-wide leading-8 text-xl">
          Discover Your Perfect Accessory at AccessoryOasis, Where Every Piece
          Enhances Your Unique Style.
        </h2>
        <Image
          src="/applewatch_animation.gif"
          unoptimized
          alt="applewatch"
          height={350}
          width={350}
          className="rounded-xl"
        />
      </section>

      <section className="flex items-center justify-around border border-blue-400 mt-20">
        <Image
          src="/bag.gif"
          unoptimized
          alt="bag"
          height={350}
          width={350}
          className="rounded-md h-[300px] object-cover"
        />
        <p className="text-center text-[#333333] font-semibold w-[50%] tracking-wide">
          Experience the art of accessorizing with AccessoryOasis. Our range of
          meticulously designed accessories provides you with the perfect blend
          of sophistication and flair. Whether you're dressing up or down, find
          the pieces that complete your look with finesse.
        </p>
      </section>

      <div className="border border-red-400 mt-20">
        <h2>Available Accessories</h2>
        <div className="grid grid-cols-3 gap-x-8 place-items-center gap-y-10">
          {accessoriesData.map((accessory) => (
            <div
              key={accessory._id}
              className="border-2 border-pink-400 w-[80%]"
            >
              <Image
                src={`http://localhost:4000${accessory.image_url}`}
                alt={accessory.name}
                height={300}
                width={300}
                className="w-full h-[300px] object-cover object-center"
              />
              <div>
                <h2 className="text-blue-500">{accessory.name}</h2>
                <p>${accessory.price}</p>
                <p>{accessory.category}</p>
                <button className="bg-red-500 p-2 border-2 border-orange-500 text-white">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
