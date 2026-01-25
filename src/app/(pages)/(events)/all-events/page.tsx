import ShowContents from "@/components/ShowContents";
import Title from "@/components/Title";

export const metadata = {
  title: "All Events",
  description: "Explore all the workshops, seminars, and competitions organized by IEEE Rajshahi University Student Branch.",
};

export const dynamic = "force-dynamic";

const AllEvents = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_URL?.startsWith("http") 
    ? process.env.NEXT_PUBLIC_URL 
    : `http://${process.env.NEXT_PUBLIC_URL}`;
  
  const res = await fetch(`${baseUrl}/api/contents?query=event&approved=true`, {
    cache: "no-store",
  });

  if (!res.ok) {
    console.error("Failed to fetch events:", res.statusText);
    return (
      <div className="w-full overflow-x-auto">
        <Title>All Events</Title>
        {/* @ts-ignore */}
        <ShowContents query="" initialData={[]} hideIfEmpty={false} />
      </div>
    );
  }

  const events = await res.json();

  return (
    <div className="w-full overflow-x-auto">
      <Title>All Events</Title>
      {/* @ts-ignore */}
      <ShowContents query="" initialData={events} hideIfEmpty={false} />
    </div>
  );
};

export default AllEvents;
