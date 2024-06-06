/* eslint-disable @next/next/no-img-element */
"use client";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Skeleton } from "@mui/material";
import { handleLogout } from "../utils/utils";

interface User {
  id: number;
  name: string;
  email: string;
  admin: string;
  profile_image: string
}

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { data: session, status } = useSession();

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

  const handleDelete = async (id: number) => {
    const dataId: any = id;
    if (session && session.user && session.user.id) {
      try {
        const request = await axios.delete("/api/auth/delete/" + session.user.id, {
          data: { dataId },
        });
        const response = await request.data;
        if(dataId === session.user.id){
          handleLogout()
        }
        console.log(response)
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
          <div>
            <h2 className="font-semibold text-gray-700">User Accounts</h2>
            <span className="text-xs text-gray-500">
              View accounts of registered users
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="ml-10 space-x-8 lg:ml-40"></div>
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
                            <Skeleton
                              key={`skeleton-avatar-${index}`}
                              variant="circular"
                              width={40}
                              height={40}
                            />
                          </td>
                          <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                            <Skeleton
                              key={`skeleton-id-${index}`}
                              variant="text"
                              animation="wave"
                              width={20}
                            />
                          </td>
                          <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                            <Skeleton
                              key={`skeleton-name-${index}`}
                              variant="text"
                              animation="wave"
                              width={100}
                            />
                          </td>
                          <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                            <Skeleton
                              key={`skeleton-email-${index}`}
                              variant="text"
                              animation="wave"
                              width={150}
                            />
                          </td>
                          <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                            <Skeleton
                              key={`skeleton-actions-${index}`}
                              variant="text"
                              animation="wave"
                              width={50}
                            />
                          </td>
                        </tr>
                      ))
                    : users &&
                      users.map((user) => (
                        <tr key={user.id}>
                          <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                            <div className="h-10 w-10 flex-shrink-0">
                              <img
                                className="h-full w-full object-cover rounded-full"
                                src={user.profile_image || "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"}
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
