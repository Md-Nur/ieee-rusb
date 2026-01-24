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

export const dynamic = "force-dynamic";

const PES = async () => {
  const slides = [
    {
      image: "https://img.freepik.com/free-photo/wind-energy-with-wind-turbines-background_53876-124631.jpg",
      title: "IEEE Power & Energy Society RUSBC",
    },
  ];

  const aboutDescription = "The IEEE Power & Energy Society (PES) at University of Rajshahi provides the world's largest forum for sharing the latest in technological developments in the electric power industry. We are committed to educating our members on the transition toward sustainable, reliable, and efficient power systems. Our society offers a platform for students to engage with industry experts and contribute to solving global energy challenges.";
  const vision = "To be the leading voice in the transition towards sustainable, reliable, and efficient power and energy systems for the benefit of society.";
  const mission = [
    "Educate members on the latest advancements in power systems, renewable energy, and smart grid technologies.",
    "Foster a community of professionals dedicated to solving global energy challenges.",
    "Provide opportunities for students to learn from industry experts through field visits and technical seminars.",
    "Promote sustainable energy practices and support the development of clean energy solutions."
  ];

  // Fetch Users
  const { users } = await getUsers({ query: "power-&-energy-society", approved: true });
  const serializedUsers = users.map((u: any) => ({
    ...u,
    _id: u._id.toString(),
  }));

  // Fetch Events
  await connectDB();
  const _ = UserModel;
  const events = await ContentModel.find({ 
    society: "power-&-energy-society",
    type: "event",
    isApproved: true
  })
  .sort({ date: -1 })
  .limit(3)
  .populate("userId", "name avatar position")
  .lean();

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
    <div className="w-full">
      <Hero slides={slides} className="rounded-[40px] overflow-hidden my-5" />
      <About 
        title="About IEEE PES RUSBC" 
        description={aboutDescription} 
        image="https://img.freepik.com/free-photo/solar-panels-wind-turbines-electricity-station-at-sunset_335224-1188.jpg"
      />
      <MissionVission vision={vision} mission={mission} />
      {/* @ts-ignore */}
      <RecentEvents society="power-&-energy-society" title="Events" events={serializedEvents} />
      <Title>Members</Title>
      {/* @ts-ignore */}
      <ShowUsers query="power-&-energy-society" initialData={serializedUsers} />
    </div>
  );
};

export default PES;
