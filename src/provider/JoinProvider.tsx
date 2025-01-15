"use client";
import { Join } from "@/context/join";
import { Users } from "@/models/user.model";
import { ReactNode, useState } from "react";

const JoinProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any | null>({
    name: "",
    email: "",
    phone: "",
    password: "",
    roles: [],
    isAdmin: false,
    societies: [],
    isApproved: false,
    dept: "",
    session: "",
  });

  return <Join.Provider value={{ user, setUser }}>{children}</Join.Provider>;
};

export default JoinProvider;
