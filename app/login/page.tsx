"use client";

import styles from "./page.module.scss";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [badSignIn, setBadSignIn] = useState(false);
  const [email, setEmail] = useState("");

  async function handleLogin(event: any) {
    event.preventDefault();

    try {
      const getAccess: any = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      console.log(getAccess)

      if (getAccess.error) {
        setBadSignIn(true);
        return;
      }

      if (getAccess.ok) {
        router.push("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={styles.login}>
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="text"
            placeholder="email"
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="******"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Login
          </button>
          {badSignIn && (
            <a
              className="inline-block align-baseline font-bold text-sm text-red-500 hover:text-red-800"
              href="#"
            >
              Invalid Credentals
            </a>
          )}
        </div>
      </form>
    </div>
  );
}
