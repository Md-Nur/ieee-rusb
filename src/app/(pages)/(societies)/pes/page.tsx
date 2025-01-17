import ShowUsers from "@/components/ShowUsers";
import Title from "@/components/Title";

const PES = () => {
  return (
    <div className="w-full">
      <Title>IEEE Power & Energy Society RUSBC</Title>
      <ShowUsers query="power-&-energy-society" />
    </div>
  );
};

export default PES;
