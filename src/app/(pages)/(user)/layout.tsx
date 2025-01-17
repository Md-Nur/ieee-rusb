"use client";
import { useUserAuth } from "@/context/userAuth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

const UserPages = ({ children }: { children: ReactNode }) => {
  const { userAuth } = useUserAuth();

  if (!userAuth) {
    redirect("/login");
  }
  return children;
};

export default UserPages;
