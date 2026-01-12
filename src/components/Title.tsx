import { ReactNode } from "react";

interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
}

const Title = ({ children, className = "", ...props }: TitleProps) => {
  return (
    <h1 
      className={`text-3xl md:text-5xl text-center my-20 font-extrabold ${className}`}
      {...props}
    >
      {children}
    </h1>
  );
};

export default Title;
