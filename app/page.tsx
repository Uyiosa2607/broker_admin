import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div className="container w-[100px] mx-auto  lg:w-[500px] flex flex-col gap-5 mt-[100px]">
        <h1 className="text-center  font-bold ">Welcome</h1>
        <Button asChild>
          <Link href="/login">Login here</Link>
        </Button>
      </div>
    </main>
  );
}
