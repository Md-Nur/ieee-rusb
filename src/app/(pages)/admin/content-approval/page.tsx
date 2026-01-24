"use client";
import ContentApprovalTable from "@/components/Admin/ContentApprovalTable";
import Title from "@/components/Title";
import connectDB from "@/lib/dbConnect";
import ContentModel from "@/models/content.model";
import UserModel from "@/models/user.model";
import React, { useState, useEffect } from "react";
import { FaClipboardList } from "react-icons/fa";

export const dynamic = "force-dynamic";

const ContentApproval = async () => {
  await connectDB();
  const _ = UserModel;

  const contents = await ContentModel.find({ isApproved: false })
    .sort({ date: -1 })
    .populate("userId", "name avatar dept designation")
    .lean();

  const serializedContents = contents.map(content => ({
    ...content,
    _id: content._id.toString(),
    userId: (content.userId as any)?._id?.toString() || (content.userId as any)?.toString(),
    user: content.userId ? {
        name: (content.userId as any).name,
        avatar: (content.userId as any).avatar,
        dept: (content.userId as any).dept,
        designation: (content.userId as any).designation,
    } : null
  }));

  return (
    <div className="min-h-screen bg-slate-950 py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
           <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full text-accent font-black text-[10px] tracking-[0.3em] uppercase mb-4 border border-accent/20">
              <FaClipboardList /> Moderation Queue
           </div>
           <Title className="!text-white !my-0 !p-0 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
             Content Approval
           </Title>
           <p className="text-slate-400 mt-4 font-medium tracking-wide">
             Review and authorize pending community contributions.
           </p>
        </div>

        {/* @ts-ignore */}
        <ContentApprovalTable initialContents={serializedContents} />
      </div>
    </div>
  );
};

export default ContentApproval;
