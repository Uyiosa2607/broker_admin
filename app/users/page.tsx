/* eslint-disable @next/next/no-img-element */
"use client";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { handleLogout } from "../utils/utils";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface User {
  id: number;
  name: string;
  email: string;
  admin: string;
  profile_image: string;
}

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { data: session, status } = useSession();

  const router = useRouter();

  useEffect(() => {
    async function getUsers() {
      try {
        const request = await axios.get("/api/auth/users");
        const response: User[] = await request.data;
        setUsers(response);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError("Failed to load user data.");
        setLoading(false);
      }
    }
    getUsers();
  }, []);

  async function sendToProfile(id: string) {
    const profileId = id;
    router.push("/profile/" + profileId);
  }

  const handleDelete = async (id: any) => {
    const dataId: any = id;
    if (session && session.user && session.user.id) {
      try {
        const request = await axios.delete(
          "/api/auth/delete/" + session.user.id,
          {
            data: { dataId },
          }
        );
        const response = await request.data;
        if (dataId === session.user.id) {
          handleLogout();
        }
        console.log(response);
        if (response.error) return alert(response.error);
        if (response.success) return alert(response.success);
      } catch (error: any) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-8">
        <div className="flex items-center justify-between pb-6">
          <div className="flex justify-between w-full items-center">
            <div>
              <h2 className="font-semibold text-gray-700">User Accounts</h2>
              <span className="text-xs text-gray-500">
                View accounts of all users
              </span>
            </div>
            <Button asChild>
              <Link className="mr-2" href="/dashboard">
                Dashboard
              </Link>
            </Button>
          </div>
        </div>
        <div className="overflow-y-hidden rounded-lg border">
          <div className="overflow-x-auto">
            {error ? (
              <div className="text-red-500 p-4">{error}</div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="bg-blue-600 text-left text-xs font-semibold uppercase tracking-widest text-white">
                    <th className="px-5 py-3">Image</th>
                    <th className="px-5 py-3">Full Name</th>
                    <th className="px-5 py-3">Email</th>
                    <th className="px-5 py-3">Role</th>
                    <th className="px-5 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-500">
                  {loading
                    ? Array.from(new Array(4)).map((_, index) => (
                        <tr key={index}>
                          <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                            <Skeleton className="w-[40px] h-[40px] rounded-full" />
                          </td>
                          <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                            <Skeleton className="w-[40px] h-[16px] rounded-full" />
                          </td>
                          <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                            <Skeleton className="w-[100px] h-[16px] rounded-full" />
                          </td>
                          <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                            <Skeleton className="w-[150px] h-[16px] rounded-full" />
                          </td>
                          <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                            <Skeleton className="w-[50px] h-[16px] rounded-full" />
                          </td>
                        </tr>
                      ))
                    : users &&
                      users.map((user) => (
                        <tr key={user.id}>
                          <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                            <div
                              onClick={() => sendToProfile(user.id)}
                              className="h-10 w-10 flex-shrink-0"
                            >
                              <img
                                className="h-full w-full object-cover rounded-full"
                                src={
                                  user.profile_image ||
                                  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
                                }
                                alt={`${user.name}'s Avatar`}
                              />
                            </div>
                          </td>
                          <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                            <p className="whitespace-no-wrap">{user.name}</p>
                          </td>
                          <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                            <p className="whitespace-no-wrap">{user.email}</p>
                          </td>
                          <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                            <p className="whitespace-no-wrap">
                              {user.admin ? "Admin" : "User"}
                            </p>
                          </td>
                          <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm flex space-x-2">
                            <button
                              className="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-700"
                              onClick={() => handleDelete(user.id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
