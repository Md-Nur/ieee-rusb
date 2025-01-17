import ShowUsers from "@/components/ShowUsers";
import Title from "@/components/Title";

const WIE = () => {
  return (
    <div className="w-full">
      <Title>IEEE Women In Engineering Society RUSBC</Title>
      <ShowUsers query="women-in-engineering-society" />
    </div>
  );
};

export default WIE;
