import React from 'react';
import { motion } from 'motion/react';

export const Ambient3DElements: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* 3D Floating Gold Ring 1 */}
      <motion.div
        animate={{
          y: [0, -25, 0],
          rotateX: [0, 180, 360],
          rotateY: [0, 120, 240],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/4 -left-12 w-48 h-48 rounded-full border-[6px] border-[#d4af37]/20 blur-[1px] shadow-[0_0_30px_rgba(212,175,55,0.15)]"
        style={{ perspective: 1000 }}
      />

      {/* 3D Floating Cyan Gem Cube / Octahedron Glow 2 */}
      <motion.div
        animate={{
          y: [0, 30, 0],
          rotateZ: [0, 90, 180],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-2/3 -right-16 w-64 h-64 bg-gradient-to-tr from-cyan-500/10 via-blue-600/10 to-transparent rounded-3xl border border-cyan-400/20 backdrop-blur-2xl blur-sm"
        style={{ transform: 'rotateX(45deg) rotateY(30deg)' }}
      />

      {/* 3D Glowing Gold Ambient Sphere Top Right */}
      <div className="absolute top-10 right-1/4 w-96 h-96 bg-[#d4af37]/10 rounded-full blur-[100px] pointer-events-none" />

      {/* 3D Glowing Blue Ambient Sphere Bottom Left */}
      <div className="absolute bottom-10 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
    </div>
  );
};
