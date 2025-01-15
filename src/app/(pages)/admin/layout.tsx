"use client";
import { useUserAuth } from "@/context/userAuth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
// import { toast } from "react-toastify";

const AdminPage = ({ children }: { children: ReactNode }) => {
  const { userAuth, loading } = useUserAuth();

  if (loading) {
    return <span className="loading loading-infinity loading-lg"></span>;
  } else if (!userAuth?.isAdmin) {
    // toast.error("You are not authorized to view this page");
    redirect("/login");
  }
  return children;
};

export default AdminPage;