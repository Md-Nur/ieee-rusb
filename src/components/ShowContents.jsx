"use client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import { FaCalendarAlt, FaUser, FaArrowRight } from "react-icons/fa";

/**
 * @param {{ query: string; society?: string; initialData?: any[]; hideIfEmpty?: boolean }} props
 */
const ShowContents = ({ query, society, initialData, hideIfEmpty = false }) => {
  const [contents, setContents] = useState(initialData || []);
  const [loading, setLoading] = useState(!initialData);

  useEffect(() => {
    if (initialData) return;
    
    let url = `/api/contents?query=${query}&approved=true`;
    if (society) {
      url += `&society=${society}`;
    }
    axios
      .get(url)
      .then((res) => {
        setContents(res.data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [query, society, initialData]);

  if (hideIfEmpty && !loading && contents.length === 0) return null;

  return (
    <div className="flex max-w-7xl justify-center gap-8 flex-wrap mx-auto px-4 py-10">
      {!loading ? (
        contents.length ? (
          contents.map((content) => (
            <Link
                href={`/content/${content.slug}`}
                key={content._id}
                className="group relative w-full sm:w-[380px] bg-white dark:bg-slate-900 rounded-3xl md:rounded-[2.5rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-black/5 dark:border-white/5 flex flex-col"
              >
              {/* Image Section */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={content.thumbnail || "/logo.png"}
                  height={600}
                  width={600}
                  alt={content.title}
                  className="object-cover h-full w-full transition-transform duration-1000 group-hover:scale-105"
                />
                
                {/* Type Badge */}
                <div className="absolute top-6 left-6 z-10">
                  <div className={`px-4 py-1.5 rounded-full text-[10px] font-black tracking-[0.2em] uppercase border backdrop-blur-md shadow-lg ${
                    content.type === 'event' 
                      ? 'bg-accent/20 border-accent text-accent' 
                      : 'bg-primary/20 border-primary text-primary'
                  }`}>
                    {content.type}
                  </div>
                </div>

                {/* Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />
                
                {/* Date Overlay */}
                <div className="absolute bottom-6 left-6 flex items-center gap-2 text-white/90">
                   <div className="p-2 bg-white/10 backdrop-blur-md rounded-xl border border-white/10">
                      <FaCalendarAlt className="text-sm" />
                   </div>
                   <span className="text-xs font-bold uppercase tracking-wider tabular-nums">
                     {new Date(content?.date).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })}
                   </span>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6 md:p-8 flex flex-col flex-1 gap-6">
                <div className="space-y-4">
                  <h2 className="font-display text-2xl font-black tracking-tight text-slate-800 dark:text-white line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                    {content.title}
                  </h2>
                  <div className="h-1 w-12 bg-primary/20 rounded-full group-hover:w-24 group-hover:bg-primary transition-all duration-500"></div>
                </div>

                {/* Author Info (for blogs) */}
                {content.type === "blog" && (
                  <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-black/5 dark:border-white/5 group-hover:bg-primary/5 transition-colors">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden ring-2 ring-primary/10">
                      <Image
                        src={content?.user?.avatar || "/defaultAvatar.jpg"}
                        alt={content?.user?.name || "Author"}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-sm font-black text-slate-800 dark:text-white truncate">{content.user?.name || "Member"}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider truncate">{content.user?.position || 'Author'}</p>
                    </div>
                  </div>
                )}

                {/* Action button mock (since entire card is a link) */}
                <div className="mt-auto pt-4 flex items-center justify-between">
                   <span className="text-xs font-bold text-slate-400 uppercase tracking-widest group-hover:text-primary transition-colors">Read More</span>
                   <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300 -translate-x-2 group-hover:translate-x-0 opacity-0 group-hover:opacity-100">
                      <FaArrowRight className="text-xs" />
                   </div>
                </div>
              </div>

              {/* Decorative background element */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors pointer-events-none" />
            </Link>
          ))
        ) : (
          <div className="w-full text-center py-20 flex flex-col items-center gap-4">
             <div className="text-6xl text-slate-200 dark:text-slate-800 font-black">404</div>
             <h1 className="text-2xl font-display font-black text-slate-400">No {query.replace('-', ' ')} Found</h1>
          </div>
        )
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default ShowContents;
