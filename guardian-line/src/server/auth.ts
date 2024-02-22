import {
  getServerSession,
  type NextAuthOptions,
} from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { userService } from "./services/userService";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt", //(1)
  },
  jwt: {
    secret: process.env.AUTH_SECRET,
  },
  callbacks: {
    async jwt({ token, account, profile }) { 
      if(account && account.type === "credentials") { //(2)
        token.userId = account.providerAccountId; // this is Id that coming from authorize() callback 
      }
      return token;
    },
    async session({ session, token, user }) { 
      session.user.id = token.userId; //(3)
      return session;
    },
  },
  pages: {
    signIn: '/login', //(4) custom signin page path
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        userName: { label: "userName", type: "text", placeholder: "userName" },
        password: { label: "password", type: "password" }
      },
      async authorize(credentials:any, req:any) {
         const { userName, password } = credentials as {
          userName: string
          password: string
         };

        return userService.authenticate(userName, password); //(5) 
      }
    })
  ],
};

export const getServerAuthSession = () => getServerSession(authOptions); //(6) 