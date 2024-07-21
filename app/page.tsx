"use client";

import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import supabase from "@/app/client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const auth = localStorage.getItem("auth");
    if (auth) return router.push("/dashboard");
  }, []);

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function Login(event: any) {
    event.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) {
      setLoading(false);
      return alert("Invalid Credentials");
    }
    setLoading(false);
    if (error) console.log(error);
    localStorage.setItem("auth", "authenticated");
    router.push("/dashboard");
  }

  return (
    <main className="text-[16px] text-[#111] h-screen bg-[#fafafa]">
      <div className="container px-[10px] mx-auto">
        <form onSubmit={Login} className="mt-[10rem] lg:w-[600px] mx-auto">
          <div className="mb-[20px]">
            <label className="font-[600]" htmlFor="email">
              Email
            </label>
            <input
              className="w-full text-[#111] p-[10px] mt-[10px] border-[1px] border-black"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Your Email"
              id="email"
              required
            />
          </div>
          <div className="mb-[50px]">
            <label className="font-[600]" htmlFor="password">
              Password
            </label>
            <input
              className="w-full text-[#111] p-[10px] bg-transparent mt-[10px] border-[1px] border-black"
              type="password"
              placeholder="Enter Your Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
            />
          </div>
          <div className="flex w-full items-center justify-center">
            <Button>
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              Login
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}
