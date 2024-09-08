'use client'

import React, { useState } from "react";
import dynamic from "next/dynamic";

// Dynamically import PaystackButton to avoid SSR issues
const PaystackButton = dynamic(() => import("react-paystack").then((mod) => mod.PaystackButton), { ssr: false });

const PaystackPaymentIntegration = () => {
  const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;

  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const componentProps = {
    email,
    amount: amount * 100, // Paystack expects amount in kobo
    metadata: {
      name,
      phone,
    },
    publicKey,
    text: "Pay Now",
    onSuccess: () => alert("Payment successful!"),
    onClose: () => alert("Payment window closed"),
  };

  const style = {
    button: "block w-full px-4 py-2 bg-[#1F3A93] text-white rounded-md mt-5",
  };

  return (
    <div className="mt-12">
      <h1 className="text-center text-lg md:text-2xl my-4 font-[600]">
        Make your payment here
      </h1>
      <div className="max-w-sm md:max-w-md mx-auto w-[90%] my-4">
        <input
          type="email"
          placeholder="Email"
          className='input'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          className='input'
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          type="text"
          placeholder="Name"
          className='input'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Phone number"
          className='input'
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <PaystackButton className={style.button} {...componentProps} />
      </div>
    </div>
  );
};

export default PaystackPaymentIntegration;
