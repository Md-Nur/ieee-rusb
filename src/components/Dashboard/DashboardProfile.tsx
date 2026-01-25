"use client";
import React from "react";
import Title from "@/components/Title";
import { useUserAuth } from "@/context/userAuth";
import Image from "next/image";
import Link from "next/link";
import { FaEdit, FaPlus, FaLinkedin, FaEnvelope, FaPhone, FaIdCard, FaUniversity, FaUserTag, FaMicrochip } from "react-icons/fa";
import Loading from "@/components/Loading";

const DashboardProfile = () => {
  const { userAuth } = useUserAuth();

  if (!userAuth) {
    return <Loading />;
  }

  return (
    <section className="w-full">
    
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-10 relative z-10 space-y-12">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 pb-8 border-b border-black/5 dark:border-white/5">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-primary rounded-full animate-ping" />
              <span className="text-[10px] font-mono font-black text-primary/60 uppercase tracking-[0.5em]">Command Center</span>
            </div>
            <Title className="!p-0 !m-0 !text-left lg:text-5xl">Personal Dashboard</Title>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <Link href="/dashboard/edit-profile" className="group flex items-center gap-3 px-6 py-3 bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-2xl hover:border-accent hover:text-accent transition-all duration-300 shadow-sm">
              <FaEdit className="text-sm group-hover:scale-125 transition-transform" /> 
              <span className="text-sm font-black uppercase tracking-wider">Modify Profile</span>
            </Link>
            <Link href="/add-blog" className="group flex items-center gap-3 px-6 py-3 bg-primary text-white rounded-2xl hover:bg-primary/90 transition-all duration-300 shadow-xl shadow-primary/20">
              <FaPlus className="text-sm group-hover:rotate-90 transition-transform" /> 
              <span className="text-sm font-black uppercase tracking-wider">Publish Blog</span>
            </Link>
            <Link href="/add-event" className="group flex items-center gap-3 px-6 py-3 bg-slate-900 dark:bg-slate-700 text-white rounded-2xl hover:opacity-90 transition-all duration-300 shadow-xl">
              <FaPlus className="text-sm group-hover:rotate-90 transition-transform" /> 
              <span className="text-sm font-black uppercase tracking-wider">Host Event</span>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Sidebar Area: Profile Focus */}
          <div className="lg:col-span-4 space-y-8">
            <div className="group relative bg-white dark:bg-slate-900/50 backdrop-blur-xl rounded-[3rem] border border-black/5 dark:border-white/10 shadow-2xl overflow-hidden pt-12 pb-10 px-8 text-center transition-all duration-500 hover:shadow-primary/5 hover:-translate-y-1">
              <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-primary/10 to-transparent" />
              
              <div className="relative mb-6">
                <div className="w-40 h-40 mx-auto rounded-[2.5rem] overflow-hidden ring-8 ring-white dark:ring-slate-800 shadow-2xl transform transition-transform duration-700 group-hover:scale-105">
                  <Image
                    src={userAuth?.avatar || "/defaultAvatar.jpg"}
                    alt={userAuth?.name || "User"}
                    width={200}
                    height={200}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-success rounded-full border-4 border-white dark:border-slate-900 flex items-center justify-center">
                   <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse" />
                </div>
              </div>

              <div className="space-y-2">
                <h2 className="text-3xl font-black text-slate-800 dark:text-white font-display tracking-tight">{userAuth?.name}</h2>
                <div className="inline-flex px-4 py-1.5 bg-primary/10 rounded-full text-primary font-black text-[10px] tracking-widest uppercase border border-primary/20">
                   {userAuth?.position || "Member"}
                </div>
              </div>

              <div className="mt-10 space-y-4">
                 <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-white/5 rounded-2xl border border-black/5 dark:border-white/5 group/link hover:border-primary/30 transition-colors">
                    <div className="w-10 h-10 flex items-center justify-center bg-white dark:bg-slate-800 rounded-xl text-primary shadow-sm">
                       <FaIdCard />
                    </div>
                    <div className="text-left overflow-hidden">
                       <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Global Identifier</p>
                       <p className="text-sm font-mono font-bold text-slate-700 dark:text-slate-300">IEEE ID: {userAuth?.ieee_id || "NOT_SET"}</p>
                    </div>
                 </div>

                 {userAuth?.linkedin && (
                   <a href={userAuth.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-white/5 rounded-2xl border border-black/5 dark:border-white/5 group/link hover:border-blue-400/30 transition-colors">
                      <div className="w-10 h-10 flex items-center justify-center bg-[#0077b5] rounded-xl text-white shadow-lg shadow-blue-500/20">
                         <FaLinkedin />
                      </div>
                      <div className="text-left overflow-hidden">
                         <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Connect</p>
                         <p className="text-sm font-bold text-blue-500 hover:underline truncate">Professional Profile</p>
                      </div>
                   </a>
                 )}
              </div>
            </div>

            {/* Quick Contact Card */}
            <div className="bg-white dark:bg-slate-900/50 backdrop-blur-xl rounded-[2.5rem] border border-black/5 dark:border-white/10 p-8 space-y-6">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-3">
                 <span className="w-1 h-4 bg-accent/40 rounded-full" /> Transmission Channels
              </h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center text-primary text-lg"><FaEnvelope /></div>
                  <div className="overflow-hidden">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Primary Email</p>
                    <p className="text-sm font-black text-slate-700 dark:text-slate-200 truncate">{userAuth?.email}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-success/5 rounded-xl flex items-center justify-center text-success text-lg"><FaPhone /></div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Secure Line</p>
                    <p className="text-sm font-black text-slate-700 dark:text-slate-200">{userAuth?.phone}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-10">
            {/* Academic Matrix Section */}
            <div className="bg-white dark:bg-slate-900/50 backdrop-blur-xl rounded-[3rem] border border-black/5 dark:border-white/10 p-10 space-y-8 overflow-hidden relative group">
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] translate-x-32 translate-y-32" />
              
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-2xl text-primary"><FaUniversity size={24} /></div>
                <h3 className="text-2xl font-black text-slate-800 dark:text-white font-display tracking-tight">Academic Protocol</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative p-8 bg-slate-50 dark:bg-white/5 rounded-3xl border border-black/5 dark:border-white/5 transition-all duration-300 hover:border-primary/20">
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2 opacity-60">Department Node</p>
                  <p className="text-2xl font-black text-slate-700 dark:text-slate-200 uppercase">{userAuth?.dept}</p>
                  <div className="absolute top-4 right-6 text-primary/10"><FaMicrochip size={40} /></div>
                </div>
                <div className="relative p-8 bg-slate-50 dark:bg-white/5 rounded-3xl border border-black/5 dark:border-white/5 transition-all duration-300 hover:border-primary/20">
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2 opacity-60">Active Session / Rank</p>
                  <p className="text-2xl font-black text-slate-700 dark:text-slate-200 uppercase">{userAuth?.session || userAuth?.designation}</p>
                  <div className="absolute top-4 right-6 text-primary/10"><FaUserTag size={40} /></div>
                </div>
              </div>
            </div>

            {/* Societies Matrix */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="bg-white dark:bg-slate-900/50 backdrop-blur-xl rounded-[2.5rem] border border-black/5 dark:border-white/10 p-8 space-y-6 flex flex-col">
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] flex items-center gap-3">
                     <span className="w-6 h-[2px] bg-secondary" /> Functional Roles
                  </h4>
                  <div className="flex flex-wrap gap-2 flex-grow items-start">
                    {userAuth?.roles.map((role, i) => (
                      <span key={i} className="px-5 py-2.5 bg-secondary/10 text-secondary text-[11px] font-black uppercase tracking-widest rounded-2xl border border-secondary/20 hover:bg-secondary hover:text-white transition-colors cursor-default">
                        {role.split("-").join(" ")}
                      </span>
                    ))}
                  </div>
               </div>

               <div className="bg-white dark:bg-slate-900/50 backdrop-blur-xl rounded-[2.5rem] border border-black/5 dark:border-white/10 p-8 space-y-6 flex flex-col">
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] flex items-center gap-3">
                     <span className="w-6 h-[2px] bg-accent" /> Network Affiliations
                  </h4>
                  <div className="flex flex-wrap gap-2 flex-grow items-start">
                    {userAuth?.societies.length > 0 ? (
                      userAuth.societies.map((soc, i) => (
                        <span key={i} className="px-5 py-2.5 bg-accent/10 text-accent text-[11px] font-black uppercase tracking-widest rounded-2xl border border-accent/20 hover:bg-accent hover:text-white transition-colors cursor-default">
                          {soc.split("-").join(" ")}
                        </span>
                      ))
                    ) : (
                      <p className="text-sm font-bold text-slate-400 italic">No network links established.</p>
                    )}
                  </div>
               </div>
            </div>

            {/* Society Designation Module */}
            {userAuth?.society_designations && userAuth.society_designations.length > 0 && (
              <div className="bg-white dark:bg-slate-900/50 backdrop-blur-xl rounded-[3rem] border border-black/5 dark:border-white/10 p-10 space-y-8 overflow-hidden relative group border-l-[12px] border-l-accent">
                <div className="flex justify-between items-center">
                   <h3 className="text-2xl font-black text-slate-800 dark:text-white font-display tracking-tight uppercase">Specialized Designations</h3>
                   <div className="px-4 py-1.5 bg-accent/10 text-accent rounded-full text-[10px] font-black tracking-widest border border-accent/30 uppercase">Operational</div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {userAuth.society_designations.map((sd, i) => (
                    <div key={i} className="group/item relative overflow-hidden bg-slate-50 dark:bg-white/5 p-6 rounded-3xl border border-black/5 dark:border-white/5 transition-all duration-500 hover:shadow-xl hover:scale-[1.02]">
                      <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-2">{sd.society.split("-").join(" ")}</p>
                      <p className="text-xl font-black text-primary uppercase">{sd.designation}</p>
                      {/* Decorative scanning line animation on hover */}
                      <div className="absolute top-0 left-0 w-full h-[1px] bg-accent/40 -translate-x-full group-hover/item:animate-scan-x pointer-events-none" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scan-x {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  );
};

export default DashboardProfile;
