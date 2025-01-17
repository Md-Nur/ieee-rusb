import Content from "@/components/Content";
import Title from "@/components/Title";

const AddBlog = () => {
  return (
    <div>
      <Title>Add Event</Title>
      <Content postData={null} type="blog"/>
    </div>
  );
};

export default AddBlog;
