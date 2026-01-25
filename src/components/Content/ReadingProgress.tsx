"use client";
import { motion, useScroll, useSpring } from "framer-motion";

const ReadingProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div 
      className="fixed top-[64px] md:top-[68px] left-0 right-0 h-1.5 z-[100] bg-transparent pointer-events-none overflow-hidden origin-left"
      style={{ scaleX }}
    >
      <div 
        className="h-full w-full bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] animate-text-shimmer shadow-[0_0_10px_rgba(var(--p),0.5)]"
      />
    </motion.div>
  );
};

export default ReadingProgress;
