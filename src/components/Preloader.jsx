import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logoImg from '../assets/logo.jpg';

export default function Preloader({ onComplete }) {
  const [count, setCount] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Fast loading count logic (wow effect)
    const duration = 1600; // Total count up takes 1.6s
    const intervalTime = 16; // ~60fps updates
    const step = 100 / (duration / intervalTime);
    
    let currentCount = 0;
    const timer = setInterval(() => {
      currentCount += step + Math.random() * 4; // Add slight randomness for premium feel
      if (currentCount >= 100) {
        setCount(100);
        clearInterval(timer);
        
        // Hold 100% briefly, then slide up out of view
        setTimeout(() => {
          setIsExiting(true);
        }, 300);
      } else {
        setCount(Math.floor(currentCount));
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {!isExiting && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ 
            y: "-100%",
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 bg-[#050506] z-[99999] flex flex-col justify-between p-8 md:p-16 select-none"
        >
          {/* Top Logo */}
          <div className="flex justify-between items-center text-xs font-bold tracking-widest text-[#FF5500] uppercase font-sora">
            <img src={logoImg} alt="Riv Studio Logo" className="h-6 w-auto object-contain rounded" />
            <span>Est. 2026</span>
          </div>

          {/* Center Giant Percentage Loader */}
          <div className="flex flex-col items-start text-left">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-white/30 mb-2">
              Loading portfolio engine
            </span>
            <div className="font-sora font-extrabold text-[20vw] leading-none text-white flex items-baseline select-none">
              {String(count).padStart(3, '0')}
              <span className="text-[#FF5500] text-[8vw] font-light">%</span>
            </div>
          </div>

          {/* Bottom Info bar */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 text-[10px] text-white/40 tracking-wider uppercase font-medium border-t border-white/5 pt-6 font-mono">
            <div>
              Creating bespoke digital stages for physical brands
            </div>
            <div>
              &copy; {new Date().getFullYear()} Riv Studio / All Rights Reserved
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
