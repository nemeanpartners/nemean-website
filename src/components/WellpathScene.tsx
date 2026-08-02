import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const FEATURES = [
  { text: 'Goal & Barrier Intake', sub: 'Queensland User Input' },
  { text: 'Explainable Engine', sub: 'Program Matching' },
  { text: 'Encrypted Vault', sub: 'Secure Health Data' },
  { text: 'Closed-Loop Milestone', sub: 'Automated Follow-up' },
];

interface SceneNode {
  pos: THREE.Vector3;
  mesh: THREE.Sprite;
  key: boolean;
  phase: number;
}

interface PulseCarrier {
  curve: THREE.QuadraticBezierCurve3;
  sprite: THREE.Sprite;
  speed: number;
  offset: number;
}

const makeGlowTexture = (hex: string) => {
  const c = document.createElement('canvas');
  c.width = 128;
  c.height = 128;
  const ctx = c.getContext('2d');
  if (!ctx) return null;
  const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  g.addColorStop(0, hex);
  g.addColorStop(0.28, hex);
  g.addColorStop(0.58, `${hex}55`);
  g.addColorStop(1, `${hex}00`);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 128, 128);
  return new THREE.CanvasTexture(c);
};

export const WellpathScene: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const labelsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const labelsRoot = labelsRef.current;
    if (!canvas || !labelsRoot) return;

    const wrap = canvas.parentElement;
    if (!wrap) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050308, 0.11);

    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0, 6.3);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const resize = () => {
      const w = wrap.clientWidth || wrap.offsetWidth || 480;
      const h = wrap.clientHeight || wrap.offsetHeight || 600;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };

    const world = new THREE.Group();
    world.position.y = 0.08;
    scene.add(world);

    const goldTex = makeGlowTexture('#ffe9a8');
    const goldTex2 = makeGlowTexture('#e8c874');
    const violetTex = makeGlowTexture('#9b8cf6');
    if (!goldTex || !goldTex2 || !violetTex) return;

    const createdGeometries: THREE.BufferGeometry[] = [];
    const createdMaterials: THREE.Material[] = [];
    const createdTextures = [goldTex, goldTex2, violetTex];

    const core = new THREE.Group();
    world.add(core);

    const shellGeoA = new THREE.IcosahedronGeometry(0.62, 1);
    const shellMatA = new THREE.MeshBasicMaterial({ color: 0xe8c874, wireframe: true, transparent: true, opacity: 0.55 });
    const shellA = new THREE.Mesh(shellGeoA, shellMatA);
    const shellGeoB = new THREE.IcosahedronGeometry(0.46, 2);
    const shellMatB = new THREE.MeshBasicMaterial({ color: 0xffe9a8, wireframe: true, transparent: true, opacity: 0.3 });
    const shellB = new THREE.Mesh(shellGeoB, shellMatB);
    createdGeometries.push(shellGeoA, shellGeoB);
    createdMaterials.push(shellMatA, shellMatB);
    core.add(shellA, shellB);

    const innerGlowMat = new THREE.SpriteMaterial({ map: goldTex, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false });
    const innerGlow = new THREE.Sprite(innerGlowMat);
    innerGlow.scale.set(0.9, 0.9, 0.9);
    createdMaterials.push(innerGlowMat);
    core.add(innerGlow);

    const innerSolidGeo = new THREE.SphereGeometry(0.16, 24, 24);
    const innerSolidMat = new THREE.MeshBasicMaterial({ color: 0xfff3d6 });
    const innerSolid = new THREE.Mesh(innerSolidGeo, innerSolidMat);
    createdGeometries.push(innerSolidGeo);
    createdMaterials.push(innerSolidMat);
    core.add(innerSolid);

    const ringGroup = new THREE.Group();
    const RING_N = 46;
    for (let i = 0; i < RING_N; i++) {
      const t = (i / RING_N) * Math.PI * 2;
      const r = 0.95 + Math.sin(t * 3.1) * 0.04;
      const p = new THREE.Vector3(Math.cos(t) * r, Math.sin(t) * r * 0.32, Math.sin(t * 1.7) * 0.18);
      const mat = new THREE.SpriteMaterial({ map: goldTex2, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, opacity: 0.85 });
      const s = new THREE.Sprite(mat);
      s.position.copy(p);
      s.scale.setScalar(0.035 + (i % 7 === 0 ? 0.03 : 0));
      createdMaterials.push(mat);
      ringGroup.add(s);
    }
    ringGroup.rotation.x = 1.05;
    ringGroup.rotation.z = 0.35;
    core.add(ringGroup);

    const ringGroup2 = ringGroup.clone();
    ringGroup2.rotation.x = -0.5;
    ringGroup2.rotation.z = -1.2;
    ringGroup2.scale.setScalar(1.28);
    core.add(ringGroup2);

    const NODE_COUNT = 34;
    const KEY_COUNT = FEATURES.length;
    const nodes: SceneNode[] = [];
    const keyPositions = [
      new THREE.Vector3(-1.55, 1.05, 0.35),
      new THREE.Vector3(1.55, 0.95, -0.25),
      new THREE.Vector3(-1.35, -1.05, 0.25),
      new THREE.Vector3(1.4, -1.0, -0.35),
    ];

    for (let i = 0; i < NODE_COUNT; i++) {
      const isKey = i < KEY_COUNT;
      let pos: THREE.Vector3;
      if (isKey) {
        pos = keyPositions[i].clone();
      } else {
        const radius = 1.7 + Math.random() * 1.15;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);
        pos = new THREE.Vector3(
          radius * Math.sin(phi) * Math.cos(theta),
          radius * Math.sin(phi) * Math.sin(theta),
          radius * Math.cos(phi) * 0.75
        );
      }

      const isViolet = !isKey && Math.random() < 0.24;
      const tex = isKey ? goldTex : (isViolet ? violetTex : goldTex2);
      const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false });
      const sprite = new THREE.Sprite(mat);
      const scale = isKey ? 0.16 : (0.07 + Math.random() * 0.05);
      sprite.scale.set(scale, scale, scale);
      sprite.position.copy(pos);
      createdMaterials.push(mat);
      world.add(sprite);
      nodes.push({ pos, mesh: sprite, key: isKey, phase: Math.random() * Math.PI * 2 });
    }

    const lineGroup = new THREE.Group();
    world.add(lineGroup);
    const pulseCarriers: PulseCarrier[] = [];

    const makeCurve = (a: THREE.Vector3, b: THREE.Vector3) => {
      const mid = a.clone().lerp(b, 0.5);
      const bow = mid.clone().normalize().multiplyScalar(0.28 * (Math.random() > 0.5 ? 1 : -1));
      mid.add(bow);
      return new THREE.QuadraticBezierCurve3(a, mid, b);
    };

    nodes.forEach((n, i) => {
      const dists = nodes
        .map((m, j) => ({ j, d: n.pos.distanceTo(m.pos) }))
        .filter((o) => o.j !== i)
        .sort((a, b) => a.d - b.d);

      for (let k = 0; k < 2; k++) {
        const other = nodes[dists[k].j];
        const curve = makeCurve(n.pos, other.pos);
        const geo = new THREE.BufferGeometry().setFromPoints(curve.getPoints(24));
        const mat = new THREE.LineBasicMaterial({
          color: n.key || other.key ? 0xe8c874 : 0x8f7fd6,
          transparent: true,
          opacity: n.key || other.key ? 0.34 : 0.16,
        });
        createdGeometries.push(geo);
        createdMaterials.push(mat);
        lineGroup.add(new THREE.Line(geo, mat));
      }

      if (n.key) {
        const curve = makeCurve(n.pos, new THREE.Vector3(0, 0, 0));
        const geo = new THREE.BufferGeometry().setFromPoints(curve.getPoints(24));
        const mat = new THREE.LineBasicMaterial({ color: 0xffe9a8, transparent: true, opacity: 0.4 });
        createdGeometries.push(geo);
        createdMaterials.push(mat);
        lineGroup.add(new THREE.Line(geo, mat));

        const pulseMat = new THREE.SpriteMaterial({ map: goldTex, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false });
        const sprite = new THREE.Sprite(pulseMat);
        sprite.scale.set(0.09, 0.09, 0.09);
        createdMaterials.push(pulseMat);
        world.add(sprite);
        pulseCarriers.push({ curve, sprite, speed: 0.18 + Math.random() * 0.08, offset: Math.random() });
      }
    });

    for (let i = 0; i < 8; i++) {
      const a = nodes[Math.floor(Math.random() * nodes.length)];
      const b = nodes[Math.floor(Math.random() * nodes.length)];
      if (a === b) continue;
      const curve = makeCurve(a.pos, b.pos);
      const pulseMat = new THREE.SpriteMaterial({ map: violetTex, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, opacity: 0.75 });
      const sprite = new THREE.Sprite(pulseMat);
      sprite.scale.set(0.055, 0.055, 0.055);
      createdMaterials.push(pulseMat);
      world.add(sprite);
      pulseCarriers.push({ curve, sprite, speed: 0.1 + Math.random() * 0.1, offset: Math.random() });
    }

    const starGeo = new THREE.BufferGeometry();
    const STAR_N = 260;
    const starPos = new Float32Array(STAR_N * 3);
    for (let i = 0; i < STAR_N; i++) {
      const r = 5 + Math.random() * 9;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      starPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      starPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      starPos[i * 3 + 2] = r * Math.cos(phi) - 3;
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.02, transparent: true, opacity: 0.5, sizeAttenuation: true });
    const stars = new THREE.Points(starGeo, starMat);
    createdGeometries.push(starGeo);
    createdMaterials.push(starMat);
    scene.add(stars);

    let vis = true;
    const io = new IntersectionObserver((entries) => {
      vis = entries[0].isIntersecting;
    }, { threshold: 0.1 });
    io.observe(wrap);

    let targetRotX = 0;
    let targetRotY = 0;
    let curRotX = 0;
    let curRotY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const r = wrap.getBoundingClientRect();
      const mx = (e.clientX - r.left) / r.width - 0.5;
      const my = (e.clientY - r.top) / r.height - 0.5;
      targetRotY = mx * 0.7;
      targetRotX = my * 0.4;
    };
    const handleMouseLeave = () => {
      targetRotX = 0;
      targetRotY = 0;
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (!e.touches[0]) return;
      const r = wrap.getBoundingClientRect();
      const t = e.touches[0];
      const mx = (t.clientX - r.left) / r.width - 0.5;
      const my = (t.clientY - r.top) / r.height - 0.5;
      targetRotY = mx * 0.5;
      targetRotX = my * 0.3;
    };
    wrap.addEventListener('mousemove', handleMouseMove);
    wrap.addEventListener('mouseleave', handleMouseLeave);
    wrap.addEventListener('touchmove', handleTouchMove, { passive: true });

    const clock = new THREE.Clock();
    const tmp = new THREE.Vector3();
    let raf = 0;

    const animate = () => {
      raf = requestAnimationFrame(animate);
      if (!vis) return;
      const t = clock.getElapsedTime();

      curRotY += (targetRotY - curRotY) * 0.055;
      curRotX += (targetRotX - curRotX) * 0.055;

      world.rotation.y = t * 0.09 + curRotY;
      world.rotation.x = curRotX + Math.sin(t * 0.35) * 0.05;

      shellA.rotation.y = t * 0.35;
      shellA.rotation.x = t * 0.18;
      shellB.rotation.y = -t * 0.5;
      shellB.rotation.x = -t * 0.22;

      ringGroup.rotation.y = t * 0.6;
      ringGroup2.rotation.y = -t * 0.4;

      const pulse = 1 + Math.sin(t * 2.6) * 0.1;
      innerGlow.scale.set(0.9 * pulse, 0.9 * pulse, 0.9 * pulse);
      innerSolid.scale.setScalar(1 + Math.sin(t * 2.6) * 0.06);

      nodes.forEach((n) => {
        n.mesh.position.y = n.pos.y + Math.sin(t * 0.8 + n.phase) * 0.02;
      });

      pulseCarriers.forEach((p) => {
        const u = (t * p.speed + p.offset) % 1;
        p.sprite.position.copy(p.curve.getPoint(u));
      });

      stars.rotation.y = t * 0.01;
      renderer.render(scene, camera);

      const w = wrap.clientWidth;
      const h = wrap.clientHeight;
      let keyIdx = 0;
      nodes.forEach((n) => {
        if (!n.key) return;
        tmp.copy(n.mesh.position);
        n.mesh.parent?.localToWorld(tmp);
        tmp.project(camera);
        const x = (tmp.x * 0.5 + 0.5) * w;
        const y = (-(tmp.y * 0.5) + 0.5) * h;
        const el = labelsRoot.children[keyIdx] as HTMLElement | undefined;
        if (el) {
          el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -100%)`;
          el.style.opacity = tmp.z < 1 ? '1' : '0';
        }
        keyIdx++;
      });
    };

    resize();
    animate();
    window.addEventListener('resize', resize);
    const ro = window.ResizeObserver ? new ResizeObserver(resize) : null;
    ro?.observe(wrap);
    requestAnimationFrame(resize);
    const resizeTimerA = window.setTimeout(resize, 150);
    const resizeTimerB = window.setTimeout(resize, 500);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(resizeTimerA);
      window.clearTimeout(resizeTimerB);
      window.removeEventListener('resize', resize);
      wrap.removeEventListener('mousemove', handleMouseMove);
      wrap.removeEventListener('mouseleave', handleMouseLeave);
      wrap.removeEventListener('touchmove', handleTouchMove);
      ro?.disconnect();
      io.disconnect();
      renderer.dispose();
      createdGeometries.forEach((geo) => geo.dispose());
      createdMaterials.forEach((mat) => mat.dispose());
      createdTextures.forEach((tex) => tex.dispose());
    };
  }, []);

  return (
    <div className="vault-card" id="vault">
      <canvas ref={canvasRef} id="wellpath-canvas" />
      <span className="vault-badge">Pilot Platform</span>
      <div ref={labelsRef} className="vault-labels">
        {FEATURES.map((feature) => (
          <div className="vault-label" key={feature.text}>
            <div className="vault-pill">
              <span className="vault-dot" />
              <span className="vault-text">{feature.text}</span>
            </div>
            <div className="vault-leader" />
            <div className="vault-anchor" />
            <div className="vault-sub">{feature.sub}</div>
          </div>
        ))}
      </div>
      <div className="wellpath-caption">
        <b>Encrypted Vault &middot; Automated Follow-ups &middot; Secure Pathways</b>
        <p>Interactive ecosystem graph mapping verified health programs, encrypted data nodes, and automated referral pathways across Queensland.</p>
      </div>
    </div>
  );
};
