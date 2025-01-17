import Link from "next/link";
import Title from "../Title";

const communityAndAG = [
  {
    title: "Robotics & Automation Society",
    desc: "Robotics & Automation Society (RAS) is a society that focuses on robotics and automation. It is a society that is very active in the field of research and development.",
    url: "/ras",
    img: "https://img.freepik.com/free-photo/futuristic-scene-with-high-tech-robot-used-construction-industry_23-2151329542.jpg",
  },
  {
    title: "Signal Processing Society",
    desc: "Signal Processing Society (SPS) is a society that focuses on signal processing and machine learning. It is a society that is very active in the field of research and development.",
    url: "/sps",
    img: "https://signalprocessingsociety.org/sites/default/files/SPS_Newsletter_slider_sized.jpg",
  },
  {
    title: "Power & Energy Society",
    desc: "Power & Energy Society (PES) is a society that focuses on power and energy. It is a society that is very active in the field of research and development.",
    url: "/pes",
    img: "https://img.freepik.com/free-photo/wind-energy-with-wind-turbines-background_53876-124631.jpg",
  },
  {
    title: "Computer Society",
    desc: "Computer Society (CS) is a society that focuses on computer science and technology. It is a society that is very active in the field of research and development.",
    url: "/cs",
    img: "https://img.freepik.com/free-vector/cloud-storage-realistic-concept-with-abstract-digital-globe-three-laptop-around_1284-26976.jpg",
  },
  {
    title: "Antenna & Propagation Society",
    desc: "Antenna & Propagation Society (APS) is a society that focuses on antenna and propagation. It is a society that is very active in the field of research and development.",
    url: "/aps",
    img: "https://img.freepik.com/free-photo/wireless-television-antenna-sign-download_1172-230.jpg",
  },
  {
    title: "Women In Engineering Society",
    desc: "Women IN Engineering Society (WIE) is a society. It is a society that is very active in the field of research and development.",
    url: "/wie",
    img: "https://img.freepik.com/free-photo/beautiful-girl-s-day-concept_23-2148594283.jpg",
  },
];

const CommunityAG = () => {
  return (
    <section className="max-w-7xl mx-auto px-1 md:px-10 my-3">
      <Title>Our Community & AG</Title>
      <div className="flex flex-wrap gap-5 justify-between">
        {communityAndAG.map((item, index) => (
          <Link
            href={item.url}
            className="card w-72 md:w-96 mx-auto h-72"
            key={index}
            style={{
              backgroundImage: `url(${item.img || "/ieee.jpg"})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="card-body bg-[#0000008a] text-white rounded-2xl w-full h-full flex justify-center items-center">
              <h2 className="card-title text-[1.65rem] text-center shadow font-bold hover:text-accent">
                {item.title}
              </h2>
              {/* <p className="text-justify">{item.desc}</p> */}
              {/* <div className="card-actions justify-end">
                <Link href={item.url} className="btn">
                  Explore More
                </Link>
              </div> */}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CommunityAG;
