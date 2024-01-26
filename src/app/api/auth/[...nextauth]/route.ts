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

import NextAuth,{ AuthOptions, NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import  CredentialsProvider  from "next-auth/providers/credentials";
import { users } from "@/helpers/constants";

export const authOptions:NextAuthOptions={
    providers:[
        CredentialsProvider({
           name:"creds",
           credentials:{
            email:{label:"Email",placeholder:"Enter Email"},
            password:{label:"Password",placeholder:"Enter Password"},
           },
          async authorize(credentials,req){
            if(!credentials || !credentials.email || !credentials.password){
                return null;
            }
            const user=users.find((item:any)=>item.email === credentials.email)
            if (user?.password===credentials.password){
                return user
            }
            return null
          }
        }),
      
        GithubProvider({
            clientId: process.env.GITHUB_ID ?? "",
            clientSecret:process.env.GITHUB_SECRET ?? "",
        }),
        GoogleProvider({
            clientId:process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret:process.env.GOOGLE_CLIENT_SECRET ?? "",
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    // pages: {
    //             signIn: '/register',
    //         },
    //         callbacks: {
    //             authorized({ auth, request: { nextUrl } }) {
    //                 const isLoggedIn = !!auth?.user;
    //                 const isOnDashboard = nextUrl.pathname.startsWith('/register');
    //                 if (isOnDashboard) {
    //                     if (isLoggedIn) return true;
    //                     return false; // Redirect unauthenticated users to login page
    //                 } else if (isLoggedIn) {
    //                     return Response.redirect(new URL('/dashboard', nextUrl));
    //                 }
    //                 return true;
    //             },
    //         },
    
}

export const handler=NextAuth(authOptions)

export {handler as GET,handler as POST}

