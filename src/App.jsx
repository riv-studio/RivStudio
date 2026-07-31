import React, { useState, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import InteractiveBg from './components/InteractiveBg';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';

// Heavy Performance Engineering: Code splitting via React.lazy
// Allows the preloader and hero/styles to render immediately, deferring heavy sections.
const CinematicMoment = lazy(() => import('./sections/CinematicMoment'));
const Services = lazy(() => import('./sections/Services'));
const Process = lazy(() => import('./sections/Process'));
const WhyUs = lazy(() => import('./sections/WhyUs'));
const Pricing = lazy(() => import('./sections/Pricing'));
const Footer = lazy(() => import('./sections/Footer'));

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={`min-h-screen bg-brand-darkBg text-white relative ${isLoading ? 'overflow-hidden h-screen' : ''}`}>
      {/* 
        Awwwards-style Percentage count-up Preloader (00 to 100) 
        Locks window scroll, count-up completes, then slides up.
      */}
      <Preloader onComplete={() => setIsLoading(false)} />

      {/* Render page contents only after preloader exits */}
      {!isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Custom spring ring follower cursor (Papaya Orange) */}
          <CustomCursor />
          
          {/* Ambient moving background blobs and coordinate grid */}
          <InteractiveBg />
          
          {/* Floating glass navbar */}
          <Navbar />

          <main className="relative z-10">
            {/* 3D WebGL Particle canvas + GSAP mask text reveals */}
            <Hero />
            
            {/* Deferred/Lazy loaded sections for optimal load speed performance */}
            <Suspense fallback={
              <div className="h-40 flex items-center justify-center font-mono text-xs text-brand-orange/40">
                LOADING COMPONENT...
              </div>
            }>
              {/* Full-bleed statement section */}
              <CinematicMoment />
              
              {/* Index numbers services cards with GSAP triggers */}
              <Services />
              
              {/* Zig-Zag timeline stages with GSAP ScrollTrigger staggers */}
              <Process />
              
              {/* Typographic compare grids */}
              <WhyUs />
              
              {/* Informative service tiers (no CTAs) */}
              <Pricing />
              
              {/* Simplified contact form */}
              <Footer />
            </Suspense>
          </main>
        </motion.div>
      )}
    </div>
  );
}

export default App;
