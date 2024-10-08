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
import { MdOutlineModeEdit } from "react-icons/md";
import { IoMdWallet } from "react-icons/io";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { Skeleton } from "@/components/ui/skeleton";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProfileProps {
  user: any;
  toggle: any;
  fetchUser: Function;
}

interface Transactions {
  value: string;
  payment_method: string;
  id: string;
  status: string;
}

export default function Profile(props: ProfileProps) {
  const { user, toggle, fetchUser } = props;
  const [wallet, setWallet] = useState(user.balance);
  const [bonus, setBonus] = useState(user.bonus);
  const [deposit, setDeposit] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [method, setMethod] = useState("");
  const [type, setType] = useState("deposit");
  const [transaction, setTransaction] = useState<Transactions[]>([]);

  const { toast } = useToast();

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
    const subscription = supabase
      .channel("custom-all-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "users" },
        (payload) => {
          fetchUser(user.id);
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

  async function updateWallet(id: string) {
    try {
      const { error } = await supabase
        .from("users")
        .update({ balance: wallet })
        .eq("id", id);
      if (error) return console.log(error.message);
      toast({
        title: "Completed",
        description: "Balance Updated",
      });
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
      toast({
        title: "Completed",
        description: "Bonus Balance Updated",
      });
      return;
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
      if (error)
        return toast({
          variant: "destructive",
          title: "Error",
          description: "Something went wrong",
        });
      toast({
        title: "Completed",
        description: "Transaction deleted",
      });
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
      toast({
        title: "Completed",
        description: "Transaction status updated",
      });
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
          type: type,
        },
      ]);
      if (error)
        return toast({
          variant: "destructive",
          title: "error",
          description: "Something went wrong please try again",
        });
      getTransaction(user.id);
      return toast({
        title: "Completed",
        description: "Transaction added",
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <section className="z-25 bg-white absolute w-full top-0 left-0 h-screen">
      <div className="flex sticky z-[200] top-0 left-0 w-full p-3 bg-black text-white items-center justify-between">
        <div className="flex  items-center gap-3">
          <div>
            <img
              className="w-[40px] lg:w-[40px] h-auto object-cover"
              src="/avatar.png"
              alt="avatar"
            />
          </div>
          <div className="capitalize">
            <p className="text-sm lg:text-md font-bold">{user.full_name}</p>
            <p className="text-sm lg:text-md font-light">{user.email}</p>
          </div>
        </div>
        <Button
          size="sm"
          className="text-xs"
          onClick={() => toggle()}
          variant="destructive"
        >
          close
        </Button>
      </div>
      <div className="container px-[10px] mx-auto">
        <div className="flex flex-col py-[.8rem]">
          <div>
            <div className="flex flex-col  py-[1rem] gap-4 lg:flex-row">
              <Dialog>
                <div className="w-[90%] bg-zinc-900 flex items-center justify-center flex-col text-[#fafafa] p-[1rem] border lg:w-[45%] lg:h-[120px] mx-auto">
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
                <div className="w-[90%] bg-zinc-900 flex flex-col items-center justify-center text-[#fafafa] p-[1rem] border-[1px] lg:w-[45%] lg:h-[120px] mx-auto">
                  <div className="flex items-center justify-center gap-1 mx-auto w-[80%]">
                    <IoMdWallet className="text-2xl" />
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
                    <DialogTitle className="text-center">Deposit</DialogTitle>
                    <DialogDescription className="my-3 text-center">
                      Add Deposit transaction
                    </DialogDescription>

                    <Select
                      value={method}
                      onValueChange={(value) => setMethod(value)}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Bitcoin">Bitcoin</SelectItem>
                        <SelectItem value="USDT">USDT</SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="my-3"></div>
                    <Select
                      value={type}
                      onValueChange={(value) => setType(value)}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="deposit">Deposit</SelectItem>
                        <SelectItem value="withdrawal">Withdrawal</SelectItem>
                      </SelectContent>
                    </Select>

                    <div className="flex flex-col mt-3 md:flex-row gap-3 items-center ">
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
                    <TableHead className="uppercase text-center">
                      Amount
                    </TableHead>
                    <TableHead className="uppercase text-center">
                      Status
                    </TableHead>
                    <TableHead className="uppercase text-center">
                      Method
                    </TableHead>
                    <TableHead className="text-right"> </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transaction.map((transaction: Transactions) => (
                    <TableRow key={transaction.id}>
                      <TableCell className="font-medium text-center">
                        ${transaction.value}
                      </TableCell>
                      <TableCell>
                        {loading ? (
                          <Skeleton className="w-[60px] h-4 rounded-full" />
                        ) : (
                          <p
                            className={`p-[2px] text-white text-center mx-auto ${
                              transaction.status === "complete"
                                ? "bg-green-500"
                                : "bg-red-500"
                            }`}
                          >
                            {transaction.status}
                          </p>
                        )}
                      </TableCell>
                      <TableCell className="text-center">
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
    </section>
  );
}
