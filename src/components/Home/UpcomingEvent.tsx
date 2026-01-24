"use client";
import { Content } from "@/models/content.model";
import Title from "../Title";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../Loading";
import Image from "next/image";
import Link from "next/link";
import { FaCalendarAlt, FaArrowRight, FaBullhorn } from "react-icons/fa";

const UpcomingEvent = ({ 
  society, 
  event 
}: { 
  society?: string, 
  event?: Content | null 
}) => {
  if (!event) return null;

  const upcomingEvent = event;


  return (
    <section id="events" className="py-24 bg-base-200/30">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col items-center gap-12">
          <div className="text-center space-y-4">
             <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full text-accent font-bold text-sm tracking-widest uppercase">
                <FaBullhorn className="animate-bounce" /> Don't Miss Out
             </div>
             <Title className="!my-0 !p-0">Upcoming Spotlight Event</Title>
             <p className="text-base-content/60 max-w-xl mx-auto">Join us for our next major milestone as we continue to push the boundaries of engineering and technology.</p>
          </div>

          <div className="group relative w-full max-w-5xl rounded-[3rem] overflow-hidden shadow-2xl bg-base-100 border border-base-content/5">
            <div className="flex flex-col lg:flex-row h-auto lg:h-[500px]">
              {/* Image Side */}
              <div className="lg:w-3/5 relative overflow-hidden">
                <Image
                  src={upcomingEvent.thumbnail}
                  alt={upcomingEvent.title}
                  fill
                  priority
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8 lg:hidden">
                   <h2 className="text-2xl font-black text-white capitalize leading-tight">
                     {upcomingEvent.title}
                   </h2>
                </div>
              </div>

              {/* Content Side */}
              <div className="lg:w-2/5 p-8 md:p-12 flex flex-col justify-center gap-8 relative overflow-hidden bg-base-100">
                <div className="flex items-center gap-5 text-accent">
                   <div className="w-14 h-14 bg-accent/10 rounded-2xl flex flex-col items-center justify-center border border-accent/20">
                      <span className="text-2xl font-black leading-none">?</span>
                      <span className="text-[10px] uppercase font-bold opacity-70">Mark</span>
                   </div>
                   <div>
                      <p className="text-xs font-bold uppercase tracking-widest opacity-50">Event Status</p>
                      <p className="font-black text-lg">Registration Open</p>
                   </div>
                </div>

                <div className="space-y-4 hidden lg:block">
                   <h2 className="text-3xl font-black text-base-content leading-tight capitalize">
                     {upcomingEvent.title}
                   </h2>
                   <div className="h-1.5 w-16 bg-primary rounded-full"></div>
                </div>

                <div className="flex flex-col gap-4">
                  <Link
                    href={`/content/${upcomingEvent.slug}`}
                    className="btn btn-primary btn-lg rounded-2xl gap-3 shadow-xl shadow-primary/20"
                  >
                    View Event Details <FaArrowRight />
                  </Link>
                  <p className="text-center text-xs opacity-40 font-medium italic">Limited seats available. Register early to secure your spot.</p>
                </div>
                
                {/* Decorative background icon */}
                <FaCalendarAlt className="absolute -bottom-10 -right-10 text-[15rem] text-base-content opacity-[0.02] pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvent;
