import { ReactNode } from "react";

const Pages = ({ children }: { children: ReactNode }) => {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center items-center py-2 w-full">
      {children}
    </main>
  );
};

export default Pages;
