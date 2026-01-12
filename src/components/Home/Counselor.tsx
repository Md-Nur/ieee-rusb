"use client";
import { Users } from "@/models/user.model";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaLinkedin, FaEnvelope, FaPhone, FaQuoteLeft, FaGraduationCap } from "react-icons/fa";
import { toast } from "react-toastify";
import Title from "../Title";

const Counselor = () => {
  const [counselor, setCounselor] = useState<Users | null>(null);

  useEffect(() => {
    axios
      .get("/api/users?position=Counselor")
      .then((res) => {
        const users = Array.isArray(res.data) ? res.data : [];
        setCounselor(users.find((user: Users) => user.name === "Dr. Foez Ahmed") || users[0] || null);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.error || "Something went wrong fetching Counselor");
      });
  }, []);

  if (!counselor) return null;

  return (
    <section className="py-24 bg-base-100">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col items-center mb-16">
          <div className="inline-flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-sm mb-4">
             <FaGraduationCap /> Faculty Leadership
          </div>
          <Title className="!my-0 !p-0">Message from Branch Counselor</Title>
        </div>

        <div className="relative group max-w-5xl mx-auto">
          {/* Decorative background shape */}
          <div className="absolute inset-0 bg-primary/5 rounded-[3rem] -rotate-1 group-hover:rotate-0 transition-transform duration-500"></div>
          
          <div className="relative bg-base-200 shadow-2xl rounded-[3rem] overflow-hidden flex flex-col lg:flex-row items-center transition-all duration-500 hover:shadow-primary/10">
            {/* Image Section */}
            <div className="lg:w-2/5 relative h-[400px] lg:h-[450px] w-full">
              <Image
                src={counselor?.avatar || "/foez_ahmed.jpg"}
                alt={counselor.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 flex gap-3">
                  {counselor.linkedin && (
                    <a 
                      href={counselor.linkedin} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-circle btn-sm bg-white/20 backdrop-blur-md border-none text-white hover:bg-primary transition-colors"
                    >
                      <FaLinkedin />
                    </a>
                  )}
                 {counselor.email && (
                   <a href={`mailto:${counselor.email}`} className="btn btn-circle btn-sm bg-white/20 backdrop-blur-md border-none text-white hover:bg-primary transition-colors">
                     <FaEnvelope />
                   </a>
                 )}
              </div>
            </div>

            {/* Quote/Text Section */}
            <div className="lg:w-3/5 p-8 md:p-12 space-y-8">
              <div className="relative">
                <FaQuoteLeft className="text-primary/20 text-6xl absolute -top-4 -left-4" />
                <p className="relative z-10 text-xl md:text-2xl font-medium text-base-content/80 leading-relaxed italic">
                  "{counselor.name} is a dedicated Branch Counselor for IEEE RUSB. Under his visionary guidance, our branch has evolved into a powerhouse of technical innovation and student leadership at the University of Rajshahi.
                </p>
              </div>

              <div className="pt-8 border-t border-base-content/10">
                <h3 className="text-3xl font-black text-primary">{counselor.name}</h3>
                <p className="text-lg font-bold opacity-60 uppercase tracking-widest">{counselor.position}</p>
                <div className="mt-2 text-sm font-medium text-base-content/40">
                   Department of {counselor.dept}<br/>
                   University of Rajshahi
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Counselor;
