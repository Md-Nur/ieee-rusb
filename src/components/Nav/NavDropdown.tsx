import NavLink from "./NavLink";

const NavDropdown = ({
  name,
  routes,
}: {
  name: string;
  routes: { name: string; url?: string }[];
}) => {
  return (
    <li className="dropdown dropdown-hover">
      <details>
        <summary className="uppercase">{name}</summary>
        <ul className="p-2 w-52 bg-base-200">
          {routes.map((route, index) => (
            <NavLink key={index} name={route.name} route={route.url} />
          ))}
        </ul>
      </details>
    </li>
  );
};

export default NavDropdown;
