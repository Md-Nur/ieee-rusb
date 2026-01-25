import ForgotPasswordForm from "@/components/Auth/ForgotPasswordForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot Password | IEEE RUSB",
  description: "Reset your IEEE RUSB account password.",
};

const ForgotPassword = () => {
  return <ForgotPasswordForm />;
};

export default ForgotPassword;
