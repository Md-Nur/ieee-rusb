import Image from "next/image";

const Loading = () => {
  return (
    <div className="w-full h-screen gap-2 flex justify-center items-center flex-col">
      <Image
        src="/logo.png"
        alt="Loading"
        width={300}
        height={300}
        className="w-64"
      />
      <progress className="progress w-56 progress-accent"></progress>
    </div>
  );
};

export default Loading;
