import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const HeroScene: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, 9);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const group = new THREE.Group();
    scene.add(group);

    // Core faceted seal (icosahedron wireframe)
    const coreGeo = new THREE.IcosahedronGeometry(2.15, 1);
    const coreMat = new THREE.MeshBasicMaterial({ color: 0xc9a34e, wireframe: true, transparent: true, opacity: 0.55 });
    const core = new THREE.Mesh(coreGeo, coreMat);
    group.add(core);

    // Inner glow sphere
    const innerGeo = new THREE.IcosahedronGeometry(1.2, 2);
    const innerMat = new THREE.MeshBasicMaterial({ color: 0xecd08c, wireframe: true, transparent: true, opacity: 0.3 });
    const inner = new THREE.Mesh(innerGeo, innerMat);
    group.add(inner);

    // Outer ring (torus)
    const ringGeo = new THREE.TorusGeometry(3.1, 0.006, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x8a6f38, transparent: true, opacity: 0.5 });
    const ring1 = new THREE.Mesh(ringGeo, ringMat);
    ring1.rotation.x = Math.PI / 2.4;
    group.add(ring1);

    const ring2 = new THREE.Mesh(ringGeo, ringMat.clone());
    ring2.rotation.x = -Math.PI / 3.1;
    ring2.rotation.y = Math.PI / 5;
    ring2.scale.setScalar(1.15);
    group.add(ring2);

    // Orbiting particle field
    const particleCount = 340;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const radius = 3.4 + Math.random() * 4.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.6;
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xc9a34e,
      size: 0.028,
      transparent: true,
      opacity: 0.75,
      sizeAttenuation: true
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Violet accent particles
    const acc = 60;
    const accPos = new Float32Array(acc * 3);
    for (let i = 0; i < acc; i++) {
      const radius = 2.6 + Math.random() * 3.6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      accPos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      accPos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.6;
      accPos[i * 3 + 2] = radius * Math.cos(phi);
    }
    const accGeo = new THREE.BufferGeometry();
    accGeo.setAttribute('position', new THREE.BufferAttribute(accPos, 3));
    const accMat = new THREE.PointsMaterial({ color: 0x8f7cf0, size: 0.032, transparent: true, opacity: 0.55 });
    const accParticles = new THREE.Points(accGeo, accMat);
    scene.add(accParticles);

    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX / window.innerWidth - 0.5;
      mouseY = e.clientY / window.innerHeight - 0.5;
    };

    let scrollFactor = 0;
    const handleScroll = () => {
      scrollFactor = Math.min(window.scrollY / (window.innerHeight * 0.9), 1);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });

    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      targetX += (mouseX - targetX) * 0.04;
      targetY += (mouseY - targetY) * 0.04;

      group.rotation.y = t * 0.08 + targetX * 0.6;
      group.rotation.x = targetY * 0.4 + Math.sin(t * 0.15) * 0.05;
      inner.rotation.y = -t * 0.15;
      inner.rotation.x = t * 0.1;
      ring1.rotation.z = t * 0.05;
      ring2.rotation.z = -t * 0.04;

      particles.rotation.y = t * 0.02;
      accParticles.rotation.y = -t * 0.03;
      accParticles.rotation.x = t * 0.015;

      group.position.y = -scrollFactor * 1.6;
      group.scale.setScalar(1 - scrollFactor * 0.25);
      particles.position.y = -scrollFactor * 1.6;
      accParticles.position.y = -scrollFactor * 1.6;
      camera.position.x = targetX * 0.4;
      camera.position.y = -targetY * 0.3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      accGeo.dispose();
      accMat.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} id="hero-canvas" className="absolute inset-0 w-full h-full z-0" />;
};
