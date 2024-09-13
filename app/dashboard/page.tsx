"use client";
/* eslint-disable @next/next/no-img-element */
import supabase from "@/app/client";
import { useEffect, useState } from "react";
import Header from "@/components/system/header";
import Profile from "@/components/system/profile";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";

interface Users {
  full_name: string;
  email: string;
  balance: string;
  id: string;
  bonus: string;
}

export default function Dashboard() {
  const [users, setUsers] = useState<Users[]>([]);
  const [user, setUser] = useState<Users | null>(null);
  const [edit, setEdit] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const { toast } = useToast();

  const getUsers = async function () {
    try {
      setLoading(true);
      const { data, error } = await supabase.from("users").select();
      if (error) return console.log(error.message);
      setUsers(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();

    const subscription = supabase
      .channel("custom-all-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "users" },
        (payload) => {
          getUsers();
        }
      )
      .subscribe((status) => {
        if (status === "CHANNEL_ERROR") {
          console.error("Error in subscription");
        }
      });

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  async function fetchUser(id: string): Promise<void> {
    try {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", id);
      if (error) return console.log(error.message);
      setUser(data[0]);
      setEdit(true);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section>
      <Header />
      {!edit ? (
        <div>
          <div className="container px-[10px] text-[16px] mx-auto">
            <div className="mx-auto max-w-screen-lg px-4 py-8 sm:px-8">
              <div className="flex items-center justify-between pb-6">
                <div>
                  <h2 className="font-semibold text-gray-700">User Accounts</h2>
                  <span className="text-xs text-gray-500">
                    View accounts of registered users
                  </span>
                </div>
              </div>
              <div className="overflow-y-hidden rounded-lg border">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-blue-600 text-left text-xs font-semibold uppercase tracking-widest text-white">
                        <th className="px-5 py-3"></th>
                        <th className="px-5 py-3">Full Name</th>
                        <th className="px-5 py-3">Email</th>
                        <th className="px-5 py-3">Balance</th>
                        <th className="px-5 py-3"></th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-500">
                      {loading
                        ? Array.from({ length: 5 }).map((_, index) => (
                            <tr key={index}>
                              <td className="border-b border-gray-200">
                                <Skeleton className="w-[40px] h-[40px] rounded-full" />
                              </td>
                              <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                <div className="flex items-center">
                                  <Skeleton className="w-[100px] h-4 rounded-full" />
                                </div>
                              </td>
                              <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                <Skeleton className="w-[100px] h-4 rounded-full" />
                              </td>
                              <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                <Skeleton className="w-[60px] h-4 rounded-full" />
                              </td>
                              <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                <Skeleton className="w-[40px] h-5 rounded-full" />
                              </td>
                            </tr>
                          ))
                        : users.map((user: Users) => (
                            <tr key={user.id}>
                              <td className="border-b border-gray-200">
                                <img
                                  className="w-[50px] h-[50px] rounded-full object-cover"
                                  src="/avatar.jpg"
                                  alt="avatar"
                                />
                              </td>
                              <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                <div className="flex items-center">
                                  <p className="capitalize">{user.full_name}</p>
                                </div>
                              </td>
                              <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                <p className="whitespace-no-wrap">
                                  {user.email}
                                </p>
                              </td>
                              <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                <p className="whitespace-no-wrap">
                                  <b className="font-[500]">$</b>
                                  {user.balance}
                                </p>
                              </td>
                              <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                <button
                                  onClick={() => {
                                    setUser(user);
                                    setEdit(!edit);
                                  }}
                                  className="uppercase font-[600] rounded-md text-white bg-green-700 py-[7px] px-[24px] text-[11px]"
                                >
                                  Manage
                                </button>
                              </td>
                            </tr>
                          ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : user ? (
        <Profile
          user={user}
          fetchUser={fetchUser}
          toggle={() => setEdit(!edit)}
        />
      ) : null}
    </section>
  );
}
