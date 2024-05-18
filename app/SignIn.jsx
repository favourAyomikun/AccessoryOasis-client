"use client";

import Link from "next/link";
import { useState } from "react";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        console.log("register successful");
      } else {
        console.log("Invalid email or passsword");
      }
    } catch (error) {
      console.error("Error registering", error);
    }
  };

  return (
    <main className="pt-40">
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-gray-300 shadow-lg rounded-lg border-2 border-gray-500 p-6"
      >
        <div className="input_container">
          <label htmlFor="email" className="label">
            Email
          </label>
          <input
            type="email"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input_container">
          <label htmlFor="password" className="label">
            Password
          </label>
          <input
            type="password"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="mt-5 bg-[#4169E1] text-white font-bold py-2 px-4 rounded-md w-24"
        >
          <Link href={'/'}>Sign In</Link>
        </button>
      </form>
    </main>
  );
}
