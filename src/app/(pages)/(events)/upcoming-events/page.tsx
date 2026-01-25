import ShowContents from "@/components/ShowContents";
import Title from "@/components/Title";

export const metadata = {
  title: "Upcoming Events",
  description: "Register for the latest workshops and technical seminars organized by IEEE RUSB.",
};

export const dynamic = "force-dynamic";

const UpcomingEvents = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_URL?.startsWith("http") 
    ? process.env.NEXT_PUBLIC_URL 
    : `http://${process.env.NEXT_PUBLIC_URL}`;
  
  const res = await fetch(`${baseUrl}/api/contents?query=upcoming-events&approved=true`, {
    cache: "no-store",
  });

  if (!res.ok) {
    console.error("Failed to fetch upcoming events:", res.statusText);
    return (
      <div className="w-full overflow-x-auto">
        <Title>Upcoming Events</Title>
        {/* @ts-ignore */}
        <ShowContents query="upcoming-events" initialData={[]} hideIfEmpty={false} />
      </div>
    );
  }

  const events = await res.json();

  return (
    <div className="w-full overflow-x-auto">
      <Title>Upcoming Events</Title>
      {/* @ts-ignore */}
      <ShowContents query="upcoming-events" initialData={events} hideIfEmpty={false} />
    </div>
  );
};

export default UpcomingEvents;
