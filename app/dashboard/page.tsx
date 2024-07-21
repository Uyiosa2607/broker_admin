"use client";
/* eslint-disable @next/next/no-img-element */
import supabase from "@/app/client";
import { useEffect, useState } from "react";
import Header from "@/components/system/header";
import Profile from "@/components/system/profile";

interface Users {
  full_name: string;
  balance: string;
  email: string;
  username: string;
  id: string;
  bonus: string;
}

interface User {
  full_name: string;
  balance: string;
  id: string;
  bonus: string;
  email: string;
}

interface Transactions {
  id: string;
  payment_method: string;
  status: string;
  value: string;
}

export default function Dashboard() {
  const [users, setUsers] = useState<Users[]>([]);
  const [user, setUser] = useState<User[]>([]);
  const [edit, setEdit] = useState(false);
  const [transactions, setTransactions] = useState<Transactions[]>([]);

  const getUsers = async function () {
    try {
      const { data, error } = await supabase.from("users").select();
      if (error) return console.log(error.message);
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  async function fecthUser(id: string) {
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

    try {
      const { data, error } = await supabase
        .from("transactions")
        .select("*")
        .eq("user_id", id);
      if (error) return console.log(error.message);
      setTransactions(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section>
      <Header />
      {edit ? null : (
        <div>
          <div className="container text-[16px] mx-auto">
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
                      {users.map((user: Users) => (
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
                            <p className="whitespace-no-wrap">{user.email}</p>
                          </td>
                          <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                            <p className="whitespace-no-wrap">
                              <b className="font-[500]">$</b>
                              {user.balance}
                            </p>
                          </td>

                          <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                            <button
                              onClick={() => fecthUser(user.id)}
                              className="uppercase font-[600] rounded-md text-white bg-green-700 py-[7px] px-[24px] text-[11px]"
                            >
                              edit
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
      )}
      {edit
        ? user && (
            <Profile
              user={user}
              transactions={transactions}
              toggle={setEdit}
              edit={edit}
            />
          )
        : null}
    </section>
  );
}
