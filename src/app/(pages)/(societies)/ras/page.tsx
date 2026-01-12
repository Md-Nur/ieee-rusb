import ShowUsers from "@/components/ShowUsers";
import Title from "@/components/Title";
import MissionVission from "@/components/Home/MissionVission";
import About from "@/components/Home/About";
import Hero from "@/components/Home/Hero";
import RecentEvents from "@/components/Home/RecentEvents";

const RAS = () => {
  const slides = [
    {
      image: "https://img.freepik.com/free-photo/futuristic-scene-with-high-tech-robot-used-construction-industry_23-2151329542.jpg",
      title: "IEEE Robotics & Automation Society RUSBC",
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

  return (
    <div className="w-full">
      <Hero slides={slides} className="rounded-[40px] overflow-hidden my-5" />
      <About 
        title="About IEEE RAS RUSBC" 
        description={aboutDescription} 
        image="/ras-about.png"
      />
      <MissionVission vision={vision} mission={mission} />
      <RecentEvents society="robotics-&-automation-society" title="Events" />
      <Title>Members</Title>
      <ShowUsers query="robotics-&-automation-society" />
    </div>
  );
};

export default RAS;
