"use client";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { MdOutlineMailOutline, MdOutlinePhone } from "react-icons/md";
import { PiLinkedinLogoBold } from "react-icons/pi";
import { sortUsersByDesignation } from "@/lib/designation";
import UserSkeleton from "./Skeletons/UserSkeleton";

const societyAcronyms = {
  "robotics-&-automation-society": "RAS",
  "signal-processing-society": "SPS",
  "power-&-energy-society": "PES",
  "computer-society": "CS",
  "antenna-&-propagation-society": "APS",
  "women-in-engineering-society": "WIE",
};

const ShowUsers = ({ query, initialData }) => {
  const [users, setUsers] = useState(initialData ? sortUsersByDesignation(initialData, query) : []);
  const [loading, setLoading] = useState(!initialData);

  useEffect(() => {
    if (initialData) return;
    axios
      .then((res) => {
        setUsers(sortUsersByDesignation(res.data, query));
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [query, initialData]);

  return (
    <div id="members" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto gap-8 px-4 md:px-10 py-16">
      {!loading ? (
        users.length ? (
          users.map((user) => (
            <div
              key={user._id}
              className="group relative w-full bg-white dark:bg-slate-900/60 backdrop-blur-xl rounded-[2.5rem] overflow-hidden shadow-2xl hover:shadow-primary/20 transition-all duration-700 hover:-translate-y-3 border border-black/5 dark:border-white/10 flex flex-col"
            >
              {/* Image Section with cinematic overlay */}
              <div className="relative h-80 overflow-hidden">
                <Image
                  src={user?.avatar || "/defaultAvatar.jpg"}
                  height={600}
                  width={600}
                  alt={user?.name}
                  className="object-cover h-full w-full transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-1"
                />
                
                {/* Modern Cinematic Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#001c30] via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-700" />
                
                {/* Floating Social Hub */}
                <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500 bg-primary/20 backdrop-blur-[2px]">
                  {user?.phone && (
                    <a href={`tel:${user?.phone}`} className="w-12 h-12 flex items-center justify-center bg-white/10 border border-white/20 rounded-full text-white hover:bg-primary hover:scale-125 transition-all duration-300">
                      <MdOutlinePhone className="text-xl" />
                    </a>
                  )}
                  {user?.email && (
                    <a href={`mailto:${user?.email}`} className="w-12 h-12 flex items-center justify-center bg-white/10 border border-white/20 rounded-full text-white hover:bg-primary hover:scale-125 transition-all duration-300">
                      <MdOutlineMailOutline className="text-xl" />
                    </a>
                  )}
                  {user?.linkedin && (
                    <a href={user?.linkedin} target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center bg-white/10 border border-white/20 rounded-full text-white hover:bg-primary hover:scale-125 transition-all duration-300">
                      <PiLinkedinLogoBold className="text-xl" />
                    </a>
                  )}
                </div>
              </div>

              {/* Technical Profile Data */}
              <div className="p-8 flex flex-col flex-1 gap-6 relative z-10">
                <div className="space-y-2">
                  <h2 className="font-display text-2xl font-black tracking-tight text-slate-800 dark:text-white capitalize line-clamp-1 group-hover:text-primary transition-colors duration-500">
                    {user?.name}
                  </h2>
                  <div className="flex items-center gap-2">
                    <div className="h-[2px] w-8 bg-primary/30 rounded-full group-hover:animate-pulse"></div>
                    <span className="text-[10px] font-mono font-bold text-primary/60 tracking-widest uppercase">
                      ID: {user.ieee_id || "NOT_ASSIGNED"}
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <p className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-1">Core Position</p>
                    <div className="px-4 py-2 bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-2xl group-hover:border-primary/20 transition-colors">
                      <span className="text-sm font-black text-slate-700 dark:text-slate-200 uppercase italic leading-none">
                        {user.position || "Branch Member"}
                      </span>
                    </div>
                  </div>

                  {user?.society_designations?.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-black/5 dark:border-white/5">
                      {user.society_designations.map((sd, idx) => (
                        <div key={idx} className="group/badge px-3 py-1.5 bg-primary/5 dark:bg-primary/10 rounded-xl border border-primary/10 flex items-center gap-2 hover:bg-primary/20 transition-colors">
                          <span className="text-[9px] font-black text-primary/70">
                            {societyAcronyms[sd.society] || sd.society.split("-")[0].toUpperCase()}
                          </span>
                          <span className="text-[11px] font-bold text-slate-600 dark:text-slate-300">
                            {sd.designation}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-auto pt-6 border-t border-black/5 dark:border-white/5 flex items-center justify-between">
                  <div className="flex flex-col">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Department</p>
                    <p className="text-xs font-black text-slate-600 dark:text-slate-400 mt-1">{user?.dept}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Record</p>
                    <p className="text-xs font-black text-slate-600 dark:text-slate-400 mt-1">{user?.designation || user?.session || 'N/A'}</p>
                  </div>
                </div>
              </div>

              {/* Pulsing Energy Glow */}
              <div className="absolute top-0 right-0 w-32 h-32 -mr-16 -mt-16 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-1000" />
            </div>
          ))
        ) : (
          <div className="w-full text-center py-24 flex flex-col items-center gap-6 col-span-full opacity-60">
             <div className="text-8xl font-display font-black tracking-tighter text-slate-200 dark:text-white/5">NULL</div>
             <h1 className="text-xl font-mono font-bold text-slate-400 uppercase tracking-[0.4em]">Grid Empty: 0 Members</h1>
          </div>
        )
      ) : (
        <div className="col-span-full">
           <UserSkeleton />
        </div>
      )}
    </div>
  );
};

export default ShowUsers;
