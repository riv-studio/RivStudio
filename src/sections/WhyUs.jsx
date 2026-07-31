import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X, Check, Eye, Heart, Compass } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const comparisons = [
  {
    topic: "Development Speed & Performance",
    agency: "Heavy Page Builders that load slow and hurt local search rankings.",
    pixelriv: "100% custom-written code optimized for maximum loading performance."
  },
  {
    topic: "Direct Communication",
    agency: "You talk to junior project managers who pass messages down a long chain.",
    pixelriv: "You work directly with the developer. No game of telephone, no translation delay."
  },
  {
    topic: "Originality vs. Templates",
    agency: "Generic templates reused across dozens of local businesses in your city.",
    pixelriv: "Bespoke, handcrafted layouts tailored specifically to your cafe, gym, or restaurant."
  },
  {
    topic: "Post-Launch Updates",
    agency: "Extra hourly fees for simple changes, taking weeks to execute.",
    pixelriv: "Included updates. Tell us what needs changing and it is live within 24 hours."
  }
];

export default function WhyUs() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const tableRef = useRef(null);

  useEffect(() => {
    // GSAP ScrollTrigger staggered cards reveal
    gsap.fromTo(cardsRef.current,
      { opacity: 0, y: 35 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      }
    );

    // GSAP ScrollTrigger table reveal
    gsap.fromTo(tableRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: tableRef.current,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      }
    );
  }, []);

  return (
    <section 
      id="why-us" 
      ref={sectionRef}
      className="py-24 px-6 md:px-12 max-w-7xl mx-auto relative border-t border-white/5 bg-brand-darkBg"
    >
      {/* Background glow */}
      <div className="absolute right-0 top-[20%] w-[45vw] h-[400px] bg-brand-orange opacity-[0.015] blur-[150px] pointer-events-none rounded-full"></div>

      {/* Header */}
      <div className="flex flex-col items-start text-left mb-16 max-w-2xl">
        <span className="text-xs font-bold text-brand-orange uppercase tracking-widest mb-3">
          Why Riv Studio
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-sora mb-6 leading-tight text-white">
          We don't do agency overhead
        </h2>
        <p className="text-brand-mutedText text-lg font-light leading-relaxed">
          Traditional agencies charge high fees to cover offices and managers. We keep it lean, fast, and directly focused on your business results.
        </p>
      </div>

      {/* Grid Features with hover effects on cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16 bg-transparent relative z-10">
        
        {/* Core Value 1 */}
        <div
          ref={el => cardsRef.current[0] = el}
          className="p-8 rounded-2xl bg-brand-darkCard border border-white/5 hover:border-brand-orange/20 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(255,85,0,0.03)] flex flex-col gap-4 text-left transition-all duration-300 group cursor-default"
        >
          <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center group-hover:bg-indigo-500/20 transition-colors">
            <Eye size={20} />
          </div>
          <h3 className="font-sora font-semibold text-lg text-white group-hover:text-brand-orange transition-colors">Built to look expensive</h3>
          <p className="text-xs sm:text-sm text-brand-mutedText font-light leading-relaxed">
            First impressions are permanent. We design sites with smooth micro-interactions that immediately show customers your business is a premium option.
          </p>
        </div>

        {/* Core Value 2 */}
        <div
          ref={el => cardsRef.current[1] = el}
          className="p-8 rounded-2xl bg-brand-darkCard border border-white/5 hover:border-brand-orange/20 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(255,85,0,0.03)] flex flex-col gap-4 text-left transition-all duration-300 group cursor-default"
        >
          <div className="w-10 h-10 rounded-lg bg-brand-orange/10 border border-brand-orange/20 text-brand-orange flex items-center justify-center group-hover:bg-brand-orange/20 transition-colors">
            <Compass size={20} />
          </div>
          <h3 className="font-sora font-semibold text-lg text-white group-hover:text-brand-orange transition-colors">Built for local search</h3>
          <p className="text-xs sm:text-sm text-brand-mutedText font-light leading-relaxed">
            A beautiful site is useless if it cannot be found. We structure your markup, configure local Google map keywords, and design schemas to rank.
          </p>
        </div>

        {/* Core Value 3 */}
        <div
          ref={el => cardsRef.current[2] = el}
          className="p-8 rounded-2xl bg-brand-darkCard border border-white/5 hover:border-brand-orange/20 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(255,85,0,0.03)] flex flex-col gap-4 text-left transition-all duration-300 group cursor-default"
        >
          <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
            <Check size={20} />
          </div>
          <h3 className="font-sora font-semibold text-lg text-white group-hover:text-brand-orange transition-colors">Direct developer contact</h3>
          <p className="text-xs sm:text-sm text-brand-mutedText font-light leading-relaxed">
            No sales reps. You speak directly with the developer writing the code. We build a long-term partnership to maintain your site's peak performance.
          </p>
        </div>
      </div>

      {/* Detail Comparison Table */}
      <div
        ref={tableRef}
        className="w-full bg-[#0F0F11]/55 border border-white/5 rounded-2xl overflow-hidden glass-panel"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 bg-[#121215]/40 border-b border-white/5 p-6 font-sora font-bold text-sm tracking-wider uppercase text-left">
          <div className="text-red-400 flex items-center gap-1.5 mb-2 md:mb-0">
            <X size={16} />
            Traditional Agencies
          </div>
          <div className="text-brand-orange flex items-center gap-1.5">
            <Check size={16} />
            Riv Studio
          </div>
        </div>

        <div className="divide-y divide-white/5">
          {comparisons.map((row, idx) => (
            <div key={idx} className="grid grid-cols-1 md:grid-cols-2 p-6 gap-6 md:gap-12 text-left">
              <div className="space-y-1">
                <span className="text-[10px] text-brand-mutedText font-bold uppercase tracking-wider block md:hidden">Agency</span>
                <span className="text-xs font-semibold text-white/50 block mb-1">{row.topic}</span>
                <p className="text-sm text-brand-mutedText/85 leading-relaxed font-light">{row.agency}</p>
              </div>
              <div className="space-y-1 border-t border-white/5 pt-4 md:border-t-0 md:pt-0">
                <span className="text-[10px] text-brand-orange font-bold uppercase tracking-wider block md:hidden">Riv Studio</span>
                <span className="text-xs font-semibold text-brand-orange block mb-1">{row.topic}</span>
                <p className="text-sm text-white leading-relaxed font-normal">{row.pixelriv}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
