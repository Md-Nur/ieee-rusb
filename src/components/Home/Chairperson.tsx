"use client";
import { Users } from "@/models/user.model";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaLinkedin, FaEnvelope, FaQuoteLeft, FaUserTie } from "react-icons/fa";
import { toast } from "react-toastify";
import Title from "../Title";

const Chairperson = () => {
  const [chair, setChair] = useState<Users | null>(null);

  useEffect(() => {
    axios
      .get("/api/users?position=Chairperson")
      .then((res) => {
        const users = Array.isArray(res.data) ? res.data : [];
        setChair(users.find((user: Users) => user.name === "Md. Mutasim Billah") || users[0] || null);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.error || "Something went wrong fetching Chairperson");
      });
  }, []);

  if (!chair) return null;

  return (
    <section className="py-24 bg-base-200/50">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col items-center mb-16">
          <div className="inline-flex items-center gap-2 text-secondary font-bold uppercase tracking-widest text-sm mb-4">
             <FaUserTie /> Student Leadership
          </div>
          <Title className="!my-0 !p-0">Vision of the Chairperson</Title>
        </div>

        <div className="relative group max-w-5xl mx-auto">
          {/* Decorative background shape */}
          <div className="absolute inset-0 bg-secondary/5 rounded-[3rem] rotate-1 group-hover:rotate-0 transition-transform duration-500"></div>
          
          <div className="relative bg-base-100 shadow-2xl rounded-[3rem] overflow-hidden flex flex-col lg:flex-row-reverse items-center transition-all duration-500 hover:shadow-secondary/10">
            {/* Image Section */}
            <div className="lg:w-2/5 relative h-[400px] lg:h-[500px] w-full">
              <Image
                src={chair?.avatar || "/billaVai.jpg"}
                alt="Chairperson"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 right-6 flex gap-3">
                  {chair.linkedin && (
                    <a 
                      href={chair.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn btn-circle btn-sm bg-white/20 backdrop-blur-md border-none text-white hover:bg-secondary transition-colors"
                    >
                      <FaLinkedin />
                    </a>
                  )}
                 {chair.email && (
                   <a href={`mailto:${chair.email}`} className="btn btn-circle btn-sm bg-white/20 backdrop-blur-md border-none text-white hover:bg-secondary transition-colors">
                     <FaEnvelope />
                   </a>
                 )}
              </div>
            </div>

            {/* Text Section */}
            <div className="lg:w-3/5 p-8 md:p-12 space-y-6">
              <div className="relative">
                <FaQuoteLeft className="text-secondary/20 text-5xl absolute -top-4 -left-4" />
                <div className="relative z-10 space-y-4">
                  <p className="text-lg leading-relaxed text-base-content/80 text-justify">
                    "The IEEE Rajshahi University Student Branch (RUSB), founded in July 2017, serves as a cornerstone for technical excellence and professional development."
                  </p>
                  <p className="text-sm leading-relaxed text-base-content/60 text-justify">
                    Our purpose is to bridge the worlds of academia and industry, helping students learn from faculty members, seasoned professionals, and fellow innovators. As Chairperson, I am committed to fostering an environment where every member can transform their ideas into impactful realities.
                  </p>
                </div>
              </div>

              <div className="pt-8 border-t border-base-content/10">
                <h3 className="text-3xl font-black text-secondary">{chair?.name}</h3>
                <p className="text-lg font-bold opacity-60 uppercase tracking-widest">{chair?.position || "Chairperson"}</p>
                <p className="text-xs font-medium opacity-40 mt-1 uppercase tracking-tighter">IEEE RU SB | Session {chair?.session}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Chairperson;
