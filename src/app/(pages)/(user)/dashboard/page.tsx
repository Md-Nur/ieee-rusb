import DashboardProfile from "@/components/Dashboard/DashboardProfile";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | IEEE RUSB",
  description: "View and manage your IEEE RUSB professional profile and administrative hub.",
};

const DashboardPage = () => {
  return <DashboardProfile />;
};

export default DashboardPage;
