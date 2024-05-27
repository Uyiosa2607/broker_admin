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
      authorize: async (credentials,req) => {
        let user = null;

        const submitedEmail: any = credentials.email;

        const submitedPassword: any = credentials.password;

        const account = await prisma.users.findUnique({
          where: {
            email: submitedEmail,
          },
        });

        if (account) {
          const login: boolean = await bcrypt.compare(
            submitedPassword,
            account.password
          );
          if (login) {
            const { password, ...userData } = account;
            user = userData;
            return user;
          } else {
            throw new Error("Invalid Credentials")
          }
        } else {
           throw new Error("User not found")
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/auth/error"
  },
});
