"use client";
import Image from "next/image";

const Loading = () => {
  return (
    <div className="fixed inset-0 w-full h-screen bg-white dark:bg-slate-950 flex flex-col justify-center items-center overflow-hidden z-[9999]">
      {/* Decorative Circuit Background (SVG or CSS Patterns could go here) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative flex flex-col items-center gap-8">
        {/* Animated Logo Container */}
        <div className="relative group">
          {/* Outer Pulse Rings */}
          <div className="absolute inset-0 rounded-full bg-primary/20 scale-150 blur-2xl animate-pulse"></div>
          <div className="absolute inset-0 rounded-full bg-accent/10 scale-125 blur-xl animate-pulse delay-700"></div>
          
          <div className="relative overflow-hidden p-4">
            <Image
              src="/logo.png"
              alt="IEEE RUSB"
              width={220}
              height={220}
              className="relative z-10 animate-fade-in-up duration-1000 grayscale dark:invert brightness-110 drop-shadow-[0_0_15px_rgba(var(--p),0.3)]"
              priority
            />
            
            {/* Digital Scanner Bar */}
            <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent shadow-[0_0_10px_#00629b] animate-scan z-20"></div>
          </div>
        </div>

        {/* Loading Info */}
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-mono font-bold tracking-[0.3em] uppercase text-primary animate-pulse">
              System Initializing
            </span>
            <span className="flex gap-1">
              <span className="w-1 h-1 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></span>
              <span className="w-1 h-1 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></span>
              <span className="w-1 h-1 bg-primary rounded-full animate-bounce"></span>
            </span>
          </div>
          
          {/* Subtle Progress Track */}
          <div className="w-48 h-1 bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden border border-slate-200 dark:border-slate-800">
            <div className="h-full bg-gradient-to-r from-primary to-accent w-full origin-left animate-progress-shimmer"></div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scan {
          0%, 100% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          50% { top: 100%; }
        }
        @keyframes progress-shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-scan {
          animation: scan 3s ease-in-out infinite;
        }
        .animate-progress-shimmer {
          animation: progress-shimmer 2s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default Loading;
