"use client";

import { Taviraj } from "next/font/google";
import Image from "next/image";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { ImSpinner10 } from "react-icons/im";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartContext } from "@/context/CartContext";

const taviraj = Taviraj({ subsets: ["latin"], weight: "300" });

export default function HomePage() {
  // set different state in a varaible
  const { handleAddToCart } = useContext(CartContext);
  const [accessoriesData, setAccessoriesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState("");
  const [successMessage, setSuccessMessage] = useState({
    accessoryId: null,
    message: "",
  });

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    // fetch user profile, username to be precise!
    if (userId) {
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/api/getUserProfile/${userId}`)
        .then((response) => {
          setUsername(response.data.username);
        })
        .catch((error) => {
          console.error("Failed to fetch user profile", error);
          setUsername("Guest");
        });
    }

    // Fetch accessory data
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/accessories`)
      .then((response) => {
        setAccessoriesData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const addToCart = (id) => {
    handleAddToCart(id);
    setSuccessMessage({ accessoryId: id, message: "Item added to cart!" });
    
    setTimeout(() => {
      setSuccessMessage("");
    }, 1000);
  };  

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <main className={`${taviraj.className} bg-[#FFFDD0] h-[100%] w-full`}>
      <Navbar />

      <section className="pt-24">
        <div className="pl-8 md:pl-10 text-[17px] md:text-[22px] uppercase font-semibold tracking-wider mb-5">
          Welcome {username}
        </div>

        <div className="container flex flex-col-reverse md:flex-row items-center justify-around w-[85%] py-10 mx-auto bg-[#FFFDEB] shadow-lg rounded-md">
          <h2 className="flex text-center text-[#333333] md:w-[40%] font-semibold tracking-wide leading-8 text-lg md:text-xl mt-10 md:mt-0">
            Discover Your Perfect Accessory at AccessoryOasis, Where Every Piece
            Enhances Your Unique Style.
          </h2>
          <Image
            src="/applewatch_animation.gif"
            unoptimized
            alt="applewatch"
            height={350}
            width={350}
            className="rounded-xl w-[80%] md:w-[35%]"
          />
        </div>
      </section>

      <section className="container flex flex-col space-y-10 md:space-y-0 md:flex-row items-center justify-around w-[85%] py-10 mx-auto bg-[#FFFDEB] shadow-lg rounded-md mt-20">
        <Image
          src="/bag.gif"
          unoptimized
          alt="bag"
          height={350}
          width={350}
          className="rounded-xl w-[80%] h-96 md:w-[35%]"
        />
        <p className="flex text-center text-[#333333] w-[90%] md:w-[40%] font-semibold tracking-wide leading-8 text text-lg">
          Experience the art of accessorizing with AccessoryOasis. Our range of
          meticulously designed accessories provides you with the perfect blend
          of sophistication and flair. Whether you're dressing up or down, find
          the pieces that complete your look with finesse.
        </p>
      </section>

      <div className="mt-20">
        <h2 className="pl-8 md:pl-10 text-[#333333] text-[19px] md:text-[22px] mb-5 font-extrabold tracking-wider">
          Available Accessories
        </h2>

        {loading ? (
          // show spinner while loading
          <ImSpinner10 className="mx-auto animate-spin text-[48px] text-[#B76E79]" />
        ) : (
          // show accessories data once loaded
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 place-items-center gap-y-10">
            {accessoriesData.map((accessory) => (
              <div
                key={accessory._id}
                className="bg-[#FFFDD0] border border-[#1F3A93] rounded-md overflow-hidden w-[83%] md:w-[80%]"
              >
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}${accessory.image_url}`}
                  unoptimized
                  alt={accessory.name}
                  height={300}
                  width={300}
                  className="w-full h-[300px] object-cover object-center"
                />
                <div className="flex flex-col justify-center items-center py-3">
                  <h2 className="text-lg font-semibold tracking-wide">
                    {accessory.name}
                  </h2>
                  <p className="font-semibold">${accessory.price}</p>

                  {successMessage &&
                    successMessage.accessoryId === accessory._id && (
                      <p className="text-green-600 tracking-wider font-semibold text-sm md:text-base mt-2">
                        {successMessage.message}
                      </p>
                    )}

                  <button
                    className="bg-[#1F3A93] border border-[#B76E79] p-2 w-[50%] rounded-sm mt-5 text-[#E6A8A1]"
                    onClick={() => addToCart(accessory._id)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}
