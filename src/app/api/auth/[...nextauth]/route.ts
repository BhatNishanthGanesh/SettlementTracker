// import bcrypt from 'bcrypt';
// import NextAuth, { AuthOptions, NextAuthOptions } from 'next-auth';
// import CredentialsProvider from 'next-auth/providers/credentials';
// import GitHubProvider from 'next-auth/providers/github';
// import GoogleProvider from 'next-auth/providers/google';
// import { PrismaAdapter } from "@next-auth/prisma-adapter"

// import prisma from '@/app/libs/db';

// export const authOptions: NextAuthOptions = {
//     adapter: PrismaAdapter(prisma),
//     providers: [
//         GitHubProvider({
//             clientId: process.env.NEXTAUTH_GITHUB_CLIENT_ID || '',
//             clientSecret: process.env.NEXTAUTH_GITHUB_CLIENT_SECRET || '',
//         }),
//         GoogleProvider({
//             clientId: process.env.NEXTAUTH_GOOGLE_CLIENT_ID || '',
//             clientSecret: process.env.NEXTAUTH_GOOGLE_CLIENT_SECRET || '',
//         }),
//         CredentialsProvider({
//             name: 'credentials',
//             credentials: {
//                 email: { label: 'email', type: 'text' },
//                 password: { label: 'password', type: 'password' },
//             },
//             async authorize(credentials) {
//                 if (!credentials?.email || !credentials?.password) {
//                     throw new Error('Invalid credentials');
//                 }

//                 const user = await prisma.user.findUnique({
//                     where: {
//                         email: credentials.email,
//                     },
//                 });

//                 if (!user || !user?.hashedPassword) {
//                     throw new Error('Invalid credentials');
//                 }

//                 const isCorrectPassword = await bcrypt.compare(
//                     credentials.password,
//                     user.hashedPassword
//                 );

//                 if (!isCorrectPassword) {
//                     throw new Error('Invalid credentials');
//                 }

//                 return user;
//             },
//         }),
//     ],
//     debug: process.env.NODE_ENV === 'development',
//     session: {
//         strategy: 'jwt',
//     },
//     jwt: {
//         secret: process.env.NEXTAUTH_JWT_SECRET,
//     },
//     secret: process.env.NEXTAUTH_SECRET,
//     pages: {
//         signIn: '/register',
//     },
//     // callbacks: {
//     //     authorized({ auth, request: { nextUrl } }) {
//     //         const isLoggedIn = !!auth?.user;
//     //         const isOnDashboard = nextUrl.pathname.startsWith('/register');
//     //         if (isOnDashboard) {
//     //             if (isLoggedIn) return true;
//     //             return false; // Redirect unauthenticated users to login page
//     //         } else if (isLoggedIn) {
//     //             return Response.redirect(new URL('/dashboard', nextUrl));
//     //         }
//     //         return true;
//     //     },
//     // },
// };

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST }

// import NextAuth,{ AuthOptions, NextAuthOptions } from "next-auth";
// import GithubProvider from "next-auth/providers/github"
// import GoogleProvider from "next-auth/providers/google"
// import  CredentialsProvider  from "next-auth/providers/credentials";
// import { users } from "@/helpers/constants";
// import prisma from '@/app/libs/db'

// export const authOptions:NextAuthOptions={
//     providers:[
//         CredentialsProvider({
//            name:"creds",
//            credentials:{
//             email:{label:"Email",placeholder:"Enter Email"},
//             password:{label:"Password",placeholder:"Enter Password"},
//            },
//           async authorize(credentials,req){
//             if(!credentials || !credentials.email || !credentials.password){
//                 return null;
//             }
//             const user=users.find((item:any)=>item.email === credentials.email)
//             if (user?.password===credentials.password){
//                 return user
//             }
//             return null
//           }
//         }),

//         GithubProvider({
//             clientId: process.env.GITHUB_ID ?? "",
//             clientSecret:process.env.GITHUB_SECRET ?? "",
//         }),
//         GoogleProvider({
//             clientId:process.env.GOOGLE_CLIENT_ID ?? "",
//             clientSecret:process.env.GOOGLE_CLIENT_SECRET ?? "",
//         })
//     ],
//     secret: process.env.NEXTAUTH_SECRET,
//     // pages: {
//     //             signIn: '/register',
//     //         },
//     //         callbacks: {
//     //             authorized({ auth, request: { nextUrl } }) {
//     //                 const isLoggedIn = !!auth?.user;
//     //                 const isOnDashboard = nextUrl.pathname.startsWith('/register');
//     //                 if (isOnDashboard) {
//     //                     if (isLoggedIn) return true;
//     //                     return false; // Redirect unauthenticated users to login page
//     //                 } else if (isLoggedIn) {
//     //                     return Response.redirect(new URL('/dashboard', nextUrl));
//     //                 }
//     //                 return true;
//     //             },
//     //         },

