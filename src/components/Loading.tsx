"use client";
import Image from "next/image";

const Loading = () => {
  return (
    <div className="fixed inset-0 w-full h-screen bg-[#001c30] flex flex-col justify-center items-center z-[9999] overflow-hidden">
      {/* Deep Space Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute top-1/4 left-1/3 w-[300px] h-[300px] bg-accent/5 rounded-full blur-[100px] animate-pulse delay-700"></div>
      </div>

      <div className="relative flex flex-col items-center gap-12">
        {/* Futuristic Orbital Container */}
        <div className="relative flex items-center justify-center">
          {/* Orbital Rings */}
          <div className="absolute w-48 h-48 border border-primary/20 rounded-full animate-spin [animation-duration:8s]"></div>
          <div className="absolute w-56 h-56 border border-dashed border-primary/10 rounded-full animate-spin [animation-duration:12s] direction-reverse"></div>
          
          {/* Energy Core Pulse */}
          <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl scale-125 animate-pulse"></div>
          
          {/* Main Logo - Restored Brand Colors */}
          <div className="relative z-10 p-6 bg-white/5 backdrop-blur-md rounded-full border border-white/10 shadow-2xl">
            <Image
              src="/logo.png"
              alt="IEEE RUSB"
              width={140}
              height={140}
              className="relative z-10 drop-shadow-[0_0_10px_rgba(0,98,155,0.4)]"
              priority
            />
          </div>

          {/* Scanning Line Particle */}
          <div className="absolute w-[180%] h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent animate-scan-y top-0 opacity-40"></div>
        </div>

        {/* Digital Sequence Info */}
        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 bg-primary animate-ping rounded-full"></div>
              <span className="text-xs font-mono font-medium tracking-[0.5em] uppercase text-primary/80">
                Nexus Initializing
              </span>
            </div>
            <div className="text-[10px] font-mono text-primary/40 uppercase tracking-widest">
              Protocol: IEEE_STD_802.11 // System_Boot
            </div>
          </div>
          
          {/* Precision Progress Track */}
          <div className="relative w-64 h-[3px] bg-white/5 rounded-full overflow-hidden border border-white/10">
            <div className="absolute inset-y-0 bg-primary animate-progress-technical"></div>
            {/* Shimmer overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-progress-shimmer"></div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scan-y {
          0% { transform: translateY(0); opacity: 0; }
          10%, 90% { opacity: 0.4; }
          100% { transform: translateY(220px); opacity: 0; }
        }
        @keyframes progress-technical {
          0% { left: -100%; width: 30%; }
          50% { left: 40%; width: 60%; }
          100% { left: 100%; width: 20%; }
        }
        @keyframes progress-shimmer {
          100% { transform: translateX(100%); }
        }
        .animate-scan-y {
          animation: scan-y 3s infinite linear;
        }
        .animate-progress-technical {
          animation: progress-technical 2.5s infinite ease-in-out;
        }
        .animate-progress-shimmer {
          animation: progress-shimmer 2s infinite linear;
        }
        .direction-reverse {
          animation-direction: reverse;
        }
      `}</style>
    </div>
  );
};

export default Loading;
