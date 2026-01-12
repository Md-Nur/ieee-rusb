"use client";
import Content from "@/components/Content";
import axios from "axios";
import { use, useEffect, useState } from "react";
import Loading from "@/components/Loading";
import Title from "@/components/Title";
import { toast } from "react-toastify";

import { Content as ContentType } from "@/models/content.model";

import { useUserAuth } from "@/context/userAuth";
import { useRouter } from "next/navigation";

const EditContent = ({ params }: { params: Promise<{ slug: string }> }) => {
  const { userAuth } = useUserAuth();
  const router = useRouter();
  const { slug } = use(params);
  const [content, setContent] = useState<ContentType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/api/contents/${slug}`)
      .then((res) => {
        setContent(res.data);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.error || "Failed to fetch content");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [slug]);

  // Security Check: Only Admin or Author can edit
  useEffect(() => {
    if (!loading && content && userAuth) {
      if (userAuth._id !== content.userId && !userAuth.isAdmin) {
        toast.error("Unauthorized: Scientific access denied.");
        router.push("/");
      }
    } else if (!loading && !userAuth) {
      router.push("/login");
    }
  }, [loading, content, userAuth, router]);

  if (loading) return <Loading />;
  if (!content) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6">
      <div className="text-8xl font-black text-slate-200 dark:text-slate-800 animate-pulse">404</div>
      <h1 className="text-2xl font-display font-black text-slate-400 uppercase tracking-widest">Entry Not Found</h1>
      <button onClick={() => router.back()} className="btn btn-primary btn-outline rounded-full px-8">Return to Control</button>
    </div>
  );

  return (
    <div className="w-full bg-base-100 min-h-screen pb-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-16">
        <div className="text-center space-y-4 mb-16">
           <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent/10 rounded-full text-accent font-black text-[10px] tracking-[0.2em] uppercase border border-accent/20">
              Technical Workbench
           </div>
           <h1 className="text-4xl md:text-6xl font-black leading-tight font-display bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-primary to-slate-900 dark:from-white dark:via-primary dark:to-white bg-[length:200%_auto] animate-text-shimmer">
             Edit {content.type}
           </h1>
           <p className="text-slate-500 font-medium max-w-xl mx-auto italic">REFINING: "{content.title}"</p>
        </div>
        
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
           <Content postData={content} type={content.type} />
        </div>
      </div>
    </div>
  );
};

export default EditContent;
