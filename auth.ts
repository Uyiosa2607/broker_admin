import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

export const prisma = new PrismaClient();

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        let user: any = null;

        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        const account = await prisma.users.findUnique({
          where: {
            email: email,
          },
        });

        if (account) {
          const login: boolean = await bcrypt.compare(
            password,
            account.password
          );
          if (login) {
            const { password, ...userData } = account;
            user = userData;
            return user;
          } else {
            throw new Error("Invalid Credentials");
          }
        } else {
          throw new Error("User not found");
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (token) {
        session.user.id = token.id;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/auth/error",
  },
});
