import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Flame, Zap, ChevronDown } from 'lucide-react';
import BlobCanvas from '../components/BlobCanvas';

const marqueeItems = [
  "Boutique Gyms", "Neighborhood Cafes", "Local Retail Shops", "Fine Dining Bistros",
  "Boutique Gyms", "Neighborhood Cafes", "Local Retail Shops", "Fine Dining Bistros"
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    }
  }
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] }
  }
};

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-between pt-28 pb-6 overflow-hidden bg-brand-darkBg select-none">
      
      {/* 3D Distorted WebGL Blob Canvas (Z-Index 10) */}
      <BlobCanvas />

      {/* Background radial spotlight */}
      <div className="absolute top-[20%] left-[20%] w-[65vw] h-[400px] bg-brand-orange opacity-[0.02] blur-[150px] pointer-events-none rounded-full z-0"></div>

      {/* Content wrapper */}
      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 relative flex-1 flex flex-col justify-center">
        
        {/* Entrance Animation Timeline */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl text-left"
        >
          {/* Badge */}
          <motion.div 
            variants={fadeUpVariants}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-brand-orange uppercase tracking-widest mb-8 shadow-md relative z-[30]"
          >
            <Zap size={12} className="fill-brand-orange text-brand-orange" />
            <span>Websites that convert</span>
          </motion.div>

          {/* 
            Headline Occlusion Layering:
            - Line 1 sits in front of the blob (z-[30])
            - Line 2 sits behind the blob (z-[5])
            - Line 3 sits in front of the blob (z-[30])
          */}
          <div className="space-y-1 mb-8">
            <div className="overflow-visible relative z-[30]">
              <motion.h1 
                variants={fadeUpVariants}
                className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[1.05] font-sora text-white"
              >
                Websites that make your
              </motion.h1>
            </div>
            
            <div className="overflow-visible relative z-[5]">
              <motion.h1 
                variants={fadeUpVariants}
                className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[1.05] font-sora text-white"
              >
                business look like it
              </motion.h1>
            </div>
            
            <div className="overflow-visible relative z-[30]">
              <motion.h1 
                variants={fadeUpVariants}
                className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[1.05] font-sora text-brand-orange"
              >
                means business.
              </motion.h1>
            </div>
          </div>

          {/* Subheading text */}
          <motion.p 
            variants={fadeUpVariants}
            className="text-lg md:text-xl text-brand-mutedText font-light max-w-2xl leading-relaxed mb-10 relative z-[30]"
          >
            No template layouts. We build custom web spaces for local cafés, strength gyms, and restaurants designed to elevate physical brands.
          </motion.p>

          {/* Pitch bullets list */}
          <motion.div 
            variants={fadeUpVariants}
            className="flex flex-col sm:flex-row flex-wrap gap-x-8 gap-y-4 pt-6 border-t border-white/5 text-xs text-brand-mutedText font-medium w-full relative z-[30]"
          >
            <div className="flex items-center gap-1.5 hover:text-brand-orange hover:translate-x-1.5 transition-all duration-300 cursor-pointer">
              <ShieldCheck size={16} className="text-brand-orange" />
              Direct developer partnership
            </div>
            <div className="flex items-center gap-1.5 hover:text-brand-orange hover:translate-x-1.5 transition-all duration-300 cursor-pointer">
              <Flame size={16} className="text-brand-orange" />
              Handcrafted custom layout design
            </div>
            <div className="flex items-center gap-1.5 hover:text-brand-orange hover:translate-x-1.5 transition-all duration-300 cursor-pointer">
              <Zap size={16} className="text-brand-orange" />
              Stark high-contrast aesthetics
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <div 
        className="flex flex-col items-center justify-center gap-1 text-[10px] uppercase font-bold tracking-widest text-brand-mutedText opacity-70 my-2 select-none cursor-pointer relative z-[30]"
        onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span>Our Services</span>
        <ChevronDown size={14} className="animate-bounce text-brand-orange" />
      </div>

      {/* Infinite Marquee */}
      <div className="w-full bg-[#0E0E10] border-y border-white/5 py-4 overflow-hidden relative select-none z-[30]">
        <div className="animate-marquee-ticker flex gap-12 text-white/50 font-sora font-extrabold text-xs sm:text-sm tracking-[0.2em] uppercase items-center">
          {marqueeItems.map((item, idx) => (
            <div key={idx} className="flex items-center gap-12 whitespace-nowrap">
              <span>{item}</span>
              <span className="text-brand-orange text-sm">•</span>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
