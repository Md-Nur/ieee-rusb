"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectFade, Autoplay, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css/scrollbar";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

const HeroData = [
  {
    image: "/industrial-engineers.jpg",
    title: "Advancing Technology for Humanity",
  },
  {
    image:
      "https://ieee-collabratec.ieee.org/assets/landing/images/img-hero-desktop.png",
    title: "Collaborate with a Global Network of Innovators",
  },
  {
    image:
      "https://standards.ieee.org/wp-content/uploads/2024/03/iStock-1413210242-DM-r1.jpg",
    title: "Raising the World's Standards",
  },
  {
    image:
      "https://jobs.ieee.org/headers/cc/responsive/partner_lib/23764/img/hero23764.jpg",
    title: "Connecting Talent with Opportunity",
  },
  {
    image:
      "https://signalprocessingsociety.org/sites/default/files/home_pg_sps_slider.jpg",
    title: "The Science Behind Our Digital Lives",
  },
];

const Hero = () => {
  return (
    <div className="w-full">
      <Swiper
        grabCursor={true}
        effect={"fade"}
        rewind
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Navigation, EffectFade, Pagination]}
        className="w-full h-[60vh] md:h-[80vh]"
      >
        {HeroData.map((item, index) => (
          <SwiperSlide key={index}>
            <div
              className="bg-cover bg-center w-full h-full"
              style={{
                backgroundImage: `url(${item.image})`,
              }}
            >
              <h1 className="text-white shadow-2xl text-xl sm:text-3xl md:text-5xl font-bold w-full h-full flex items-center justify-center bg-[#00000079] p-2 text-center px-10">
                {item.title}
              </h1>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Hero;
