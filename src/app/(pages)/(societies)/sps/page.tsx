import ShowUsers from "@/components/ShowUsers";
import Title from "@/components/Title";
import MissionVission from "@/components/Home/MissionVission";
import About from "@/components/Home/About";
import Hero from "@/components/Home/Hero";
import RecentEvents from "@/components/Home/RecentEvents";

const SPS = () => {
  const slides = [
    {
      image: "https://signalprocessingsociety.org/sites/default/files/SPS_Newsletter_slider_sized.jpg",
      title: "IEEE Signal Processing Society RUSBC",
    },
  ];

  const aboutDescription = "The IEEE Signal Processing Society (SPS) at University of Rajshahi is the world’s premier professional association for signal processing engineers and industry professionals. We focus on the theory and application of filtering, coding, transmitting, estimating, detecting, analyzing, recognizing, synthesizing, recording, and reproducing signals by digital or analog devices or techniques.";
  const vision = "To lead the way in signal processing innovation, enabling the transformation of data into meaningful information that drives the digital world.";
  const mission = [
    "Promote understanding and application of signal processing techniques in diverse engineering fields.",
    "Organize technical talks and training sessions on digital signal processing, speech, and image processing.",
    "Encourage student engagement in research and development of signal processing applications.",
    "Provide a platform for members to share knowledge and stay updated with emerging signal processing trends."
  ];

  return (
    <div className="w-full">
      <Hero slides={slides} className="rounded-[40px] overflow-hidden my-5" />
      <About 
        title="About IEEE SPS RUSBC" 
        description={aboutDescription} 
        image="/sps-about.png"
      />
      <MissionVission vision={vision} mission={mission} />
      <RecentEvents society="signal-processing-society" title="Events" />
      <Title>Members</Title>
      <ShowUsers query="signal-processing-society" />
    </div>
  );
};

export default SPS;
