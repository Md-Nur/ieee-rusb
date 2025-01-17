import ShowUsers from "@/components/ShowUsers";
import Title from "@/components/Title";

const Alumni = () => {
  return (
    <div className="w-full">
      <Title>Alumni</Title>
      <ShowUsers query="alumni" />
    </div>
  );
};

export default Alumni;
