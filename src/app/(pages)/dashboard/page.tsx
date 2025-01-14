"use client";
import { useUserAuth } from "@/context/userAuth";
import Image from "next/image";

const Profile = () => {
  const { userAuth } = useUserAuth();
  return (
    <div>
      Name: {userAuth?.name}
      Phone: {userAuth?.phone}
      Email: {userAuth?.email}
      <Image
        src={userAuth?.avatar || "/defaultAvatar.jpg"}
        alt={userAuth?.name || "Avatar"}
        width={100}
        height={100}
      />
    </div>
  );
};

export default Profile;
