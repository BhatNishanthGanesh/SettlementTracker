"use client"
import Link from 'next/link';
import { usePathname,useRouter } from 'next/navigation'; 
import { Home, User, DollarSign, CreditCard } from 'react-feather';
import { signIn, signOut, useSession } from 'next-auth/react'; 
import ThemeToggle from './ThemeToggle';
import { useState } from 'react';

const AuthButton = () => {
  const { data: session } = useSession();
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();

  const handleAvatarClick = () => {
    if (session) {
      setShowDropdown(!showDropdown);
    } else {
      router.push('/api/auth/signin');
    }
  };

  const handleSignOut = () => {
    signOut();
    setShowDropdown(false);
  };

  return (
    <div className="flex items-center">
      {session?.user?.image ? (
        <div className="relative">
          <button onClick={handleAvatarClick} className="focus:outline-none">
            <img
              src={session.user.image}
              alt="User Avatar"
              className="w-8 mb-2 h-8 rounded-full mr-2 cursor-pointer"
            />
          </button>
          {showDropdown && (
            <div className="absolute top-10 right-0 bg-white shadow-md rounded-md p-2">
              <button onClick={handleSignOut} className="w-full text-left">
                Sign out
              </button>
            </div>
          )}
        </div>
      ) : (
        <Link href="/api/auth/signin">
          <button className=" mb-1.5 dark:bg-white bg-dark dark:text-dark shadow-lg text-white font-bold py-1 px-1 rounded">
            Sign In
          </button>
        </Link>
      )}
    </div>
  );
};


const Navbar = () => {
  const path = usePathname();

  const Links = [
    {
      label: 'Home',
      href: '/',
      icon: Home,
    },
    {
      label: 'Owes',
      href: '/owes',
      icon: DollarSign,
    },
    {
      label: 'Pay',
      href: '/pay',
      icon: CreditCard
    },
    {
      label: 'Savings',
      href: '/savings',
      icon: CreditCard
    },
    {
      label: 'Calculator',
      href: '/api/auth/signin',
      icon: User,
    },
  ]

  return (
    <div className="first-letter:shadow-lg rounded p-2   dark:medium  ml-4 mr-4 ">
      <ul className="flex justify-between">
        <div className="flex items-center ">
          {Links.slice(0, 5).map((link, index) => (
            <li key={index} className="mr-6 ">
              <Link href={link.href}>
                <span
                  className={`cursor-pointer dark:text-white text-black  ${
                    path === link.href ? 'font-bold' : ''
                  }`}
                >
                  <div className="flex items-center">
                    <link.icon className="inline-block h-5 w-5 hover:animate-pulse" />
                    <span className="ml-1 text-1xl p-1 m-2">{link.label}</span>
                  </div>
                </span>
              </Link>
            </li>
          ))}
        </div>
        {/* <div className="flex mt-4"> */}
        {/* <div className='mb-2 mr-3'>
              <ThemeToggle />
          </div> */}
          {/* <AuthButton />  */}
          {/* <Link href={Links[4].href}>
            <span
              className={`cursor-pointer  dark:text-white text-black ${
                path === Links[4].href ? 'font-bold' : ''
              }`}
            >
              <div className="flex items-center">
                <User className="inline-block mr-2 h-5 w-5  hover:animate-bounce" />
                <span className="mr-4 text-1xl">{Links[4].label}</span>
              </div>
            </span>
          </Link> */}
        {/* </div> */}
        <div className="flex items-center mt-4"> {/* Updated to use items-center */}
          <div className='mb-2 mr-3'>
            <ThemeToggle />
          </div>
          <AuthButton /> 
        </div>
      </ul>
    </div>
  );
};

export default Navbar;
