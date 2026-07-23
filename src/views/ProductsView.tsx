import React, { useState } from 'react';
import { PageTab } from '../types';
import { PRODUCTS_LIST, UPCOMING_PRODUCTS_LIST } from '../data/products';
import { AppLogo } from '../components/AppLogo';
import { Card3D } from '../components/Card3D';
import { Ambient3DElements } from '../components/Ambient3DElements';
import { ExternalLink, Apple, CheckCircle2, Cpu, Filter, Clock, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface ProductsViewProps {
  setActiveTab: (tab: PageTab) => void;
}

export const ProductsView: React.FC<ProductsViewProps> = ({ setActiveTab }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Health', 'AR & Vision', 'Education', 'Repair & Fleet', 'Networking', 'Digital Media'];

  const filteredProducts = PRODUCTS_LIST.filter(p => {
    if (selectedCategory === 'All') return true;
    if (selectedCategory === 'Health') return p.category.includes('Health');
    if (selectedCategory === 'AR & Vision') return p.category.includes('AR');
    if (selectedCategory === 'Education') return p.category.includes('Education');
    if (selectedCategory === 'Repair & Fleet') return p.category.includes('Repair');
    if (selectedCategory === 'Networking') return p.category.includes('Networking');
    if (selectedCategory === 'Digital Media') return p.category.includes('Media') || p.category.includes('Signage');
    return true;
  });

  return (
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 text-[#F5F5F5]">
      
      {/* 3D Ambient Background Accents */}
      <Ambient3DElements />

      {/* HEADER SECTION */}
      <motion.div 
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 text-center space-y-4 max-w-3xl mx-auto pt-6"
      >
        <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#d4af37]/10 border border-[#d4af37]/30 rounded-full">
          <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#d4af37]">
            Nemean Product Ecosystem
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black font-heading text-white">
          The Core Ecosystem
        </h1>
        <p className="text-sm sm:text-base text-white/70 leading-relaxed">
          Explore our portfolio of production cloud applications, computer vision tools, healthcare platforms, and business automation software built in Queensland.
        </p>
      </motion.div>

      {/* CATEGORY FILTER TABS */}
      <div className="relative z-10 flex flex-wrap items-center justify-center gap-2 pb-2">
        <span className="text-xs text-white/50 font-bold flex items-center space-x-1 mr-2">
          <Filter className="w-3.5 h-3.5 text-[#d4af37]" />
          <span>Category:</span>
        </span>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer hover:scale-105 ${
              selectedCategory === cat
                ? 'bg-[#d4af37] text-black shadow-lg shadow-[#d4af37]/20'
                : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-[#d4af37] border border-white/10'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* CORE PRODUCTION PRODUCTS GRID */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredProducts.map((p, idx) => (
          <Card3D
            key={p.id}
            index={idx}
            featured={p.id === 'wellpath'}
            className="p-6 sm:p-8 flex flex-col justify-between space-y-6 h-full"
          >
            <div className="space-y-5">
              
              {/* Header with App Logo - INLINE ALIGNED */}
              <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4 h-16">
                <div className="flex items-center space-x-4 min-w-0 flex-1">
                  <AppLogo id={p.id} name={p.name} size={52} />
                  <div className="flex flex-col justify-center min-w-0">
                    <h3 className="text-xl font-black text-white group-hover:text-[#d4af37] transition-colors truncate">
                      {p.name}
                    </h3>
                    <p className="text-xs font-semibold text-[#d4af37] truncate mt-0.5">
                      {p.subtitle}
                    </p>
                  </div>
                </div>

                <span className={`text-[9px] font-extrabold px-3 py-1 rounded uppercase tracking-wider shrink-0 border ${
                  p.statusBadgeColor === 'gold' ? 'bg-[#d4af37]/15 text-[#d4af37] border-[#d4af37]/40' :
                  p.statusBadgeColor === 'emerald' ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/40' :
                  p.statusBadgeColor === 'purple' ? 'bg-purple-500/15 text-purple-300 border-purple-500/40' :
                  'bg-blue-500/15 text-blue-400 border-blue-500/40'
                }`}>
                  {p.statusBadge}
                </span>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-normal">
                {p.description}
              </p>

              {/* Key Features List */}
              <div className="space-y-2 pt-1">
                <ul className="space-y-1.5 text-xs text-white/70">
                  {p.keyFeatures.map((f, featureIdx) => (
                    <li key={featureIdx} className="flex items-start space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#d4af37] shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technical Stack Highlights */}
              <div className="p-3 bg-black/50 rounded-2xl border border-white/10 text-[11px] text-white/60 space-y-1">
                <div className="flex items-center space-x-1 font-bold text-[#d4af37]">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>Architecture Highlights</span>
                </div>
                <p className="leading-snug">
                  {p.techCapabilities.join(' • ')}
                </p>
              </div>

            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
              {p.id === 'wellpath' && (
                <div className="w-full flex items-center gap-3">
                  <a
                    href={p.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center space-x-2 bg-[#d4af37] hover:bg-[#b8860b] text-black font-extrabold text-xs py-3 px-4 rounded-xl shadow-lg transition-all hover:scale-[1.02]"
                  >
                    <span>Open WellPath Platform</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <button
                    onClick={() => { setActiveTab('wellpath'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="px-4 py-3 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl border border-white/15 cursor-pointer"
                  >
                    Simulator
                  </button>
                </div>
              )}

              {p.isPublishedOnAppStore && p.appStoreUrl && (
                <a
                  href={p.appStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-between bg-white/10 hover:bg-white/20 text-white font-bold text-xs py-3 px-5 rounded-xl border border-white/20 transition-all hover:scale-[1.02]"
                >
                  <div className="flex items-center space-x-2">
                    <Apple className="w-4 h-4 text-[#d4af37]" />
                    <span>View on Apple App Store</span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-white/50" />
                </a>
              )}

              {p.websiteUrl && p.id !== 'wellpath' && (
                <a
                  href={p.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-between bg-white/5 hover:bg-[#d4af37]/10 text-[#d4af37] font-extrabold text-xs py-3 px-5 rounded-xl border border-[#d4af37]/30 transition-all hover:scale-[1.02]"
                >
                  <span>Visit {p.name} Website</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>

          </Card3D>
        ))}
      </div>

      {/* APPLICATIONS COMING SOON SECTION */}
      <div className="relative z-10 space-y-8 pt-8 border-t border-white/10">
        <div>
          <span className="text-[#d4af37] text-xs font-bold uppercase tracking-widest">
            Future Pipeline
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
            Applications Coming Soon
          </h2>
          <p className="text-xs text-white/60 mt-1 max-w-xl">
            Upcoming SaaS platforms and communication utilities in active development.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {UPCOMING_PRODUCTS_LIST.map((app, idx) => (
            <Card3D
              key={app.id}
              index={idx}
              className="p-5 flex flex-col justify-between space-y-4 h-full"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between h-12">
                  <div className="flex items-center space-x-3">
                    <AppLogo id={app.id} name={app.name} size={44} isUpcoming={true} />
                    <div>
                      <h4 className="text-sm font-bold text-white">
                        {app.name}
                      </h4>
                      <p className="text-[10px] text-white/40 font-medium">
                        {app.category}
                      </p>
                    </div>
                  </div>

                  <span className="px-2 py-0.5 bg-amber-500/15 text-[#d4af37] text-[9px] font-bold rounded uppercase tracking-wider border border-amber-500/30">
                    {app.statusBadge}
                  </span>
                </div>

                <p className="text-xs text-white/70 leading-relaxed">
                  {app.description}
                </p>
              </div>

              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-[10px] text-white/40 font-mono flex items-center space-x-1">
                  <Clock className="w-3 h-3 text-[#d4af37]" />
                  <span>In Active Pipeline</span>
                </span>
              </div>
            </Card3D>
          ))}
        </div>
      </div>

    </div>
  );
};
