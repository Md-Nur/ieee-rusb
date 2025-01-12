import Link from "next/link";
import Title from "../Title";

const communityAndAG = [
  {
    title: "Signal Processing Society",
    desc: "Signal Processing Society (SPS) is a society that focuses on signal processing and machine learning. It is a society that is very active in the field of research and development.",
    url: "/sps",
  },
  {
    title: "Power & Energy Society",
    desc: "Power & Energy Society (PES) is a society that focuses on power and energy. It is a society that is very active in the field of research and development.",
    url: "/pes",
  },
  {
    title: "Robotics & Automation Society",
    desc: "Robotics & Automation Society (RAS) is a society that focuses on robotics and automation. It is a society that is very active in the field of research and development.",
    url: "/ras",
  },
  {
    title: "Computer Society",
    desc: "Computer Society (CS) is a society that focuses on computer science and technology. It is a society that is very active in the field of research and development.",
    url: "/cs",
  },
  {
    title: "Antenna & Propagation Society",
    desc: "Antenna & Propagation Society (APS) is a society that focuses on antenna and propagation. It is a society that is very active in the field of research and development.",
    url: "/aps",
  },
  {
    title: "Woman IN Engineering Society",
    desc: "Woman IN Engineering Society (WIE) is a society. It is a society that is very active in the field of research and development.",
    url: "/wie",
  },
];

const CommunityAG = () => {
  return (
    <section className="max-w-7xl mx-auto px-1 md:px-10 my-3">
      <Title>Our Community & AG</Title>
      <div className="flex flex-wrap gap-5 justify-between">
        {communityAndAG.map((item, index) => (
          <div
            className="card bg-accent text-accent-content w-72 md:w-96"
            key={index}
          >
            <div className="card-body">
              <h2 className="card-title">{item.title}</h2>
              <p>{item.desc}</p>
              <div className="card-actions justify-end">
                <Link href={item.url} className="btn">
                  Buy Now
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CommunityAG;
