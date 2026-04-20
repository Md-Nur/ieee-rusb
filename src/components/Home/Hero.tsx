"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay, Navigation, Pagination } from "swiper/modules";
import Link from "next/link";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

const HeroData = [
  {
    image: "/industrial-engineers.jpg",
    title: "Advancing Technology for Humanity",
    subtitle: "Empowering students through innovation, collaboration, and ethical engineering.",
    cta: "Become a Member",
    link: "/join/1",
    secondaryText: "Learn More",
    secondaryLink: "/#about"
  },
  {
    image: "/hero23764.jpg",
    title: "Global Network of Innovators",
    subtitle: "Join the world's largest technical professional organization for the advancement of technology.",
    cta: "Explore Societies",
    link: "#societies",
    secondaryText: "Learn More",
    secondaryLink: "/#about"
  },
  {
    image: "/iStock-1413210242-DM-r1.jpg",
    title: "Engineering the Future",
    subtitle: "Setting global standards and driving technological breakthroughs at RU.",
    cta: "Upcoming Events",
    link: "#events",
    secondaryText: "Learn More",
    secondaryLink: "/#about"
  },
];

const Hero = ({ slides = HeroData, className = "" }: { slides?: any[]; className?: string }) => {
  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      <Swiper
        effect={"fade"}
        speed={1000}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        pagination={{
            clickable: true,
            dynamicBullets: true,
        }}
        modules={[Autoplay, EffectFade, Navigation, Pagination]}
        className="w-full h-[70vh] md:h-[90vh]"
      >
        {slides.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
              {/* Optimized Next.js Image Component */}
              <div className="absolute inset-0 transition-transform duration-[4000ms] hover:scale-110">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  priority={index === 0}
                  className="object-cover"
                  sizes="100vw"
                />
              </div>

              {/* Modern Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
              
              {/* Content Box */}
              <div className="relative z-10 container mx-auto px-6 md:px-12 text-left">
                <div className="max-w-3xl">
                   <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/20 backdrop-blur-md border border-primary/30 rounded-full text-primary text-sm font-bold mb-6">
                      <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                      IEEE University of Rajshahi
                   </div>
                   
                   <h1 className="text-4xl md:text-8xl font-black leading-tight mb-6 font-display bg-clip-text text-transparent bg-gradient-to-r from-white via-primary to-white bg-[length:200%_auto] animate-text-shimmer">
                     {item.title}
                   </h1>
                   
                   <p className="text-lg md:text-2xl text-white/80 mb-10 max-w-2xl font-medium leading-relaxed">
                     {item.subtitle}
                   </p>
                     <div className="flex flex-wrap gap-4 animate-fade-in-up duration-1000 delay-500 mt-2">
                       {item.cta && (
                         <Link 
                           href={(item.link || "#").startsWith('#') && !item.link?.startsWith('/#') ? item.link : (item.link || "#")} 
                           className="btn btn-primary btn-md md:btn-lg rounded-full px-6 md:px-10 gap-3 group transition-all shadow-xl shadow-primary/20"
                         >
                           {item.cta}
                           <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                         </Link>
                       )}
                       {item.secondaryText && (
                         <Link 
                           href={item.secondaryLink || "#about"} 
                           className="btn btn-outline btn-md md:btn-lg border-white/50 text-white hover:bg-white hover:text-slate-900 rounded-full px-6 md:px-10 backdrop-blur-sm transition-all"
                         >
                           {item.secondaryText}
                         </Link>
                       )}
                     </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 hidden md:block opacity-50">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-white rounded-full animate-bounce"></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
