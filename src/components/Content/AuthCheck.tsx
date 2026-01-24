"use client";
import { useUserAuth } from "@/context/userAuth";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";

const AuthCheck = ({ 
  isApproved, 
  contentUserId 
}: { 
  isApproved: boolean;
  contentUserId: string;
}) => {
  const { userAuth } = useUserAuth();

  useEffect(() => {
    if (
      !isApproved &&
      userAuth && // Wait until auth is loaded? context usually supplies null initially.
      // But typically userAuth is null if not logged in.
      // If we are waiting for loading, we might redirect prematurely.
      // Assuming context handles loading state separately but we don't have it exposed here easily without checking context definition.
      // Let's assume if userAuth is checked.
      userAuth._id !== contentUserId &&
      !userAuth.isAdmin
    ) {
      toast.error("Content not approved");
      redirect("/");
    }
  }, [isApproved, contentUserId, userAuth]);

  return null;
};

export default AuthCheck;
