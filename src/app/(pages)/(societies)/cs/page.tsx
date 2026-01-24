import ShowUsers from "@/components/ShowUsers"
import Title from "@/components/Title"

import RecentEvents from "@/components/Home/RecentEvents";
import Hero from "@/components/Home/Hero";

import MissionVission from "@/components/Home/MissionVission";
import About from "@/components/Home/About";
import { getUsers } from "@/lib/user-data";
import connectDB from "@/lib/dbConnect";
import ContentModel from "@/models/content.model";
import UserModel from "@/models/user.model";
import { serializeData } from "@/lib/serialize";

export const dynamic = "force-dynamic";

const CS = async () => {
  const slides = [
    {
      image: "https://img.freepik.com/free-vector/cloud-storage-realistic-concept-with-abstract-digital-globe-three-laptop-around_1284-26976.jpg",
      title: "IEEE Computer Society RUSBC",
      cta: "View Members",
      link: "#members",
      secondaryText: "About Society",
      secondaryLink: "#about"
    },
  ];

  const aboutDescription = "The IEEE Computer Society (CS) at University of Rajshahi is the premier organization for computing professionals and students. We are dedicated to the advancement of the theory and practice of computer science and technology. Our community provides a platform for members to enhance their technical skills, network with industry experts, and stay informed about the latest trends in the computing world.";
  const vision = "To be the global leader in the field of computer science and technology, driving innovation that empowers professionals and students to solve complex real-world challenges.";
  const mission = [
    "Develop a robust community of computing enthusiasts through technical workshops and seminars.",
    "Provide access to the latest research and developments in computer science and engineering.",
    "Cultivate professional growth and leadership among members in the computing industry.",
    "Promote ethical standards and excellence in computer science education and practice."
  ];

  // Fetch Users
  const { users } = await getUsers({ query: "computer-society", approved: true });
  const serializedUsers = serializeData(users);

  // Fetch Events
  await connectDB();
  const _ = UserModel;
  const events = await ContentModel.find({ 
    society: "computer-society",
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
        title="About IEEE Computer Society RUSBC" 
        description={aboutDescription} 
        image="https://img.freepik.com/free-photo/standard-quality-control-concept-m_23-2150041851.jpg"
      />
      <MissionVission vision={vision} mission={mission} />
      {/* @ts-ignore */}
      <RecentEvents society="computer-society" title="Events" events={serializedEvents} />
      <Title>Members</Title>
      {/* @ts-ignore */}
      <ShowUsers query="computer-society" initialData={serializedUsers} />
    </div>
  )
}

export default CS