// }

// export const handler=NextAuth(authOptions)

// export {handler as GET,handler as POST}

// import GithubProvider from "next-auth/providers/github";
// import GoogleProvider from "next-auth/providers/google";
// import { Account, User as AuthUser } from "next-auth";
// import bcrypt from "bcrypt";
// import { compare } from 'bcrypt';
// import CredentialsProvider from 'next-auth/providers/credentials';
// import NextAuth, { type NextAuthOptions } from 'next-auth';
// import prisma from '@/app/libs/db';
// import { connectToDb } from "@/helpers/server-helpers";

// const authOptions: NextAuthOptions = {
//   session: {
//     strategy: "jwt",
//   },
//   providers: [
//     CredentialsProvider({
//       id: "credentials",
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "text" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials: any) {
//         await connectToDb();
//         try {
//           const user = await prisma.register.findUnique({ email: credentials.email });
//           if (user) {
//             const isPasswordCorrect = await bcrypt.compare(
//               credentials.password,
//               user.password
//             );
//             if (isPasswordCorrect) {
//               return user;
//             }
//           }
//         } catch (err: any) {
//           throw new Error(err);
//         }
//       },
//     }),
//     GithubProvider({
//       clientId: process.env.GITHUB_ID || "",
//       clientSecret: process.env.GITHUB_SECRET || "",
//     }),
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID || "",
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
//     }),
//   ],
//   // pages: {
//   //   signIn: "/login",
//   // },
//   secret: process.env.NEXTAUTH_SECRET,

//   callbacks: {
//     async signIn({ user, account }: { user: AuthUser; account: Account }) {
//       if (account?.provider == "credentials") {
//         return true;
//       }
//       if (account?.provider == "github") {
//         await connectToDb();
//         try {
//           const existingUser = await prisma.register.findUnique({ email: user.email });
//           if (!existingUser) {
//             const newUser = new User({
//               email: user.email,
//             });

//             await newUser.save();
//             return true;
//           }
//           return true;
//         } catch (err) {
//           console.log("Error saving user", err);
//           return false;
//         }
//       }
//     },
//   },

// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };

import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { Account, User as AuthUser } from "next-auth";
import bcrypt from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth, { type NextAuthOptions } from "next-auth";
import prisma from "@/app/libs/db";
import { connectToDb } from "@/helpers/server-helpers";

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },

  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Enter your email..",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password..",
        },
      },
      // @ts-ignore
      async authorize(credentials: any) {
        await connectToDb();
        try {
          console.log("Received credentials:", credentials);
          const user = await prisma.register.findUnique({
            where: { email: credentials.email },
          });
          console.log("User from database:", user);
          if (user) {
            const isPasswordCorrect = await bcrypt.compare(
              credentials.password,
              user.password
            );
            if (isPasswordCorrect) {
              return user;
            }
          }
        } catch (err: any) {
          throw new Error(`Authorization failed: ${err.message}`);
        }
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
      
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    // @ts-ignore
    async signIn({ user, account }: { user: AuthUser; account: Account }) {
      console.log("Sign-in callback - User:", user);
      console.log("Sign-in callback - Account:", account);
      // if (account.provider === "credentials") {
      //   return true;
      // }
      if (
        account.provider === "credentials" ||
        account.provider === "github" ||
        account.provider === "google"
      ) {
        
        return true;
      }
      if (account?.provider === "github") {
        await connectToDb();
        try {
          // const existingUser = await prisma.register.findUnique({ where: { email: user.email } });

          // if (!existingUser) {
          //   // Use Prisma to create a new user
          //   await prisma.register.create({
          //     data: {
          //       email: user.email,
          //     },
          //   });
          // }

          return true;
        } catch (err) {
          console.error("Error saving user:", err);
          return false;
        }
      }
      if (account?.provider === "google") {
        await connectToDb();
        try {
          return true;
        } catch (err) {
          console.log(err);
        } finally {
          await prisma.$disconnect();
        }
      }
      return false;
    },
  },
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
