"use client";
import { ReactNode } from "react";
import { IoMdMenu } from "react-icons/io";
import NavRoutes from "./NavRoutes";
import Image from "next/image";
import Profile from "./Profile";
import Link from "next/link";
import { useUserAuth } from "@/context/userAuth";

const Navbar = ({ children }: { children: ReactNode }) => {
  const { userAuth } = useUserAuth();
  return (
    <div className="drawer">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="navbar bg-base-300 w-full sticky top-0 z-10 shadow-lg">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="my-drawer-3"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <IoMdMenu className="w-7 h-7" />
            </label>
          </div>
          <div className="mx-2 flex-1 px-2">
            <Link href="/" className="text-lg font-bold">
              <Image
                src={"/logo.png"}
                alt="IEEE RUSB Logo"
                width={150}
                height={150}
              />
            </Link>
          </div>
          <div className="hidden flex-none lg:block">
            <ul className="menu menu-horizontal">
              {/* Navbar menu content here */}
              <NavRoutes />
            </ul>
          </div>
          {!userAuth ? (
            <>
              <Link
                href="/join/1"
                className="btn btn-sm btn-outline uppercase mr-2"
              >
                Join
              </Link>
              <Link
                href="/login"
                className="btn btn-sm btn-outline uppercase mr-2"
              >
                Login
              </Link>
            </>
          ) : (
            <Profile />
          )}
        </div>
        {children}
      </div>
      <div className="drawer-side z-20">
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 min-h-full w-80 p-4">
          {/* Sidebar content here */}
          <NavRoutes />
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
