import ShowUsers from "@/components/ShowUsers";
import Title from "@/components/Title";

const SPS = () => {
  return (
    <div className="w-full">
      <Title>IEEE Signal Processing Society RUSBC</Title>
      <ShowUsers query="signal-processing-society" />
    </div>
  );
};

export default SPS;
