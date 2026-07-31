import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import logoImg from '../assets/logo.jpg';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    // GSAP ScrollTrigger reveal for footer content
    gsap.fromTo(contentRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      }
    );
  }, []);

  return (
    <footer 
      id="contact" 
      ref={sectionRef}
      className="bg-[#030304] border-t border-white/5 pt-20 pb-12 px-6 md:px-12 relative overflow-hidden select-none"
    >
      {/* Ambient background glow */}
      <div className="absolute bottom-0 right-0 w-[40vw] h-[40vw] bg-brand-orange/5 blur-[120px] pointer-events-none rounded-full z-0"></div>

      <div 
        ref={contentRef}
        className="max-w-7xl mx-auto relative z-10 flex flex-col justify-between items-center text-center gap-12"
      >
        {/* Large Brand Logo Image */}
        <div className="space-y-4 flex flex-col items-center">
          <img 
            src={logoImg} 
            alt="Riv Studio Logo" 
            className="h-20 w-auto rounded-xl object-contain transition-transform duration-500 hover:scale-[1.05]" 
          />
          <p className="text-brand-mutedText text-sm sm:text-base font-light tracking-wide max-w-sm mx-auto">
            Bespoke web layouts for local cafes, boutique gyms, and dining bistros.
          </p>
        </div>



        {/* Footer bottom links and copyright */}
        <div className="w-full pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-brand-mutedText">
          <div>
            &copy; {new Date().getFullYear()} Riv Studio. All rights reserved.
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
