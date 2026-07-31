import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const plans = [
  {
    id: "starter",
    name: "Starter Setup",
    subtitle: "Ideal for cozy cafes, bakeries, or basic portfolio presentations.",
    priceText: "Flat-Rate Build",
    features: [
      "100% custom single-page layout",
      "Full mobile layout optimization",
      "Digital Menu or Services layout",
      "Google Maps local SEO keyword setup",
      "Secure cloud server deployment",
      "WhatsApp direct quick link"
    ],
    highlight: false,
  },
  {
    id: "growth",
    name: "Growth Engine",
    subtitle: "Designed for gyms, bistros, and bookings-driven studios.",
    priceText: "Most Requested",
    features: [
      "Custom multi-section interactive build",
      "Weekly class schedules / reservation widget",
      "Interactive Google reviews spotlight",
      "Advanced local SEO ranking schema",
      "Ongoing changes included (menus, schedules)",
      "Google Analytics performance reports",
      "High-speed global CDN hosting setup"
    ],
    highlight: true,
  },
  {
    id: "bespoke",
    name: "Bespoke Enterprise",
    subtitle: "For local retail boutiques, shop catalogs, and custom tools.",
    priceText: "Custom Built",
    features: [
      "Full editorial e-commerce shop catalogs",
      "Custom inventory or reservation database",
      "Interactive client management portal",
      "Advanced third-party service integration",
      "Multi-page responsive layouts",
      "Priority 24/7 emergency support line",
      "Semi-annual visual style refreshes"
    ],
    highlight: false,
  }
];

export default function Pricing() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    // GSAP ScrollTrigger staggered pricing cards reveal
    gsap.fromTo(cardsRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      }
    );
  }, []);

  return (
    <section 
      id="pricing" 
      ref={sectionRef}
      className="py-24 px-6 md:px-12 max-w-7xl mx-auto relative border-t border-white/5 bg-brand-darkBg"
    >
      {/* Background glow orbs */}
      <div className="absolute left-[20%] top-[-10%] w-[40vw] h-[40vw] bg-brand-orange opacity-[0.01] blur-[120px] pointer-events-none rounded-full"></div>

      {/* Header */}
      <div className="flex flex-col items-center text-center mb-24 max-w-2xl mx-auto font-sora">
        <span className="text-xs font-bold text-brand-orange uppercase tracking-widest mb-3">
          Our Pricing
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-6 leading-tight text-white">
          Transparent pricing built for local ROI
        </h2>
        <p className="text-brand-mutedText text-lg font-light leading-relaxed">
          No generic retainers. No agency markup. We offer fixed scopes designed to bring more clients to your physical doors.
        </p>
      </div>

      {/* Pricing Tiers Grid with hover scales */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto relative z-10">
        {plans.map((plan, idx) => {
          return (
            <div
              key={plan.id}
              ref={el => cardsRef.current[idx] = el}
              className={`relative rounded-2xl flex flex-col justify-between p-8 md:p-10 transition-all duration-350 min-h-[460px] cursor-default ${
                plan.highlight
                  ? 'bg-[#0E0E10] border-2 border-brand-orange shadow-[0_0_50px_rgba(255,85,0,0.12)] lg:scale-105 hover:scale-[1.07] z-20 lg:-translate-y-4'
                  : 'bg-[#0A0A0C] border border-white/5 opacity-85 scale-95 lg:scale-100 hover:opacity-100 hover:border-brand-orange/30 hover:scale-[1.02] shadow-xl'
              }`}
            >
              <div className="space-y-6">
                {/* Title and RECOMMENDED label next to title (guaranteed visibility) */}
                <div className="text-left">
                  <div className="flex justify-between items-center gap-2 mb-2">
                    <h3 className="font-sora font-extrabold text-xl sm:text-2xl text-white">{plan.name}</h3>
                    {plan.highlight && (
                      <span className="text-[8px] font-bold tracking-widest px-2.5 py-1 bg-brand-orange text-black rounded-full shrink-0 font-sora">
                        RECOMMENDED
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-brand-mutedText font-light leading-relaxed min-h-[40px]">
                    {plan.subtitle}
                  </p>
                </div>

                {/* Price text */}
                <div className="text-left border-y border-white/5 py-4">
                  <span className="font-sora font-extrabold text-white text-2xl sm:text-3xl">{plan.priceText}</span>
                </div>

                {/* Features */}
                <ul className="space-y-3.5 text-left pt-2">
                  {plan.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-white/95">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-orange mt-1.5 shrink-0"></span>
                      <span className="font-light leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
