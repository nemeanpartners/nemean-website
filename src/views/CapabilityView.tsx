import React from 'react';
import { Cpu, Lock, ShieldCheck, Database, Layout, Smartphone, FileSpreadsheet, Send, Layers, CheckCircle2, Server } from 'lucide-react';

export const CapabilityView: React.FC = () => {
  const capabilities = [
    {
      title: "Cloud-hosted web and mobile applications",
      description: "High-performance, progressive web and mobile software platforms built for multi-device access and continuous uptime.",
      icon: <Smartphone className="w-6 h-6 text-amber-400" />
    },
    {
      title: "Artificial-intelligence-assisted workflows",
      description: "Bounded AI matching engines, sentiment reflection models, and natural language summary tools governed by human oversight.",
      icon: <Cpu className="w-6 h-6 text-amber-400" />
    },
    {
      title: "Consumer and staff dashboards",
      description: "Intuitive, role-based dashboards tailored for everyday consumers, health navigators, educators, and enterprise administrators.",
      icon: <Layout className="w-6 h-6 text-amber-400" />
    },
    {
      title: "Secure user authentication",
      description: "Role-based access controls, multi-factor verification, and zero-trust authentication protocols protecting sensitive user records.",
      icon: <Lock className="w-6 h-6 text-amber-400" />
    },
    {
      title: "Automated communication & referral workflows",
      description: "Triggered SMS, email dispatches, referral token generators, and milestone check-ins ensuring seamless follow-up engagement.",
      icon: <Send className="w-6 h-6 text-amber-400" />
    },
    {
      title: "Data reporting & operational insights",
      description: "Anonymized aggregation engines, milestone progress trackers, and administrative telemetry for evidence-based decision making.",
      icon: <FileSpreadsheet className="w-6 h-6 text-amber-400" />
    },
    {
      title: "Accessible and responsive user interfaces",
      description: "Strict WCAG 2.1 AA accessibility compliance with high-contrast typography and fluid layouts for all abilities.",
      icon: <Layers className="w-6 h-6 text-amber-400" />
    },
    {
      title: "Product configuration for different organisations",
      description: "Modular, multi-tenant white-label configuration engines allowing rapid tailoring for healthcare, government, or business deployment.",
      icon: <Database className="w-6 h-6 text-amber-400" />
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 animate-fade-in">
      
      {/* HEADER SECTION */}
      <div className="text-center space-y-4 max-w-3xl mx-auto pt-6">
        <span className="text-xs font-extrabold uppercase tracking-widest text-amber-400">
          Engineering & Delivery Core
        </span>
        <h1 className="text-3xl sm:text-5xl font-black font-heading text-white">
          Our Capabilities
        </h1>
        <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
          Nemean Partners provides end-to-end software engineering, secure cloud architecture, and controlled AI deployment designed for public and private sector scale.
        </p>
      </div>

      {/* TECH STACK STATEMENT BOX */}
      <div className="p-8 bg-neutral-900/90 rounded-3xl border border-amber-500/30 shadow-2xl space-y-4 max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center space-x-2 bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full text-xs font-bold border border-amber-500/30">
          <Server className="w-3.5 h-3.5" />
          <span>Technology & Infrastructure Stack</span>
        </div>
        <p className="text-base sm:text-lg text-white font-medium leading-relaxed">
          "Our technical stack includes modern web technologies, managed cloud infrastructure, secure databases, messaging systems and controlled artificial-intelligence services."
        </p>
        <p className="text-xs text-neutral-400">
          Designed for secure Australian cloud deployment, low latency, and zero single points of failure.
        </p>
      </div>

      {/* CAPABILITIES MATRIX (THE 8 EXACT POINTS) */}
      <div className="space-y-6">
        <h2 className="text-xs font-bold uppercase tracking-widest text-amber-400 text-center">
          Core Technical Delivery Areas
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {capabilities.map((cap, idx) => (
            <div
              key={idx}
              className="bg-neutral-900/80 p-6 rounded-2xl border border-neutral-800 hover:border-amber-500/30 transition-all duration-300 space-y-4 shadow-xl flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="p-3 bg-black rounded-xl border border-neutral-800 w-fit">
                  {cap.icon}
                </div>
                <h3 className="font-bold text-white text-base leading-snug">
                  {cap.title}
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  {cap.description}
                </p>
              </div>

              <div className="pt-3 border-t border-neutral-800/80 flex items-center space-x-1.5 text-[11px] text-amber-300 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                <span>Production Capability</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SYSTEM ARCHITECTURE DIAGRAM VISUALIZER */}
      <section className="bg-neutral-900/90 rounded-3xl p-8 sm:p-12 border border-neutral-800 space-y-8 shadow-2xl">
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-bold font-heading text-white">
            Nemean Platform Architecture
          </h3>
          <p className="text-xs text-neutral-400">
            Secure multi-tier system topology ensuring data privacy, AI governance, and high availability
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs text-neutral-300 text-center">
          
          <div className="p-5 bg-black rounded-2xl border border-neutral-800 space-y-2">
            <span className="text-amber-400 font-bold block text-[10px] uppercase">Layer 1: Presentation</span>
            <h4 className="font-bold text-white text-sm">Responsive Web & Mobile UI</h4>
            <p className="text-[11px] text-neutral-400">
              High-contrast accessibility layouts, PWA offline workers, iOS & Android clients.
            </p>
          </div>

          <div className="p-5 bg-black rounded-2xl border border-neutral-800 space-y-2">
            <span className="text-amber-400 font-bold block text-[10px] uppercase">Layer 2: Access & Gateways</span>
            <h4 className="font-bold text-white text-sm">Auth & API Gateway</h4>
            <p className="text-[11px] text-neutral-400">
              Role-based token authentication, rate limiting, and TLS encrypted endpoints.
            </p>
          </div>

          <div className="p-5 bg-amber-950/30 rounded-2xl border border-amber-500/30 space-y-2">
            <span className="text-amber-300 font-bold block text-[10px] uppercase">Layer 3: Core Intelligence</span>
            <h4 className="font-bold text-amber-200 text-sm">Bounded AI & Rule Engine</h4>
            <p className="text-[11px] text-neutral-300">
              Deterministic rule validators, Gemini-assisted matching, human oversight loops.
            </p>
          </div>

          <div className="p-5 bg-black rounded-2xl border border-neutral-800 space-y-2">
            <span className="text-amber-400 font-bold block text-[10px] uppercase">Layer 4: Data Vault</span>
            <h4 className="font-bold text-white text-sm">Australian Cloud Storage</h4>
            <p className="text-[11px] text-neutral-400">
              AES-256 encrypted relational & document databases hosted in Australian cloud regions.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
};
