"use client";
import Title from "../Title";
import Image from "next/image";
import { FaBookmark, FaQuoteLeft } from "react-icons/fa";

interface AboutProps {
  title?: string;
  description?: string;
  image?: string;
}

const About = ({ title, description, image }: AboutProps) => {
  const defaultTitle = "About IEEE University of Rajshahi Student Branch";
  const defaultDescription = "The IEEE University of Rajshahi Student Branch (IEEE RU SB) is a vibrant community of students, researchers, and young professionals committed to advancing technology for the betterment of society. Operating under the world’s largest technical professional organization, we strive to create an ecosystem where learning, innovation, and leadership thrive together.";

  return (
    <section id="about" className="py-20 bg-base-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Image Side */}
          <div className="lg:w-1/2 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl skew-y-1 transform transition-transform hover:skew-y-0 duration-500">
              <Image 
                src={image || "https://img.freepik.com/free-photo/diverse-community-hands-joined-together_53876-133691.jpg"}
                alt="IEEE Community"
                width={800}
                height={600}
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-primary/20 mix-blend-multiply"></div>
            </div>
            {/* Decorative Elements */}
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-secondary opacity-10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-primary opacity-10 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 -left-4 -translate-y-1/2 bg-base-100 p-6 rounded-2xl shadow-xl hidden md:block border-l-4 border-primary">
               <FaQuoteLeft className="text-primary text-3xl mb-3 opacity-20" />
               <p className="text-sm font-bold italic text-base-content/70 italic">Empowering the next<br/>generation of engineers.</p>
            </div>
          </div>

          {/* Text Side */}
          <div className="lg:w-1/2 space-y-8">
            <div className="inline-flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-sm">
              <FaBookmark className="text-xs" /> Our Story
            </div>
            
            <Title className="!text-left !my-0 !p-0 leading-tight">
              {title || defaultTitle}
            </Title>
            
            <div className="space-y-6">
              <p className="text-xl text-base-content/80 leading-relaxed font-medium">
                {description || defaultDescription}
              </p>
              <p className="text-base-content/60 leading-relaxed">
                Founded with a vision to bridge the gap between academic knowledge and industrial excellence, IEEE RU SB provides a platform for students to explore emerging technologies, participate in global competitions, and build meaningful professional networks.
              </p>
            </div>

            <div className="flex flex-wrap gap-10 pt-4">
               <div>
                  <h4 className="text-4xl font-black text-primary">500+</h4>
                  <p className="text-sm font-bold opacity-50 uppercase tracking-tighter">Active Members</p>
               </div>
               <div>
                  <h4 className="text-4xl font-black text-secondary">50+</h4>
                  <p className="text-sm font-bold opacity-50 uppercase tracking-tighter">Events Yearly</p>
               </div>
               <div>
                  <h4 className="text-4xl font-black text-accent">6</h4>
                  <p className="text-sm font-bold opacity-50 uppercase tracking-tighter">Societies & AGs</p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
