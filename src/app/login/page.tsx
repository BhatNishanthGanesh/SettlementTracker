// "use client";

// import Link from "next/link";
// import React, { useState } from "react";
// import { signIn } from "next-auth/react";
// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const submitHandler = async(e:any) => {
//     e.preventDefault();
//     try {
//       const data = await signIn("credentials", {
//         redirect: false,
//         email,
//         password,
//       });

//       console.log(data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div className="container mx-auto mt-5">
//       <div className="flex justify-center">
//         <div className="w-full bg-slate-200 max-w-md">
//           <form
//             className="border border-secondary rounded p-4"
//             onSubmit={submitHandler}
//           >
//             <h1 className="mb-4 text-2xl font-bold">Login</h1>

//             <div className="mb-4">
//               <label htmlFor="email_field" className="block text-sm font-medium text-gray-600">
//                 Email address
//               </label>
//               <input
//                 type="email"
//                 id="email_field"
//                 className="form-input p-2 h-8 mt-1 block w-full border-gray-300 rounded-md"
//                 placeholder="Enter email address..."
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </div>

//             <div className="mb-4">
//               <label htmlFor="password_field" className="block text-sm font-medium text-gray-600">
//                 Password
//               </label>
//               <input
//                 type="password"
//                 id="password_field"
//                 className="form-input p-2 h-8 mt-1 block w-full border-gray-300 rounded-md"
//                 value={password}
//                 placeholder="Enter password..."
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </div>

//             <button
//               type="submit"
//               className="w-full bg-slate-400 hover:bg-slate-500 text-white py-2 px-4 rounded-md hover:bg-primary-dark focus:outline-none focus:ring focus:border-primary-dark"
//             >
//               Sign in
//             </button>

//             <div className="text-center mt-4">
//               <p className="text-gray-600">
//                 Not a member? <Link href="/register"><span className="bg-slate-300 hover:bg-slate-400 rounded cursor-pointer text-sm p-2">Register</span></Link>
//               </p>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  // const session = useSession();
  const { data: session, status: sessionStatus } = useSession();

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace("/");
    }
  }, [sessionStatus, router]);

  // const isValidEmail = (email: string) => {
  //   const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  //   return emailRegex.test(email);
  // };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const name=e.target[0].value
    const email = e.target[1].value;
    const password = e.target[2].value;

    // if (!isValidEmail(email)) {
    //   setError("Email is invalid");
    //   return;
    // }

    if (!password || password.length < 2) {
      setError("Password is invalid");
      return;
    }

    const res = await signIn("credentials", {
      redirect: false,
      name,
      email,
      password,
    });

    if (res?.error) {
      setError("Invalid email or password");
      if (res?.url) router.replace("/");
    } else {
      setError("");
    }
  };

  if (sessionStatus === "loading") {
    return <h1>Loading...</h1>;
  }

  return (
    sessionStatus !== "authenticated" && (
      <div className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="bg-slate-300 p-8 rounded shadow-md w-96">
          <h1 className="text-4xl text-center font-semibold mb-8">Login</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black"
              placeholder="Email"
              required
            />
            <input
              type="password"
              className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black"
              placeholder="Password"
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              {" "}
              Sign In
            </button>
            <p className="text-red-600 text-[16px] mb-4">{error && error}</p>
          </form>
          <button
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
            onClick={() => {
              signIn("github");
            }}
          >
            Sign In with Github
          </button>
          <div className="text-center text-gray-500 mt-4">- OR -</div>
          <Link
            className="block text-center text-blue-500 hover:underline mt-2"
            href="/register"
          >
            Register Here
          </Link>
        </div>
      </div>
    )
  );
};

export default Login;

