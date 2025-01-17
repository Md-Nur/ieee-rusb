"use client";
import { Users } from "@/models/user.model";
import { createContext, useContext } from "react";

const UserAuth = createContext<{
  userAuth: Users | null;
  setUserAuth: (user: Users | null) => void;
}>({
  userAuth: null,
  setUserAuth: () => {},
});

const useUserAuth = () => {
  const context = useContext(UserAuth);
  if (!context) {
    throw new Error("useUserAuth must be used within a UserAuthProvider");
  }
  return context;
};

export { UserAuth, useUserAuth };
