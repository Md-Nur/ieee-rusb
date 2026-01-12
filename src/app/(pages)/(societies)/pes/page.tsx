import ShowUsers from "@/components/ShowUsers";
import Title from "@/components/Title";
import MissionVission from "@/components/Home/MissionVission";
import About from "@/components/Home/About";
import Hero from "@/components/Home/Hero";
import RecentEvents from "@/components/Home/RecentEvents";

const PES = () => {
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

  return (
    <div className="w-full">
      <Hero slides={slides} className="rounded-[40px] overflow-hidden my-5" />
      <About 
        title="About IEEE PES RUSBC" 
        description={aboutDescription} 
        image="https://img.freepik.com/free-photo/solar-panels-wind-turbines-electricity-station-at-sunset_335224-1188.jpg"
      />
      <MissionVission vision={vision} mission={mission} />
      <RecentEvents society="power-&-energy-society" title="Events" />
      <Title>Members</Title>
      <ShowUsers query="power-&-energy-society" />
    </div>
  );
};

export default PES;
