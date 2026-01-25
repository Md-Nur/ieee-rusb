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
  
  const res = await fetch(`${baseUrl}/api/contents?query=event&approved=true&page=1&limit=9`, {
    cache: "no-store",
  });

  if (!res.ok) {
    console.error("Failed to fetch events:", res.statusText);
    return (
      <div className="w-full overflow-x-auto">
        <Title>All Events</Title>
        {/* @ts-ignore */}
        <ShowContents query="event" initialData={[]} hideIfEmpty={false} limit={9} />
      </div>
    );
  }

  const events = await res.json();

  return (
    <div className="w-full overflow-x-auto">
      <Title>All Events</Title>
      {/* @ts-ignore */}
      <ShowContents query="event" initialData={events} hideIfEmpty={false} limit={9} />
    </div>
  );
};

export default AllEvents;
