"use client";
import React, { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

/**
 * A smart navigation progress bar that only shows when navigation
 * takes longer than a threshold (150ms). This prevents the bar from
 * appearing on fast client-side navigations while still providing
 * feedback for slower SSR fetches.
 */
const ProgressBar = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let delayTimer: NodeJS.Timeout;
    let hideTimer: NodeJS.Timeout;

    // Only show loading bar if navigation takes longer than 150ms
    delayTimer = setTimeout(() => {
      setLoading(true);
      
      // Auto-hide after 600ms max
      hideTimer = setTimeout(() => {
        setLoading(false);
      }, 600);
    }, 150);

    // Cleanup function - navigation completed
    return () => {
      clearTimeout(delayTimer);
      clearTimeout(hideTimer);
      setLoading(false);
    };
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
          animation: progress-trickle 0.8s cubic-bezier(0.1, 0.5, 0.5, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default ProgressBar;
