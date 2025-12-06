"use client";
import { useUserAuth } from "@/context/userAuth";
import NavDropdown from "./NavDropdown";
import NavLink from "./NavLink";

const NavRoutes = () => {
  const { userAuth } = useUserAuth();
  return (
    <>
      <NavLink name="home" route="/" />
      <NavDropdown
        name="community"
        routes={[
          { name: "Executive Committee", url: "/executive-committee" },
          { name: "Faculty Members", url: "/faculty-members" },
          { name: "Student Members", url: "/student-members" },
          { name: "Graduate Members", url: "/graduate-members" },
          { name: "Alumni", url: "/alumni" },
        ]}
      />
      <NavDropdown
        name="Societies & AG"
        routes={[
          { name: "IEEE SPS RUSB Chapter", url: "/sps" },
          { name: "IEEE RAS RUSB Chapter", url: "/ras" },
          { name: "IEEE CS RUSB Chapter", url: "/cs" },
          { name: "IEEE PES RUSB Chapter", url: "/pes" },
          { name: "IEEE AP-S RUSB Chapter", url: "/aps" },
          { name: "IEEE WIE RUSB AG", url: "/wie" },
        ]}
      />
      <NavDropdown
        name="Events"
        routes={[
          { name: "Upcoming Events", url: "/upcoming-events" },
          { name: "All Events", url: "/all-events" },
        ]}
      />

      {userAuth?.isAdmin && (
        <NavDropdown
          name="Admin"
          routes={[
            { name: "User Approval", url: "/admin/user-approval" },
            { name: "Content Approval", url: "/admin/content-approval" },
          ]}
        />
      )}
      <NavLink name="blogs" />
      <NavLink name="gallery" />
    </>
  );
};

export default NavRoutes;
