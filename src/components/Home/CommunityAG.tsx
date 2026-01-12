"use client";
import Link from "next/link";
import Title from "../Title";
import { FaArrowRight, FaUsers } from "react-icons/fa";
import Image from "next/image";

const communityAndAG = [
  {
    title: "Signal Processing Society",
    desc: "Focusing on signal processing and machine learning research and development.",
    url: "/sps",
    img: "https://signalprocessingsociety.org/sites/default/files/SPS_Newsletter_slider_sized.jpg",
    color: "from-blue-600/20",
  },
  {
    title: "Robotics & Automation Society",
    desc: "Innovative research in the field of robotics and automated systems.",
    url: "/ras",
    img: "https://img.freepik.com/free-photo/futuristic-scene-with-high-tech-robot-used-construction-industry_23-2151329542.jpg",
    color: "from-red-600/20",
  },
  {
    title: "Computer Society",
    desc: "Advancing computer science and digital technology through collaboration.",
    url: "/cs",
    img: "https://img.freepik.com/free-vector/cloud-storage-realistic-concept-with-abstract-digital-globe-three-laptop-around_1284-26976.jpg",
    color: "from-green-600/20",
  },
  {
    title: "Power & Energy Society",
    desc: "Developing sustainable energy solutions and power management systems.",
    url: "/pes",
    img: "https://img.freepik.com/free-photo/wind-energy-with-wind-turbines-background_53876-124631.jpg",
    color: "from-amber-600/20",
  },
  {
    title: "Antennas & Propagation Society",
    desc: "Exploring the frontiers of wireless communication and antenna design.",
    url: "/aps",
    img: "https://img.freepik.com/free-photo/wireless-television-antenna-sign-download_1172-230.jpg",
    color: "from-purple-600/20",
  },
  {
    title: "Women In Engineering",
    desc: "Empowering women engineers and promoting diversity in technical fields.",
    url: "/wie",
    img: "https://img.freepik.com/free-photo/beautiful-girl-s-day-concept_23-2148594283.jpg",
    color: "from-pink-600/20",
  },
];

const CommunityAG = () => {
  return (
    <section id="societies" className="py-24 bg-base-100 relative overflow-hidden">
      {/* Decorative background text */}
      <div className="absolute top-10 left-0 text-9xl font-black text-base-content/5 select-none pointer-events-none -translate-x-20">
        COMMUNITIES
      </div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
             <div className="inline-flex items-center gap-2 text-secondary font-bold uppercase tracking-widest text-sm mb-4">
                <FaUsers /> Vibrant Communities
             </div>
             <Title className="!text-left !my-0 !p-0 leading-tight">
               Our Societies & Affinity Groups
             </Title>
          </div>
          <Link 
            href="/societies" 
            className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-primary/10 border border-primary/20 text-primary font-black text-xs uppercase tracking-[0.2em] hover:bg-primary hover:text-white transition-all duration-500 group shadow-lg shadow-primary/10"
          >
            Visit All Specialized Groups 
            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {communityAndAG.map((item, index) => (
            <Link
              href={item.url}
              key={index}
              className="group relative h-[420px] rounded-[3rem] overflow-hidden flex flex-col justify-end p-10 transition-all duration-700 hover:-translate-y-3 hover:shadow-2xl hover:shadow-primary/30 border border-white/10"
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image
                  src={item.img || "/ieee.jpg"}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-90 transition-opacity duration-500"></div>
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} to-transparent opacity-40 group-hover:opacity-60 transition-opacity duration-500`}></div>
              </div>

              {/* Shimmer Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer" />
              </div>

              {/* Content */}
              <div className="relative z-10 transform transition-all duration-500">
                <div className="mb-4 inline-flex px-3 py-1 bg-white/10 backdrop-blur-md rounded-lg border border-white/10 text-[10px] font-black tracking-[0.2em] text-white uppercase opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                  Society Portal
                </div>
                <h3 className="font-display text-3xl font-black text-white mb-3 group-hover:text-primary transition-colors leading-tight">
                  {item.title}
                </h3>
                <p className="text-white/70 text-sm leading-relaxed mb-8 opacity-0 group-hover:opacity-100 max-h-0 group-hover:max-h-24 transition-all duration-700 delay-100 overflow-hidden">
                  {item.desc}
                </p>
                <div className="flex items-center gap-3 text-primary font-black text-xs uppercase tracking-widest">
                  <span className="group-hover:mr-2 transition-all">Explore Innovation</span>
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30 group-hover:bg-primary group-hover:text-white transition-all">
                     <FaArrowRight className="text-[10px]" />
                  </div>
                </div>
              </div>

              {/* Decorative corner tag */}
              <div className="absolute top-8 right-8 w-14 h-14 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white/50 group-hover:text-white group-hover:bg-primary/20 group-hover:border-primary/30 transition-all duration-500 rotate-12 group-hover:rotate-0 shadow-2xl">
                 <FaUsers className="text-xl" />
              </div>

              <style jsx>{`
                @keyframes shimmer {
                  0% { transform: translateX(-100%); }
                  100% { transform: translateX(200%); }
                }
                .animate-shimmer {
                  animation: shimmer 2s infinite ease-in-out;
                }
              `}</style>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommunityAG;
