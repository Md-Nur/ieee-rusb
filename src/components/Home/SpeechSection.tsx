"use client";
import { Users } from "@/models/user.model";
import Image from "next/image";
import { FaLinkedin, FaEnvelope, FaQuoteLeft, FaUserTie, FaGraduationCap } from "react-icons/fa";
import Title from "../Title";

interface SpeechSectionProps {
  user: Users | null;
  title: string;
  badgeText: string;
  badgeIcon: "tie" | "grad";
  reverse?: boolean;
  bgClass?: string;
  quote?: string;
  secondaryQuote?: string;
}

const SpeechSection = ({ 
  user, 
  title, 
  badgeText, 
  badgeIcon, 
  reverse = false, 
  bgClass = "bg-base-100",
  quote,
  secondaryQuote
}: SpeechSectionProps) => {
  if (!user) return null;

  const Icon = badgeIcon === "tie" ? FaUserTie : FaGraduationCap;
  const themeColor = badgeIcon === "tie" ? "secondary" : "primary";

  return (
    <section className={`py-24 ${bgClass}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col items-center mb-16">
          <div className={`inline-flex items-center gap-2 text-${themeColor} font-bold uppercase tracking-widest text-sm mb-4`}>
             <Icon /> {badgeText}
          </div>
          <Title className="!my-0 !p-0">{title}</Title>
        </div>

        <div className="relative group max-w-5xl mx-auto">
          {/* Decorative background shape */}
          <div className={`absolute inset-0 bg-${themeColor}/5 rounded-[3rem] ${reverse ? 'rotate-1' : '-rotate-1'} group-hover:rotate-0 transition-transform duration-500`}></div>
          
          <div className={`relative bg-base-200 shadow-2xl rounded-[3rem] overflow-hidden flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center transition-all duration-500 hover:shadow-${themeColor}/10`}>
            {/* Image Section */}
            <div className="lg:w-2/5 relative h-[400px] lg:h-[500px] w-full">
              <Image
                src={user?.avatar || (badgeIcon === "tie" ? "/billaVai.jpg" : "/foez_ahmed.jpg")}
                alt={user.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className={`absolute bottom-6 ${reverse ? 'right-6' : 'left-6'} flex gap-3`}>
                  {user.linkedin && (
                    <a 
                      href={user.linkedin} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`btn btn-circle btn-sm bg-white/20 backdrop-blur-md border-none text-white hover:bg-${themeColor} transition-colors`}
                    >
                      <FaLinkedin />
                    </a>
                  )}
                 {user.email && (
                   <a href={`mailto:${user.email}`} className={`btn btn-circle btn-sm bg-white/20 backdrop-blur-md border-none text-white hover:bg-${themeColor} transition-colors`}>
                     <FaEnvelope />
                   </a>
                 )}
              </div>
            </div>

            {/* Quote/Text Section */}
            <div className="lg:w-3/5 p-8 md:p-12 space-y-8">
              <div className="relative">
                <FaQuoteLeft className={`text-${themeColor}/20 text-6xl absolute -top-4 -left-4`} />
                <div className="relative z-10 space-y-4">
                  <p className="text-xl md:text-2xl font-medium text-base-content/80 leading-relaxed italic text-justify">
                    "{quote || `${user.name} is a dedicated leader for IEEE RUSB. Under their guidance, our branch has evolved into a powerhouse of technical innovation and student leadership.`}"
                  </p>
                  {secondaryQuote && (
                    <p className="text-sm leading-relaxed text-base-content/60 text-justify">
                      {secondaryQuote}
                    </p>
                  )}
                </div>
              </div>

              <div className="pt-8 border-t border-base-content/10">
                <h3 className={`text-3xl font-black text-${themeColor}`}>{user.name}</h3>
                <p className="text-lg font-bold opacity-60 uppercase tracking-widest">{user.position}</p>
                <div className="mt-2 text-sm font-medium text-base-content/40">
                   Department of {user.dept}<br/>
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

export default SpeechSection;
