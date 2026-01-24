"use client";
import { useEffect, useState } from "react";

const ReadingProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        setScrollProgress((window.scrollY / scrollHeight) * 100);
      }
    };

    window.addEventListener("scroll", updateScrollProgress);
    return () => window.removeEventListener("scroll", updateScrollProgress);
  }, []);

  return (
    <div className="fixed top-[64px] md:top-[68px] left-0 w-full h-1.5 z-[60] bg-transparent pointer-events-none">
      <div 
        className="h-full bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] animate-text-shimmer transition-all duration-150 ease-out shadow-[0_0_10px_rgba(var(--p),0.5)]"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
};

export default ReadingProgress;
