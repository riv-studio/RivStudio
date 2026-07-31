import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeCanvas() {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const pointsRef = useRef(null);
  const animationFrameId = useRef(null);
  
  // Track mouse coordinates for trailing rotation
  const mouse = useRef({ x: 0, y: 0 });
  const targetRotation = useRef({ x: 0, y: 0 });
  
  useEffect(() => {
    if (!containerRef.current) return;

    // 1. Setup Scene, Camera, and Renderer
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.z = 5;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Limit pixel ratio to 2 for performance
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 2. Generate 3D Particles
    const particleCount = 800; // Optimal count for mobile & desktop performance
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const colorPapaya = new THREE.Color('#FF5500');
    const colorWhite = new THREE.Color('#FFFFFF');

    for (let i = 0; i < particleCount; i++) {
      // Box spread coordinates
      positions[i * 3] = (Math.random() - 0.5) * 8;     // X coordinate
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8; // Y coordinate
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6; // Z coordinate

      // Mix colors: mostly Papaya Orange with a few white highlights
      const mixedColor = colorPapaya.clone().lerp(colorWhite, Math.random() * 0.15);
      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Custom points material
    const material = new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.5,
      sizeAttenuation: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);
    pointsRef.current = points;

    // 3. Mousemove handler
    const handleMouseMove = (e) => {
      // Map mouse coordinates to [-1, 1] range
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
      
      // Target rotation shifts based on mouse position
      targetRotation.current.x = mouse.current.y * 0.4;
      targetRotation.current.y = mouse.current.x * 0.4;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // 4. Resize handler
    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current || !cameraRef.current) return;
      
      const newWidth = containerRef.current.clientWidth;
      const newHeight = containerRef.current.clientHeight;

      cameraRef.current.aspect = newWidth / newHeight;
      cameraRef.current.updateProjectionMatrix();

      rendererRef.current.setSize(newWidth, newHeight);
    };
    window.addEventListener('resize', handleResize);

    // 5. Heavy Performance Engineering: Intersection Observer
    // We only run the WebGL animation loop when the canvas is visible.
    let isVisible = true;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
          if (isVisible) {
            // Restart loop if it was stopped
            if (!animationFrameId.current) {
              tick();
            }
          } else {
            // Cancel loop to save resources
            if (animationFrameId.current) {
              cancelAnimationFrame(animationFrameId.current);
              animationFrameId.current = null;
            }
          }
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(containerRef.current);

    // 6. Animation Loop (with linear interpolation for trailing float)
    const tick = () => {
      if (!pointsRef.current || !rendererRef.current || !sceneRef.current || !cameraRef.current) return;

      // Slow, auto rotation
      pointsRef.current.rotation.y += 0.001;

      // Smoothly interpolate (lerp) towards target mouse rotation
      pointsRef.current.rotation.x += (targetRotation.current.x - pointsRef.current.rotation.x) * 0.05;
      pointsRef.current.rotation.y += (targetRotation.current.y - pointsRef.current.rotation.y) * 0.05;

      rendererRef.current.render(scene, camera);
      
      if (isVisible) {
        animationFrameId.current = requestAnimationFrame(tick);
      }
    };

    // Start loop
    tick();

    // 7. Cleanup on unmount
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
      
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      
      // Dispose WebGL assets
      geometry.dispose();
      material.dispose();
      
      if (rendererRef.current && rendererRef.current.domElement) {
        if (containerRef.current && containerRef.current.contains(rendererRef.current.domElement)) {
          containerRef.current.removeChild(rendererRef.current.domElement);
        }
        rendererRef.current.dispose();
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
    />
  );
}
