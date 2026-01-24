import Chairperson from "@/components/Home/Chairperson";
import CommunityAG from "@/components/Home/CommunityAG";
import Hero from "@/components/Home/Hero";
import MissionVission from "@/components/Home/MissionVission";
import RecentEvents from "@/components/Home/RecentEvents";
import UpcomingEvent from "@/components/Home/UpcomingEvent";
import About from "@/components/Home/About";
import Counselor from "@/components/Home/Counselor";
import connectDB from "@/lib/dbConnect";
import ContentModel from "@/models/content.model";
import UserModel from "@/models/user.model";

// Force dynamic since we depend on current date for "upcoming"
export const dynamic = "force-dynamic";

export default async function Home() {
  await connectDB();

  // Ensure models are registered to avoid MissingSchemaError if this is the first hit
  const _ = UserModel; 

  const upcomingEvent = await ContentModel.findOne({ 
    type: "event", 
    isApproved: true, 
    date: { $gte: new Date().toISOString() } 
  })
    .sort({ date: 1 })
    .lean();

  const recentEvents = await ContentModel.find({ 
    isApproved: true,
    // Logic for recent events usually implies filtering? 
    // The API `src/api/contents/route.js` handles `recent-events` query.
    // Let's replicate strict logic if possible, or just general recent contents.
    // Based on `RecentEvents.tsx` it requests `query=recent-events`.
    // We will assume "Recent Events" means approved events, sorted descending by date.
    type: "event" 
  })
    .sort({ date: -1 })
    .limit(3) // reasonable limit
    .populate("userId", "name position avatar")
    .lean();
    
    // Fix serializable errors for _id if necessary, but lean() produces POJOs usually with ObjectIDs. 
    // Next.js server components can pass simple objects. 
    // Just in case, we map _id to string if needed, but I'll try passing lean objects first.
    // Actually, MongoDB ObjectIds are not valid React props. Need to stringify.
  
  const serializedUpcoming = upcomingEvent ? {
    ...upcomingEvent,
    _id: (upcomingEvent as any)._id.toString(),
    userId: (upcomingEvent as any).userId.toString()
  } : null;

  const serializedRecent = recentEvents.map(event => ({
    ...event,
    _id: event._id.toString(),
    // @ts-ignore
    user: event.userId ? {
        // @ts-ignore
        name: event.userId.name,
        // @ts-ignore
        position: event.userId.position,
        // @ts-ignore
        avatar: event.userId.avatar,
    } : null,
    userId: (event.userId as any)?._id?.toString() || (event.userId as any)?.toString()
  }));

  return (
    <div className="">
      <Hero />
      <About image="/about-pro.png" />
      <MissionVission />
      <CommunityAG />
      {/* @ts-ignore */}
      <UpcomingEvent event={serializedUpcoming} />
      {/* @ts-ignore */}
      <RecentEvents events={serializedRecent} />
      <Counselor />
      <Chairperson />
    </div>
  );
}
