import ShowContents from "@/components/ShowContents";
import Title from "@/components/Title";
import connectDB from "@/lib/dbConnect";
import ContentModel from "@/models/content.model";
import UserModel from "@/models/user.model";

export const dynamic = "force-dynamic";

const UpcomingEvents = async () => {
  await connectDB();
  const _ = UserModel;

  const events = await ContentModel.find({ 
    type: "event", 
    isApproved: true,
    date: { $gte: new Date().toISOString().split("T")[0] } // Simple string comparison for dates YYYY-MM-DD
  })
  .sort({ date: 1 }) // Upcoming specific sort? Usually ascending (soonest first)
  .populate("userId", "name avatar position")
  .lean();
  
  // Note: Home page UpcomingEvent sorted ascending. 
  // API logic for "upcoming-events" (plural) sorted descending in general pipeline but had speical logic?
  // API logic for "upcoming-events": pipeline = [... match parsedDate >= today ...]
  // And standard sort was date: -1.
  // Wait, usually upcoming events should be sorted ascending (soonest first).
  // But standard API sort is -1.
  // Let's stick to -1 (newest created? No, date of event).
  // If I want soonest first, it should be 1.
  // But if the previous API returned them in -1, I should check.
  // API `contents/route.ts` line 45: `pipeline = [{ $sort: { date: -1 } }]`.
  // Then it filters.
  // So it was returning upcoming events sorted by date descending (furthest future first?).
  // That seems odd for "Upcoming".
  // But for "Recent" it limits to 3.
  // Let's stick to descending if that's what API did, OR improve it to Ascending?
  // User asked for SSR/SEO, not logic change. I'll stick to -1 to be safe, or 1 if it makes more sense.
  // Actually, checking API again:
  // query="upcoming-event" (singular) -> sorts date: 1, limit 1.
  // query="upcoming-events" (plural) -> just adds filter >= today. Retains initial sort -1?
  // Yes.
  // I will keep sort -1.

  const serializedEvents = events.map(event => ({
    ...event,
    _id: event._id.toString(),
    userId: (event.userId as any)?._id?.toString() || (event.userId as any)?.toString(),
    user: event.userId ? {
        name: (event.userId as any).name,
        avatar: (event.userId as any).avatar,
        position: (event.userId as any).position,
    } : null
  }));

  return (
    <div className="w-full overflow-x-auto">
      <Title>Upcoming Events</Title>
      {/* @ts-ignore */}
      <ShowContents query="upcoming-events" initialData={serializedEvents} hideIfEmpty={false} />
    </div>
  );
};

export default UpcomingEvents;
