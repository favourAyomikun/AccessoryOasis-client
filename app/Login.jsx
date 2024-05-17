'use-client'

import Link from "next/link";
import React from "react";

export default function Login() {
  return (
    <main className="pt-40">
      <form className="max-w-md mx-auto bg-gray-300 shadow-lg rounded-lg border-2 border-gray-500 p-6">
        <div className="input_container">
          <label htmlFor="email" className="label">
            Email
          </label>
          <input type="email" className="input" />
        </div>
        <div className="input_container">
          <label htmlFor="password" className="label">
            Password
          </label>
          <input type="password" className="input" />
        </div>
        <button className="mt-5 bg-[#4169E1] text-white font-bold py-2 px-4 rounded-md w-24">
          <Link href={'/homepage'}>Login</Link>
        </button>
      </form>
    </main>
  );
}
