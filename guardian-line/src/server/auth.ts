import {
    getServerSession,
    type NextAuthOptions,
  } from "next-auth";
  import Credentials from "next-auth/providers/credentials";
  import { userService } from "./services/userService";
  
  export const authOptions: NextAuthOptions = {
    secret: process.env.AUTH_SECRET,
    session: {
      strategy: "jwt", //(1)
    },
    callbacks: {
      async jwt({ token, account, profile }) { 
        if(account && account.type === "credentials") { //(2)
          token.userId = account.providerAccountId; // this is Id that coming from authorize() callback 
        }
        return token;
      },
      async session({ session, token, user }) { 
        if(session && token && session.user && session.user.id){
            session.user.id = token.userId; //(3)
        }
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
          username: { label: "Username", type: "text", placeholder: "username" },
          password: { label: "Password", type: "password" }
        },
        async authorize(credentials, req) {
           const { username, password } = credentials as {
            username: string
            password: string
           };
  
          return userService.authenticate(username, password); //(5) 
        }
      })
    ],
  };
  
  export const getServerAuthSession = () => getServerSession(authOptions); //(6) 