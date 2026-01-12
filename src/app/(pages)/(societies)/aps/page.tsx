import ShowUsers from "@/components/ShowUsers";
import Title from "@/components/Title";
import MissionVission from "@/components/Home/MissionVission";
import About from "@/components/Home/About";
import Hero from "@/components/Home/Hero";
import RecentEvents from "@/components/Home/RecentEvents";

const APS = () => {
  const slides = [
    {
      image: "https://img.freepik.com/free-photo/wireless-television-antenna-sign-download_1172-230.jpg",
      title: "IEEE Antenna & Propagation Society RUSBC",
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

  return (
    <div className="w-full">
      <Hero slides={slides} className="rounded-[40px] overflow-hidden my-5" />
      <About 
        title="About IEEE APS RUSBC" 
        description={aboutDescription} 
        image="https://img.freepik.com/free-photo/wireless-television-antenna-sign-download_1172-230.jpg"
      />
      <MissionVission vision={vision} mission={mission} />
      <RecentEvents society="antenna-&-propagation-society" title="Events" />
      <Title>Members</Title>
      <ShowUsers query="antenna-&-propagation-society" />
    </div>
  );
};

export default APS;
