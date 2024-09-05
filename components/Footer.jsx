import React from "react";
import { Kelly_Slab } from "next/font/google";
import { ImFacebook, ImInstagram, ImTwitter } from "react-icons/im";

const kellyslab = Kelly_Slab({ subsets: ["latin"], weight: "400" });

const Footer = () => {
  return (
    <footer className="bg-[#1F3A93] w-full mt-44 pt-4">
      <div className="flex items-center justify-around">
        <div>
          <h1
            className={`${kellyslab.className} text-[#E6A8A1] text-[33px]`}
          >
            AccessoryOasis
          </h1>
          <div className="flex flex-col pl-10">
            <h2 className="text-white text-lg">Follow us on:</h2>
            <div className="flex space-x-5 text-lg text-white">
              <ImInstagram />
              <ImFacebook />
              <ImTwitter />
            </div>
          </div>
        </div>
        <div className="text-center text-white text-lg tracking-wide">
          Explore the latest in fashion accessories and elevate your style
        </div>
      </div>
      <p className="text-center text-sm text-white">
        COPYRIGHT © 2024 ACCESSORYOASIS
      </p>
    </footer>
  );
};

export default Footer;
