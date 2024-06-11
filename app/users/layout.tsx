import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All users",
  description: "This page contains data of all users",
};

export default function Layout({ children }: any) {
  return <>{children}</>;
}
