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
    // When the path or search params change, it means navigation has occurred or started.
    // We can use this to pulse a loading bar.
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  if (!loading) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[10000] pointer-events-none">
      <div className="h-1 bg-primary shadow-[0_0_10px_rgba(var(--p),0.5)] origin-left animate-progress-fast"></div>
      <style jsx>{`
        @keyframes progress-fast {
          0% { transform: scaleX(0); opacity: 1; }
          20% { transform: scaleX(0.3); }
          50% { transform: scaleX(0.7); }
          80% { transform: scaleX(0.9); }
          100% { transform: scaleX(1); opacity: 0; }
        }
        .animate-progress-fast {
          animation: progress-fast 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default ProgressBar;
