import React from "react";
import { Kelly_Slab } from "next/font/google";
import { ImFacebook, ImInstagram, ImTwitter } from "react-icons/im";

const kellyslab = Kelly_Slab({ subsets: ["latin"], weight: "400" });

const Footer = () => {
  return (
    <footer className="bg-[#1F3A93] w-full mt-24 pt-4">
      <div className="flex flex-col items-center justify-center">
          <h1
            className={`${kellyslab.className} text-[#E6A8A1] text-[24px] md:text-[33px] mb-2`}
          >
            AccessoryOasis
          </h1>
          <div className="flex flex-col pl-10 mb-5">
            <h2 className="text-white text-lg">Follow us on:</h2>
            <div className="flex space-x-5 text-lg text-white">
              <ImInstagram />
              <ImFacebook />
              <ImTwitter />
            </div>
          </div>
      </div>
      <p className="text-center text-sm text-white">
        COPYRIGHT © 2024 ACCESSORYOASIS
      </p>
    </footer>
  );
};

export default Footer;
