"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      // Clear any previous error messages
      setErrorMessage("");

      // Send login data to the server
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
        {
          email,
          password,
        }
      );

      if (response.status === 200) {
        setSuccessMessage(response.data.message);

        // Store JWT in local storage (or cookies) and redirect to the homepage
        const token = response.data.token;
        localStorage.setItem("token", token);

        // Decode the token to get userId and other info (if needed)
        const decodedToken = jwtDecode(token);
        console.log('Decoded token:', decodedToken)

        const userId = decodedToken.id;
        console.log("User ID:", userId); // Debug log for userId

        if (userId) {
          localStorage.setItem("userId", userId);
          router.push("/homepage");
        } else {
          setErrorMessage("User ID not found in the token.");
        }
      } else {
        setErrorMessage(response.data.error || "Login failed");
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Error during login");
    }
  };

  // Function to clear error and success messages after a few seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setSuccessMessage("");
      setErrorMessage("");
    }, 3000);

    return () => clearTimeout(timer);
  }, [successMessage, errorMessage]);

  return (
    <main className="pt-40">
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
        onSubmit={handleSignIn}
        className="max-w-md mx-auto bg-[#F1DDC9] shadow-lg rounded-lg p-6"
      >
        <div className="input_container">
          <label htmlFor="email" className="label">
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
              e.target.setCustomValidity("Enter your email");
            }}
            required
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
          className="mt-5 bg-[#D84727] text-white font-bold py-2 px-4 rounded-md w-full"
        >
          Sign In
        </button>
        <p className="mt-5">
          Don't have an account?{" "}
          <Link href="/sign-up" className="underline underline-offset-2">
            Sign up
          </Link>
        </p>
      </form>
    </main>
  );
}
