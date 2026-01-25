"use client";
import { useUserAuth } from "@/context/userAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RedirectIfAuthenticated() {
  const { userAuth } = useUserAuth();
  const router = useRouter();

  useEffect(() => {
    if (userAuth) {
      router.push("/");
    }
  }, [userAuth, router]);

  return null;
}
