"use client";
import { useUserAuth } from "@/context/userAuth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

const UserPages = ({ children }: { children: ReactNode }) => {
  const { loading, userAuth } = useUserAuth();

  if (loading) {
    return <span className="loading loading-infinity loading-lg"></span>;
  } else if (!userAuth) {
    redirect("/login");
  }
  return children;
};

export default UserPages;
