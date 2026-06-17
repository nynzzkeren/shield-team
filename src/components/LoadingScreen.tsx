"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const PROFILE_IMAGE = "https://cdn.discordapp.com/attachments/1515588648639266966/1516436635988791447/IMG-20260615-WA0070.jpg?ex=6a32a32c&is=6a3151ac&hm=abcedd356fd74f7d6f4641a8f6ec76656e753b84bde155ef2f5b1b964925bc36&";

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setLoading(false), 500);
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050508]"
        >
          {/* Increased size container */}
          <div className="relative w-48 h-48 mb-10">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="96"
                cy="96"
                r="90"
                fill="none"
                stroke="rgba(255,255,255,0.05)"
                strokeWidth="6"
              />
              <motion.circle
                cx="96"
                cy="96"
                r="90"
                fill="none"
                stroke="#8b5cf6"
                strokeWidth="6"
                strokeDasharray="565"
                initial={{ strokeDashoffset: 565 }}
                animate={{ strokeDashoffset: 565 - (progress / 100) * 565 }}
              />
            </svg>
            
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-full">
              {/* Profile image with clipping mask effect */}
              <motion.img
                src={PROFILE_IMAGE}
                className="w-40 h-40 rounded-full object-cover"
                style={{
                  clipPath: `inset(${100 - progress}% 0 0 0)`, // Reveals image from bottom to top
                }}
              />
            </div>
          </div>

          {/* Glitch effect on text */}
          <motion.div
            className="text-white text-5xl font-black tracking-tighter"
            animate={{
              x: [0, -2, 2, -2, 0],
              opacity: [1, 0.8, 1],
            }}
            transition={{
              duration: 0.2,
              repeat: Infinity,
              repeatDelay: 2,
            }}
          >
            {Math.round(progress)}%
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
