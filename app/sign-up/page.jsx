"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ImSpinner10 } from "react-icons/im";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`,
        {
          username,
          email,
          password,
        }
      );

      if (response.status === 201) {
        setSuccessMessage(response.data.message);
        setErrorMessage("");
        console.log(response.data);

        // redirect to sign in after user has registered
        router.push("/");
      } else {
        setErrorMessage(response.data.message || "Registration failed");
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Error during registration"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setSuccessMessage("");
      setErrorMessage("");
    }, 3000); // Clear messages after 3 seconds

    return () => clearTimeout(timer); // Clear timeout if the component unmounts
  }, [successMessage, errorMessage]);

  return (
    <main className="bg-[#FFFDD0] flex flex-col justify-center h-screen">
      {successMessage && (
        <p className="text-green-600 font-semibold text-center tracking-wide text-[17px] mb-2">
          {successMessage}
        </p>
      )}
      {errorMessage && (
        <p className="text-red-600 font-semibold text-center tracking-wide text-[17px] mb-2">
          {errorMessage}
        </p>
      )}
      <form
        onSubmit={handleRegister}
        className="max-w-sm md:max-w-md mx-auto w-[90%] bg-[#F5F5F5] shadow-lg rounded-lg p-6"
      >
        <div className="input_container">
          <label htmlFor="username" className="label ">
            Username
          </label>
          <input
            type="username"
            className="input"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              e.target.setCustomValidity("");
            }}
            onInvalid={(e) => {
              e.target.setCustomValidity("Enter your username");
            }}
            required
          />
        </div>
        <div className="input_container">
          <label htmlFor="email" className="label ">
            Email
          </label>
          <input
            type="email"
            className="input"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              e.target.setCustomValidity("");
            }}
            onInvalid={(e) => {
              e.target.setCustomValidity("Enter your email address");
            }}
            required
          />
        </div>
        <div className="input_container">
          <label htmlFor="password" className="label ">
            Password
          </label>
          <input
            type="password"
            className="input"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              e.target.setCustomValidity("");
            }}
            onInvalid={(e) => {
              e.target.setCustomValidity("Enter your password");
            }}
            required
          />
        </div>
        <button
          type="submit"
          className="mt-5 bg-[#1F3A93] text-[#FFFDEB] tracking-wide font-bold py-2 px-4 rounded-md w-full"
          disabled={loading}
        >
          {loading ? (
            <ImSpinner10 className="mx-auto animate-spin text-[40px] md:text-[42px] text-[#B76E79]" />
          ) : (
            "Sign Up"
          )}
        </button>
        <p className="mt-5 text-[#1F3A93]">
          Already have an account?{" "}
          <Link
            href="/"
            className="underline underline-offset-2 text-[#B76E79]"
          >
            Sign in
          </Link>
        </p>
      </form>
    </main>
  );
};

export default Register;
