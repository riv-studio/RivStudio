import React from 'react';

export default function InteractiveBg() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Grid overlay */}
      <div className="absolute inset-0 grid-bg opacity-20"></div>
      
      {/* Ambient gradient blobs - animated slowly to feel organic */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-brand-orange opacity-[0.035] blur-[120px] animate-blob"></div>
      <div className="absolute bottom-[20%] right-[-10%] w-[45vw] h-[45vw] rounded-full bg-orange-600 opacity-[0.025] blur-[140px] animate-blob animation-delay-2000"></div>
      <div className="absolute top-[40%] left-[30%] w-[35vw] h-[35vw] rounded-full bg-brand-orange opacity-[0.02] blur-[130px] animate-blob animation-delay-4000"></div>
      
      {/* Ambient spotlight overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-darkBg/60 to-brand-darkBg"></div>
    </div>
  );
}
