/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import supabase from "@/app/client";
import { MdOutlineModeEdit } from "react-icons/md";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { IoMdWallet } from "react-icons/io";
import { Button } from "../ui/button";

interface ProfileProps {
  user: any;
  toggle: any;
  transactions: any;
  edit: boolean;
}

interface Transactions {
  value: string;
  payment_method: string;
  id: string;
  status: string;
}

export default function Profile(props: ProfileProps) {
  const { user, toggle, transactions, edit } = props;

  const [wallet, setWallet] = useState(user.balance);
  const [bonus, setBonus] = useState(user.bonus);

  async function updateWallet(id: string) {
    try {
      const { error } = await supabase
        .from("users")
        .update({ balance: wallet })
        .eq("id", id);
      if (error) return console.log(error.message);
      toast.success("Wallet Balance Updated");
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
      toast.success("Bonus Balance Updated");
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
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section className="z-25 bg-white absolute w-full top-0 left-0 h-screen">
      <div className="container mx-auto">
        <div className="flex flex-col py-[.8rem]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div>
                <img
                  className="w-[60px] h-auto object-cover"
                  src="/avatar.png"
                  alt="avatar"
                />
              </div>
              <div className="capitalize">
                <p className="text-md font-bold text-[#3a3d45]">
                  {user.full_name}
                </p>
                <p className="text-sm font-light">{user.email}</p>
              </div>
            </div>
            <Button onClick={() => toggle(!edit)} variant="destructive">
              close
            </Button>
          </div>
          <div>
            <div className="flex flex-col my-[20px] py-[1rem] gap-4 lg:flex-row">
              <Popover>
                <div className="w-[90%] bg-[#3a3d45] text-[#fafafa] p-[1rem] border lg:w-[45%] lg:h-[120px] mx-auto">
                  <div className="flex items-center justify-center gap-1 mx-auto w-[80%]">
                    <IoMdWallet className="text-[1.5rem] pt-[5px]" />
                    <p className="font-bold text-xl">
                      {user.balance}{" "}
                      <sub className="uppercase font-medium text-sm">usd</sub>
                    </p>
                    <PopoverTrigger>
                      <MdOutlineModeEdit className="pt-[5px] ml-[2rem] text-[1.5rem]" />
                    </PopoverTrigger>
                  </div>
                  <p className="capitalize text-sm mt-[10px] text-center mx-auto font-[500]">
                    wallet balance
                  </p>
                </div>
                <PopoverContent>
                  <div className="p-[1rem]">
                    <label className="capitalize" htmlFor="wallet">
                      Wallet balance
                    </label>
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
                </PopoverContent>
              </Popover>
              <Popover>
                <div className="w-[90%] bg-[#3a3d45] text-[#fafafa] p-[1rem] border-[1px] lg:w-[45%] lg:h-[120px] mx-auto">
                  <div className="flex items-center justify-center gap-1 mx-auto w-[80%]">
                    <IoMdWallet className="text-[1.5rem] pt-[5px]" />
                    <p className="font-bold text-2xl">
                      {user.bonus}{" "}
                      <sub className="uppercase font-medium text-sm">usd</sub>
                    </p>
                    <PopoverTrigger>
                      <MdOutlineModeEdit className="pt-[5px] ml-[2rem] text-[1.5rem]" />
                    </PopoverTrigger>
                  </div>
                  <p className="capitalize text-sm mt-[10px] text-center font-[500]">
                    investment balance
                  </p>
                </div>
                <PopoverContent>
                  <div className="p-[1rem]">
                    <label className="capitalize" htmlFor="wallet">
                      investment balance
                    </label>
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
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div>
            <div className="overflow-x-scroll">
              <Table>
                <TableCaption>Transaction List</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="uppercase">Amount</TableHead>
                    <TableHead className="uppercase">Status</TableHead>
                    <TableHead className="uppercase">Method</TableHead>
                    <TableHead className="text-right"> </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((transaction: Transactions) => (
                    <TableRow key={transaction.id}>
                      <TableCell className="font-medium">
                        ${transaction.value}
                      </TableCell>
                      <TableCell>
                        <p
                          className={`p-[2px] text-white text-center ${
                            transaction.status === "complete"
                              ? "bg-green-500"
                              : "bg-red-500"
                          }`}
                        >
                          {transaction.status}
                        </p>
                      </TableCell>
                      <TableCell>{transaction.payment_method}</TableCell>
                      <TableCell>
                        <div className="w-full flex items-center justify-center">
                          <button
                            onClick={() => updateStatus(transaction.id)}
                            disabled={transaction.status === "complete"}
                            className="text-[11px] py-[8px] uppercase w-fit mx-auto rounded-md bg-green-700 text-[#fafafa] px-[26px] font-semibold"
                          >
                            Aprove
                          </button>
                        </div>
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
