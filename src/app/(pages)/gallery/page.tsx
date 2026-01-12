"use client";
import Loading from "@/components/Loading";
import Title from "@/components/Title";
import { Photos } from "@/models/photos.model";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FaTimes, FaExpandAlt, FaCalendarAlt } from "react-icons/fa";

const GalleryPage = () => {
  const [images, setImages] = useState<Photos[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<Photos | null>(null);

  useEffect(() => {
    axios
      .get("/api/img")
      .then((res) => {
        setImages(res.data);
      })
      .catch((error) => {
        toast.error(error?.response?.data?.error || "Something went wrong");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Close lightbox on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedImage(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <section className="w-full bg-base-100 min-h-screen pb-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-10">
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
           <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 rounded-full text-primary font-black text-[10px] tracking-[0.2em] uppercase border border-primary/20">
              Visual Chronicles
           </div>
           <Title className="!my-0 !p-0">Capturing Innovation</Title>
           <p className="text-slate-500 font-medium max-w-2xl">Exploring the milestones, workshops, and vibrant community moments of the IEEE University of Rajshahi Student Branch.</p>
        </div>

        {loading ? (
          <Loading />
        ) : !images.length ? (
          <div className="w-full text-center py-24 flex flex-col items-center gap-6">
             <div className="text-9xl font-black text-slate-100 dark:text-slate-900 select-none">EMPTY</div>
             <h2 className="text-2xl font-display font-black text-slate-400">No photos available yet</h2>
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8 animate-fade-in">
            {images.map((image, i) => (
              <div 
                className="break-inside-avoid group relative rounded-[2rem] overflow-hidden cursor-pointer bg-slate-100 dark:bg-slate-900 border border-black/5 dark:border-white/5 shadow-lg hover:shadow-2xl transition-all duration-500"
                key={image?._id?.toString() || i}
                onClick={() => setSelectedImage(image)}
              >
                {/* Image Component */}
                <Image
                  width={800}
                  height={1200}
                  src={image.img}
                  alt={image.title}
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                  unoptimized={image.img.includes('ieee.org')}
                />

                {/* Technical Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                   <div className="absolute top-6 right-6 p-3 bg-white/20 backdrop-blur-md rounded-2xl text-white transform translate-y-4 group-hover:translate-y-0 transition-transform">
                      <FaExpandAlt className="text-xl" />
                   </div>
                   
                   <div className="space-y-3 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                      <div className="h-1 w-12 bg-primary rounded-full"></div>
                      <h3 className="text-xl font-black text-white font-display leading-tight">{image.title}</h3>
                      <div className="flex items-center gap-2 text-white/60 text-xs font-bold uppercase tracking-widest tabular-nums">
                         <FaCalendarAlt className="text-primary" />
                         {new Date(image.date).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </div>
                   </div>
                </div>

                {/* Shimmer Scan Line */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity">
                   <div className="w-full h-[2px] bg-primary/40 shadow-[0_0_15px_rgba(var(--p),0.5)] absolute top-0 animate-gallery-scan"></div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 animate-fade-in">
           <div 
             className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl"
             onClick={() => setSelectedImage(null)}
           />
           
           <div className="relative max-w-6xl w-full h-full flex flex-col items-center justify-center gap-8">
              {/* Close Button */}
              <button 
                className="absolute -top-4 -right-4 md:top-0 md:-right-12 p-4 text-white/50 hover:text-white transition-colors"
                onClick={() => setSelectedImage(null)}
              >
                <FaTimes className="text-3xl" />
              </button>

              {/* Magnified Image */}
              <div className="relative w-full h-[70vh] md:h-[80vh] rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/5">
                <Image
                  src={selectedImage.img}
                  alt={selectedImage.title}
                  fill
                  className="object-contain"
                  unoptimized={selectedImage.img.includes('ieee.org')}
                />
              </div>

              {/* Lightbox Info */}
              <div className="text-center space-y-3 max-w-2xl px-4 animate-fade-in-up">
                 <h2 className="text-3xl md:text-5xl font-black text-white font-display leading-tight">{selectedImage.title}</h2>
                 <div className="flex items-center justify-center gap-4 text-slate-400 font-bold uppercase tracking-[0.2em] text-sm">
                    <span className="text-primary">{new Date(selectedImage.date).toLocaleDateString('en-US', { day: '2-digit', month: 'long', year: 'numeric' })}</span>
                    <span className="w-1.5 h-1.5 bg-slate-700 rounded-full"></span>
                    <span>IEEE RU Student Branch</span>
                 </div>
              </div>
           </div>
        </div>
      )}

      <style jsx>{`
        @keyframes gallery-scan {
          0% { top: -10%; }
          100% { top: 110%; }
        }
        .animate-gallery-scan {
          animation: gallery-scan 3s linear infinite;
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.7s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default GalleryPage;
