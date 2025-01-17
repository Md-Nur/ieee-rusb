import ShowContents from "@/components/ShowContents";
import Title from "@/components/Title";

const Blogs = () => {
  return (
    <div className="w-full overflow-x-auto">
      <Title>Blogs</Title>
      <ShowContents query="blog" />
    </div>
  );
};

export default Blogs;
