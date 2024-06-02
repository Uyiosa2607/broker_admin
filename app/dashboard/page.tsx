/* eslint-disable @next/next/no-img-element */
"use client";
import styles from "./page.module.scss";
import { useSession } from "next-auth/react";
import { Skeleton } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Dashboard() {
  const [userData, setUserData] = useState<any>([]);
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserData = async () => {
      if (session && session.user && session.user.id) {
        try {
          const request = await axios.get("/api/user/" + session.user.id);
          const response = await request.data;
          setUserData(response);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    getUserData();
  }, [session]);

  return (
    <>
      <div className="max-w-2xl mx-4 sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto mt-16 bg-white shadow-xl rounded-lg text-gray-900">
        <div className="rounded-t-lg h-32 overflow-hidden">
          <img
            className="object-cover object-top w-full"
            src="https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
            alt="Mountain"
          />
        </div>
        <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
          {loading ? (
            <Skeleton
              width="130px"
              height="130px"
              animation="wave"
              variant="circular"
            />
          ) : (
            <img
              className="object-cover object-center h-32"
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
              alt="Woman looking front"
            />
          )}
        </div>
        <div className="flex items-center justify-center flex-col text-center mt-2">
          <h2 className="font-semibold">
            {loading ? (
              <Skeleton width="140px" animation="wave" />
            ) : (
              userData.name
            )}
          </h2>
          <p className="text-gray-500">
            {loading ? (
              <Skeleton width="165px" animation="wave" />
            ) : (
              userData.email
            )}
          </p>
          <span className="text-gray-500 text-transform: capitalize">
            {loading ? (
              <Skeleton width="140px" animation="wave" />
            ) : userData.admin? "Admin" : "User"}
          </span>
        </div>
        <div className="p-4 border-t mx-8 mt-2">
          <button className="w-1/2 block mx-auto rounded-full bg-gray-900 hover:shadow-lg font-semibold text-white px-6 py-2">
            Sign out
          </button>
        </div>
      </div>
    </>
  );
}
