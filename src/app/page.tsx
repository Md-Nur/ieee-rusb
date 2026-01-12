import Chairperson from "@/components/Home/Chairperson";
import CommunityAG from "@/components/Home/CommunityAG";
import Hero from "@/components/Home/Hero";
import MissionVission from "@/components/Home/MissionVission";
import RecentEvents from "@/components/Home/RecentEvents";
import UpcomingEvent from "@/components/Home/UpcomingEvent";
import About from "@/components/Home/About";
import Counselor from "@/components/Home/Counselor";

export default function Home() {
  return (
    <div className="">
      <Hero />
      <About image="/about-pro.png" />
      <MissionVission />
      <CommunityAG />
      <UpcomingEvent />
      <RecentEvents />
      <Counselor />
      <Chairperson />
    </div>
  );
}
