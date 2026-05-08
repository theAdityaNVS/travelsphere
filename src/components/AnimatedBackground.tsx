"use client";

import { motion } from "framer-motion";

export function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-indigo-500/20 rounded-full blur-[120px] dark:bg-indigo-500/10"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          x: [0, -40, 0],
          y: [0, 60, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-[20%] -right-[10%] w-[35%] h-[35%] bg-emerald-500/20 rounded-full blur-[100px] dark:bg-emerald-500/10"
      />
      <motion.div
        animate={{
          scale: [1, 1.5, 1],
          x: [0, 30, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute -bottom-[10%] left-[20%] w-[50%] h-[50%] bg-cyan-500/20 rounded-full blur-[150px] dark:bg-cyan-500/10"
      />
      
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.02] dark:opacity-[0.05]"></div>
    </div>
  );
}
