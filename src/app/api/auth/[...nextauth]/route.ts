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
