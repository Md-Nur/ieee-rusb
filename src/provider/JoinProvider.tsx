"use client";
import { Join } from "@/context/join";
import { User } from "@/models/user.model";
import { ReactNode, useState } from "react";

const JoinProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  return <Join.Provider value={{ user, setUser }}>{children}</Join.Provider>;
};

export default JoinProvider;
