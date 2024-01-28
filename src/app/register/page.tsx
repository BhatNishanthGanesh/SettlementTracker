// 'use client'
// import React, { useState } from "react";
// import Link from "next/link";
// import {useRouter} from "next/navigation";
// import axios from "axios";

// const Register = () => {
//   const router=useRouter()
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const submitHandler = async (e:any) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post('/api/auth/register', {
//         name,
//         email,
//         password,
//       });

//       if (response.status === 201) {
//         // Handle successful registration, redirect, etc.
//         console.log('Registration successful');
//         setName("");
//         setEmail("");
//         setPassword("");
//         alert("User Registered")
//         router.push('/login');
//       } else {
//         // Handle registration error
//         console.error('Registration failed');
//       }
//     } catch (error) {
//       // Handle error
//       console.error('Error submitting registration:', error);
//     }
//   };

//   return (
//     <div className="container mx-auto mt-5">
//       <div className="flex justify-center">
//         <div className="w-full bg-slate-300 dark:bg-slate-200 rounded shadow-lg max-w-md">
//           <form
//             className="border border-secondary rounded p-4"
//             onSubmit={submitHandler}
//           >
//             <h1 className="mb-4 text-2xl font-bold">Register</h1>

//             <div className="mb-4">
//               <label htmlFor="name_field" className="block text-sm font-medium text-gray-600">
//                 Name
//               </label>
//               <input
//                 type="text"
//                 id="name_field"
//                 className="mt-1 p-2 block w-full h-8 border-gray-300 rounded-md"
//                 value={name}
//                 placeholder="Enter your name..."
//                 onChange={(e) => setName(e.target.value)}
//               />
//             </div>

//             <div className="mb-4">
//               <label htmlFor="email_field" className="block text-sm font-medium text-gray-600">
//                 Email address
//               </label>
//               <input
//                 type="email"
//                 id="email_field"
//                 className="mt-1 p-2 block w-full h-8 border-gray-300 rounded-md"
//                 placeholder="Enter your email..."
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
//                 className="form-input h-8 p-2 mt-1 block w-full border-gray-300 rounded-md"
//                 placeholder="Enter your password..."
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </div>

//             <button
//               type="submit"
//               className="w-full bg-primary bg-slate-400 hover:bg-slate-500 text-white py-2 px-4 rounded-md hover:bg-primary-dark focus:outline-none focus:ring focus:border-primary-dark"
//             >
//               Register
//             </button>

//             <div className="mt-4">
//               <p>
//                 Already a User?{" "}
//                 <Link href="/login">
//                   <span className="bg-slate-300 hover:bg-slate-400 rounded cursor-pointer text-sm p-2">
//                     Login here
//                   </span>
//                 </Link>
//               </p>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;


// "use client";
// import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useSession } from "next-auth/react";

// const Register = () => {
//   const [error, setError] = useState("");
//   const router = useRouter();
//   const { data: session, status: sessionStatus } = useSession();

//   useEffect(() => {
//     if (sessionStatus === "authenticated") {
//       router.replace("/");
//     }
//   }, [sessionStatus, router]);

//   // const isValidEmail = (email: string) => {
//   //   const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
//   //   return emailRegex.test(email);
//   // };
//   const handleSubmit = async (e: any) => {
//     e.preventDefault();
//     const name = e.target[0].value; // Capture the user's name
//     console.log(name);
    
//     const email = e.target[1].value;
//     console.log(email);
    
//     const password = e.target[2].value;
//     console.log(password);
    

//     // if (!isValidEmail(email)) {
//     //   setError("Email is invalid");
//     //   return;
//     // }

//     if (!password || password.length < 2) {
//       setError("Password is invalid");
//       return;
//     }

//     try {
//       const res = await fetch("/api/auth/register", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           name,
//           email,
//           password,
//         }),
//       });
//       console.log(res);
      
//       if (res.status === 400) {
//         const errorData = await res.json(); // Parse the error message from the response
//         setError(errorData.message || "This email is already registered");
//       }
//       if (res.status === 201) {
//         setError("");
//         router.push("/login");
//       }
//     } catch (error) {
//       setError("Error, try again");
//       console.error("Error during registration:", error);
//     }
    
//   };

//   if (sessionStatus === "loading") {
//     return <h1>Loading...</h1>;
//   }

//   return (
//     sessionStatus !== "authenticated" && (
//       <div className="flex min-h-screen flex-col items-center justify-between p-24">
//         <div className="bg-[#212121] p-8 rounded shadow-md w-96">
//           <h1 className="text-4xl text-center font-semibold mb-8">Register</h1>
//           <form onSubmit={handleSubmit}>
//             <input
//               type="text"
//               className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black"
//               placeholder="Name"
//               required
//             />
//             <input
//               type="text"
//               className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black"
//               placeholder="Email"
//               required
//             />
//             <input
//               type="password"
//               className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black"
//               placeholder="Password"
//               required
//             />
//             <button
//               type="submit"
//               className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
//             >
//               {" "}
//               Register
//             </button>
//             <p className="text-red-600 text-[16px] mb-4">{error && error}</p>
//           </form>
//           <div className="text-center text-gray-500 mt-4">- OR -</div>
//           <Link
//             className="block text-center text-blue-500 hover:underline mt-2"
//             href="/login"
//           >
//             Login with an existing account
//           </Link>
//         </div>
//       </div>
//     )
//   );
// };

// export default Register;

"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router"; // Use next/router instead of next/navigation
import { useSession } from "next-auth/react";
import axios from "axios"; // Import Axios

const Register = () => {
  const [error, setError] = useState("");
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace("/");
    }
  }, [sessionStatus, router]);

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
        const errorData = error.response.data; // Parse the error message from the response
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
      <div className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="bg-[#212121] p-8 rounded shadow-md w-96">
          <h1 className="text-4xl text-center font-semibold mb-8">Register</h1>
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
              type="password"
              name="password"
              className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black"
              placeholder="Password"
              required
            />
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
