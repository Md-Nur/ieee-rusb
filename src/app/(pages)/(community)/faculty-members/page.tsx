import ShowUsers from "@/components/ShowUsers";
import Title from "@/components/Title";

const facultyMembers = () => {
  return (
    <div className="w-full">
      <Title>Faculty Members</Title>
      <ShowUsers query="faculty-member" />
    </div>
  );
};

export default facultyMembers;
