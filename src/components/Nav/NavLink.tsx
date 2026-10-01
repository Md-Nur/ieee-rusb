"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps {
  name: string;
  route?: string;
  target?: string;
  rel?: string;
}

const NavLink = ({ name, route, target, rel }: NavLinkProps) => {
  const pathname = usePathname();
  const to = route || `/${name}`;
  const isExternal = to.startsWith("http://") || to.startsWith("https://");

  const closeNav = () => {
    const dropdowns = document.getElementsByClassName("ieee-dropdown");
    for (let i = 0; i < dropdowns.length; i++) {
      (dropdowns[i] as HTMLDetailsElement).removeAttribute("open");
    }
    const inputNav = document.getElementById("my-drawer-3");
    // remove input checkbox
    if (inputNav) {
      (inputNav as HTMLInputElement).checked = false;
    }
  };

  return (
    <li className="list-none" onClick={closeNav}>
      <Link
        className={`${pathname === to ? "font-bold underline" : ""}`}
        href={to}
        target={target || (isExternal ? "_blank" : undefined)}
        rel={rel || (isExternal ? "noopener noreferrer" : undefined)}
      >
        {name.toUpperCase()}
      </Link>
    </li>
  );
};

export default NavLink;
