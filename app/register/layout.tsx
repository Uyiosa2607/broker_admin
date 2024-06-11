import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register",
  description: "This is user Register page",
};

export default function Layout({ children }: any) {
  return <>{children}</>;
}
