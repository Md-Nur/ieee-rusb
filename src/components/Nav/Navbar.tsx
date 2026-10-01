"use client";
import { ReactNode, useEffect, useRef, useState } from "react";
import { IoMdMenu } from "react-icons/io";
import NavRoutes from "./NavRoutes";
import Image from "next/image";
import Profile from "./Profile";
import Link from "next/link";
import { useUserAuth } from "@/context/userAuth";

const ieeeSites = [
  { name: "IEEE", url: "https://www.ieee.org" },
  { name: "IEEE Bangladesh Section", url: "https://www.ieeebd.com" },
  { name: "Join IEEE", url: "https://www.ieee.org/membership/join" },
  { name: "IEEE Spectrum", url: "https://spectrum.ieee.org" },
  { name: "More IEEE site", url: "https://www.ieee.org/sitemap.html" },
];

const Navbar = ({ children }: { children: ReactNode }) => {
  const { userAuth } = useUserAuth();
  const headerRef = useRef<HTMLElement>(null);
  const [headerHeight, setHeaderHeight] = useState<number>(0);

  useEffect(() => {
    const updateHeight = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight);
      }
    };
    updateHeight();

    const resizeObserver = new ResizeObserver(updateHeight);
    if (headerRef.current) {
      resizeObserver.observe(headerRef.current);
    }
    window.addEventListener("resize", updateHeight);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  const closeDrawer = () => {
    const inputNav = document.getElementById("my-drawer-3");
    if (inputNav) {
      (inputNav as HTMLInputElement).checked = false;
    }
  };

  return (
    <div className="drawer">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col min-h-screen">
        {/* Fixed Header */}
        <header
          ref={headerRef}
          className="fixed top-0 left-0 right-0 z-[50] w-full shadow-md transition-all duration-300"
        >
          {/* Top Horizontal Stripe for IEEE Sites */}
          <div className="bg-[#001c30] text-slate-300 text-xs border-b border-white/10 tracking-wide">
            <div className="container mx-auto px-4 md:px-8 py-1.5 flex items-center overflow-x-auto scrollbar-none whitespace-nowrap">
              <div className="flex items-center divide-x divide-white/20 ml-auto">
                {ieeeSites.map((site, index) => (
                  <a
                    key={index}
                    href={site.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 first:pl-0 last:pr-0 hover:text-white hover:underline transition-colors duration-200"
                  >
                    {site.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Main Navbar */}
          <div className="navbar bg-white/80 dark:bg-slate-900/80 backdrop-blur-md w-full border-b border-black/5 dark:border-white/5">
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
                  height={50}
                  className="w-28 md:w-40 h-auto"
                  priority
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
        </header>

        {/* Content offset for fixed header */}
        <div
          style={{ paddingTop: headerHeight ? `${headerHeight}px` : undefined }}
          className={headerHeight ? "" : "pt-[93px] md:pt-[100px]"}
        >
          {children}
        </div>
      </div>
      <div className="drawer-side z-[60]">
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-white dark:bg-slate-900 min-h-full w-80 p-4 shadow-2xl transition-colors duration-300">
          {/* Sidebar content here */}
          <NavRoutes />
          <div className="divider my-3 text-xs opacity-50 uppercase tracking-wider">
            IEEE Sites
          </div>
          {ieeeSites.map((site, index) => (
            <li key={index} className="list-none" onClick={closeDrawer}>
              <a
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs uppercase hover:font-bold"
              >
                {site.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
