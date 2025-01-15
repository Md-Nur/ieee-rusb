"use client";
import { UserAuth } from "@/context/userAuth";
import { Users } from "@/models/user.model";
import axios from "axios";
import { ReactNode, useEffect, useState } from "react";

const UserAuthProvider = ({ children }: { children: ReactNode }) => {
  const [userAuth, setUserAuth] = useState<Users | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get("/api/jwt")
      .then((res) => setUserAuth(res.data))
      .catch((error) => {
        console.log(error?.response?.data?.error || error.message);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <UserAuth.Provider value={{ userAuth, setUserAuth, loading, setLoading }}>
      {children}
    </UserAuth.Provider>
  );
};

export default UserAuthProvider;
