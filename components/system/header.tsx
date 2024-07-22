/* eslint-disable @next/next/no-img-element */
import { Button } from "../ui/button";
import supabase from "@/app/client";
import { useRouter } from "next/navigation.js";

export default function Header() {
  const router = useRouter();

  async function signOut() {
    const { error } = await supabase.auth.signOut();
    localStorage.removeItem("auth");
    router.push("/");
  }

  return (
    <section>
      <div className="container px-[10px] mx-auto pt-[10px]">
        <div className="flex p-[10px]  items-center justify-between">
          <img className="w-[30px] h-auto" src="/avatar.png" alt="avatar" />
          <Button onClick={signOut} variant="destructive">
            Logout
          </Button>
        </div>
      </div>
    </section>
  );
}
