import Chairperson from "@/components/Home/Chairperson";
import CommunityAG from "@/components/Home/CommunityAG";
import Hero from "@/components/Home/Hero";
import MissionVission from "@/components/Home/MissionVission";
import RecentEvents from "@/components/Home/RecentEvents";
import UpcomingEvent from "@/components/Home/UpcomingEvent";

export default function Home() {
  return (
    <div className="">
      <Hero />
      <MissionVission />
      <CommunityAG />
      <UpcomingEvent />
      <RecentEvents />
      <Chairperson />
    </div>
  );
}
