import React from 'react';

interface AppLogoProps {
  id: string;
  name: string;
  size?: number;
  isUpcoming?: boolean;
}

export const AppLogo: React.FC<AppLogoProps> = ({ id, name, size = 52, isUpcoming = false }) => {
  switch (id) {
    case 'wellpath':
      // Image 5: Vibrant blue gradient rounded rectangle with white 'W'
      return (
        <div 
          className="relative flex items-center justify-center rounded-2xl bg-gradient-to-br from-[#1ea2f7] via-[#0070f3] to-[#0f4c81] shadow-lg shadow-blue-500/20 border border-cyan-300/30 shrink-0 overflow-hidden"
          style={{ width: size, height: size }}
        >
          <span className="font-black text-white text-2xl tracking-tighter drop-shadow-md select-none font-sans">
            W
          </span>
        </div>
      );

    case 'tryon-beauty':
      // Black circle with gold border & KB Kobella monogram
      return (
        <div 
          className="relative flex items-center justify-center rounded-full bg-black border-2 border-[#d4af37] shadow-lg shadow-amber-500/20 shrink-0 overflow-hidden p-1"
          style={{ width: size, height: size }}
        >
          <div className="w-full h-full rounded-full border border-[#d4af37]/40 flex items-center justify-center bg-neutral-950">
            <span className="font-serif font-bold text-[#d4af37] text-xs tracking-tighter text-center leading-none">
              KB
            </span>
          </div>
        </div>
      );

    case 'education-revolution':
      // Blue circle with stacked diamonds/layers
      return (
        <div 
          className="relative flex items-center justify-center rounded-full bg-gradient-to-br from-[#1e293b] via-[#0f172a] to-black border-2 border-blue-400/50 shadow-lg shadow-blue-500/20 shrink-0 overflow-hidden"
          style={{ width: size, height: size }}
        >
          <svg className="w-6 h-6 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m12 3-8 4.5 8 4.5 8-4.5-8-4.5z" />
            <path d="m4 12 8 4.5 8-4.5" />
            <path d="m4 16.5 8 4.5 8-4.5" />
          </svg>
        </div>
      );

    case 'repairsync':
      // Image 3: Blue gear with wrench icon inside
      return (
        <div 
          className="relative flex items-center justify-center rounded-2xl bg-[#030914] border border-blue-500/30 shadow-lg shadow-blue-600/30 shrink-0 overflow-hidden p-2"
          style={{ width: size, height: size }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full text-[#1e88e5]">
            <path 
              d="M50 20 A30 30 0 1 0 50 80 A30 30 0 1 0 50 20 Z" 
              fill="none" 
              stroke="#1e88e5" 
              strokeWidth="10" 
            />
            <path 
              d="M32 68 L60 40 C64 34 72 34 76 38 C80 42 80 50 74 54 L46 82 Z" 
              fill="#0d47a1" 
              stroke="#00b0ff" 
              strokeWidth="4" 
            />
            <path 
              d="M25 75 L45 55 L35 45 L15 65 Z" 
              fill="#00b0ff" 
            />
          </svg>
        </div>
      );

    case 'clickdin':
      // Image 4: Bright blue chat speech bubble with 'C'
      return (
        <div 
          className="relative flex items-center justify-center rounded-2xl bg-white border border-blue-200 shadow-lg shrink-0 overflow-hidden p-1.5"
          style={{ width: size, height: size }}
        >
          <div className="w-full h-full flex items-center justify-center bg-white">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <path 
                d="M50 10 C25 10 10 25 10 48 C10 60 16 71 26 78 L20 90 L36 84 C41 86 45 87 50 87 C75 87 90 72 90 48 C90 25 75 10 50 10 Z" 
                fill="#007aff" 
              />
              <text 
                x="50" 
                y="61" 
                fill="#ffffff" 
                fontSize="46" 
                fontWeight="900" 
                fontFamily="system-ui, sans-serif" 
                textAnchor="middle"
              >
                C
              </text>
            </svg>
          </div>
        </div>
      );

    case 'seen-media':
      // Digital signage media screen icon
      return (
        <div 
          className="relative flex items-center justify-center rounded-2xl bg-gradient-to-br from-[#3b0764] via-[#1e1b4b] to-black border border-purple-500/40 shadow-lg shadow-purple-600/20 shrink-0 overflow-hidden"
          style={{ width: size, height: size }}
        >
          <svg className="w-6 h-6 text-purple-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="20" height="14" x="2" y="3" rx="2" />
            <line x1="8" x2="16" y1="21" y2="21" />
            <line x1="12" x2="12" y1="17" y2="21" />
            <polygon points="10 8 15 11 10 14 10 8" fill="currentColor" />
          </svg>
        </div>
      );

    case 'washworks':
      return (
        <div 
          className="relative flex items-center justify-center rounded-2xl bg-gradient-to-br from-[#06b6d4] via-[#0284c7] to-[#0f172a] border border-cyan-400/40 shadow-lg shadow-cyan-500/20 shrink-0 overflow-hidden"
          style={{ width: size, height: size }}
        >
          <svg className="w-6 h-6 text-cyan-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
          </svg>
        </div>
      );

    case 'messagewise':
      return (
        <div 
          className="relative flex items-center justify-center rounded-2xl bg-gradient-to-br from-[#10b981] via-[#059669] to-[#064e3b] border border-emerald-400/40 shadow-lg shadow-emerald-500/20 shrink-0 overflow-hidden"
          style={{ width: size, height: size }}
        >
          <svg className="w-6 h-6 text-emerald-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </div>
      );

    case 'smsbackup':
      return (
        <div 
          className="relative flex items-center justify-center rounded-2xl bg-gradient-to-br from-[#d97706] via-[#b45309] to-[#451a03] border border-amber-400/40 shadow-lg shadow-amber-500/20 shrink-0 overflow-hidden"
          style={{ width: size, height: size }}
        >
          <svg className="w-6 h-6 text-amber-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9z" />
          </svg>
        </div>
      );

    default:
      return (
        <div 
          className="relative flex items-center justify-center rounded-2xl bg-white/10 border border-white/20 shrink-0"
          style={{ width: size, height: size }}
        >
          <span className="font-bold text-white text-base">{name.slice(0, 2).toUpperCase()}</span>
        </div>
      );
  }
};
