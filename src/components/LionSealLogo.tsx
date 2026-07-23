import React from 'react';
import { resolveNemeanLogoUrl } from '../data/branding';

interface LionSealLogoProps {
  size?: number;
  showGlow?: boolean;
  subtext?: string;
  imageUrl?: string;
}

export const LionSealLogo: React.FC<LionSealLogoProps> = ({ size = 52, showGlow = true, subtext = "PARTNERS", imageUrl }) => {
  const [imgError, setImgError] = React.useState(false);
  const resolvedImageUrl = resolveNemeanLogoUrl(imageUrl);

  if (!imgError) {
    return (
      <div 
        className={`relative flex items-center justify-center shrink-0 rounded-full bg-black overflow-hidden border-2 border-[#e5c158] ${showGlow ? 'drop-shadow-[0_0_20px_rgba(212,175,55,0.5)]' : ''}`}
        style={{ width: size, height: size }}
      >
        <img 
          src={resolvedImageUrl} 
          alt="Nemean Logo" 
          onError={() => setImgError(true)}
          className="w-full h-full object-cover rounded-full"
        />
      </div>
    );
  }

  return (
    <div 
      className={`relative flex items-center justify-center shrink-0 rounded-full ${showGlow ? 'drop-shadow-[0_0_20px_rgba(212,175,55,0.45)]' : ''}`}
      style={{ width: size, height: size }}
    >
      <svg 
        viewBox="0 0 100 100" 
        className="w-full h-full"
      >
        <defs>
          <linearGradient id="lionGoldGrad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#fdf0be" />
            <stop offset="35%" stopColor="#e5c158" />
            <stop offset="70%" stopColor="#a88228" />
            <stop offset="100%" stopColor="#f5d77f" />
          </linearGradient>
        </defs>

        {/* Outer Gold Ring */}
        <circle cx="50" cy="50" r="47" fill="#0b0a0e" stroke="url(#lionGoldGrad)" strokeWidth="3.2" />

        {/* Geometric Lion Head (Facing Right Side Profile) */}
        <g stroke="url(#lionGoldGrad)" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round">
          {/* Crown / Top Mane Cap */}
          <polygon points="40,22 52,20 54,26" fill="url(#lionGoldGrad)" fillOpacity="0.3" strokeWidth="1.5" />
          <path d="M 42 21 L 52 24 L 60 20 L 67 26 L 72 33" />
          <path d="M 36 31 L 45 28 L 54 32 L 63 30 L 68 37" />
          <path d="M 34 41 L 43 37 L 51 41" />
          <path d="M 34 51 L 41 46 L 49 49" />

          {/* Forehead, Eyebrow & Eye */}
          <path d="M 52 24 L 60 27 L 67 34 L 72 39" strokeWidth="2.4" />
          <polygon points="56,32 62,34 57,36" fill="url(#lionGoldGrad)" opacity="0.95" stroke="none" />

          {/* Muzzle, Nose, Mouth & Teeth */}
          <path d="M 67 34 L 75 40 L 72 46 L 64 45" />
          <path d="M 72 46 L 64 48 L 69 53" />
          <path d="M 66 49 L 67 51" strokeWidth="1.6" />

          {/* Lower Jaw / Chin & Neck */}
          <path d="M 69 53 L 62 59 L 54 56 L 57 63 L 48 59" />
          <path d="M 54 56 L 47 50 L 41 56 L 37 51" />
        </g>

        {/* NEMEAN text - Clean Non-Curved Sans-Serif */}
        <text 
          x="50" 
          y="73.5" 
          textAnchor="middle" 
          fill="url(#lionGoldGrad)" 
          fontSize="8.5" 
          fontWeight="800" 
          fontFamily="Arial, Helvetica, sans-serif" 
          letterSpacing="1.4"
        >
          NEMEAN
        </text>

        {/* INNOVATIONS / PARTNERS text */}
        <text 
          x="50" 
          y="82" 
          textAnchor="middle" 
          fill="url(#lionGoldGrad)" 
          fontSize="4.8" 
          fontWeight="700" 
          fontFamily="Arial, Helvetica, sans-serif" 
          letterSpacing="2.0"
        >
          {subtext}
        </text>
      </svg>
    </div>
  );
};
