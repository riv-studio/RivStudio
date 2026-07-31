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

    // 1. Slow auto-rotation on the Y axis (completely unaffected by mouse coordinates)
    meshRef.current.rotation.y = time * 0.12;
    meshRef.current.rotation.x = 0; // lock rotation X

    // 2. Scroll calculations for base coordinate layouts (slide side-to-side and descend)
    const maxScroll = (document.documentElement.scrollHeight - window.innerHeight) || 1;
    const scrollPercent = window.scrollY / maxScroll;

    // Base position X coordinate slides depending on scroll sections
    let baseX = 1.3;
    if (scrollPercent < 0.2) {
      baseX = 1.3; // Hero (right)
    } else if (scrollPercent >= 0.2 && scrollPercent < 0.45) {
      baseX = -1.6; // Services (left)
    } else if (scrollPercent >= 0.45 && scrollPercent < 0.75) {
      baseX = 1.3; // Process (right)
    } else if (scrollPercent >= 0.75 && scrollPercent < 0.9) {
      baseX = -1.6; // Why Us (left)
    } else {
      baseX = 0; // Pricing/Footer (center)
    }

    // Base Y floats down with scroll
    const baseY = -scrollPercent * 3.5; 

    // Anchored X/Y coordinates (Mesh remains completely static under mouse hover, no drift)
    meshRef.current.position.x += (baseX - meshRef.current.position.x) * 0.06;
    meshRef.current.position.y += (baseY - meshRef.current.position.y) * 0.06;

    // 3. Proximity-driven Liquidity Effect
    // Map mouse [-1, 1] coordinates to match Three.js viewport scale dimensions
    const mouseXThreeJS = mouse.current.x * 2.2;
    const mouseYThreeJS = mouse.current.y * 1.6;

    // Calculate distance between projected mouse coordinates and mesh position
    const dx = mouseXThreeJS - meshRef.current.position.x;
    const dy = mouseYThreeJS - meshRef.current.position.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    let targetDistort = 0.35; // Default calm state (semi-solid morphs)
    let targetSpeed = 1.2;

    // Hover detection: if cursor is near the mesh, transform into liquid texture
    if (distance < 1.3) {
      const proximity = 1 - (distance / 1.3); // 0 (far) to 1 (directly over it)
      targetDistort = 0.35 + (proximity * 0.55); // rises to 0.9 (liquidity morph)
      targetSpeed = 1.2 + (proximity * 2.8);      // rises to 4.0 (fast liquid ripples)
    }

    // Smoothly animate the material parameters towards the liquid targets
    if (materialRef.current) {
      materialRef.current.distort += (targetDistort - materialRef.current.distort) * 0.08;
      materialRef.current.speed += (targetSpeed - materialRef.current.speed) * 0.08;

      // 4. Shifting iridescent color cycle
      const cycleSpeed = 0.4;
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
        distort={0.35} // Animate dynamically in useFrame
        speed={1.2}
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
    const checkViewport = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkViewport();
    window.addEventListener('resize', checkViewport);

    // Global mouse tracking
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
