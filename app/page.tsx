"use client";

import { useState, useEffect } from "react";
import supabase from "@/app/client";
import Dashboard from "@/components/system/Dashboard";
import Login from "@/components/system/Login";
import { Loader2 } from "lucide-react";

export default function Home() {
  const [auth, setAuth] = useState<boolean>(false);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (!session?.user) {
          setAuth(false);
        } else {
          setAuth(true);
        }
        setAuthLoading(false);
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  if (authLoading) {
    return (
      <main className="h-screen w-screen flex items-center justify-center">
        <Loader2 className="w-16 h-16 animate-spin" />
      </main>
    );
  }

  return <>{auth ? <Dashboard /> : <Login />}</>;
}
