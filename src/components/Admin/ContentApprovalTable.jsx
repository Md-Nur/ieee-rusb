"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { FaCheck, FaExternalLinkAlt, FaUser, FaCalendarAlt, FaTag, FaClipboardList, FaSpinner } from "react-icons/fa";
import { deptShorthands } from "@/lib/constants";

const ContentApprovalTable = ({ initialContents }) => {
  const [contents, setContents] = useState(initialContents || []);
  const [processingId, setProcessingId] = useState(null);

  const refreshContents = async () => {
    try {
      const res = await axios.get("/api/contents?approved=false&query=all");
      setContents(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleApproved = async (id, isApproved) => {
    try {
      setProcessingId(id);
      await axios.post(`/api/contents/content-approval`, {
        id,
        isApproved,
      });
      toast.success(isApproved ? "Content Approved!" : "Content Hidden");
      
      // Update local state without full refresh if possible, or just refresh
      setContents(prev => prev.filter(c => c._id !== id)); // Remove from pending list
    } catch (error) {
      toast.error(error?.response?.data?.error || error.message);
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <div className="relative group">
      {/* Background Glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-accent/20 to-primary/20 rounded-[2rem] blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
      
      <div className="relative overflow-hidden bg-slate-900/40 backdrop-blur-2xl border border-white/5 rounded-[2rem] shadow-2xl">
        <div className="overflow-x-auto p-4 md:p-8">
          <table className="table w-full border-separate border-spacing-y-4">
            <thead>
              <tr className="text-slate-400 border-none uppercase text-[10px] tracking-[0.2em] font-black">
                <th className="bg-transparent pb-6 text-slate-500 dark:text-slate-400">Action</th>
                <th className="bg-transparent pb-6 text-center text-slate-500 dark:text-slate-400">Preview</th>
                <th className="bg-transparent pb-6 text-slate-500 dark:text-slate-400">Content Details</th>
                <th className="bg-transparent pb-6">Contributor</th>
                <th className="bg-transparent pb-6">Timeline & Type</th>
                <th className="bg-transparent pb-6">Utilities</th>
              </tr>
            </thead>
            <tbody>
              {contents?.length ? (
                contents.map((content) => (
                  <tr 
                    key={content._id}
                    className="group/row bg-white/5 hover:bg-white/10 border border-white/5 transition-all duration-300 rounded-2xl relative"
                  >
                    {/* Main Actions */}
                    <td className="first:rounded-l-2xl align-middle pl-6">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleApproved(content._id, true)}
                          disabled={processingId === content._id}
                          className={`flex items-center justify-center w-10 h-10 rounded-xl border transition-all duration-500 ${
                            processingId === content._id 
                            ? "bg-slate-800 border-white/10 text-slate-500 cursor-not-allowed" 
                            : "bg-accent/10 border-accent/20 text-accent hover:bg-accent hover:text-white hover:shadow-[0_0_20px_rgba(0,196,204,0.4)]"
                          }`}
                          title="Approve Content"
                        >
                          {processingId === content._id ? (
                            <FaSpinner className="animate-spin" />
                          ) : (
                            <FaCheck />
                          )}
                        </button>
                        <button
                          onClick={() => handleApproved(content._id, false)}
                          disabled={processingId === content._id}
                          className={`flex items-center justify-center w-10 h-10 rounded-xl border transition-all duration-500 ${
                            processingId === content._id 
                            ? "bg-slate-800 border-white/10 text-slate-500 cursor-not-allowed" 
                            : "bg-red-500/10 border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white hover:shadow-[0_0_20px_rgba(239,68,68,0.4)]"
                          }`}
                          title="Reject & Hide"
                        >
                          {processingId === content._id ? (
                            <FaSpinner className="animate-spin" />
                          ) : (
                            <span className="text-lg">×</span>
                          )}
                        </button>
                      </div>
                    </td>

                    {/* Thumbnail */}
                    <td className="text-center align-middle">
                      <div className="avatar">
                        <div className="mask mask-squircle w-20 h-20 ring-2 ring-white/5 ring-offset-2 ring-offset-slate-900 group-hover/row:scale-105 transition-transform duration-500">
                          <Image
                            src={content?.thumbnail || "/logo.png"}
                            width={80}
                            height={80}
                            alt={content?.title || "Thumbnail"}
                            className="object-cover"
                          />
                        </div>
                      </div>
                    </td>

                    {/* Title & Slug */}
                    <td className="max-w-xs align-middle">
                      <Link
                        href={`/content/${content.slug}`}
                        className="font-black text-slate-900 dark:text-slate-100 group-hover/row:text-accent transition-colors block truncate text-lg tracking-tight"
                      >
                        {content?.title}
                      </Link>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono tracking-tighter">
                         /{content.slug}
                      </span>
                    </td>

                    {/* Author */}
                    <td className="align-middle">
                      <div className="flex items-center gap-3 group/author">
                         <div className="avatar placeholder">
                            <div className="bg-slate-800 text-slate-400 rounded-full w-8 h-8 ring-1 ring-white/10 group-hover/author:ring-accent transition-all">
                               {content?.user?.avatar ? (
                                 <Image src={content.user.avatar} width={32} height={32} alt="Author" className="rounded-full" />
                               ) : (
                                 <FaUser size={12} />
                               )}
                            </div>
                         </div>
                         <div>
                            <div className="text-sm font-black text-slate-900 dark:text-slate-100">{content?.user?.name}</div>
                            <div className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest">
                               {content?.user?.designation || (content?.user?.dept && (deptShorthands[content.user.dept] || content.user.dept))}
                            </div>
                         </div>
                      </div>
                    </td>

                    {/* Date & Type */}
                    <td className="align-middle">
                       <div className="space-y-1">
                          <div className="flex items-center gap-2 text-[10px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-tighter">
                             <FaCalendarAlt className="text-primary/60" />
                             {new Date(content?.date).toLocaleDateString()}
                          </div>
                          <div className={`inline-block px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest ${
                            content?.type === 'blog' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                          }`}>
                             {content?.type}
                          </div>
                       </div>
                    </td>

                    {/* External Links */}
                    <td className="last:rounded-r-2xl pr-6 align-middle">
                       <div className="flex gap-2">
                          <Link
                            href={`/content/${content.slug}`}
                            className="btn btn-xs btn-ghost text-slate-400 hover:text-accent border border-white/5"
                            title="View Full Content"
                          >
                            <FaExternalLinkAlt />
                          </Link>
                          {content?.regUrl && (
                            <a
                              href={content.regUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn btn-xs btn-ghost text-slate-400 hover:text-primary border border-white/5"
                              title="Reg Link"
                            >
                              <FaTag />
                            </a>
                          )}
                       </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-20">
                     <div className="flex flex-col items-center gap-4 py-10">
                        <FaClipboardList size={48} className="text-slate-400 dark:text-slate-600 animate-pulse" />
                        <div className="font-display text-2xl font-black text-slate-800 dark:text-slate-200 tracking-tighter uppercase">Queue is Empty</div>
                        <p className="text-[10px] font-black tracking-[0.3em] uppercase text-slate-500 dark:text-slate-500">All community content has been verified</p>
                     </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ContentApprovalTable;
