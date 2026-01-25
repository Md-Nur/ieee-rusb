import ShowUsers from "@/components/ShowUsers";
import Title from "@/components/Title";
import MissionVission from "@/components/Home/MissionVission";
import About from "@/components/Home/About";
import Hero from "@/components/Home/Hero";
import RecentEvents from "@/components/Home/RecentEvents";
import { getUsers } from "@/lib/user-data";
import connectDB from "@/lib/dbConnect";
import ContentModel from "@/models/content.model";
import UserModel from "@/models/user.model";
import { serializeData } from "@/lib/serialize";
import { getRecentEvents } from "@/lib/content-data";
import SocietySpeech from "@/components/Home/SocietySpeech";

export const revalidate = 3600;

export const metadata = {
  title: "Robotics & Automation Society",
  description: "Explore the cutting-edge robotics projects and automated systems developed by IEEE RAS rusbc.",
};

const RAS = async () => {
  const slides = [
    {
      image: "https://img.freepik.com/free-photo/futuristic-scene-with-high-tech-robot-used-construction-industry_23-2151329542.jpg",
      title: "IEEE Robotics & Automation Society RUSBC",
      cta: "View Members",
      link: "#members",
      secondaryText: "About Society",
      secondaryLink: "#about"
    },
  ];

  const aboutDescription = "The IEEE Robotics and Automation Society (RAS) at University of Rajshahi is dedicated to the advancement of both theory and practice in robotics and automation engineering. We bring together students who are passionate about building intelligent machines, autonomous systems, and automated solutions. Our society provides hands-on learning experiences through projects, competitions, and technical seminars.";
  const vision = "To be the primary center of excellence for robotics and automation, fostering a future where intelligent systems enhance human capabilities and improve quality of life.";
  const mission = [
    "Advance the theoretical and practical knowledge of robotics through hands-on projects and competitions.",
    "Encourage interdisciplinary collaboration between engineering fields to create innovative automated solutions.",
    "Support student research and development in robotics and automation technologies.",
    "Establish strong links with the robotics industry to provide exposure and opportunities for members."
  ];

  // Fetch Users
  const { users } = await getUsers({ query: "robotics-&-automation-society", approved: true });
  const serializedUsers = serializeData(users);

  // Fetch Events
  const serializedEvents = await getRecentEvents(3, "robotics-&-automation-society");

  return (
    <div className="w-full">
      <Hero slides={slides} className="rounded-[40px] overflow-hidden my-5" />
      <About 
        title="About IEEE RAS RUSBC" 
        description={aboutDescription} 
        image="/ras-about.png"
      />
      <MissionVission vision={vision} mission={mission} />
      <SocietySpeech society="robotics-&-automation-society" />
      {/* @ts-ignore */}
      <RecentEvents society="robotics-&-automation-society" title="Events" events={serializedEvents} />
      <Title>Members</Title>
      {/* @ts-ignore */}
      <ShowUsers query="robotics-&-automation-society" initialData={serializedUsers} />
    </div>
  );
};

export default RAS;
