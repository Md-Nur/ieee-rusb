import EditProfileForm from "@/components/Dashboard/EditProfileForm";
import { getUser } from "@/lib/data/user";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Profile | IEEE RUSB",
  description: "Update your IEEE RUSB professional profile information and affiliation parameters.",
};

const EditProfilePage = async () => {
  const user = await getUser();
  return <EditProfileForm initialUser={user} />;
};

export default EditProfilePage;
