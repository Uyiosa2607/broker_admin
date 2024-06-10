/* eslint-disable @next/next/no-img-element */
"use client";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import axios from "axios";
import UploadImage from "./imageUpload";
import { handleLogout } from "../utils/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

export default function Dashboard() {
  const [userData, setUserData] = useState<any>([]);
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState(null);
  const [userId, setUserId] = useState("");
  const [progress, setProgress] = useState(false);

  const { toast } = useToast();

  useEffect(() => {
    getUserData();
  }, [session]);

  const getUserData = async () => {
    if (session && session.user && session.user.id) {
      setUserId(session.user.id);
      try {
        const request = await axios.get("/api/auth/profile/" + session.user.id);
        const response = await request.data;
        setUserData(response);
        if (request.status === 200) {
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
  };

  async function handleImageUpload() {
    try {
      setProgress(true);
      const request = await axios.post("/api/auth/update-profile-image", {
        userId,
        image,
      });
      const response = await request.data;
      if (response.status === 200) {
        setImage(null);
        setProgress(false);
        getUserData();
        return toast({
          description: "Profile photo updated!",
        });
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="mt-5">
      <Card className="lg:w-[600px] mx-auto">
        <CardHeader>
          <div className="w-full mb-[20px]">
            {image ? (
              <div className="w-full flex justify-between items-center">
                <Button variant="default" onClick={handleLogout}>
                  logout
                </Button>
                <Button variant="default" onClick={handleImageUpload}>
                  Update profile pic{" "}
                  {progress ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                </Button>
              </div>
            ) : (
              <Button variant="default" onClick={handleLogout}>
                logout
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="w-full flex flex-col gap-4 items-center justify-center">
            <div>
              {loading ? (
                <Skeleton className="w-[120px] h-[120px] rounded-full" />
              ) : (
                <div className="relative">
                  <UploadImage setImage={setImage} />
                  <img
                    alt="profile holder"
                    src={
                      userData.profile_image ||
                      "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
                    }
                    className="avartar w-[120px] h-[120px] rounded-full object-cover"
                  />
                </div>
              )}
            </div>
            <div className="flex flex-col items-center justify-center gap-3">
              {loading ? (
                <Skeleton className="w-[125px] h-[15px] rounded-full" />
              ) : (
                <h3>{userData.name}</h3>
              )}
              {loading ? (
                <Skeleton className="w-[160px] h-[15px] rounded-full" />
              ) : (
                <h3>{userData.email}</h3>
              )}
              {loading ? (
                <Skeleton className="w-[100px] h-[15px] rounded-full" />
              ) : (
                <h3>{userData.admin === true ? "Admin" : "User"}</h3>
              )}
            </div>
          </div>
          <Button className="mt-[20px]" asChild>
            <Link href="/users">All users</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
