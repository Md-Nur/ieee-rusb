import ContentApprovalTable from "@/components/Admin/ContentApprovalTable";
import Title from "@/components/Title";

export const metadata = {
  title: "Content Approval",
};
import React from "react";
import { FaClipboardList } from "react-icons/fa";

export const dynamic = "force-dynamic";

const ContentApproval = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_URL?.startsWith("http") 
    ? process.env.NEXT_PUBLIC_URL 
    : `http://${process.env.NEXT_PUBLIC_URL}`;
  
  const res = await fetch(`${baseUrl}/api/contents?approved=false`, {
    cache: "no-store",
  });

  let contents = [];
  if (res.ok) {
    contents = await res.json();
  } else {
    console.error("Failed to fetch unapproved content");
  }

  return (
    <div className="">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
           <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full text-accent font-black text-[10px] tracking-[0.3em] uppercase mb-4 border border-accent/20">
              <FaClipboardList /> Moderation Queue
           </div>
           <Title className="!my-0 !p-0 bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 dark:from-white dark:via-slate-200 dark:to-white bg-clip-text text-transparent animate-text-shimmer drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
             Content Approval
           </Title>
           <p className="text-slate-600 dark:text-slate-400 mt-4 font-medium tracking-wide">
             Review and authorize pending community contributions.
           </p>
        </div>

        {/* @ts-ignore */}
        <ContentApprovalTable initialContents={contents} />
      </div>
    </div>
  );
};

export default ContentApproval;
