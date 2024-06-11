import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
  description: "This is Profile page",
};

export default function Layout({ children }: any) {
  return <>{children}</>;
}
