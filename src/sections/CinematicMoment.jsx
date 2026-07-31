import React from 'react';
import { motion } from 'framer-motion';

const sentence = "We build digital doors for physical businesses that mean business.";
const words = sentence.split(" ");

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    }
  }
};

const wordVariants = {
  hidden: { 
    opacity: 0.15,
    y: 8,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  }
};

export default function CinematicMoment() {
  return (
    <section className="relative min-h-[50vh] flex items-center justify-center py-24 px-6 md:px-12 bg-black overflow-hidden border-y border-white/5">
      
      {/* Moving grid background */}
      <div className="absolute inset-0 grid-bg opacity-[0.15] pointer-events-none z-0"></div>
      
      {/* Slow rotating radial gradient (cinematic Papaya Orange glow) */}
      <motion.div
        animate={{
          rotate: 360,
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] rounded-full bg-[radial-gradient(circle_at_center,_rgba(255,85,0,0.035)_0%,_transparent_70%)] blur-3xl pointer-events-none z-0"
      />

      <div className="max-w-5xl mx-auto w-full relative z-10 text-center">
        {/* Word-by-word scroll-triggered text reveal */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-120px" }}
          className="flex flex-wrap items-center justify-center gap-x-[0.35em] gap-y-3"
        >
          {words.map((word, index) => {
            const isHighlight = word.toLowerCase().includes("business.") || word.toLowerCase().includes("business");
            return (
              <motion.span
                key={index}
                variants={wordVariants}
                className={`font-sora font-extrabold text-2xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight leading-none uppercase ${
                  isHighlight ? 'text-brand-orange' : 'text-white'
                }`}
              >
                {word}
              </motion.span>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
