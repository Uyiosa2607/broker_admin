/* eslint-disable @next/next/no-img-element */
import supabase from "@/app/client";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";

export default function Header() {
  const { toast } = useToast();

  async function signOut() {
    await supabase.auth.signOut();
    toast({
      description: "User logged out!!",
    });
  }

  return (
    <section className="bg-black text-white">
      <div className="container p-3 mx-auto">
        <div className="flex items-center justify-between">
          <h3>Dashboard</h3>
          <Button
            className="text-xs"
            size="sm"
            onClick={signOut}
            variant="destructive"
          >
            Logout
          </Button>
        </div>
      </div>
    </section>
  );
}
