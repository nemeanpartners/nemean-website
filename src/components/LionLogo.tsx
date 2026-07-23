import React, { useState } from 'react';
import { NEMEAN_LOGO_URL } from '../data/branding';

interface LionLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

export const LionLogo: React.FC<LionLogoProps> = ({ className = '', size = 42, showText = true }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div 
        className="relative flex items-center justify-center rounded-full bg-gradient-to-tr from-[#d4af37] via-[#fff] to-[#b8860b] p-[2px] shadow-lg shadow-amber-500/20 transition-transform duration-300 hover:scale-105 shrink-0"
        style={{ width: size, height: size }}
      >
        <div className="flex h-full w-full items-center justify-center rounded-full bg-black overflow-hidden border border-amber-500/40">
          {!imgError ? (
            <img
              src={NEMEAN_LOGO_URL}
              alt="Nemean Logo"
              onError={() => setImgError(true)}
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <svg
              viewBox="0 0 100 100"
              className="h-3/4 w-3/4"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="nemeanGold" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fef08a" />
                  <stop offset="50%" stopColor="#d4af37" />
                  <stop offset="100%" stopColor="#b8860b" />
                </linearGradient>
              </defs>
              <path
                d="M50 8 L78 22 C78 50, 68 76, 50 92 C32 76, 22 50, 22 22 Z"
                stroke="url(#nemeanGold)"
                strokeWidth="4"
                strokeLinejoin="round"
                fill="none"
              />
              <path
                d="M36 34 L50 24 L64 34 L58 50 L42 50 Z"
                fill="url(#nemeanGold)"
                opacity="0.9"
              />
              <circle cx="42" cy="40" r="2.5" fill="#fef08a" />
              <circle cx="58" cy="40" r="2.5" fill="#fef08a" />
            </svg>
          )}
        </div>
      </div>

      {showText && (
        <div className="flex flex-col text-left">
          <span className="font-extrabold text-lg sm:text-xl tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#fff] to-[#d4af37]">
            NEMEAN PARTNERS
          </span>
          <span className="text-[10px] font-bold tracking-widest text-[#d4af37]/80 uppercase">
            Queensland Technology Company
          </span>
        </div>
      )}
    </div>
  );
};
