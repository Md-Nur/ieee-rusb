import EditProfileForm from "@/components/Dashboard/EditProfileForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Profile | IEEE RUSB",
  description: "Update your IEEE RUSB professional profile information and affiliation parameters.",
};

const EditProfilePage = () => {
  return <EditProfileForm />;
};

export default EditProfilePage;
