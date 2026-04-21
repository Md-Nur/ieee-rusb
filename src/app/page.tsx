import CommunityAG from "@/components/Home/CommunityAG";
import Hero from "@/components/Home/Hero";
import MissionVission from "@/components/Home/MissionVission";
import RecentEvents from "@/components/Home/RecentEvents";
import UpcomingEvent from "@/components/Home/UpcomingEvent";
import About from "@/components/Home/About";
import Advisors from "@/components/Home/Advisors";
import Counselor from "@/components/Home/Counselor";
import connectDB from "@/lib/dbConnect";
import ContentModel from "@/models/content.model";
import UserModel from "@/models/user.model";
import { getUpcomingEvent, getRecentEvents } from "@/lib/content-data";

// Force dynamic since we depend on current date for "upcoming"
// Revalidate every hour
export const revalidate = 3600;

export const metadata = {
  title: "Home",
  description: "Official website of IEEE Rajshahi University Student Branch (RUSB). Discover our mission, members, and upcoming events in the world of technology and engineering.",
};

export default async function Home() {
  await connectDB();

  // Ensure models are registered to avoid MissingSchemaError if this is the first hit
  const _ = UserModel; 

  const serializedUpcoming = await getUpcomingEvent();
  const serializedRecent = await getRecentEvents(3);

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
      <Advisors />
    </div>
  );
}
