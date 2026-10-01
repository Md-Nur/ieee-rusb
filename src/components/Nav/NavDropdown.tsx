"use client";
import { useEffect, useRef } from "react";
import NavLink from "./NavLink";

interface NavDropdownProps {
  name: string;
  routes: { name: string; url?: string; target?: string; rel?: string }[];
  width?: string;
}

const NavDropdown = ({
  name,
  routes,
  width = "w-60",
}: NavDropdownProps) => {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        detailsRef.current &&
        !detailsRef.current.contains(event.target as Node)
      ) {
        detailsRef.current.removeAttribute("open");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClick = () => {
    const details = document.getElementsByClassName("ieee-dropdown");
    if (details) {
      for (let i = 0; i < details.length; i++) {
        if (details[i] !== detailsRef.current) {
          (details[i] as HTMLDetailsElement).removeAttribute("open");
        }
      }
    }
  };

  return (
    <li className="dropdown dropdown-hover z-30">
      <details
        ref={detailsRef}
        onClick={handleClick}
        className="ieee-dropdown"
        id={`${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-dropdown`}
      >
        <summary className="uppercase">{name}</summary>
        <ul className={`p-2 ${width} bg-base-200`}>
          {routes.map((route, index) => (
            <NavLink
              key={index}
              name={route.name}
              route={route.url}
              target={route.target}
              rel={route.rel}
            />
          ))}
        </ul>
      </details>
    </li>
  );
};

export default NavDropdown;
