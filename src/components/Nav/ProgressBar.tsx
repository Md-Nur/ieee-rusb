"use client";
import React, { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

/**
 * A simple navigation progress bar that provides immediate feedback 
 * when the URL changes. In Next.js App Router, this helps with SSR latency.
 */
const ProgressBar = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  if (!loading) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[10000] pointer-events-none">
      <div className="h-[3px] bg-primary relative w-full origin-left animate-progress-trickle">
        {/* Glow effect */}
        <div className="absolute right-0 top-0 h-full w-24 bg-primary blur-md shadow-[0_0_15px_#00629b,0_0_30px_#00629b]"></div>
      </div>
      <style jsx>{`
        @keyframes progress-trickle {
          0% { transform: scaleX(0); opacity: 1; }
          15% { transform: scaleX(0.1); }
          30% { transform: scaleX(0.35); }
          45% { transform: scaleX(0.5); }
          60% { transform: scaleX(0.75); }
          85% { transform: scaleX(0.92); opacity: 1; }
          100% { transform: scaleX(1); opacity: 0; }
        }
        .animate-progress-trickle {
          animation: progress-trickle 1.5s cubic-bezier(0.1, 0.5, 0.5, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default ProgressBar;
