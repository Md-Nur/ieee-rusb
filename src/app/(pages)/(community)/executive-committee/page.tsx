import ShowUsers from "@/components/ShowUsers";
import Title from "@/components/Title";

const ExecutiveCommittee = () => {
  return (
    <div className="w-full">
      <Title>Executive Committee</Title>
      <ShowUsers query="executive-committee" />
    </div>
  );
};

export default ExecutiveCommittee;
