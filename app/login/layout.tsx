import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "This is user Login page",
};

export default function Layout({ children }: any) {
  return <>{children}</>;
}
