import SocietiesList from "@/components/Societies/SocietiesList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Societies & Chapters | IEEE RUSB",
  description: "Learn about various technical societies under IEEE RUSB, including Robotics, Computer Society, and more.",
};

const SocietiesPage = () => {
  return <SocietiesList />;
};

export default SocietiesPage;
