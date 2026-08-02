import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface LabelInfo {
  text: string;
  sub: string;
  nodeIndex: number;
}

const FEATURE_LABELS: LabelInfo[] = [
  { text: 'Goal & Barrier Intake', sub: 'Client Input', nodeIndex: 0 },
  { text: 'Explainable Engine', sub: 'Program Matching', nodeIndex: 5 },
  { text: 'Encrypted Vault', sub: 'Secure Health Data', nodeIndex: 11 },
  { text: 'Closed-Loop Milestone', sub: 'Automated Follow-up', nodeIndex: 18 },
];

const seeded = (seed: number) => {
  const x = Math.sin(seed * 999) * 10000;
  return x - Math.floor(x);
};

export const WellpathScene: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [activeLabel, setActiveLabel] = useState<string | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const wrap = canvas.parentElement;
    if (!wrap) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 0, 5.8);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const resize = () => {
      const width = wrap.clientWidth;
      const height = wrap.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    const nodeCount = 24;
    const nodes: THREE.Mesh[] = [];
    const lines: THREE.Line[] = [];
    const group = new THREE.Group();
    scene.add(group);

    const nodeGeo = new THREE.SphereGeometry(0.05, 16, 16);
    
    // Predetermined positions for key labeled nodes so they are well-spaced
    const keyPositions = [
      new THREE.Vector3(-1.1, 0.75, 0.3),
      new THREE.Vector3(1.1, 0.7, -0.2),
      new THREE.Vector3(-1.0, -0.75, 0.2),
      new THREE.Vector3(1.0, -0.7, -0.3),
    ];

    for (let i = 0; i < nodeCount; i++) {
      const isKey = i < keyPositions.length;
      const isGold = isKey || seeded(i + 30) > 0.4;
      const mat = new THREE.MeshBasicMaterial({
        color: isKey ? 0xf3d37f : (isGold ? 0xecd08c : 0xa082f5),
        transparent: true,
        opacity: isKey ? 1 : 0.86,
      });
      const mesh = new THREE.Mesh(nodeGeo, mat);

      if (isKey) {
        mesh.position.copy(keyPositions[i]);
        mesh.scale.set(1.4, 1.4, 1.4);
      } else {
        const radius = 1.3 + seeded(i + 1) * 1.0;
        const theta = seeded(i + 10) * Math.PI * 2;
        const phi = Math.acos(seeded(i + 20) * 2 - 1);
        mesh.position.set(
          radius * Math.sin(phi) * Math.cos(theta),
          radius * Math.sin(phi) * Math.sin(theta),
          radius * Math.cos(phi) * 0.7
        );
      }
      group.add(mesh);
      nodes.push(mesh);
    }

    // Connect nearest nodes with gold lines
    nodes.forEach((n, i) => {
      const distances = nodes
        .map((m, j) => ({ j, d: n.position.distanceTo(m.position) }))
        .filter((o) => o.j !== i)
        .sort((a, b) => a.d - b.d);
      for (let k = 0; k < 2; k++) {
        const target = nodes[distances[k].j];
        const geo = new THREE.BufferGeometry().setFromPoints([n.position, target.position]);
        const lineMat = new THREE.LineBasicMaterial({
          color: i < keyPositions.length || distances[k].j < keyPositions.length ? 0xf3d37f : 0xc9932f,
          transparent: true,
          opacity: i < keyPositions.length || distances[k].j < keyPositions.length ? 0.48 : 0.28,
        });
        const line = new THREE.Line(geo, lineMat);
        lines.push(line);
        group.add(line);
      }
    });

    // Central 3D core wireframe sphere
    const centerGeo = new THREE.IcosahedronGeometry(0.62, 2);
    const centerMat = new THREE.MeshBasicMaterial({
      color: 0xffd75e,
      wireframe: true,
      transparent: true,
      opacity: 0.88,
    });
    const center = new THREE.Mesh(centerGeo, centerMat);
    group.add(center);

    const outerGeo = new THREE.IcosahedronGeometry(0.82, 1);
    const outerMat = new THREE.MeshBasicMaterial({
      color: 0xc9932f,
      wireframe: true,
      transparent: true,
      opacity: 0.42,
    });
    const outer = new THREE.Mesh(outerGeo, outerMat);
    group.add(outer);

    // Inner glowing core sphere
    const innerCoreGeo = new THREE.SphereGeometry(0.25, 16, 16);
    const innerCoreMat = new THREE.MeshBasicMaterial({
      color: 0xffe699,
      transparent: true,
      opacity: 0.8,
    });
    const innerCore = new THREE.Mesh(innerCoreGeo, innerCoreMat);
    group.add(innerCore);

    const glowGeo = new THREE.SphereGeometry(0.42, 24, 24);
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0xffdf82,
      transparent: true,
      opacity: 0.18,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const glow = new THREE.Mesh(glowGeo, glowMat);
    group.add(glow);

    let vis = true;
    const obs = new IntersectionObserver(
      (entries) => {
        vis = entries[0].isIntersecting;
      },
      { threshold: 0.1 }
    );
    obs.observe(wrap);

    let targetRotX = 0;
    let targetRotY = 0;
    let currentRotX = 0;
    let currentRotY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const r = wrap.getBoundingClientRect();
      const mx = (e.clientX - r.left) / r.width - 0.5;
      const my = (e.clientY - r.top) / r.height - 0.5;
      targetRotY = mx * 0.8;
      targetRotX = my * 0.5;
    };
    wrap.addEventListener('mousemove', handleMouseMove);

    const handleMouseLeave = () => {
      targetRotX = 0;
      targetRotY = 0;
    };
    wrap.addEventListener('mouseleave', handleMouseLeave);

    const tempVec = new THREE.Vector3();
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (vis) {
        const t = clock.getElapsedTime();

        // Smooth lerp mouse tracking
        currentRotY += (targetRotY - currentRotY) * 0.06;
        currentRotX += (targetRotX - currentRotX) * 0.06;

        group.rotation.y = t * 0.12 + currentRotY;
        group.rotation.x = currentRotX + Math.sin(t * 0.5) * 0.05;

        center.rotation.y = -t * 0.3;
        center.rotation.x = t * 0.2;
        outer.rotation.y = t * 0.22;
        outer.rotation.x = -t * 0.16;
        
        const pulse = 1 + Math.sin(t * 3) * 0.08;
        innerCore.scale.set(pulse, pulse, pulse);
        glow.scale.setScalar(1.05 + Math.sin(t * 2.4) * 0.08);

        renderer.render(scene, camera);

        // Project 3D node coordinates to 2D HTML overlays
        if (overlayRef.current) {
          const width = wrap.clientWidth;
          const height = wrap.clientHeight;

          FEATURE_LABELS.forEach((item, idx) => {
            const targetMesh = nodes[idx < keyPositions.length ? idx : item.nodeIndex];
            if (!targetMesh) return;

            tempVec.copy(targetMesh.position);
            targetMesh.localToWorld(tempVec);
            tempVec.project(camera);

            const x = (tempVec.x * 0.5 + 0.5) * width;
            const y = (-(tempVec.y * 0.5) + 0.5) * height;

            const el = overlayRef.current?.children[idx] as HTMLElement;
            if (el) {
              el.style.transform = `translate3d(${x}px, ${y}px, 0px) translate(-50%, -100%)`;
              el.style.opacity = tempVec.z < 1 ? '1' : '0';
            }
          });
        }
      }
    };

    resize();
    animate();

    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      obs.disconnect();
      wrap.removeEventListener('mousemove', handleMouseMove);
      wrap.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', resize);
      renderer.dispose();
      nodeGeo.dispose();
      nodes.forEach((node) => (node.material as THREE.Material).dispose());
      lines.forEach((line) => {
        line.geometry.dispose();
        (line.material as THREE.Material).dispose();
      });
      centerGeo.dispose();
      centerMat.dispose();
      outerGeo.dispose();
      outerMat.dispose();
      innerCoreGeo.dispose();
      innerCoreMat.dispose();
      glowGeo.dispose();
      glowMat.dispose();
    };
  }, []);

  return (
    <div className="vault-card relative w-full overflow-hidden select-none">
      <canvas ref={canvasRef} id="wellpath-canvas" className="w-full h-full block" />
      <span className="wellpath-badge badge badge-gold">Pilot Platform</span>

      {/* HTML 3D Projected Node Overlay Labels */}
      <div ref={overlayRef} className="absolute inset-0 pointer-events-none z-10 vault-labels">
        {FEATURE_LABELS.map((label, i) => (
          <div
            key={i}
            className="vault-label absolute top-0 left-0 transition-opacity duration-300 ease-out flex flex-col items-center group cursor-pointer pointer-events-auto"
            onMouseEnter={() => setActiveLabel(label.text)}
            onMouseLeave={() => setActiveLabel(null)}
          >
            {/* The main pill */}
            <div className="px-2.5 py-1 rounded-full bg-black/90 backdrop-blur-md border border-[#e5c158]/60 text-white text-[10px] sm:text-[11px] font-medium tracking-wide flex items-center gap-1.5 shadow-[0_4px_12px_rgba(0,0,0,0.8)] group-hover:border-[#e5c158] group-hover:bg-[#15120a] transition-all">
              <span className="w-1.5 h-1.5 rounded-full bg-[#e5c158] animate-pulse" />
              <span className="text-[#fceabb] font-sans font-semibold tracking-wide whitespace-nowrap">{label.text}</span>
            </div>
            
            {/* Elegant vertical leader line connecting pill to the exact node ball */}
            <div className="w-[1.5px] h-5 bg-gradient-to-b from-[#e5c158]/70 to-[#e5c158]/20 transition-all group-hover:h-7 group-hover:from-[#e5c158] group-hover:to-[#e5c158]/40" />

            {/* Small anchor dot on the node ball */}
            <div className="w-2.5 h-2.5 rounded-full bg-[#e5c158] border border-black/40 ring-2 ring-[#e5c158]/30 group-hover:ring-[#e5c158]/60 transition-all flex items-center justify-center">
              <div className="w-1 h-1 rounded-full bg-black/60" />
            </div>

            {/* Subtitle / Description shown on hover */}
            <div className="absolute bottom-[calc(100%+6px)] scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-200 pointer-events-none z-20">
              <span className="text-[9px] text-[#f2e2be] font-mono tracking-tight bg-[#110f0a] border border-[#e5c158]/30 px-2 py-0.5 rounded shadow-lg whitespace-nowrap">
                {label.sub}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="wellpath-caption">
        <b>Encrypted Vault &middot; Automated Follow-ups &middot; Secure Pathways</b>
        <p>Interactive ecosystem graph mapping verified health programs, encrypted data nodes, and automated referral pathways.</p>
      </div>
    </div>
  );
};
