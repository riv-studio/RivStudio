import React, { useEffect, useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Shifting opal colors
const OPAL_COLORS = ['#FF5500', '#EC4899', '#FBBF24', '#3B82F6'];

function BlobMesh({ mouse }) {
  const meshRef = useRef(null);
  const materialRef = useRef(null);
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // 1. Slow auto-rotation on the Y axis
    meshRef.current.rotation.y = time * 0.08;

    // 2. Mouse-parallax rotation tilt (smooth lerp interpolation)
    const targetRotX = -mouse.current.y * 0.45;
    const targetRotY = mouse.current.x * 0.45;

    meshRef.current.rotation.x += (targetRotX - meshRef.current.rotation.x) * 0.08;
    meshRef.current.rotation.y += (targetRotY - meshRef.current.rotation.y) * 0.08;

    // 3. Scroll calculations for side-sliding (X) and downward translation (Y)
    const maxScroll = (document.documentElement.scrollHeight - window.innerHeight) || 1;
    const scrollPercent = window.scrollY / maxScroll;

    // Slide base X coordinate side-to-side based on the current scroll progress section
    let baseX = 1.3;
    if (scrollPercent < 0.2) {
      baseX = 1.3; // Hero section (right side)
    } else if (scrollPercent >= 0.2 && scrollPercent < 0.45) {
      baseX = -1.6; // Services section (left side)
    } else if (scrollPercent >= 0.45 && scrollPercent < 0.75) {
      baseX = 1.3; // Process section (right side)
    } else if (scrollPercent >= 0.75 && scrollPercent < 0.9) {
      baseX = -1.6; // Why Us section (left side)
    } else {
      baseX = 0; // Pricing/Footer section (center)
    }

    // Move Y position downwards with scroll, but bound it to keep it visible
    const baseY = -scrollPercent * 3.5; 

    // Combine scroll positioning with mouse-parallax offset coordinate shifts
    const targetPosX = baseX + (mouse.current.x * 1.5);
    const targetPosY = baseY + (mouse.current.y * 1.2);

    meshRef.current.position.x += (targetPosX - meshRef.current.position.x) * 0.06;
    meshRef.current.position.y += (targetPosY - meshRef.current.position.y) * 0.06;

    // 4. Shifting iridescent color cycle
    if (materialRef.current) {
      const cycleSpeed = 0.4; // slow transitions
      const index = Math.floor(time * cycleSpeed) % OPAL_COLORS.length;
      const nextIndex = (index + 1) % OPAL_COLORS.length;
      const factor = (time * cycleSpeed) % 1;

      const currentColor = new THREE.Color(OPAL_COLORS[index]);
      const nextColor = new THREE.Color(OPAL_COLORS[nextIndex]);
      currentColor.lerp(nextColor, factor);

      materialRef.current.color.copy(currentColor);
    }
  });

  return (
    <mesh ref={meshRef} scale={1.4}>
      <sphereGeometry args={[1, 64, 64]} />
      <MeshDistortMaterial
        ref={materialRef}
        distort={0.48} // rippling distortion strength
        speed={1.8}    // ripples animation speed
        roughness={0.15}
        metalness={0.35}
        clearcoat={0.8}
        clearcoatRoughness={0.1}
      />
    </mesh>
  );
}

export default function BlobCanvas() {
  const [isMobile, setIsMobile] = useState(false);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Detect mobile or low-performance viewports
    const checkViewport = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkViewport();
    window.addEventListener('resize', checkViewport);

    // Global window-level mouse movement listener (allows canvas to stay pointer-events-none)
    const handleMouseMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', checkViewport);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  if (isMobile) {
    // High-performance static gradient fallback
    return (
      <div className="absolute top-1/2 right-[5%] -translate-y-1/2 w-[70vw] h-[70vw] max-w-[320px] max-h-[320px] flex items-center justify-center pointer-events-none z-0">
        <div className="w-[85%] h-[85%] rounded-full bg-gradient-to-tr from-[#FF5500] via-[#EC4899] to-[#3B82F6] blur-[60px] opacity-40 animate-pulse duration-[6000ms]" />
      </div>
    );
  }

  // Full-screen fixed canvas lets the blob travel anywhere on the screen during scroll transitions
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-10 overflow-visible">
      <Canvas
        camera={{ position: [0, 0, 4.2], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
        style={{ pointerEvents: 'none' }}
      >
        <ambientLight intensity={0.75} />
        <directionalLight position={[3, 5, 2]} intensity={2.0} />
        <directionalLight position={[-3, -5, -2]} intensity={0.5} />
        <pointLight position={[0, 3, 5]} intensity={1.5} />
        
        <BlobMesh mouse={mouse} />
      </Canvas>
    </div>
  );
}
