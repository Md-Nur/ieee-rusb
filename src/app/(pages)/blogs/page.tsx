import ShowContents from "@/components/ShowContents";
import Title from "@/components/Title";
import connectDB from "@/lib/dbConnect";
import ContentModel from "@/models/content.model";
import UserModel from "@/models/user.model";

export const dynamic = "force-dynamic";

const Blogs = async () => {
  await connectDB();
  const _ = UserModel; // Ensure registration

  const blogs = await ContentModel.find({ 
    type: "blog", 
    isApproved: true 
  })
  .sort({ date: -1 })
  .populate("userId", "name avatar position")
  .lean();

  const serializedBlogs = blogs.map(blog => ({
    ...blog,
    _id: blog._id.toString(),
    userId: (blog.userId as any)?._id?.toString() || (blog.userId as any)?.toString(),
    user: blog.userId ? {
        name: (blog.userId as any).name,
        avatar: (blog.userId as any).avatar,
        position: (blog.userId as any).position,
    } : null
  }));

  return (
    <div className="w-full overflow-x-auto">
      <Title>Blogs</Title>
      {/* @ts-ignore */}
      <ShowContents query="blog" initialData={serializedBlogs} hideIfEmpty={false} />
    </div>
  );
};

export default Blogs;
