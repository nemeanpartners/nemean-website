import React, { useState, useEffect } from 'react';
import { PageTab } from '../types';
import { LionSealLogo } from './LionSealLogo';

interface HeaderProps {
  activeTab: PageTab;
  setActiveTab: (tab: PageTab) => void;
  onOpenTrustModal?: (type: any) => void;
  logoUrl?: string;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, logoUrl }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string, tabId: PageTab) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navItems: { id: PageTab; label: string; sectionId: string; hasDot?: boolean }[] = [
    { id: 'home', label: 'Home', sectionId: 'hero' },
    { id: 'about', label: 'About', sectionId: 'about' },
    { id: 'products', label: 'Products', sectionId: 'products' },
    { id: 'wellpath', label: 'WellPath', sectionId: 'wellpath', hasDot: true },
    { id: 'capability', label: 'Capability', sectionId: 'capability' },
    { id: 'contact', label: 'Contact', sectionId: 'contact' },
  ];

  return (
    <>
      <nav id="nav" className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-3 px-4 sm:px-8 ${isScrolled ? 'bg-[#07060a]/90 backdrop-blur-md border-b border-white/10 shadow-2xl py-2' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Brand Logo & Title - Image 1 Style */}
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => scrollToSection('hero', 'home')}
          >
            <LionSealLogo size={46} showGlow={true} imageUrl={logoUrl} />
            <div className="flex flex-col">
              <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#fef0be] via-[#e5c158] to-[#b3892c] text-lg sm:text-xl tracking-wider uppercase font-sans leading-tight group-hover:brightness-125 transition-all">
                NEMEAN PARTNERS
              </span>
              <span className="text-[10px] sm:text-[10.5px] tracking-[0.2em] text-[#d4af37]/90 font-mono font-semibold uppercase leading-tight">
                QUEENSLAND TECHNOLOGY COMPANY
              </span>
            </div>
          </div>

          {/* Floating Pill Nav Bar - Image 2 Style */}
          <div className="hidden lg:flex items-center bg-[#0d0c11]/90 backdrop-blur-xl border border-white/10 rounded-full p-1.5 shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.sectionId, item.id)}
                  className={`relative flex flex-col items-center justify-center px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#222126] text-[#e8c864] shadow-inner'
                      : 'text-[#a1998e] hover:text-[#f3ead9] hover:bg-white/5'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    {item.label}
                  </span>
                  {/* Green glowing dot indicator for WellPath - Image 2 */}
                  {item.hasDot && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] shadow-[0_0_8px_#10b981] mt-0.5" />
                  )}
                </button>
              );
            })}
          </div>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollToSection('contact', 'contact')}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-[#e5c158] to-[#a88228] text-black shadow-lg shadow-[#d4af37]/20 hover:brightness-110 active:scale-95 transition-all cursor-pointer"
            >
              Partner with us
            </button>

            <button
              className="lg:hidden p-2 text-[#e5c158] hover:text-white transition-colors cursor-pointer"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 6h18M3 12h18M3 18h18" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Overlay Menu */}
      <div id="mobile-menu" className={`fixed inset-0 z-50 bg-[#07060a]/95 backdrop-blur-2xl flex flex-col items-center justify-center space-y-6 transition-all duration-300 ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <button
          className="absolute top-6 right-6 p-2 text-[#e5c158] hover:text-white transition-colors cursor-pointer"
          onClick={() => setMobileMenuOpen(false)}
          aria-label="Close menu"
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.sectionId, item.id)}
            className="text-2xl font-bold text-[#ece7de] hover:text-[#e5c158] transition-colors flex items-center gap-2 cursor-pointer"
          >
            {item.label}
            {item.hasDot && <span className="w-2 h-2 rounded-full bg-[#10b981] shadow-[0_0_8px_#10b981]" />}
          </button>
        ))}

        <button
          onClick={() => scrollToSection('contact', 'contact')}
          className="mt-6 px-8 py-3 rounded-full text-sm font-bold uppercase tracking-wider bg-gradient-to-r from-[#e5c158] to-[#a88228] text-black cursor-pointer shadow-lg shadow-[#d4af37]/20"
        >
          Partner with us
        </button>
      </div>
    </>
  );
};
