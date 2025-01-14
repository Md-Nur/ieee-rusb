"use client";
import { User } from "@/models/user.model";
import { createContext, useContext } from "react";

const UserAuth = createContext<{
  userAuth: User | null;
  setUserAuth: (user: User | null) => void;
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
