import JoinProvider from "@/provider/JoinProvider";
import { ReactNode } from "react";

const JoinLayout = ({ children }: { children: ReactNode }) => {
  return <JoinProvider>{children}</JoinProvider>;
};

export default JoinLayout;
