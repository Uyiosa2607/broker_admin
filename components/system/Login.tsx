import { useEffect, useState } from "react";
import { FormEvent } from "react";
import supabase from "@/app/client";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card, CardContent, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

export default function Login() {
  const [loading, setLoading] = useState(false);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formdata = new FormData(event.currentTarget);

    const email: any = formdata.get("email");
    const password: any = formdata.get("password");

    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    setLoading(false);
  }

  return (
    <main className="text-[16px] text-[#111]">
      <div className="container px-[10px] mx-auto">
        <form onSubmit={handleLogin} className="mt-[10rem] mx-auto">
          <CardTitle className="text-center mb-4 font-semibold Capitalize">
            Welcome back
          </CardTitle>
          <Card className="md:w-[600px] py-5 pt-6 px-3 mx-auto">
            <CardContent>
              <div className="mb-[20px] flex flex-col gap-1.5">
                <Label>Email</Label>
                <Input type="email" required name="email" id="email" />
              </div>
              <div className="mb-[50px] flex flex-col gap-1.5">
                <Label>Password</Label>
                <Input type="password" name="password" id="password" required />
              </div>
              <div className="flex w-full items-center justify-center">
                <Button className="w-full">
                  {loading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  Login
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </main>
  );
}
