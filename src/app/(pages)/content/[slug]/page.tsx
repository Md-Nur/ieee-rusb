import ContentActions from "@/components/Content/ContentActions";
import ReadingProgress from "@/components/Content/ReadingProgress";
import AuthCheck from "@/components/Content/AuthorizationCheck"; // We will create this
import connectDB from "@/lib/dbConnect";
import ContentModel from "@/models/content.model";
import UserModel from "@/models/user.model";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import "@/app/(pages)/content/style.css";
import { FaCalendarAlt, FaUserEdit, FaArrowLeft, FaExternalLinkAlt } from "react-icons/fa";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  await connectDB();
  const content = await ContentModel.findOne({ slug }).lean();

  if (!content) {
    return {
      title: "Content Not Found",
    };
  }

  return {
    title: content.title,
    description: content.content.substring(0, 160).replace(/<[^>]*>/g, ""), // Strip HTML for description
    openGraph: {
      title: content.title,
      description: content.content.substring(0, 160).replace(/<[^>]*>/g, ""),
      images: [content.thumbnail],
      type: "article",
    },
  };
}

const ContentOne = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug: rawSlug } = await params;
  const slug = decodeURIComponent(rawSlug);
  await connectDB();
  
  // Ensure User model is registered
  const _ = UserModel;

  const contentDoc = await ContentModel.findOne({ slug })
    .populate("userId", "name avatar position")
    .lean();

  if (!contentDoc) {
    return notFound();
  }

  // Serialize for passing to client components
  const content = {
    ...contentDoc,
    _id: contentDoc._id.toString(),
    userId: (contentDoc.userId as any)?._id?.toString() || (contentDoc.userId as any)?.toString(),
    user: contentDoc.userId ? {
       // @ts-ignore
       name: (contentDoc.userId as any).name,
        // @ts-ignore
       avatar: (contentDoc.userId as any).avatar,
        // @ts-ignore
       position: (contentDoc.userId as any).position
    } : { name: "Unknown", avatar: "", position: "" },
  };

  const formattedDate = new Date(content.date).toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  return (
    <section className="w-full bg-base-100 min-h-screen pb-24 relative overflow-x-hidden">
      <ReadingProgress />
      <AuthCheck isApproved={content.isApproved} contentUserId={content.userId.toString()} />

      <div className="max-w-7xl mx-auto px-4 md:px-12 pt-10">
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
        <div className="max-w-4xl mx-auto space-y-10 mb-16 px-2 md:px-0">
          <div className="text-center space-y-6">
             <h1 className="text-3xl md:text-6xl font-black leading-tight font-display bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-primary to-slate-900 dark:from-white dark:via-primary dark:to-white bg-[length:200%_auto] animate-text-shimmer">
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

          <div className="relative aspect-[16/9] w-full rounded-2xl md:rounded-[2.5rem] overflow-hidden shadow-2xl border border-black/5 dark:border-white/5">
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
                className="custom-html-content prose prose-lg dark:prose-invert max-w-none prose-headings:font-display prose-headings:font-black prose-p:leading-relaxed prose-img:rounded-3xl shadow-sm bg-base-200/30 p-6 md:p-12 rounded-3xl md:rounded-[2.5rem] border border-black/5 dark:border-white/5"
                dangerouslySetInnerHTML={{ __html: content.content }}
              ></article>

              {/* Author Spotlight Card */}
              <div className="mt-16 p-6 md:p-10 rounded-3xl md:rounded-[2.5rem] bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 border border-black/5 dark:border-white/5 shadow-xl relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors"></div>
                 <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                    <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-2xl md:rounded-3xl overflow-hidden ring-4 ring-primary/10 shadow-lg">
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
                    <ContentActions contentSlug={content.slug} contentUserId={content.userId.toString()} contentType={content.type} />
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
