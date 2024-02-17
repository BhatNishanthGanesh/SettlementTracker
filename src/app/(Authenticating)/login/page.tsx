"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "react-feather";

const Login = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  // const session = useSession();
  const { data: session, status: sessionStatus } = useSession();

  // useEffect(() => {
  //   if (sessionStatus === "authenticated") {
  //     router.replace("/");
  //   }else{

  //   }
  // }, [sessionStatus, router]);

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  // const isValidEmail = (email: string) => {
  //   const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  //   return emailRegex.test(email);
  // };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const email = e.target[0].value;
    const password = e.target[1].value;

    // if (!isValidEmail(email)) {
    //   setError("Email is invalid");
    //   return;
    // }

    // if (!password || password.length < 2) {
    //   setError("Password is invalid");
    //   return;
    // }

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl: "/",
    });

    if (res?.error) {
      setError("Invalid email or password");
    } else if (res?.url) {
      router.replace("/");
    } else {
      setError("");
      router.replace("/");
    }
    // if (res?.error) {
    //   setError("Invalid email or password");
    // } else {
    //   setError("");
    //   // Check the provider and navigate accordingly
    //   if (res?.url) {
    //     if (res.url.includes("github")) {
    //       signIn("github");
    //     } else if (res.url.includes("google")) {
    //       signIn("google");
    //     } else {
    //       // If neither GitHub nor Google, navigate to the home page
    //       router.replace("/");
    //     }
    //   }
    // }
  };

  if (sessionStatus === "loading") {
    return <h1>Loading...</h1>;
  }
  
  return (
    sessionStatus !== "authenticated" ? (
      <>
        <div className="bg-black mt-[-10px]">
          <div className="flex flex-col  md:flex-row items-center justify-center min-h-screen">
            <div className=" leading-8 pr-5">
              <h1 className="font-bold  md:text-5xl text-3xl text-white text-center md:mr-8 md:mb-8 mb-8">
                Welcome to Settlement tracker
                <span className="hidden md:inline-block">👉</span>
              </h1>
              <h1 className="text-white text-center text-2xl">
                Simplifying your finances for a clear
                <br /> and prosperous journey.
              </h1>
            </div>
            {/* <div className="flex min-h-screen flex-col items-center justify-between p-24"> */}
            <div
              className="bg-gray-100 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-800
 p-8 rounded shadow-lg md:w-96"
            >
              <h1 className="text-4xl text-center text-white font-semibold mb-8">
                Login
              </h1>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black"
                  placeholder="Email"
                  name="email"
                  required
                />
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black"
                  placeholder="Password"
                  name="password"
                  required
                />
                <button
                  type="button"
                  onClick={handleTogglePassword}
                  className="absolute right-[40px] mt-3"
                >
                  {showPassword ? (
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
                  Sign In
                </button>
                <p className="text-red-600 text-[16px] mb-4">
                  {error && error}
                </p>
              </form>
              <div className="justify-between  flex">
                <button
                  className=" text-white py-2 pl-12 rounded "
                  onClick={() => {
                    signIn("github");
                  }}
                >
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQN0Uu0auB-_30X62d-vUYM-jhN4TkqPqgv6A&usqp=CAU"
                    alt="GitHub Logo"
                    className="w-10 h-10 "
                  />
                  {/* Sign In with Github */}
                </button>
                <button
                  className=" text-white py-2 pr-12  rounded-full"
                  onClick={() => {
                    signIn("google");
                  }}
                >
                  <img
                    src="https://cdn.iconscout.com/icon/free/png-256/free-google-160-189824.png"
                    alt="Google Logo"
                    className=" w-8 h-8"
                  />
                  {/* Sign In with Google */}
                </button>
              </div>
              <div className="text-center text-gray-500 mt-4">- OR -</div>
              <Link
                className="block font-bold text-center text-blue-500 hover:underline mt-2"
                href="/register"
              >
                Register Here
              </Link>
            </div>
          </div>
        </div>
      </>
    ) :(
      router.replace("/")
      ) 
      
      
  );
  
};



export default Login;
