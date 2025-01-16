import { ReactNode } from "react";

const Title = ({ children }: { children: ReactNode }) => {
  return (
    <h1 className="text-3xl md:text-5xl text-center my-10 font-bold font-serif">
      {children}
    </h1>
  );
};

export default Title;
