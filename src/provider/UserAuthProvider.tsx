"use client";
import Loading from "@/components/Loading";
import { UserAuth } from "@/context/userAuth";
import { Users } from "@/models/user.model";
import axios from "axios";
import { ReactNode, useEffect, useState } from "react";

const UserAuthProvider = ({ 
  children, 
  initialUser 
}: { 
  children: ReactNode; 
  initialUser?: Users | null;
}) => {
  const [userAuth, setUserAuth] = useState<Users | null>(initialUser || null);
  const [loading, setLoading] = useState(!initialUser);

  useEffect(() => {
    if (initialUser) return;
    
    axios
      .get("/api/jwt")
      .then((res) => setUserAuth(res.data))
      .catch((error) => {
        // Silently fail or log, user just won't be logged in
        console.log("Auth check failed:", error?.message);
      })
      .finally(() => setLoading(false));
  }, [initialUser]);

  if (loading) return <Loading />;

  return (
    <UserAuth.Provider value={{ userAuth, setUserAuth }}>
      {children}
    </UserAuth.Provider>
  );
};

export default UserAuthProvider;
