import ResetPasswordForm from "@/components/Auth/ResetPasswordForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset Password | IEEE RUSB",
  description: "Reset your IEEE RUSB account password.",
};

const ResetPassword = async ({ params }: { params: Promise<{ token: string }> }) => {
  const { token } = await params;
  return <ResetPasswordForm token={token} />;
};

export default ResetPassword;
