import ShowContents from "@/components/ShowContents";
import Title from "@/components/Title";

const Blogs = () => {
  return (
    <div className="w-full overflow-x-auto">
      <Title>Upcoming Events</Title>
      <ShowContents query="blog" />
    </div>
  );
};

export default Blogs;
