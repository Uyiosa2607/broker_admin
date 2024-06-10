/* eslint-disable @next/next/no-img-element */
"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Link from "next/link";
import { useSession } from "next-auth/react";

interface User {
  id: number;
  name: string;
  email: string;
  admin: string;
  profile_image: string;
}

export default function Profile() {
  const params = useParams();
  const profileID: any = params?.profileID;
  const { data: session } = useSession();

  const [profile, setProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [admin, setAdmin] = useState<boolean>(false);

  async function getAdmin(session: any) {
    try {
      const request = await axios.get("/api/auth/profile/" + session?.user.id);
      const response = await request.data;
      setAdmin(response.admin);
    } catch (error: any) {
      console.log(error);
    }
  }

  useEffect(() => {
    async function getData() {
      try {
        const request = await axios.get("/api/auth/profile/" + profileID);
        const response: User = request.data;
        setProfile(response);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      } finally {
        setLoading(false);
      }
    }
    getData();
    getAdmin(session);
  }, []);

  async function promoteUser(profileID: string) {
    if (session && session.user && session.user.id) {
      try {
        const request = await axios.put("/api/auth/promote/" + profileID);
        const response = await request.data;
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <div className="mt-5">
      <Card>
        <CardHeader />
        <CardContent>
          <div className="w-full flex flex-col gap-4 items-center justify-center">
            <div>
              {loading ? (
                <Skeleton className="w-[120px] h-[120px] rounded-full" />
              ) : (
                <img
                  alt="profile holder"
                  src={
                    profile?.profile_image ||
                    "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
                  }
                  className="avartar w-[120px] h-[120px] rounded-full object-cover"
                />
              )}
            </div>
            <div className="flex flex-col items-center justify-center gap-3">
              {loading ? (
                <Skeleton className="w-[125px] h-[15px] rounded-full" />
              ) : (
                <h3>{profile?.name}</h3>
              )}
              {loading ? (
                <Skeleton className="w-[160px] h-[15px] rounded-full" />
              ) : (
                <h3>{profile?.email}</h3>
              )}
              {loading ? (
                <Skeleton className="w-[100px] h-[15px] rounded-full" />
              ) : (
                <h3>{profile?.admin ? "Admin" : "User"}</h3>
              )}
            </div>
          </div>
          <Button className="mt-[20px]" asChild>
            <Link href="/users">All users</Link>
          </Button>
        </CardContent>
        <CardFooter>
          {admin ? (
            <div className="w-full flex items-cnter justify-center">
              <Button
                onClick={() => promoteUser(profileID)}
                className="text-center"
              >
                Promote
              </Button>
            </div>
          ) : null}
        </CardFooter>
      </Card>
    </div>
  );
}
