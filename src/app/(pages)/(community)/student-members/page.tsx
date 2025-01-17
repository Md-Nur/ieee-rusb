import ShowUsers from "@/components/ShowUsers";
import Title from "@/components/Title";

const studentMembers = () => {
  return (
    <div className="w-full">
      <Title>Student Members</Title>
      <ShowUsers query="student-member" />
    </div>
  );
};

export default studentMembers;
