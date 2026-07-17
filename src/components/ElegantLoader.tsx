import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface ElegantLoaderProps {
  onComplete: () => void;
}

export default function ElegantLoader({ onComplete }: ElegantLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Elegant incremental progress simulation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Speed up at the beginning, slow down, then finish
        const increment = Math.random() * 15 + 5;
        return Math.min(prev + increment, 100);
      });
    }, 120);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      const timeout = setTimeout(() => {
        setIsVisible(false);
        // Delay onComplete callback to allow exit animation to complete
        const finishTimeout = setTimeout(() => {
          onComplete();
        }, 600);
        return () => clearTimeout(finishTimeout);
      }, 400);

      return () => clearTimeout(timeout);
    }
  }, [progress, onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          id="elegant-loader"
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-stone-100"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
        >
          <div className="flex flex-col items-center max-w-xs w-full px-6">
            {/* Monogram Monolith */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="text-center">
                <span className="font-serif text-5xl md:text-6xl font-light tracking-widest text-amber-500">
                  7L
                </span>
                <p className="font-serif text-xs uppercase tracking-[0.3em] text-stone-400 mt-2">
                  7 Lenz
                </p>
              </div>
            </motion.div>

            {/* Slogan */}
            <motion.div
              className="text-center mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <span className="font-serif text-sm italic tracking-wider text-stone-300">
                "Crafting Timeless Memories Through Art & Emotion"
              </span>
            </motion.div>

            {/* Micro Progress Bar */}
            <div className="w-full h-[1px] bg-stone-800 relative overflow-hidden">
              <motion.div
                className="h-full bg-amber-500/80 absolute left-0 top-0"
                style={{ width: `${progress}%` }}
                transition={{ ease: "easeInOut" }}
              />
            </div>

            {/* Counter */}
            <motion.span 
              className="font-mono text-[10px] text-stone-500 tracking-widest mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {Math.round(progress)}%
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
