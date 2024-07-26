/* eslint-disable @next/next/no-img-element */
import supabase from "@/app/client";
import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdOutlineModeEdit } from "react-icons/md";
import { IoMdWallet } from "react-icons/io";
import { Button } from "../ui/button";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { Skeleton } from "@/components/ui/skeleton";

interface ProfileProps {
  user: any;
  toggle: any;
  edit: boolean;
  fetchUser: (id: string) => Promise<void>;
}

interface Transactions {
  value: string;
  payment_method: string;
  id: string;
  status: string;
}

export default function Profile(props: ProfileProps) {
  const { user, toggle, edit, fetchUser } = props;
  const [wallet, setWallet] = useState(user.balance);
  const [bonus, setBonus] = useState(user.bonus);
  const [deposit, setDeposit] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [method, setMethod] = useState("Bitcoin");
  const [transaction, setTransaction] = useState<Transactions[]>([]);

  async function getTransaction(id: string) {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("transactions")
        .select("*")
        .eq("user_id", id);
      if (error) return console.log(error.message);
      setTransaction(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getTransaction(user.id);
  }, [user]);

  async function updateWallet(id: string) {
    try {
      const { error } = await supabase
        .from("users")
        .update({ balance: wallet })
        .eq("id", id);
      if (error) return console.log(error.message);
      toast.success("Wallet Balance Updated");
      fetchUser(id);
      return;
    } catch (error) {
      console.log(error);
    }
  }

  async function updateBonus(id: string) {
    try {
      const { error } = await supabase
        .from("users")
        .update({ bonus: bonus })
        .eq("id", id);
      if (error) return console.log(error.message);
      fetchUser(id);
      toast.success("Bonus Balance Updated");
      return;
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteTransaction(id: string) {
    try {
      const { error } = await supabase
        .from("transactions")
        .delete()
        .eq("id", id);
      if (error) return toast.error("Something went wrong");
      toast.success("Record removed");
      getTransaction(user.id);
      return;
    } catch (error) {
      console.log(error);
    }
  }

  async function updateStatus(id: string) {
    try {
      const { error } = await supabase
        .from("transactions")
        .update({ status: "complete" })
        .eq("id", id);
      if (error) return console.log(error.message);
      toast.success("Transaction status updated");
      getTransaction(user.id);
      return;
    } catch (error) {
      console.log(error);
    }
  }

  async function addTransaction(id: string) {
    try {
      const { error } = await supabase.from("transactions").insert([
        {
          user_id: id,
          value: deposit,
          payment_method: method,
        },
      ]);
      if (error) return toast.error("Something went wrong");
      getTransaction(user.id);
      return toast.success("Transaction added succesfully");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <section className="z-25 bg-white absolute w-full top-0 left-0 h-screen">
      <div className="container px-[10px] mx-auto">
        <div className="flex flex-col py-[.8rem]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div>
                <img
                  className="w-[40px] lg:w-[60px] h-auto object-cover"
                  src="/avatar.png"
                  alt="avatar"
                />
              </div>
              <div className="capitalize">
                <p className="text-sm lg:text-md font-bold text-[#3a3d45]">
                  {user.full_name}
                </p>
                <p className="text-sm lg:text-md font-light">{user.email}</p>
              </div>
            </div>
            <Button onClick={() => toggle(!edit)} variant="destructive">
              close
            </Button>
          </div>
          <div>
            <div className="flex flex-col my-[20px] py-[1rem] gap-4 lg:flex-row">
              <Dialog>
                <div className="w-[90%] bg-[#3a3d45] text-[#fafafa] p-[1rem] border lg:w-[45%] lg:h-[120px] mx-auto">
                  <div className="flex items-center justify-center gap-1 mx-auto w-[80%]">
                    <IoMdWallet className="text-[1.5rem]" />
                    <p className="font-semibold text-xl">
                      {user.balance}&nbsp;{" "}
                      <span className="font-medium text-green-400">USD</span>
                    </p>
                    <DialogTrigger>
                      <MdOutlineModeEdit className="ml-[1rem] text-[1.5rem]" />
                    </DialogTrigger>
                  </div>
                  <p className="capitalize text-sm mt-[10px] text-center mx-auto font-[500]">
                    wallet balance
                  </p>
                </div>
                <DialogContent>
                  <DialogTitle>Wallet Balance</DialogTitle>
                  <DialogDescription>Update Wallet Balance</DialogDescription>
                  <div className="p-[1rem]">
                    <input
                      value={wallet}
                      onChange={(e) => setWallet(e.target.value)}
                      id="wallet"
                      className="w-full text-black font-bold border-[#3a3d45] border-[1px] mt-[10px] p-[10px] text-md"
                      type="text"
                    />
                    <button
                      onClick={() => updateWallet(user.id)}
                      className="py-[10px] w-full my-[10px] bg-green-700 text-white rounded-md font-semibold text-md"
                    >
                      Update
                    </button>
                  </div>
                </DialogContent>
              </Dialog>
              <Dialog>
                <div className="w-[90%] bg-[#3a3d45] text-[#fafafa] p-[1rem] border-[1px] lg:w-[45%] lg:h-[120px] mx-auto">
                  <div className="flex items-center justify-center gap-1 mx-auto w-[80%]">
                    <IoMdWallet className="text-[1.5rem]" />
                    <p className="font-semibold text-2xl">
                      {user.bonus}&nbsp;{" "}
                      <span className="font-medium text-green-400">USD</span>
                    </p>
                    <DialogTrigger>
                      <MdOutlineModeEdit className=" ml-[1rem] text-[1.5rem]" />
                    </DialogTrigger>
                  </div>
                  <p className="capitalize text-sm mt-[10px] text-center font-[500]">
                    investment balance
                  </p>
                </div>
                <DialogContent>
                  <DialogTitle>Bonus Balance</DialogTitle>
                  <DialogDescription>Update Earnings balance</DialogDescription>
                  <div className="p-[1rem]">
                    <input
                      value={bonus}
                      onChange={(e) => setBonus(e.target.value)}
                      id="wallet"
                      className="w-full text-black font-bold border-[#3a3d45]  border-[1px] mt-[10px] p-[10px] text-md"
                      type="text"
                    />
                    <button
                      onClick={() => updateBonus(user.id)}
                      className="py-[10px] w-full my-[10px] bg-green-700 text-white rounded-md font-semibold text-md"
                    >
                      Update
                    </button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          <div>
            <div className="overflow-x-scroll">
              <Dialog>
                <div className="flex items-center justify-center mb-6">
                  <DialogTrigger asChild>
                    <Button>Add Transaction</Button>
                  </DialogTrigger>
                </div>

                <DialogContent>
                  <div>
                    <DialogTitle>Deposit</DialogTitle>
                    <DialogDescription>
                      Add Deposit transaction
                    </DialogDescription>

                    <div className="flex flex-col md:flex-row gap-3 items-center ">
                      <input
                        className="text-md p-[10px] border border-black"
                        type="text"
                        value={deposit}
                        onChange={(e) => setDeposit(e.target.value)}
                      />
                      <Button
                        className="bg-green-700"
                        onClick={() => addTransaction(user.id)}
                      >
                        Add Transaction
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="uppercase">Amount</TableHead>
                    <TableHead className="uppercase">Status</TableHead>
                    <TableHead className="uppercase">Method</TableHead>
                    <TableHead className="text-right"> </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transaction.map((transaction: Transactions) => (
                    <TableRow key={transaction.id}>
                      <TableCell className="font-medium">
                        ${transaction.value}
                      </TableCell>
                      <TableCell>
                        {loading ? (
                          <Skeleton className="w-[60px] h-4 rounded-full" />
                        ) : (
                          <p
                            className={`p-[2px] text-white text-center ${
                              transaction.status === "complete"
                                ? "bg-green-500"
                                : "bg-red-500"
                            }`}
                          >
                            {transaction.status}
                          </p>
                        )}
                      </TableCell>
                      <TableCell>
                        {loading ? (
                          <Skeleton className="w-[60px] h-4 rounded-full" />
                        ) : (
                          transaction.payment_method
                        )}
                      </TableCell>
                      <TableCell>
                        {loading ? (
                          <Skeleton className="w-[40px] h-6 rounded-full" />
                        ) : (
                          <div className="w-full flex items-center justify-center">
                            {transaction.status === "pending" ? (
                              <button
                                onClick={() => updateStatus(transaction.id)}
                                className="text-[11px] py-[8px] uppercase w-fit mx-auto rounded-md bg-green-700 text-[#fafafa] px-[26px] font-semibold"
                              >
                                Aprove
                              </button>
                            ) : (
                              <button
                                onClick={() =>
                                  deleteTransaction(transaction.id)
                                }
                                className="text-[11px] py-[8px] uppercase w-fit mx-auto rounded-md bg-red-700 text-[#fafafa] px-[26px] font-semibold"
                              >
                                Delete
                              </button>
                            )}
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
}
