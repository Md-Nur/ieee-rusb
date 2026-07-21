import ShowUsers from "@/components/ShowUsers"
import Title from "@/components/Title"

export const metadata = {
  title: "Computer Society",
  description: "The IEEE Computer Society at RUSB is the community for computing professionals and student enthusiasts. Join us for technical workshops, innovation in software engineering, and the latest trends in computer science.",
};

import RecentEvents from "@/components/Home/RecentEvents";
import UpcomingEvent from "@/components/Home/UpcomingEvent";
import SocietyAdvisor from "@/components/Home/SocietyAdvisor";
import Hero from "@/components/Home/Hero";

import MissionVission from "@/components/Home/MissionVission";
import About from "@/components/Home/About";
import { getUsers } from "@/lib/user-data";
import connectDB from "@/lib/dbConnect";
import ContentModel from "@/models/content.model";
import UserModel from "@/models/user.model";
import { serializeData } from "@/lib/serialize";
import { getRecentEvents, getUpcomingEvent } from "@/lib/content-data";
import SocietySpeech from "@/components/Home/SocietySpeech";

export const revalidate = 3600;

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
  const { users } = await getUsers({ query: "cs", approved: true });
  const serializedUsers = serializeData(users);

  // Fetch Events
  const serializedEvents = await getRecentEvents(3, "cs");
  const serializedUpcoming = await getUpcomingEvent("cs");

  return (
    <div className="w-full">
      <Hero slides={slides} className="rounded-[40px] overflow-hidden my-5" />
      <About 
        title="About IEEE Computer Society RUSBC" 
        description={aboutDescription} 
        image="https://img.freepik.com/free-photo/standard-quality-control-concept-m_23-2150041851.jpg"
      />
      <MissionVission vision={vision} mission={mission} />
      <SocietySpeech society="cs" />
      <SocietyAdvisor society="cs" />
      {/* @ts-ignore */}
      <UpcomingEvent society="cs" event={serializedUpcoming} />
      {/* @ts-ignore */}
      <RecentEvents society="cs" title="Events" events={serializedEvents} />
      <Title>Members</Title>
      {/* @ts-ignore */}
      <ShowUsers query="cs" initialData={serializedUsers} />
    </div>
  )
}

export default CS