import Image from "next/image";

const Loading = () => {
  return (
    <div className="w-full h-full flex justify-center items-center flex-col">
      <Image
        src="/logo.png"
        alt="Loading"
        width={250}
        height={250}
        className="w-56"
      />
      <progress className="progress w-56"></progress>
    </div>
  );
};

export default Loading;
