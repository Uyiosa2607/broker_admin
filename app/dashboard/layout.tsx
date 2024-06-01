import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "This is user dashboard page",
};

export default function Layout({ children }: any) {
  return <>{children}</>;
}
