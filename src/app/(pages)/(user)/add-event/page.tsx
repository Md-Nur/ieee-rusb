import Title from "@/components/Title";
import Content from "@/components/Content";

const AddEvent = () => {
  return (
    <div>
      <Title>Add Event</Title>
      <Content postData={null} type="event" />
    </div>
  );
};

export default AddEvent;
