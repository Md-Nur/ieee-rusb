import ShowUsers from "@/components/ShowUsers";
import Title from "@/components/Title";
import MissionVission from "@/components/Home/MissionVission";
import About from "@/components/Home/About";
import Hero from "@/components/Home/Hero";
import RecentEvents from "@/components/Home/RecentEvents";

const WIE = () => {
  const slides = [
    {
      image: "https://img.freepik.com/free-photo/beautiful-girl-s-day-concept_23-2148594283.jpg",
      title: "IEEE Women In Engineering RUSBC",
    },
  ];

  const aboutDescription = "The IEEE Women in Engineering (WIE) at University of Rajshahi is one of the largest international professional organizations dedicated to promoting women engineers and scientists, and inspiring girls around the world to follow their academic interests in a career in engineering and science. Our society provides a supportive community for women in STEM through networking, mentorship, and professional development programs.";
  const vision = "To create a diverse and inclusive engineering community where women are empowered to lead, innovate, and thrive in technical careers.";
  const mission = [
    "Support and encourage women students to pursue and excel in engineering and technology.",
    "Organize leadership development programs and mentorship opportunities tailored for women in STEM.",
    "Foster a supportive network that promotes gender equality and diversity in the engineering profession.",
    "Cleanse the path for women engineers through community outreach and professional networking events."
  ];

  return (
    <div className="w-full">
      <Hero slides={slides} className="rounded-[40px] overflow-hidden my-5" />
      <About 
        title="About IEEE WIE RUSBC" 
        description={aboutDescription} 
        image="/wie-about.png"
      />
      <MissionVission vision={vision} mission={mission} />
      <RecentEvents society="women-in-engineering-society" title="Events" />
      <Title>Members</Title>
      <ShowUsers query="women-in-engineering-society" />
    </div>
  );
};

export default WIE;
