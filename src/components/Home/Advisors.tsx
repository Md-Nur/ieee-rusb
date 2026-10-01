"use client";
import { Users } from "@/models/user.model";
import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";
import {
  FaLinkedin,
  FaEnvelope,
  FaQuoteLeft,
  FaGraduationCap,
} from "react-icons/fa";
import Title from "../Title";
import { deptShorthands } from "@/lib/constants";

const ADVISOR_QUOTES: string[] = [
  "As an advisor to IEEE RUSB, my foremost commitment is to nurture the intellectual curiosity and professional growth of every student member. Technology advances fastest when young minds are empowered to question, experiment, and collaborate without boundaries.",
  "Guiding the next generation of engineers and scientists is both a privilege and a responsibility. IEEE RUSB provides the ideal platform for students to translate academic knowledge into real-world innovation, and I am honored to support that journey every step of the way.",
];

const AdvisorCard = ({
  user,
  quote,
  themeColor = "primary",
}: {
  user: Users;
  quote: string;
  themeColor?: string;
}) => (
  <div className="relative group flex-1 min-w-[240px] max-w-xs">
    <div
      className={`absolute inset-0 bg-${themeColor}/5 rounded-[2.5rem] -rotate-1 group-hover:rotate-0 transition-transform duration-500`}
    />
    <div
      className={`relative bg-base-200 shadow-xl rounded-[2.5rem] overflow-hidden flex flex-col h-full transition-all duration-500`}
    >
      {/* Photo */}
      <div className="relative h-96 w-full shrink-0">
        <Image
          src={user.avatar || "/foez_ahmed.jpg"}
          alt={user.name}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
          unoptimized={user.avatar?.includes("ibb.co")}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        {/* Social links */}
        <div className="absolute bottom-4 left-4 flex gap-2">
          {user.linkedin && (
            <a
              href={user.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={`btn btn-circle btn-xs bg-white/20 backdrop-blur-md border-none text-white hover:bg-${themeColor} transition-colors`}
            >
              <FaLinkedin />
            </a>
          )}
          {user.email && (
            <a
              href={`mailto:${user.email}`}
              className={`btn btn-circle btn-xs bg-white/20 backdrop-blur-md border-none text-white hover:bg-${themeColor} transition-colors`}
            >
              <FaEnvelope />
            </a>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col gap-5 flex-1">
        {/* Quote */}
        <div className="relative">
          <p className="text-base font-medium text-base-content/75 leading-relaxed italic text-justify">
            "{user.speech || quote}"
          </p>
        </div>

        {/* Identity */}
        <div className="pt-4 border-t border-base-content/10 mt-auto">
          <h3 className={`text-xl font-black text-${themeColor}`}>
            {user.name}
          </h3>
          {user.designation && (
            <p className="text-xs font-bold opacity-40 uppercase tracking-widest mt-0.5">
              {user.designation}
            </p>
          )}
          <div className="mt-1 text-xs font-medium text-base-content/40">
            Department of: {deptShorthands[user.dept] || user.dept}
            <br />
            University of Rajshahi
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Advisors = () => {
  const [advisors, setAdvisors] = useState<Users[]>([]);

  useEffect(() => {
    axios
      .get("/api/users?position=Advisor")
      .then((res) => {
        const users = Array.isArray(res.data) ? res.data : [];
        setAdvisors(users.slice(0, 2));
      })
      .catch((err) => {
        console.error("Error fetching Advisors:", err);
      });
  }, []);

  if (!advisors.length) return null;

  return (
    <section className="py-24 overflow-hidden bg-base-100">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Single shared title */}
        <div className="flex flex-col items-center mb-16">
          <Title className="!my-0 !p-0">Message from Our Advisors</Title>
        </div>

        {/* Both advisors in one row */}
        <div className="flex flex-col md:flex-row gap-8 items-stretch justify-between max-w-2xl mx-auto items-center">
          {advisors[0] && (
            <AdvisorCard
              user={advisors[0]}
              quote={ADVISOR_QUOTES[0]}
              themeColor="primary"
            />
          )}
          {advisors[1] && (
            <AdvisorCard
              user={advisors[1]}
              quote={ADVISOR_QUOTES[1]}
              themeColor="secondary"
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default Advisors;
