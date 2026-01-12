"use client";
import DeleteContentBtn from "@/components/Btns/DeleteContentBtn";
import Title from "@/components/Title";
import { useUserAuth } from "@/context/userAuth";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { use, useEffect, useState } from "react";
import { toast } from "react-toastify";
import "@/app/(pages)/content/style.css";
import Loading from "@/components/Loading";
import { FaCalendarAlt, FaUserEdit, FaArrowLeft, FaExternalLinkAlt } from "react-icons/fa";

const ContentOne = ({ params }: { params: Promise<{ slug: string }> }) => {
  const { userAuth } = useUserAuth();
  const [content, setContent] = useState<{
    _id: string;
    title: string;
    content: string;
    date: string;
    type: string;
    thumbnail: string;
    regUrl?: string;
    slug: string;
    userId: string;
    isApproved: boolean;
    user: { name: string; avatar: string; position?: string };
  } | null>(null);
  const [cloading, setCloading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { slug } = use(params);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        setScrollProgress((window.scrollY / scrollHeight) * 100);
      }
    };

    window.addEventListener("scroll", updateScrollProgress);
    return () => window.removeEventListener("scroll", updateScrollProgress);
  }, []);

  useEffect(() => {
    setCloading(true);
    axios
      .get(`/api/contents/${slug}`)
      .then((res) => {
        setContent(res.data);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.error || "Something went wrong");
      })
      .finally(() => {
        setCloading(false);
      });
  }, [slug]);

  if (cloading) return <Loading />;
  else if (!content) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6">
      <div className="text-8xl font-black text-slate-200 dark:text-slate-800 animate-pulse">404</div>
      <h1 className="text-2xl font-display font-black text-slate-400">Content Not Found</h1>
      <Link href="/" className="btn btn-primary btn-outline rounded-full px-8">Return Home</Link>
    </div>
  );
  else if (
    !content?.isApproved &&
    userAuth?._id !== content.userId &&
    !userAuth?.isAdmin
  ) {
    toast.error("Content not approved");
    redirect("/");
  }

  const formattedDate = new Date(content?.date).toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  return (
    <section className="w-full bg-base-100 min-h-screen pb-24 relative">
      {/* Reading Progress Bar */}
      <div className="fixed top-[64px] md:top-[68px] left-0 w-full h-1.5 z-[60] bg-transparent pointer-events-none">
        <div 
          className="h-full bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] animate-text-shimmer transition-all duration-150 ease-out shadow-[0_0_10px_rgba(var(--p),0.5)]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-10">
        {/* Back Button & Metadata */}
        <div className="flex items-center justify-between mb-10">
           <Link href="/blogs" className="group flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-slate-400 hover:text-primary transition-colors">
              <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back to Feed
           </Link>
           <div className={`px-4 py-1.5 rounded-full text-[10px] font-black tracking-[0.2em] uppercase border backdrop-blur-md shadow-sm ${
              content.type === 'event' 
                ? 'bg-accent/10 border-accent/30 text-accent' 
                : 'bg-primary/10 border-primary/30 text-primary'
            }`}>
              {content.type}
            </div>
        </div>

        {/* Content Hero */}
        <div className="max-w-4xl mx-auto space-y-10 mb-16">
          <div className="text-center space-y-6">
             <h1 className="text-4xl md:text-6xl font-black leading-tight font-display bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-primary to-slate-900 dark:from-white dark:via-primary dark:to-white bg-[length:200%_auto] animate-text-shimmer">
               {content.title}
             </h1>
             <div className="flex flex-wrap items-center justify-center gap-6 text-slate-500 font-medium">
                <div className="flex items-center gap-2">
                   <FaCalendarAlt className="text-primary/60" />
                   <span>{formattedDate}</span>
                </div>
                <div className="w-1 h-1 bg-slate-300 rounded-full hidden md:block"></div>
                <div className="flex items-center gap-2">
                   <FaUserEdit className="text-primary/60" />
                   <span>Published by {content.user.name}</span>
                </div>
             </div>
          </div>

          <div className="relative aspect-[16/9] w-full rounded-[2.5rem] overflow-hidden shadow-2xl border border-black/5 dark:border-white/5">
            <Image
              src={content?.thumbnail}
              alt={content.title}
              fill
              priority
              className="object-cover transition-transform duration-[10000ms] hover:scale-105"
              sizes="(max-width: 896px) 100vw, 896px"
              unoptimized={content?.thumbnail?.includes('ieee.org')}
            />
          </div>
        </div>

        {/* Main Article Section */}
        <div className="flex flex-col lg:flex-row gap-16">
           {/* Left: Article Content */}
           <div className="flex-1 max-w-4xl mx-auto">
              <article
                className="custom-html-content prose prose-lg dark:prose-invert max-w-none prose-headings:font-display prose-headings:font-black prose-p:leading-relaxed prose-img:rounded-3xl shadow-sm bg-base-200/30 p-8 md:p-12 rounded-[2.5rem] border border-black/5 dark:border-white/5"
                dangerouslySetInnerHTML={{ __html: content.content }}
              ></article>

              {/* Author Spotlight Card */}
              <div className="mt-16 p-8 md:p-10 rounded-[2.5rem] bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 border border-black/5 dark:border-white/5 shadow-xl relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors"></div>
                 <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                    <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-3xl overflow-hidden ring-4 ring-primary/10 shadow-lg">
                       <Image
                         src={content?.user?.avatar || "/defaultAvatar.jpg"}
                         alt={content?.user?.name}
                         fill
                         className="object-cover"
                       />
                    </div>
                    <div className="text-center md:text-left space-y-2 flex-1">
                       <h4 className="text-[10px] font-black tracking-[0.2em] text-primary uppercase">Author Spotlight</h4>
                       <h3 className="text-2xl md:text-3xl font-black text-slate-800 dark:text-white font-display uppercase">{content.user.name}</h3>
                       <p className="text-slate-500 font-medium italic">{content.user.position || "Member, IEEE University of Rajshahi"}</p>
                       <p className="text-sm text-slate-400 max-w-md">Dedicated to advancing technology for humanity through collaboration and innovation within the RU Student Branch.</p>
                    </div>
                    {(userAuth?._id === content.userId || userAuth?.isAdmin) && (
                      <div className="flex gap-3">
                        <Link
                          href={`/edit-content/${content?.slug}`}
                          className="btn btn-primary btn-outline btn-circle hover:bg-primary hover:text-white"
                          title="Edit Post"
                        >
                          <FaUserEdit />
                        </Link>
                        <DeleteContentBtn slug={content.slug} type={content.type} />
                      </div>
                    )}
                 </div>
              </div>

              {/* Action Section (e.g. For Events) */}
              {content?.regUrl && content.date >= new Date().toISOString().split("T")[0] && (
                 <div className="mt-12 text-center p-12 rounded-[3rem] bg-primary/5 border border-primary/10 space-y-6">
                    <h3 className="text-3xl font-black font-display text-slate-800 dark:text-white">Ready to join us?</h3>
                    <p className="text-slate-500 max-w-sm mx-auto font-medium">Registration is currently open for this event. Secure your spot now!</p>
                    <a
                      href={content.regUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary btn-lg rounded-full px-12 gap-3 shadow-xl shadow-primary/20 group animate-bounce"
                    >
                      Register Now <FaExternalLinkAlt className="text-xs group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </a>
                 </div>
              )}
           </div>
        </div>
      </div>
    </section>
  );
};

export default ContentOne;
