"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import Title from "@/components/Title";
import { FaArrowRight, FaUsers, FaAtom, FaMicrochip, FaBolt, FaSatelliteDish, FaFemale, FaProjectDiagram } from "react-icons/fa";

const societies = [
  {
    title: "Signal Processing Society",
    short: "IEEE SPS RUSB Chapter",
    desc: "Focusing on signal processing and machine learning research and development.",
    url: "/sps",
    img: "https://signalprocessingsociety.org/sites/default/files/SPS_Newsletter_slider_sized.jpg",
    color: "bg-blue-600",
    icon: <FaAtom />,
  },
  {
    title: "Robotics & Automation Society",
    short: "IEEE RAS RUSB Chapter",
    desc: "Innovative research in the field of robotics and automated systems.",
    url: "/ras",
    img: "https://img.freepik.com/free-photo/futuristic-scene-with-high-tech-robot-used-construction-industry_23-2151329542.jpg",
    color: "bg-red-600",
    icon: <FaProjectDiagram />,
  },
  {
    title: "Computer Society",
    short: "IEEE CS RUSB Chapter",
    desc: "Advancing computer science and digital technology through collaboration.",
    url: "/cs",
    img: "https://img.freepik.com/free-vector/cloud-storage-realistic-concept-with-abstract-digital-globe-three-laptop-around_1284-26976.jpg",
    color: "bg-green-600",
    icon: <FaMicrochip />,
  },
  {
    title: "Power & Energy Society",
    short: "IEEE PES RUSB Chapter",
    desc: "Developing sustainable energy solutions and power management systems.",
    url: "/pes",
    img: "https://img.freepik.com/free-photo/wind-energy-with-wind-turbines-background_53876-124631.jpg",
    color: "bg-amber-600",
    icon: <FaBolt />,
  },
  {
    title: "Antennas & Propagation Society",
    short: "IEEE AP-S RUSB Chapter",
    desc: "Exploring the frontiers of wireless communication and antenna design.",
    url: "/aps",
    img: "https://img.freepik.com/free-photo/wireless-television-antenna-sign-download_1172-230.jpg",
    color: "bg-purple-600",
    icon: <FaSatelliteDish />,
  },
  {
    title: "Women In Engineering",
    short: "IEEE WIE RUSB AG",
    desc: "Empowering women engineers and promoting diversity in technical fields.",
    url: "/wie",
    img: "https://img.freepik.com/free-photo/beautiful-girl-s-day-concept_23-2148594283.jpg",
    color: "bg-pink-600",
    icon: <FaFemale />,
  },
];

const SocietiesList = () => {
  return (
    <div className="min-h-screen bg-base-100 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-20 space-y-4">
           <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary font-bold text-sm tracking-widest uppercase mb-4">
              <FaUsers /> Innovation Hubs
           </div>
           <Title className="!my-0 !p-0">Specialized Groups</Title>
           <p className="text-base-content/60 max-w-2xl font-medium">
             Our societies and affinity groups represent the core of our technical excellence, 
             fostering specialized knowledge and professional growth across diverse engineering disciplines.
           </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {societies.map((soc, index) => (
            <Link
              key={index}
              href={soc.url}
              className="group relative h-[450px] rounded-[3rem] overflow-hidden flex flex-col justify-end p-8 border border-base-content/5 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20"
            >
              <div className="absolute inset-0 z-0">
                <Image
                  src={soc.img}
                  alt={soc.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
              </div>

              <div className="relative z-10 space-y-4">
                <div className={`w-12 h-12 ${soc.color} rounded-2xl flex items-center justify-center text-white text-xl shadow-lg transform group-hover:-rotate-12 transition-transform duration-500`}>
                  {soc.icon}
                </div>
                <div>
                   <h3 className="text-white text-2xl font-black leading-tight mb-1 group-hover:text-primary transition-colors">
                     {soc.title}
                   </h3>
                   <p className="text-primary text-[10px] font-bold uppercase tracking-widest">{soc.short}</p>
                </div>
                <p className="text-white/60 text-sm line-clamp-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                  {soc.desc}
                </p>
                <div className="flex items-center gap-2 text-white font-bold text-xs pt-4">
                   View Portal <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors pointer-events-none" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SocietiesList;
