"use client";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { MdOutlineMailOutline, MdOutlinePhone } from "react-icons/md";
import { PiLinkedinLogoBold } from "react-icons/pi";
import Loading from "./Loading";

const societyAcronyms = {
  "robotics-&-automation-society": "RAS",
  "signal-processing-society": "SPS",
  "power-&-energy-society": "PES",
  "computer-society": "CS",
  "antenna-&-propagation-society": "APS",
  "women-in-engineering-society": "WIE",
};

const ShowUsers = ({ query, initialData }) => {
  const [users, setUsers] = useState(initialData || []);
  const [loading, setLoading] = useState(!initialData);

  useEffect(() => {
    if (initialData) return;
    axios
      .get(`/api/users?query=${query.replace("-&-", "-and-")}&approved=true`)
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [query, initialData]);

  return (
    <div className="flex max-w-7xl justify-center gap-8 flex-wrap mx-auto px-4 py-10">
      {!loading ? (
        users.length ? (
          users.map((user) => (
            <div
              key={user._id}
              className="group relative w-full sm:w-[350px] bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-black/5 dark:border-white/5"
            >
              {/* Image Section */}
              <div className="relative h-80 overflow-hidden">
                <Image
                  src={user?.avatar || "/defaultAvatar.jpg"}
                  height={600}
                  width={600}
                  alt={user?.name}
                  className="object-cover h-full w-full transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Floating Social Icons */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3 translate-y-10 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                  {user?.phone && (
                    <a href={`tel:${user?.phone}`} target="_blank" className="p-3 bg-white/20 backdrop-blur-md rounded-2xl text-white hover:bg-accent hover:scale-110 transition-all shadow-lg">
                      <MdOutlinePhone className="text-xl" />
                    </a>
                  )}
                  {user?.email && (
                    <a href={`mailto:${user?.email}`} target="_blank" className="p-3 bg-white/20 backdrop-blur-md rounded-2xl text-white hover:bg-accent hover:scale-110 transition-all shadow-lg">
                      <MdOutlineMailOutline className="text-xl" />
                    </a>
                  )}
                  {user?.linkedin && (
                    <a href={user?.linkedin} target="_blank" rel="noopener noreferrer" className="p-3 bg-white/20 backdrop-blur-md rounded-2xl text-white hover:bg-accent hover:scale-110 transition-all shadow-lg">
                      <PiLinkedinLogoBold className="text-xl" />
                    </a>
                  )}
                </div>
              </div>

              {/* Content Section */}
              <div className="p-8 text-center space-y-4">
                <div className="space-y-1">
                  <h2 className="font-display text-2xl font-black tracking-tight text-slate-800 dark:text-white capitalize leading-tight group-hover:text-primary transition-colors">
                    {user?.name}
                  </h2>
                  <p className="text-xs font-mono font-bold text-primary/60 tracking-widest uppercase">
                    IEEE ID: {user.ieee_id || "PENDING"}
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="inline-flex flex-col items-center">
                    <span className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-tighter tabular-nums mb-1">
                      Main Branch Position
                    </span>
                    <div className="px-4 py-1.5 bg-primary/5 dark:bg-primary/10 rounded-full border border-primary/10">
                      <span className="text-primary font-black text-sm uppercase italic">
                        {user.position || "Member"}
                      </span>
                    </div>
                  </div>

                  {user?.society_designations?.length > 0 && (
                    <div className="flex flex-wrap justify-center gap-2 mt-2 pt-4 border-t border-black/5 dark:border-white/5">
                      {user.society_designations.map((sd, idx) => (
                        <div key={idx} className="flex flex-col items-center">
                          <span className="text-[10px] font-black text-slate-400 uppercase leading-none mb-1">
                            {societyAcronyms[sd.society] || sd.society.split("-")[0]}
                          </span>
                          <span className="text-xs font-bold text-slate-700 dark:text-slate-300 px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg border border-black/5 dark:border-white/5 italic">
                            {sd.designation}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-4 space-y-1 text-sm text-slate-500 dark:text-slate-400 font-medium border-t border-black/5 dark:border-white/5">
                  <p className="leading-tight">Dept of {user?.dept}</p>
                  <p className="opacity-60">{user?.designation || user?.session}</p>
                </div>
              </div>

              {/* Decorative Corner Accent */}
              <div className="absolute top-0 right-0 w-24 h-24 -mr-12 -mt-12 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-colors duration-500" />
            </div>
          ))
        ) : (
          <div className="w-full text-center py-20 flex flex-col items-center gap-4">
             <div className="text-6xl text-slate-200 dark:text-slate-800 font-black">404</div>
             <h1 className="text-2xl font-display font-black text-slate-400">No Members Found</h1>
          </div>
        )
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default ShowUsers;
