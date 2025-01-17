import ShowContents from "@/components/ShowContents";
import Title from "@/components/Title";

const UpcomingEvents = () => {
  return (
    <div className="w-full overflow-x-auto">
      <Title>Upcoming Events</Title>
      <ShowContents query="upcoming-events" />
    </div>
  );
};

export default UpcomingEvents;
