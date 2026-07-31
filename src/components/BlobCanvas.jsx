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
    const isMobileWidth = window.innerWidth < 768;

    // 1. Slow auto-rotation on the Y axis
    meshRef.current.rotation.y = time * 0.12;
    meshRef.current.rotation.x = 0; 

    // 2. Scroll calculations for base coordinate layouts (slide side-to-side and descend)
    const maxScroll = (document.documentElement.scrollHeight - window.innerHeight) || 1;
    const scrollPercent = window.scrollY / maxScroll;

    // Center the blob on mobile screens (baseX = 0) so it doesn't float off-screen
    // Slide side-to-side on desktop viewports
    let baseX = 0;
    if (!isMobileWidth) {
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
    }

    // Base Y floats down with scroll, slightly adjusted on mobile
    const baseY = -scrollPercent * (isMobileWidth ? 2.5 : 3.5); 

    // Scale mesh dynamically based on screen width
    const currentScale = isMobileWidth ? 0.95 : 1.4;
    meshRef.current.scale.setScalar(currentScale);

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

    let targetDistort = 0.35; // Default calm state
    let targetSpeed = 1.2;

    // Hover detection: if cursor is near the mesh, transform into liquid texture
    if (distance < 1.3) {
      const proximity = 1 - (distance / 1.3);
      targetDistort = 0.35 + (proximity * 0.55); // rises to 0.9 (liquidity)
      targetSpeed = 1.2 + (proximity * 2.8);      // rises to 4.0 (liquid speed)
    }

    // Smoothly animate the material parameters
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
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 64, 64]} />
      <MeshDistortMaterial
        ref={materialRef}
        distort={0.35}
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
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Global mouse tracking
    const handleMouseMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

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
