"use client";
import { createContext, useContext } from "react";
import { User } from "@/models/user.model";

const Join = createContext<{
  user: User | null;
  setUser: (user: User | null) => void;
}>({
  user: null,
  setUser: () => {},
});

const useJoin = () => {
  const context = useContext(Join);
  if (!context) {
    throw new Error("useJoin must be used within a JoinProvider");
  }
  return context;
};

export { Join, useJoin };
