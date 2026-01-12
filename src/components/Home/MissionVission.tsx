"use client";
import Title from "../Title";
import { FaRocket, FaLightbulb, FaGlobe, FaHandsHelping } from "react-icons/fa";

interface MissionVissionProps {
  vision?: string;
  mission?: string[];
}

const MissionVission = ({ vision, mission }: MissionVissionProps) => {
  const defaultVision = "To build IEEE RU SB as a leading center of academic excellence and technological innovation in Bangladesh—where students grow as skilled engineers, responsible professionals, and impactful leaders.";
  const defaultMission = [
    { text: "Inspire innovation in emerging technological fields.", icon: <FaLightbulb /> },
    { text: "Connect members with global IEEE communities.", icon: <FaGlobe /> },
    { text: "Promote ethical engineering and societal solutions.", icon: <FaHandsHelping /> },
    { text: "Foster collaboration and continuous professional growth.", icon: <FaRocket /> }
  ];

  const displayVision = vision || defaultVision;

  return (
    <section className="py-20 bg-base-200/50">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Vision Section */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            <div className="badge badge-secondary badge-outline font-bold px-4 py-3 h-auto uppercase tracking-widest text-xs">
              Long-term Impact
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-base-content leading-none">
              Our <span className="text-secondary">Vision</span>
            </h2>
            <p className="text-xl md:text-2xl font-medium text-base-content/70 leading-relaxed italic">
              "{displayVision}"
            </p>
            <div className="h-1 w-20 bg-secondary rounded-full"></div>
          </div>

          {/* Mission Section */}
          <div className="lg:col-span-7 space-y-10">
            <div className="flex flex-col gap-6">
               <div className="flex items-center gap-4 mb-2">
                  <h3 className="text-3xl font-bold">Our <span className="text-primary">Mission</span></h3>
                  <div className="h-px flex-1 bg-base-content/10"></div>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {defaultMission.map((item, index) => (
                    <div 
                      key={index} 
                      className="group p-6 bg-base-100 rounded-3xl border border-base-content/5 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-300"
                    >
                      <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary text-xl mb-4 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all">
                        {item.icon}
                      </div>
                      <p className="font-semibold text-lg leading-snug text-base-content/80 group-hover:text-base-content transition-colors">
                        {item.text}
                      </p>
                    </div>
                  ))}
               </div>
            </div>
            
            {/* Added a call to action or informative footer for this section */}
            <div className="p-8 bg-primary rounded-[2.5rem] text-white flex flex-col md:flex-row items-center gap-6 justify-between shadow-2xl shadow-primary/20 overflow-hidden relative">
               <div className="relative z-10">
                  <h4 className="text-2xl font-bold mb-1">Ready to start journey?</h4>
                  <p className="opacity-80 font-medium">Join the ranks of innovators at Rajshahi University.</p>
               </div>
               <button className="btn btn-white btn-lg rounded-full px-10 relative z-10 border-none shadow-lg hover:scale-105 transition-transform">
                  Join IEEE SB
               </button>
               {/* Decorative Circles */}
               <div className="absolute -top-10 -right-10 w-40 h-40 bg-white opacity-10 rounded-full"></div>
               <div className="absolute -bottom-20 -left-10 w-60 h-60 bg-black opacity-5 rounded-full"></div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default MissionVission;
