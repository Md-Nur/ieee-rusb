"use client";
import { UserAuth } from "@/context/userAuth";
import { User } from "@/models/user.model";
import axios from "axios";
import { ReactNode, useEffect, useState } from "react";

const UserAuthProvider = ({ children }: { children: ReactNode }) => {
  const [userAuth, setUserAuth] = useState<User | null>(null);

  useEffect(() => {
    axios
      .get("/api/jwt")
      .then((res) => setUserAuth(res.data))
      .catch((error) => {
        console.log(error?.response?.data?.error || error.message);
      });
  }, []);

  return (
    <UserAuth.Provider value={{ userAuth, setUserAuth }}>
      {children}
    </UserAuth.Provider>
  );
};

export default UserAuthProvider;
