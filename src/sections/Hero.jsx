import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ShieldCheck, Flame, Zap, ChevronDown } from 'lucide-react';
import ThreeCanvas from '../components/ThreeCanvas';
import logoImg from '../assets/logo.jpg';

const marqueeItems = [
  "Boutique Gyms", "Neighborhood Cafes", "Local Retail Shops", "Fine Dining Bistros",
  "Boutique Gyms", "Neighborhood Cafes", "Local Retail Shops", "Fine Dining Bistros"
];

export default function Hero() {
  const containerRef = useRef(null);
  const badgeRef = useRef(null);
  const headingContainerRef = useRef(null);
  const subRef = useRef(null);
  const footerRef = useRef(null);
  const scrollIndicatorRef = useRef(null);

  useEffect(() => {
    // GSAP load reveal timeline
    const tl = gsap.timeline();
    
    tl.fromTo(badgeRef.current, 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
    )
    .fromTo(".mask-title-line", 
      { y: "110%" }, 
      { y: "0%", duration: 0.85, ease: "power4.out", stagger: 0.12 }, 
      "-=0.35"
    )
    .fromTo(subRef.current, 
      { opacity: 0, y: 25 }, 
      { opacity: 1, y: 0, duration: 0.65, ease: "power3.out" }, 
      "-=0.45"
    )
    .fromTo(".fade-up-list-item", 
      { opacity: 0, y: 15 }, 
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", stagger: 0.1 }, 
      "-=0.3"
    )
    .fromTo(scrollIndicatorRef.current,
      { opacity: 0, y: -10 },
      { opacity: 0.7, y: 0, duration: 0.6, ease: "power2.out" },
      "-=0.2"
    );
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-between pt-28 pb-6 overflow-hidden bg-brand-darkBg"
    >
      {/* Moving 3D WebGL particle network */}
      <ThreeCanvas />

      {/* Background Spotlight */}
      <div className="absolute top-[20%] left-[20%] w-[65vw] h-[400px] bg-brand-orange opacity-[0.03] blur-[150px] pointer-events-none rounded-full z-0"></div>

      {/* Main content grid */}
      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 flex-1 my-auto">
        
        {/* Left column: Messaging */}
        <div className="lg:col-span-8 flex flex-col items-start text-left">
          
          {/* Floating Orange Badge */}
          <div 
            ref={badgeRef}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-brand-orange uppercase tracking-widest mb-6 shadow-md"
          >
            <Zap size={12} className="fill-brand-orange text-brand-orange" />
            <span>Websites that convert</span>
          </div>

          {/* Mask-wrapped headers (rise from below) */}
          <div ref={headingContainerRef} className="space-y-1 mb-6">
            <div className="overflow-hidden h-max py-1">
              <h1 className="mask-title-line text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] font-sora text-white">
                Websites that make your
              </h1>
            </div>
            <div className="overflow-hidden h-max py-1">
              <h1 className="mask-title-line text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] font-sora text-white">
                business look like it
              </h1>
            </div>
            <div className="overflow-hidden h-max py-1">
              <h1 className="mask-title-line text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] font-sora text-brand-orange">
                means business.
              </h1>
            </div>
          </div>

          {/* Subheading text */}
          <p 
            ref={subRef}
            className="text-lg md:text-xl text-brand-mutedText font-light max-w-2xl leading-relaxed mb-8"
          >
            No template layouts. We build custom web spaces for local cafés, strength gyms, and restaurants designed to elevate physical brands.
          </p>

          {/* Staggered attributes list with hover transformations (slide and orange highlight) */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-x-8 gap-y-4 pt-6 border-t border-white/5 text-xs text-brand-mutedText font-medium w-full select-none">
            <div className="fade-up-list-item flex items-center gap-1.5 hover:text-brand-orange hover:translate-x-1.5 transition-all duration-350 cursor-pointer">
              <ShieldCheck size={16} className="text-brand-orange" />
              Direct developer partnership
            </div>
            <div className="fade-up-list-item flex items-center gap-1.5 hover:text-brand-orange hover:translate-x-1.5 transition-all duration-350 cursor-pointer">
              <Flame size={16} className="text-brand-orange" />
              Handcrafted custom layout design
            </div>
            <div className="fade-up-list-item flex items-center gap-1.5 hover:text-brand-orange hover:translate-x-1.5 transition-all duration-350 cursor-pointer">
              <Zap size={16} className="text-brand-orange" />
              Stark high-contrast aesthetics
            </div>
          </div>
        </div>

        {/* Right column: Stylized typographic brand logo (replacing technical card) */}
        <div className="lg:col-span-4 hidden lg:flex justify-end items-center relative select-none">
          <div className="absolute inset-0 bg-brand-orange/5 blur-[80px] rounded-full pointer-events-none"></div>
          <img 
            src={logoImg} 
            alt="Riv Studio Logo" 
            className="w-full max-w-[280px] h-auto rounded-2xl border border-white/10 shadow-2xl transition-transform duration-500 hover:scale-[1.03]" 
          />
        </div>
      </div>

      {/* Scroll indicator anchor */}
      <div 
        ref={scrollIndicatorRef}
        className="flex flex-col items-center justify-center gap-1 text-[10px] uppercase font-bold tracking-widest text-brand-mutedText opacity-70 my-2 select-none cursor-pointer"
        onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span>Our Services</span>
        <ChevronDown size={14} className="animate-bounce text-brand-orange" />
      </div>

      {/* Infinite Marquee */}
      <div 
        ref={footerRef}
        className="w-full bg-[#0E0E10] border-y border-white/5 py-4 overflow-hidden relative select-none"
      >
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
