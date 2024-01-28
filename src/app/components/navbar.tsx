"use client"
import Link from 'next/link';
import { usePathname,useRouter } from 'next/navigation'; 
import { Home, User, DollarSign, CreditCard } from 'react-feather';
import { signIn, signOut, useSession } from 'next-auth/react'; 
import ThemeToggle from './ThemeToggle';
import { useState,useEffect } from 'react';

const AuthButton = () => {
  // const { data: session } = useSession();
  // @ts-ignore
  const { data: session, status, isFetching } = useSession();
  
  const [showDropdown, setShowDropdown] = useState(false);
  
  const router = useRouter();

  const handleAvatarClick = () => {
    if (session) {
      setShowDropdown(!showDropdown);
    } else {
      router.push('/api/auth/signin');
    }

  };

  const handleSignOut = async() => {
    // signOut();
    await signOut({ callbackUrl: '/' });
    setShowDropdown(false);
  };
  useEffect(() => {
    // If the session is being fetched, do not show the avatar
    if (isFetching) {
      setShowDropdown(false);
    }
  }, [isFetching]);

  if (status === 'loading') {
    // Render nothing while the session is being fetched
    return null;
  }

  return (
    <div className="flex items-center">
      {/* {session?.user?.image && !isFetching ? (
        <div className="flex">
          <button onClick={handleAvatarClick} className="focus:outline-none">
            <img
              src={session.user.image}
              alt="User Avatar"
              className="w-8 mb-2 h-8 rounded-full mr-2 cursor-pointer"
            />
          </button>
          <span className='dark:text-white'>
          {session.user.name}
          </span>

          {showDropdown && (
            <div className="absolute mt-10 bg-white shadow-md rounded-md p-2">
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
      )} */}
{session ? (
  <div className="flex items-center relative">
    <button onClick={handleAvatarClick} className="focus:outline-none">
      {session.user?.image ? (
        <img
          src={session.user.image}
          alt="User Avatar"
          className="w-8 mb-2 h-8 rounded-full mr-2 cursor-pointer"
        />
      ) : (
        <div className="w-8 h-8 bg-red-400 rounded-full flex items-center justify-center mr-2 cursor-pointer">
          <span className="text-black dark:text-white font-semibold">
            {session.user?.name?.charAt(0)}
          </span>
        </div>
      )}
    </button>
    <span className='dark:text-white'>
      {session.user?.name}
    </span>

    {showDropdown && (
      <div className="absolute mt-10 bg-white shadow-md rounded-md p-2">
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
  // const { data: session } = useSession();
  const [showMenu, setShowMenu] = useState(false);
  const [showBlackHalfWidth, setShowBlackHalfWidth] = useState(false);
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
      label: 'calculator',
      href: '/calculator',
      icon: User,
    },
    {
      label: 'Expense Tracker',
      href: '/expense',
      icon: User,
    },
  ]
  const toggleMenu = () => {
    setShowMenu(!showMenu);
    setShowBlackHalfWidth(!showBlackHalfWidth);
  };
   return (
    <div className="flex ">
      <div className="flex-grow ">
        <div className="">
          <div className="lg:hidden">
            <button onClick={toggleMenu} className="text-white p-3 focus:outline-none">
              {/* Hamburger menu icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {showMenu ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>
          <div className={`lg:flex ${showMenu ? 'block' : 'hidden'}`}>
            {/* {Links.filter((link) => !session || (link.label !== 'Expense Tracker')).map((link, index) => ( */}
            {Links.map((link, index) => (
              <Link key={index} href={link.href}>
                <span
                  className={`cursor-pointer dark:text-white text-black ${path === link.href ? 'font-bold' : ''}`}
                >
                  <div className={`flex dark:bg-medium border-4 dark:border-medium border-white rounded px-4 py-2 m-2 items-center ${path === link.href  ? '' : 'shadow-2xl'}`}>
                    <link.icon className="inline-block h-5 w-5 hover:animate-pulse" />
                    <span className="ml-1 text-1xl m-2">{link.label}</span>
                  </div>
                </span>
              </Link>
            ))}
            {/* {session && (
              <Link href="/expense">
                <span
                  className={`cursor-pointer dark:text-white text-black ${path === '/expense' ? 'font-bold' : ''}`}
                >
                  <div className={`flex dark:bg-medium  rounded p-2 m-2 items-center ${path === '/expense' ? '' : 'shadow-2xl'}`}>
                    <User className="inline-block h-5 w-5 hover:animate-pulse" />
                    <span className="ml-1 text-1xl m-2">Expense Tracker</span>
                  </div>
                </span>
              </Link>
            )} */}
          </div>
        </div>
        {/* <div className={`fixed inset-y-0 left-0 z-40 bg-gray-900 w-1/2 shadow-lg transition-transform duration-300 transform lg:bg-transparent lg:shadow-none lg:w-auto ${showBlackHalfWidth ? 'translate-x-0' : '-translate-x-full'}`}></div> */}
      </div>
      <div className="flex  m-2  items-center mt-4">
        <div className="mb-2 mr-3">
          <ThemeToggle />
        </div>
        <AuthButton />
      </div>
    </div>
  );
};

export default Navbar;
