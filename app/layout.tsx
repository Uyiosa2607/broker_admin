import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

export const metadata: Metadata = {
  title: "Users Management",
  description: "Hobby Project",
};

export default function RootLayout({ children }: any) {
  return (
    <html lang="en">
      <body>
        <div>{children}</div>
        <Toaster />
      </body>
    </html>
  );
}
