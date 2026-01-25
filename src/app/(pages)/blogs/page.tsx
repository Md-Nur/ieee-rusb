import ShowContents from "@/components/ShowContents";
import Title from "@/components/Title";

export const metadata = {
  title: "Blogs",
  description: "Read technical articles, experience sharing, and insights from the members of IEEE RUSB.",
};

export const dynamic = "force-dynamic";

const Blogs = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_URL?.startsWith("http") 
    ? process.env.NEXT_PUBLIC_URL 
    : `http://${process.env.NEXT_PUBLIC_URL}`;
  
  const res = await fetch(`${baseUrl}/api/contents?query=blog&approved=true`, {
    cache: "no-store",
  });

  if (!res.ok) {
    console.error("Failed to fetch blogs:", res.statusText);
    return (
      <div className="w-full overflow-x-auto">
        <Title>Blogs</Title>
        {/* @ts-ignore */}
        <ShowContents query="blog" initialData={[]} hideIfEmpty={false} />
      </div>
    );
  }

  const blogs = await res.json();

  return (
    <div className="w-full overflow-x-auto">
      <Title>Blogs</Title>
      {/* @ts-ignore */}
      <ShowContents query="blog" initialData={blogs} hideIfEmpty={false} />
    </div>
  );
};

export default Blogs;
