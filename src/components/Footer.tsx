import React from 'react';
import { PageTab } from '../types';
import { LionSealLogo } from './LionSealLogo';

interface FooterProps {
  setActiveTab?: (tab: PageTab) => void;
  onOpenTrustModal?: (type: any) => void;
  logoUrl?: string;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, onOpenTrustModal, logoUrl }) => {
  const scrollToSection = (id: string, tabId: PageTab) => {
    if (setActiveTab) setActiveTab(tabId);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer>
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <div className="flex items-center gap-3 mb-4 cursor-pointer" onClick={() => scrollToSection('hero', 'home')}>
              <LionSealLogo size={42} showGlow={true} imageUrl={logoUrl} />
              <div className="flex flex-col">
                <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#fef0be] via-[#e5c158] to-[#b3892c] text-base tracking-wider uppercase font-sans leading-tight">
                  NEMEAN PARTNERS
                </span>
                <span className="text-[9.5px] tracking-[0.18em] text-[#d4af37]/80 font-mono uppercase leading-tight">
                  QUEENSLAND TECH
                </span>
              </div>
            </div>
            <p style={{ fontSize: '12.5px', color: 'var(--text-dim)', maxWidth: '280px', lineHeight: '1.7' }}>
              Queensland technology company designing cloud software, AI tools and digital platforms for health, education, communication and service organisations.
            </p>
          </div>

          <div>
            <h5>Navigate</h5>
            <button onClick={() => scrollToSection('about', 'about')} className="bg-transparent border-0 text-left block text-[13px] text-[#9c9488] hover:text-[#f3ead9] transition-colors mb-2 cursor-pointer">
              About
            </button>
            <button onClick={() => scrollToSection('products', 'products')} className="bg-transparent border-0 text-left block text-[13px] text-[#9c9488] hover:text-[#f3ead9] transition-colors mb-2 cursor-pointer">
              Products
            </button>
            <button onClick={() => scrollToSection('wellpath', 'wellpath')} className="bg-transparent border-0 text-left block text-[13px] text-[#9c9488] hover:text-[#f3ead9] transition-colors mb-2 cursor-pointer">
              WellPath
            </button>
            <button onClick={() => scrollToSection('capability', 'capability')} className="bg-transparent border-0 text-left block text-[13px] text-[#9c9488] hover:text-[#f3ead9] transition-colors mb-2 cursor-pointer">
              Capability
            </button>
          </div>

          <div>
            <h5>Governance</h5>
            <button
              onClick={() => onOpenTrustModal && onOpenTrustModal('privacy')}
              className="bg-transparent border-0 text-left block text-[13px] text-[#9c9488] hover:text-[#f3ead9] transition-colors mb-2 cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => onOpenTrustModal && onOpenTrustModal('terms')}
              className="bg-transparent border-0 text-left block text-[13px] text-[#9c9488] hover:text-[#f3ead9] transition-colors mb-2 cursor-pointer"
            >
              Terms of Use
            </button>
            <button
              onClick={() => onOpenTrustModal && onOpenTrustModal('ai-ethics')}
              className="bg-transparent border-0 text-left block text-[13px] text-[#9c9488] hover:text-[#f3ead9] transition-colors mb-2 cursor-pointer"
            >
              Responsible AI
            </button>
            <button
              onClick={() => onOpenTrustModal && onOpenTrustModal('security')}
              className="bg-transparent border-0 text-left block text-[13px] text-[#9c9488] hover:text-[#f3ead9] transition-colors mb-2 cursor-pointer"
            >
              Accessibility
            </button>
          </div>

          <div>
            <h5>Contact</h5>
            <a href="mailto:contact@nemeanpartners.qld.one">contact@nemeanpartners.qld.one</a>
            <button onClick={() => scrollToSection('contact', 'contact')} className="bg-transparent border-0 text-left block text-[13px] text-[#9c9488] hover:text-[#f3ead9] transition-colors mb-2 cursor-pointer">
              Brisbane, QLD 4064
            </button>
          </div>
        </div>

        <div className="footer-bottom">
          <span>&copy; 2026 Nemean Partners Pty Ltd. ABN 55 692 594 228.</span>
          <span>Designed &amp; engineered in Queensland, Australia.</span>
        </div>
      </div>
    </footer>
  );
};
