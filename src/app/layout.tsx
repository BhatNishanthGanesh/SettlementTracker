import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "./components/navbar";
import "./globals.css";
import { getServerSession } from "next-auth";
// import { ClerkProvider } from '@clerk/nextjs'
import SessionProvider from "./components/SessionProvider";
// import Authprovider from './components/Authprovider'
// import Navmenu from './components/navmenu'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Settlement Tracker",
  description: "created by nextjs",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <head>
        {/* <link rel="icon" href="/favicon.ico" sizes="any" /> */}
        <link
          rel="icon"
          href="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqI6Vmc5PPlM0kYwvRofV_7pKxIpLvW1it-Q&usqp=CAU"
          type="image/jpg"
          sizes="612x612"
        />
      </head>
      <body className={`${inter.className} dark:bg-medium`}>
        <SessionProvider session={session}>
          {/* <ClerkProvider> */}
          {/* <Authprovider> */}
          <div className=" mx-auto ">
            {/* <Navbar/> */}
            {/* <Navmenu/> */}
            {children}
          </div>
          {/* </Authprovider> */}
        </SessionProvider>
        {/* </ClerkProvider> */}
      </body>
    </html>
  );
}
