import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: "01",
    title: "Discover & Strategy",
    duration: "1-hour session",
    description: "We meet at your gym, cafe, or online to study your target demographic. We audit your local search competitors and map out every high-converting feature your business actually needs."
  },
  {
    number: "02",
    title: "Bespoke Mockup Design",
    duration: "Week 1",
    description: "We design a custom mockup showing exactly how the site will look. No templates, no generic boxes. You review a static link and we refine the visuals until you're completely satisfied."
  },
  {
    number: "03",
    title: "Custom Hand-Coding",
    duration: "Weeks 2-3",
    description: "Once approved, we hand-code your website. We keep the code lightweight, fast, and structured to score high-performance marks on search audits."
  },
  {
    number: "04",
    title: "Launch & Local SEO",
    duration: "Week 4",
    description: "We configure your custom domains, setup secure cloud hosting, optimize local Google Maps keywords, and launch. We continue to handle updates so you never have to deal with code."
  }
];

export default function Process() {
  const sectionRef = useRef(null);
  const rowsRef = useRef([]);

  useEffect(() => {
    // GSAP ScrollTrigger reveal for timeline items
    rowsRef.current.forEach((row, index) => {
      if (!row) return;
      const isEven = index % 2 === 0;
      
      gsap.fromTo(row,
        { opacity: 0, x: isEven ? 50 : -50, y: 15 },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: row,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );
    });
  }, []);

  return (
    <section 
      id="process" 
      ref={sectionRef}
      className="py-24 px-6 md:px-12 max-w-7xl mx-auto relative border-t border-white/5 bg-brand-darkBg"
    >
      {/* Background radial spotlight */}
      <div className="absolute top-[50%] left-[20%] w-[35vw] h-[35vw] bg-brand-orange/5 rounded-full blur-[110px] pointer-events-none"></div>

      {/* Header */}
      <div className="flex flex-col items-center text-center mb-24 max-w-2xl mx-auto">
        <span className="text-xs font-bold text-brand-orange uppercase tracking-widest mb-3">
          Our Process
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-sora mb-6 leading-tight text-white">
          How we take you from zero to launch
        </h2>
        <p className="text-brand-mutedText text-lg font-light leading-relaxed">
          A structured, zero-stress timeline. We take care of all the tech, keeping you updated every step of the way.
        </p>
      </div>

      {/* Zig-Zag Timeline Container */}
      <div className="relative max-w-5xl mx-auto mt-16 font-sora">
        
        {/* Central Vertical Connector Line */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-brand-orange/10 via-brand-orange/30 to-brand-orange/10 border-l border-dashed border-brand-orange/20 z-0 transform -translate-x-1/2"></div>

        {/* Steps */}
        <div className="space-y-12 md:space-y-16 relative z-10">
          {steps.map((step, index) => {
            const isEven = index % 2 === 0;
            return (
              <div 
                key={index}
                ref={el => rowsRef.current[index] = el}
                className={`flex flex-col md:flex-row items-stretch w-full ${
                  isEven ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Left/Right Column: Card content */}
                <div className="w-full md:w-1/2 flex justify-center md:justify-start px-2 md:px-8">
                  <div className="w-full max-w-md bg-brand-darkCard border border-white/5 hover:border-brand-orange/15 hover:scale-[1.02] transition-all duration-300 p-8 rounded-2xl text-left shadow-xl group relative cursor-default">
                    
                    {/* Visual glowing spotlight dot on the connector line */}
                    <div 
                      className={`hidden md:block absolute w-3.5 h-3.5 rounded-full bg-black border-[3px] border-brand-orange z-25 top-1/2 -translate-y-1/2 ${
                        isEven ? 'left-[-46px]' : 'right-[-46px]'
                      }`}
                    ></div>

                    <div className="flex items-center justify-between mb-4">
                      {/* Typographic Large Number */}
                      <span className="font-sora font-extrabold text-3xl text-brand-orange/20 group-hover:text-brand-orange transition-colors">
                        {step.number}
                      </span>
                      {/* Duration Badge */}
                      <span className="text-[9px] uppercase font-bold text-brand-orange tracking-widest bg-brand-orange/5 border border-brand-orange/20 px-2 py-0.5 rounded">
                        {step.duration}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-sora font-bold text-lg text-white group-hover:text-brand-orange transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-brand-mutedText text-xs sm:text-sm font-light leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Left/Right Column: Blank spacer for desktop */}
                <div className="hidden md:block w-1/2"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
