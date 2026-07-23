import React from 'react';
import { NEMEAN_LOGO_URL } from '../data/branding';

interface HeroSceneProps {
  logoUrl?: string;
}

export const HeroScene: React.FC<HeroSceneProps> = ({ logoUrl = NEMEAN_LOGO_URL }) => {
  return (
    <div id="hero-canvas" className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_42%,rgba(229,193,88,0.18),transparent_34%),radial-gradient(circle_at_88%_18%,rgba(255,244,196,0.08),transparent_24%)]" />
      <div className="absolute right-[-8vw] top-1/2 hidden h-[min(54vw,620px)] w-[min(54vw,620px)] -translate-y-1/2 items-center justify-center rounded-full border border-[#e5c158]/15 bg-[#0a090d]/40 shadow-[0_0_120px_rgba(212,175,55,0.16)] backdrop-blur-sm md:flex">
        <div className="absolute inset-[12%] rounded-full border border-[#e5c158]/10" />
        <div className="absolute inset-[24%] rounded-full border border-[#e5c158]/10" />
        <img
          src={logoUrl}
          alt=""
          className="relative h-[42%] w-[42%] rounded-[18px] object-cover shadow-[0_0_70px_rgba(229,193,88,0.28)]"
        />
      </div>
    </div>
  );
};
