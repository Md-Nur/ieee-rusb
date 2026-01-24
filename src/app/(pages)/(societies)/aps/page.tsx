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

export const dynamic = "force-dynamic";

const APS = async () => {
  const slides = [
    {
      image: "https://img.freepik.com/free-photo/wireless-television-antenna-sign-download_1172-230.jpg",
      title: "IEEE Antenna & Propagation Society RUSBC",
      cta: "View Members",
      link: "#members",
      secondaryText: "About Society",
      secondaryLink: "#about"
    },
  ];

  const aboutDescription = "The IEEE Antennas and Propagation Society (APS) at University of Rajshahi is an international organization dedicated to the study of the theory and application of antennas, electromagnetics, and wave propagation. We provide a platform for students to explore the fundamental principles and advanced concepts in RF and microwave engineering, preparing them for the next generation of wireless communication technologies.";
  const vision = "To excel in the study of electromagnetics, antennas, and wave propagation, enabling the next generation of wireless communication technologies.";
  const mission = [
    "Provide a deep understanding of antenna theory and propagation through specialized workshops and design projects.",
    "Facilitate research and innovation in RF and microwave engineering among student members.",
    "Connect members with experts and resources in the field of wireless communication.",
    "Support participation in international antenna design competitions and symposiums."
  ];

  // Fetch Users
  const { users } = await getUsers({ query: "antenna-&-propagation-society", approved: true });
  const serializedUsers = serializeData(users);

  // Fetch Events
  await connectDB();
  const _ = UserModel;
  const events = await ContentModel.find({ 
    society: "antenna-&-propagation-society",
    type: "event",
    isApproved: true
  })
  .sort({ date: -1 })
  .limit(3)
  .populate("userId", "name avatar position")
  .lean();

  const serializedEvents = serializeData(events.map(event => ({
    ...event,
    user: event.userId && typeof event.userId === 'object' ? event.userId : null,
    userId: (event.userId as any)?._id?.toString() || (event.userId as any)?.toString() || ""
  })));

  return (
    <div className="w-full">
      <Hero slides={slides} className="rounded-[40px] overflow-hidden my-5" />
      <About 
        title="About IEEE APS RUSBC" 
        description={aboutDescription} 
        image="https://img.freepik.com/free-photo/wireless-television-antenna-sign-download_1172-230.jpg"
      />
      <MissionVission vision={vision} mission={mission} />
      {/* @ts-ignore */}
      <RecentEvents society="antenna-&-propagation-society" title="Events" events={serializedEvents} />
      <Title>Members</Title>
      {/* @ts-ignore */}
      <ShowUsers query="antenna-&-propagation-society" initialData={serializedUsers} />
    </div>
  );
};

export default APS;
