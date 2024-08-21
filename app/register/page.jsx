'use client'

import React from 'react'


const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

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
            onSubmit={handleSubmit}
            className="max-w-md mx-auto bg-[#F1DDC9] shadow-lg rounded-lg p-6"
          >
            <div className="input_container">
              <label htmlFor="username" className="label">
                Username
              </label>
              <input
                type="email"
                className="input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
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
          </form>
        </main>
      );
    }


export default Register