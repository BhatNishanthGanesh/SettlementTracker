"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import axios from "axios";
import { Eye, EyeOff } from "react-feather";

const Register = () => {
  const [error, setError] = useState("");
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();
  const [showpassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace("/");
    }
  }, [sessionStatus, router]);

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (!password || password.length < 2) {
      setError("Password is invalid");
      return;
    }

    try {
      const response = await axios.post("/api/auth/register", {
        name,
        email,
        password,
      });

      if (response.status === 201) {
        setError("");
        router.push("/login");
      }
    } catch (error) {
      //@ts-ignore
      if (error.response && error.response.status === 400) {
        // @ts-ignore
        const errorData = error.response.data;
        setError(errorData.message || "This email is already registered");
      } else {
        setError("Error, try again");
        console.error("Error during registration:", error);
      }
    }
  };

  if (sessionStatus === "loading") {
    return <h1>Loading...</h1>;
  }

  return (
    sessionStatus !== "authenticated" && (
      <div className="flex bg-black  min-h-screen flex-col items-center justify-between p-24 ">
        <div className="bg-[#212121] p-8 rounded shadow-md md:w-96 w-80">
          <h1 className="text-4xl text-center text-white font-semibold mb-8">
            Register
          </h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black"
              placeholder="Name"
              required
            />
            <input
              type="text"
              name="email"
              className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black"
              placeholder="Email"
              required
            />
            <input
              type={showpassword ? "text" : "password"}
              name="password"
              className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black"
              placeholder="Password"
              required
            />
            <button
              type="button"
              onClick={handleTogglePassword}
              className="absolute md:inset-y-0 md:right-[39rem] md:mb-[2rem] right-[4.3rem] mt-[0.9rem] items-center"
            >
              {showpassword ? (
                <Eye size={20} color="#718096" />
              ) : (
                <EyeOff size={20} color="#718096" />
              )}
            </button>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              {" "}
              Register
            </button>
            <p className="text-red-600 text-[16px] mb-4">{error && error}</p>
          </form>
          <div className="text-center text-gray-500 mt-4">- OR -</div>
          <Link
            className="block text-center text-blue-500 hover:underline mt-2"
            href="/login"
          >
            Login with an existing account
          </Link>
        </div>
      </div>
    )
  );
};

export default Register;
