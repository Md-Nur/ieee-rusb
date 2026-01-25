import ContentActions from "@/components/Content/ContentActions";
import ReadingProgress from "@/components/Content/ReadingProgress";
import AuthCheck from "@/components/Content/AuthorizationCheck";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import "@/app/(pages)/content/style.css";
import { FaCalendarAlt, FaUserEdit, FaArrowLeft, FaExternalLinkAlt } from "react-icons/fa";
import { Metadata } from "next";
import { serializeData } from "@/lib/serialize";
import { getBaseUrl } from "@/lib/api-utils";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  
  try {
    const res = await fetch(`${getBaseUrl()}/api/contents/${slug}`, {
      next: { revalidate: 3600 }
    });
    
    if (!res.ok) {
      return { title: "Content Not Found" };
    }

    const content = await res.json();

    return {
      title: content.title,
      description: content.content ? content.content.substring(0, 160).replace(/<[^>]*>/g, "") : "",
      openGraph: {
        title: content.title,
        description: content.content ? content.content.substring(0, 160).replace(/<[^>]*>/g, "") : "",
        images: [content.thumbnail],
        type: "article",
      },
      // alternates: {
      //   canonical: `https://ieee-rusb.org/content/${slug}`,
      // }
    };
  } catch (error) {
    return { title: "Error" };
  }
}

const ContentOne = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug: rawSlug } = await params;
  const slug = decodeURIComponent(rawSlug);
  
  let content;
  
  try {
     const res = await fetch(`${getBaseUrl()}/api/contents/${slug}`, {
       next: { revalidate: 3600 }
     });
     
     if (!res.ok) {
       return notFound();
     }
     
     content = await res.json();
  } catch (error) {
    console.error("Error fetching content:", error);
    return notFound();
  }

  // Ensure content exists
  if (!content) return notFound();

  // API returns serialized JSON, but we might ensure it matches what client components expect.
  // The API result includes 'user' object from lookup.
  
  // No need to manually serialize if API returns JSON, but let's be safe.
  content = serializeData(content);

  const formattedDate = content.date ? new Date(content.date).toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  }) : "";
  
  // API returns userId as string in 'userId' or populated 'user._id'. 
  // Let's ensure compatibility.
  const contentUserId = content.userId || content.user?._id || "";// In the API response, content.user is populated.

  return (
    <section className="w-full bg-base-100 min-h-screen pb-24 relative overflow-x-hidden">
      <ReadingProgress />
      <AuthCheck isApproved={content.isApproved} contentUserId={contentUserId} />

      <div className="max-w-7xl mx-auto md:px-12 pt-6 md:pt-10">
        {/* Back Button & Metadata */}
        <div className="flex items-center justify-between mb-6 md:mb-10 px-4 md:px-0">
           <Link href={content.type === 'event' ? "/all-events" : "/blogs"} className="group flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-slate-400 hover:text-primary transition-colors">
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
        <div className="max-w-4xl mx-auto space-y-6 md:space-y-10 mb-8 md:mb-16">
          <div className="text-center space-y-6 px-4 md:px-0">
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
                   <span>Published by {content.user?.name || "Unknown"}</span>
                </div>
             </div>
          </div>

          <div className="relative w-full min-h-[300px] md:min-h-[400px] max-h-[1000px] md:rounded-[2.5rem] overflow-hidden shadow-2xl border-y md:border border-black/5 dark:border-white/5 bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 group">
            {/* Thumbnail Image - Full Display */}
            <div className="relative w-full h-full">
              <Image
                src={content?.thumbnail}
                alt={content.title}
                width={1200}
                height={1000}
                priority
                className="w-full h-auto object-contain transition-all duration-700 group-hover:scale-[1.02] group-hover:brightness-105"
                sizes="(max-width: 896px) 100vw, 896px"
                unoptimized={content?.thumbnail?.includes('ieeerusb.org')}
              />
            </div>
            {/* Decorative corner accents */}
            <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-primary/20 rounded-tl-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-primary/20 rounded-br-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
        </div>

        {/* Main Article Section */}
        <div className="flex flex-col lg:flex-row gap-0 md:gap-16">
           {/* Left: Article Content */}
           <div className="flex-1 max-w-4xl mx-auto">
              <article
                className="custom-html-content prose prose-lg dark:prose-invert max-w-none prose-headings:font-display prose-headings:font-black prose-p:leading-relaxed prose-img:rounded-3xl shadow-sm bg-base-200/30 px-4 py-8 md:p-12 md:rounded-[2.5rem] border-y md:border border-black/5 dark:border-white/5 overflow-x-hidden"
                dangerouslySetInnerHTML={{ __html: content.content }}
              ></article>

              {/* Author Spotlight Card */}
              <div className="mt-0 md:mt-16 p-6 md:p-10 md:rounded-[2.5rem] bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 border-y md:border border-black/5 dark:border-white/5 shadow-xl relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors"></div>
                 <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                    <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-2xl md:rounded-3xl overflow-hidden ring-4 ring-primary/10 shadow-lg">
                       <Image
                         src={content?.user?.avatar || "/defaultAvatar.jpg"}
                         alt={content?.user?.name || "Author"}
                         fill
                         className="object-cover"
                       />
                    </div>
                    <div className="text-center md:text-left space-y-2 flex-1">
                       <h4 className="text-[10px] font-black tracking-[0.2em] text-primary uppercase">Author Spotlight</h4>
                       <h3 className="text-2xl md:text-3xl font-black text-slate-800 dark:text-white font-display uppercase">{content.user?.name || "Unknown Author"}</h3>
                       <p className="text-slate-500 font-medium italic">{content.user?.position || "Member, IEEE University of Rajshahi"}</p>
                       <p className="text-sm text-slate-400 max-w-md">Dedicated to advancing technology for humanity through collaboration and innovation within the RU Student Branch.</p>
                    </div>
                    <ContentActions contentSlug={content.slug} contentUserId={contentUserId} contentType={content.type} />
                 </div>
              </div>

              {/* Action Section (e.g. For Events) */}
              {content?.regUrl && content.date >= new Date().toISOString().split("T")[0] && (
                 <div className="mt-0 md:mt-12 text-center p-8 md:p-12 md:rounded-[3rem] bg-primary/5 border-y md:border border-primary/10 space-y-6">
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
