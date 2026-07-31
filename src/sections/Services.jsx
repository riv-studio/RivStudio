import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    num: "01",
    tag: "DESIGN",
    title: "High-End Web Design",
    description: "Custom design layouts designed to convert local traffic into paying clients. No slow page builders or template bloat. We build custom-coded sites that load in under a second.",
    benefits: ["Optimized for mobile conversions", "Fastest loading speeds in the industry", "SEO technical structures pre-built"]
  },
  {
    num: "02",
    tag: "IDENTITY",
    title: "Branding & Direction",
    description: "We bridge your physical presence with your online brand. We establish typography systems, color schemes, and photography assets that make your cafe or gym look expensive.",
    benefits: ["Custom typography guidelines", "Curated visual color palettes", "Social asset design layouts"]
  },
  {
    num: "03",
    tag: "MAINTENANCE",
    title: "Ongoing Maintenance",
    description: "Hosting setup, server maintenance, SEO checkups, and menu edits are all handled by us. Text or WhatsApp us your change requests, and we update it live in 24 hours.",
    benefits: ["High-speed CDN hosting with SSL", "WhatsApp direct updates support", "Monthly growth reviews"]
  }
];

export default function Services() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    // GSAP ScrollTrigger for staggered card reveal
    gsap.fromTo(cardsRef.current, 
      { opacity: 0, y: 50 },
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

  const handleMouseMove = (e, index) => {
    const card = cardsRef.current[index];
    if (!card) return;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left;
    const y = e.clientY - box.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <section 
      id="services" 
      ref={sectionRef}
      className="py-24 px-6 md:px-12 max-w-7xl mx-auto relative border-t border-white/5 bg-brand-darkBg"
    >
      {/* Background glow orb */}
      <div className="absolute top-[30%] right-[10%] w-[45vw] h-[400px] bg-brand-orange opacity-[0.01] blur-[130px] pointer-events-none rounded-full"></div>

      {/* Header */}
      <div className="flex flex-col items-start text-left mb-20 max-w-2xl font-sora">
        <span className="text-xs font-bold text-brand-orange uppercase tracking-widest mb-3">
          Our Services
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-6 leading-tight text-white">
          Designed to make you look like the authority
        </h2>
        <p className="text-brand-mutedText text-lg font-light leading-relaxed font-sans">
          We handle everything needed to build a professional online presence. No shortcuts, no template layouts.
        </p>
      </div>

      {/* Cards Grid with hover scaling */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 relative z-10">
        {services.map((service, index) => (
          <div
            key={index}
            ref={el => cardsRef.current[index] = el}
            onMouseMove={(e) => handleMouseMove(e, index)}
            className="glow-card relative bg-brand-darkCard border border-white/5 hover:border-brand-orange/15 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(255,85,0,0.03)] rounded-2xl p-8 md:p-10 flex flex-col justify-between overflow-hidden group shadow-lg min-h-[380px] transition-all duration-300 cursor-default"
          >
            {/* Decorative huge background number */}
            <span className="absolute right-6 top-4 font-sora font-extrabold text-[120px] text-white/[0.015] group-hover:text-brand-orange/[0.03] transition-colors select-none z-0">
              {service.num}
            </span>

            <div className="relative z-10 text-left font-sans">
              {/* Typographic Tag */}
              <div className="flex items-center gap-2 mb-8">
                <span className="font-mono text-xs font-semibold text-brand-orange tracking-widest uppercase">
                  {service.tag}
                </span>
                <span className="w-8 h-[1px] bg-brand-orange/30"></span>
                <span className="font-mono text-xs text-brand-mutedText">
                  /{service.num}
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="font-sora font-extrabold text-2xl text-white mb-4">
                {service.title}
              </h3>
              <p className="text-brand-mutedText text-sm sm:text-base font-light leading-relaxed mb-6 max-w-sm">
                {service.description}
              </p>
            </div>

            {/* Bullet list */}
            <div className="relative z-10 border-t border-white/5 pt-6 text-left mt-auto font-sans">
              <ul className="space-y-2.5">
                {service.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-xs sm:text-sm text-white/95">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-orange shrink-0"></span>
                    <span className="font-light">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
