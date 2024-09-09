"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState,} from "react";
import { ImSpinner10 } from "react-icons/im";

const OtpVerificationPage = () => {
  const [otp, setOtp] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState(""); 

  const router = useRouter();

  useEffect(() => {
    // Get email from query parameters using window.location
    const urlParams = new URLSearchParams(window.location.search);
    const emailFromParams = urlParams.get("email");
    setEmail(emailFromParams);
  }, []);
  
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/verify-otp`,
        { email, otp }
      );

      if (response.status === 200) {
        setSuccessMessage(response.data.message);
        setErrorMessage("");

        // Redirect to the login page after successful OTP verification
        router.push("/");
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Error during OTP verification"
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
        onSubmit={handleOtpSubmit}
        className="max-w-sm md:max-w-md mx-auto w-[90%] bg-[#F5F5F5] shadow-lg rounded-lg p-6"
      >
        <div className="input_container">
          <label htmlFor="otp" className="label">
            OTP
          </label>
          <input
            type="text"
            className="input"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
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
            "Verify OTP"
          )}
        </button>
      </form>
    </main>
  );
};

export default OtpVerificationPage;
