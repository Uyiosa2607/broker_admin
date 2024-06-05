"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [pass, setPass] = useState("");

  async function handleSubmit(event: any) {
    event.preventDefault();

    if (pass != password) return;

    try {
      const request = await axios.post("/api/auth/register", {
        name,
        email,
        password,
      });
      const response = await request.data;
      console.log(response);
      if (response.error) return alert(response.error);
      if (response.status === 201) {
        router.push("/login");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="my-8 text-sm">
      <div className="flex flex-col my-4">
        <label className="text-gray-700" htmlFor="name">
          Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          className="mt-2 p-2 border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded text-sm text-gray-900"
          placeholder="Enter your name"
          required
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </div>

      <div className="flex flex-col my-4">
        <label htmlFor="email" className="text-gray-700">
          Email Address
        </label>
        <input
          type="email"
          name="email"
          id="email"
          className="mt-2 p-2 border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded text-sm text-gray-900"
          placeholder="Enter your email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>

      <div className="flex flex-col my-4">
        <label htmlFor="password" className="text-gray-700">
          Password
        </label>
        <div className="relative flex items-center mt-2">
          <input
            type="password"
            name="password"
            id="password"
            className="flex-1 p-2 pr-10 border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded text-sm text-gray-900"
            placeholder="Enter your password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <button
            type="submit"
            className="absolute right-2 bg-transparent flex items-center justify-center text-gray-700"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      <div className="flex flex-col my-4">
        <label htmlFor="password_confirmation" className="text-gray-700">
          Password Confirmation
        </label>
        <div className="relative flex items-center mt-2">
          <input
            type="password"
            name="password_confirmation"
            id="password_confirmation"
            className="flex-1 p-2 pr-10 border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded text-sm text-gray-900"
            placeholder="Enter your password again"
            required
            value={pass}
            onChange={(event) => setPass(event.target.value)}
          />
          <button
            type="button"
            className="absolute right-2 bg-transparent flex items-center justify-center text-gray-700"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      <div className="my-4 flex items-center justify-end space-x-4">
        <button className="bg-blue-600 hover:bg-blue-700 rounded-lg px-8 py-2 text-white hover:shadow-xl transition duration-150 uppercase">
          Sign Up
        </button>
      </div>
    </form>
  );
}
