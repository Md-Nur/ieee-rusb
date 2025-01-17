import ShowUsers from "@/components/ShowUsers";
import Title from "@/components/Title";

const graduateMembers = () => {
  return (
    <div className="w-full">
      <Title>Graduate Members</Title>
      <ShowUsers query="graduate-member" />
    </div>
  );
};

export default graduateMembers;
