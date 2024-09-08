"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { ImSpinner10 } from "react-icons/im";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSignIn = async (e) => {
    e.preventDefault();

    
    try {
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
        
        const userId = decodedToken.id;
        
        if (userId) {
          localStorage.setItem("userId", userId);
          setLoading(true);
          router.push("/homepage");
        } else {
          setErrorMessage("User ID not found in the token.");
        }
      } else {
        setErrorMessage(response.data.error || "Login failed");
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Error during login");
    } finally {
      setLoading(false);
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
        onSubmit={handleSignIn}
        className="max-w-sm md:max-w-md mx-auto w-[90%] bg-[#F5F5F5] shadow-lg rounded-lg p-6"
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
          className="mt-5 bg-[#1F3A93] text-[#FFFDEB] tracking-wide font-bold py-2 px-4 rounded-md w-full"
          disabled={loading}
        >
          {loading ? (
            <ImSpinner10 className="mx-auto animate-spin text-[40px] md:text-[48px] text-[#B76E79]" />
          ) : (
            "Sign In"
          )}
        </button>
        <p className="mt-5 text-[#1F3A93]">
          Don't have an account?{" "}
          <Link
            href="/sign-up"
            className="underline underline-offset-2  text-[#B76E79]"
          >
            Sign up
          </Link>
        </p>
      </form>
    </main>
  );
}
