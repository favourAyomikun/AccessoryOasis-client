"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import * as Yup from "yup";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState();
  const [errorMessage, setErrorMessage] = useState();

  const router = useRouter();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required!"),
    password: Yup.string()
      .min(4, "Password must be more than four characters")
      .required("Password is required!"),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await validationSchema.validate(
        { email, password },
        { abortEarly: false }
      );

      try {
        const response = await fetch(
          "http://localhost:4000/api/auth/register",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          }
        );

        const data = await response.json();
        if (response.ok) {
          console.log(data.message);
          setErrorMessage({})
          // router.push('/homepage')
        } else {
          console.log(data.error);
          console.log("Invalid email or passsword");
        }
      } catch (error) {
        console.error("Error registering", error);
      }
    } catch (validationError) {
      const validationErrors = {};
      validationError.inner.forEach((err) => {
        validationErrors[err.path] = err.message;
      });

      if (validationErrors.email && validationErrors.password) {
        console.log("Both email and password are required.");
      } else {
        if (validationErrors.email) {
          console.log("Email error:", validationErrors.email);
        }
        if (validationErrors.password) {
          if (password === "") {
            console.log("Password is required!");
          } else {
            console.log("Password error:", validationErrors.password);
          }
        }
      }
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
          Sign In
        </button>
      </form>
    </main>
  );
}