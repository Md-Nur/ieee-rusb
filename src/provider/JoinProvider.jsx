"use client";
import { Join } from "@/context/join";
import { ReactNode, useState } from "react";

const JoinProvider = ({ children }) => {
  const [user, setUser] = useState({
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
