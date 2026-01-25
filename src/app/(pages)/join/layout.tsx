import JoinProvider from "@/provider/JoinProvider";
import { ReactNode } from "react";
import RedirectIfAuthenticated from "@/components/Auth/RedirectIfAuthenticated";

const JoinLayout = ({ children }: { children: ReactNode }) => {
  return (
    <JoinProvider>
      <RedirectIfAuthenticated />
      {children}
    </JoinProvider>
  );
};

export default JoinLayout;
