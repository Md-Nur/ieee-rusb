"use client";
import { useUserAuth } from "@/context/userAuth";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";

const AuthorizationCheck = ({ 
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
      userAuth && 
      userAuth._id !== contentUserId &&
      !userAuth.isAdmin
    ) {
      toast.error("Content not approved");
      redirect("/");
    }
  }, [isApproved, contentUserId, userAuth]);

  return null;
};

export default AuthorizationCheck;
