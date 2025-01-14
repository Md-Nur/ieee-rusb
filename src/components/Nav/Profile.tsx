"use client";
import { useUserAuth } from "@/context/userAuth";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const Profile = () => {
  const { userAuth, setUserAuth } = useUserAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await axios.get("/api/logout");
      if (res.status === 200) {
        setUserAuth(null);
        router.push("/");
        toast.success("Logged out successfully");
      }
    } catch (err: any) {
      toast.error(err?.response?.data.message);
    }
  };
  return (
    <div className="dropdown dropdown-end mr-5">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost btn-circle avatar"
      >
        <div className="w-14 rounded-full">
          <Image
            alt={userAuth?.name || "User"}
            src={userAuth?.avatar || "/defaultAvatar.jpg"}
            width={40}
            height={40}
          />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-200 rounded-box z-40 mt-3 p-2 shadow"
      >
        <li>
          <Link href="/dashboard" className="justify-between">
            Profile
          </Link>
        </li>
        <li>
          <Link href="/admin">Admin</Link>
        </li>
        <li>
          <button onClick={handleLogout}>Logout</button>
        </li>
      </ul>
    </div>
  );
};

export default Profile;
