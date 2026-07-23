import React from 'react';
import { COMPANY_INFO, HOMEPAGE_STATEMENTS } from '../data/company';
import { LionLogo } from '../components/LionLogo';
import { Building2, MapPin, CheckCircle, ShieldCheck, Cpu, Code2, Layers, Server } from 'lucide-react';

export const AboutView: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 animate-fade-in">
      
      {/* HEADER TITLE */}
      <div className="text-center space-y-4 max-w-3xl mx-auto pt-6">
        <div className="inline-flex items-center space-x-2 bg-amber-500/10 border border-amber-500/30 px-4 py-1.5 rounded-full">
          <LionLogo size={20} showText={false} />
          <span className="text-xs font-bold text-amber-300 uppercase tracking-widest">
            Company Profile & Governance
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black font-heading text-white">
          About Nemean Partners
        </h1>
        <p className="text-base text-neutral-300 leading-relaxed">
          {HOMEPAGE_STATEMENTS.aboutSummary}
        </p>
      </div>

      {/* CORE STATEMENTS & CORPORATE CREDENTIALS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Core Philosophy Card */}
        <div className="lg:col-span-7 bg-neutral-900/80 p-8 rounded-3xl border border-neutral-800 space-y-6 flex flex-col justify-between shadow-2xl">
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-amber-200">
              Queensland Software & AI Engineering
            </h2>

            <p className="text-sm text-neutral-300 leading-relaxed">
              {HOMEPAGE_STATEMENTS.aboutApproach}
            </p>

            <p className="text-sm text-neutral-300 leading-relaxed">
              {HOMEPAGE_STATEMENTS.aboutScale}
            </p>

            <p className="text-sm text-neutral-400 leading-relaxed">
              We fuse creativity, engineering, and purpose to produce meaningful digital experiences. Every app—from Study and Kobella to Clarified and WellPath—embodies our mission to make technology feel supportive, secure, and beautifully designed.
            </p>
          </div>

          <div className="pt-4 border-t border-neutral-800 flex flex-wrap gap-3 text-xs text-amber-400 font-semibold">
            <span className="flex items-center space-x-1 bg-amber-950/40 px-3 py-1.5 rounded-lg border border-amber-500/30">
              <ShieldCheck className="w-4 h-4" />
              <span>Responsible AI Governance</span>
            </span>
            <span className="flex items-center space-x-1 bg-amber-950/40 px-3 py-1.5 rounded-lg border border-amber-500/30">
              <Server className="w-4 h-4" />
              <span>Australian Data Sovereignty</span>
            </span>
          </div>
        </div>

        {/* Official Business & Registration Card */}
        <div className="lg:col-span-5 bg-gradient-to-br from-amber-950/30 via-neutral-900 to-black p-8 rounded-3xl border border-amber-500/30 shadow-2xl flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3 pb-3 border-b border-amber-500/20">
              <Building2 className="w-6 h-6 text-amber-400" />
              <div>
                <h3 className="font-bold text-white text-base">Entity Information</h3>
                <p className="text-xs text-neutral-400">Registered Australian Private Company</p>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between p-2.5 bg-neutral-950 rounded-xl border border-neutral-800">
                <span className="text-neutral-400">Legal Entity</span>
                <span className="font-bold text-amber-300">{COMPANY_INFO.legalName}</span>
              </div>

              <div className="flex justify-between p-2.5 bg-neutral-950 rounded-xl border border-neutral-800">
                <span className="text-neutral-400">ABN</span>
                <span className="font-bold text-amber-400">{COMPANY_INFO.abn}</span>
              </div>

              <div className="flex justify-between p-2.5 bg-neutral-950 rounded-xl border border-neutral-800">
                <span className="text-neutral-400">ACN</span>
                <span className="font-semibold text-neutral-200">{COMPANY_INFO.acn}</span>
              </div>

              <div className="flex justify-between p-2.5 bg-neutral-950 rounded-xl border border-neutral-800">
                <span className="text-neutral-400">Location Base</span>
                <span className="font-semibold text-neutral-200 flex items-center space-x-1">
                  <MapPin className="w-3 h-3 text-amber-500" />
                  <span>Brisbane, Queensland 4064</span>
                </span>
              </div>

              <div className="flex justify-between p-2.5 bg-neutral-950 rounded-xl border border-neutral-800">
                <span className="text-neutral-400">Founded</span>
                <span className="font-semibold text-neutral-200">{COMPANY_INFO.foundedYear}</span>
              </div>
            </div>
          </div>

          <div className="p-3.5 bg-neutral-950/80 rounded-xl border border-amber-500/20 text-[11px] text-neutral-300 leading-relaxed space-y-1">
            <div className="flex items-center space-x-1.5 text-amber-300 font-bold">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Registration Note</span>
            </div>
            <p>
              The ABN is active and lists the main business location as Queensland 4064. Website updated following GST registration finalisation.
            </p>
          </div>
        </div>

      </div>

      {/* WHITE / LIGHT CONTRAST SECTION FROM EXEMPLAR */}
      <section className="bg-neutral-100 text-neutral-900 p-8 sm:p-12 rounded-3xl shadow-2xl border border-amber-500/20 space-y-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-amber-500/20 rounded-lg text-amber-700">
            <Cpu className="w-6 h-6" />
          </div>
          <h3 className="text-2xl sm:text-3xl font-black font-heading text-neutral-900">
            Developing for Scalable AI Projects
          </h3>
        </div>

        <p className="text-base sm:text-lg leading-relaxed text-neutral-800 font-normal">
          Nemean Partners specialises in designing and delivering AI systems built for scale — from behavioural analysis engines to enterprise-grade communication intelligence. Our development philosophy focuses on modular architecture, clean data pipelines, and infrastructure that can grow with user demand.
        </p>

        <p className="text-base sm:text-lg leading-relaxed text-neutral-800 font-normal">
          Every project is engineered with reliability, performance, and long-term extensibility in mind. We combine strong engineering fundamentals, cloud-native design, and rapid experimentation frameworks to ensure our AI products can evolve into powerful, multi-service platforms serving both consumers and industry.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-neutral-300 text-xs font-bold text-neutral-800">
          <div className="flex items-center space-x-2">
            <Code2 className="w-4 h-4 text-amber-600 shrink-0" />
            <span>Modular Component Architecture</span>
          </div>
          <div className="flex items-center space-x-2">
            <Layers className="w-4 h-4 text-amber-600 shrink-0" />
            <span>Deterministic Rule Verification</span>
          </div>
          <div className="flex items-center space-x-2">
            <Server className="w-4 h-4 text-amber-600 shrink-0" />
            <span>Cloud-Native Regional Scalability</span>
          </div>
        </div>
      </section>

      {/* CURRENT PRODUCTS & PROGRESS (MARKET EVIDENCE) */}
      <section className="bg-neutral-900/60 p-8 rounded-3xl border border-neutral-800 space-y-6">
        <div className="border-b border-neutral-800 pb-4">
          <h3 className="text-xl font-bold font-heading text-white">
            Current Products and Progress
          </h3>
          <p className="text-xs text-neutral-400 mt-1">
            Proven market evidence and working software implementations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 bg-neutral-950 rounded-2xl border border-neutral-800 space-y-2">
            <h4 className="font-bold text-amber-300 text-sm">Products Developed</h4>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Working web and mobile applications across consumer technology, education, communication and service workflows.
            </p>
          </div>

          <div className="p-5 bg-neutral-950 rounded-2xl border border-neutral-800 space-y-2">
            <h4 className="font-bold text-amber-300 text-sm">Market Evidence</h4>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Nemean Partners has published TryOn Beauty on the Apple App Store and has developed functional MVPs for additional digital products including WellPath.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};
