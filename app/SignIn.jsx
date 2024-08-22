"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import Link from 'next/link'
import { useEffect, useState } from "react";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await validationSchema.validate(
        { email, password },
        { abortEarly: false }
      );

      setErrorMessage("");

      // post data/sign in details to the server
      try {
        const response = await axios.post(
          "http://localhost:4000/api/auth/register",
          {
            email,
            password,
          }
        );

        if (response.status === 200) {
          setSuccessMessage(data.message);
          router.push("/homepage");
        } else {
          setErrorMessage(data.error);
        }
      } catch (error) {
        setErrorMessage("Error signing in");
      }
    } catch (validationError) {
      const validationErrors = {};
      validationError.inner.forEach((err) => {
        validationErrors[err.path] = err.message;
      });

      if (validationErrors.email && validationErrors.password) {
        setErrorMessage("Both email and password are required.");
      } else {
        if (validationErrors.email) {
          setErrorMessage(validationErrors.email);
        }
        if (validationErrors.password) {
          if (password === "") {
            setErrorMessage("Password is required");
          } else {
            setErrorMessage(validationErrors.password);
          }
        }
      }
    }
  };

  // function to clear error and success message that pops up on the form
  useEffect(() => {
    const timer = setTimeout(() => {
      setSuccessMessage(""), setErrorMessage("");
    }, 1500);

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
        onSubmit={handleRegister}
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
          className="mt-5 bg-[#D84727] text-white font-bold py-2 px-4 rounded-md w-full"
        >
          Sign In
        </button>
        <p className="mt-5">Don't have an account? <Link href='/sign-up' className="underline underline-offset-2">Sign up</Link></p>
      </form>
    </main>
  );
}
