import ShowContents from "@/components/ShowContents";
import Title from "@/components/Title";

const AllEvents = () => {
  return (
    <div className="w-full overflow-x-auto">
      <Title>Upcoming Events</Title>
      <ShowContents query="" />
    </div>
  );
};

export default AllEvents;
