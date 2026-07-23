import React, { useState, useRef, MouseEvent } from 'react';
import { motion } from 'motion/react';

interface Card3DProps {
  children: React.ReactNode;
  className?: string;
  index?: number;
  featured?: boolean;
}

export const Card3D: React.FC<Card3DProps> = ({ 
  children, 
  className = '', 
  index = 0,
  featured = false 
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Calculate normalized coordinates from center (-0.5 to 0.5)
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = (mouseX / width) - 0.5;
    const yPct = (mouseY / height) - 0.5;

    // Tilt angle caps
    const maxTilt = 14; 
    const rY = xPct * maxTilt;
    const rX = -yPct * maxTilt;

    setRotateX(rX);
    setRotateY(rY);
    setGlarePos({
      x: (mouseX / width) * 100,
      y: (mouseY / height) * 100,
      opacity: 0.35,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
    setGlarePos(prev => ({ ...prev, opacity: 0 }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -60, rotateX: -25, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ 
        duration: 0.7, 
        delay: index * 0.12, 
        ease: [0.16, 1, 0.3, 1] 
      }}
      className="perspective-1000 my-2"
      style={{ perspective: '1200px' }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) ${isHovered ? 'scale3d(1.02, 1.02, 1.02) translateZ(15px)' : 'scale3d(1, 1, 1)'}`,
          transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
          transformStyle: 'preserve-3d',
        }}
        className={`relative rounded-3xl transition-all duration-300 group ${
          featured 
            ? 'bg-gradient-to-b from-white/[0.09] via-white/[0.05] to-black/60 border border-[#d4af37]/60 shadow-[0_15px_35px_rgba(212,175,55,0.18)]' 
            : 'bg-white/[0.06] backdrop-blur-xl border border-white/15 hover:border-[#d4af37]/50 shadow-[0_12px_30px_rgba(0,0,0,0.6)]'
        } ${className}`}
      >
        {/* Dynamic 3D Glare Light Overlay */}
        <div 
          className="pointer-events-none absolute inset-0 rounded-3xl transition-opacity duration-300 z-30"
          style={{
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.18) 0%, rgba(212,175,55,0.12) 35%, transparent 75%)`,
            opacity: glarePos.opacity,
          }}
        />

        {/* Top 3D Specular Rim Line */}
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-t-3xl z-20 pointer-events-none" />

        {/* 3D Depth Inner Layer */}
        <div 
          style={{ transform: 'translateZ(25px)', transformStyle: 'preserve-3d' }}
          className="relative z-10 w-full h-full"
        >
          {children}
        </div>

        {/* Dynamic 3D Floor Shadow */}
        <div 
          className="absolute -bottom-4 inset-x-6 h-6 bg-black/60 blur-md rounded-full -z-10 transition-all duration-300 group-hover:bg-[#d4af37]/20 group-hover:blur-lg"
          style={{
            transform: `translate3d(${rotateY * -1.5}px, ${rotateX * 1.5}px, -20px)`,
          }}
        />
      </div>
    </motion.div>
  );
};
