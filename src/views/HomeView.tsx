import React, { useState } from 'react';
import { HeroScene } from '../components/HeroScene';
import { WellpathScene } from '../components/WellpathScene';
import { ProductFlipCard, ProductItem } from '../components/ProductFlipCard';
import { AppLogo } from '../components/AppLogo';
import { LionSealLogo } from '../components/LionSealLogo';
import { AnimatedCounters } from '../components/AnimatedCounters';
import { PageTab } from '../types';

interface HomeViewProps {
  setActiveTab: (tab: PageTab) => void;
  logoUrl?: string;
}

const PRODUCTS_DATA: ProductItem[] = [
  {
    id: "wellpath",
    name: "WellPath",
    subtitle: "Closed-loop preventive-health navigation",
    desc: "Connects Queenslanders with verified free or low-cost preventive health programs through intelligent navigation.",
    category: "Preventive Health & Care Navigation",
    badge: "Queensland Pilot Platform",
    badgeColor: "gold",
    url: "https://wellpath-queensland.ai.studio",
    feats: ["Closed-loop goal tracking & referral milestones", "Explainable program matching by access & cost"],
    tech: ["Intelligent matching engine", "Encrypted user vault", "Automated follow-ups"],
    initial: "W"
  },
  {
    id: "tryon-beauty",
    name: "TryOn Beauty",
    subtitle: "Real-time AR virtual makeup & face-tracking",
    desc: "AR virtual try-ons, shade matching and event styling — published publicly on the Apple App Store.",
    category: "AR & Computer Vision",
    badge: "App Store Published",
    badgeColor: "teal",
    url: "https://apps.apple.com/au/app/tryon-beauty/id6759636767",
    feats: ["Real-time 3D facial landmark rendering at 60fps", "Precision shade matching & AR product preview"],
    tech: ["On-device neural vision", "Color accuracy engine", "iOS Metal shader runtime"],
    initial: "T"
  },
  {
    id: "education-revolution",
    name: "Education Revolution",
    subtitle: "Adaptive planning & study momentum tools",
    desc: "Adaptive planners, flashcards and motivational streak systems helping students stay consistent.",
    category: "Education & Productivity",
    badge: "Active Platform",
    badgeColor: "blue",
    url: "#",
    feats: ["Adaptive study schedule generator", "Spaced repetition & motivational streaks"],
    tech: ["AI concept explainer", "Real-time state sync", "Study habit metrics"],
    initial: "E"
  },
  {
    id: "repairsync",
    name: "RepairSync",
    subtitle: "Repair services & dispatch tech platform",
    desc: "Automated service intake, diagnostic logging, technician dispatch and real-time repair status.",
    category: "Repair Services & Fleet Tech",
    badge: "Live Tech Platform",
    badgeColor: "violet",
    url: "https://repairsync.ai.studio",
    feats: ["Automated service intake & job logging", "Real-time alerts & technician dispatch"],
    tech: ["Cloud job queue dispatch", "Automated SMS triggers", "Technician portal"],
    initial: "R"
  },
  {
    id: "clickdin",
    name: "Clickdin",
    subtitle: "Digital networking & local discovery platform",
    desc: "Connects local professionals, service providers and organisations through verified interactions.",
    category: "Networking & Discovery",
    badge: "Live Web Platform",
    badgeColor: "teal",
    url: "https://clickdin.qld.one",
    feats: ["Verified local business directory", "Interactive connection pipeline & messaging"],
    tech: ["Directory graph DB", "Encrypted messaging", "Trust scoring engine"],
    initial: "C"
  },
  {
    id: "seen-media",
    name: "Seen Media",
    subtitle: "Digital signage & advertising network",
    desc: "Manage displays, schedule playlists and launch targeted screen campaigns across real venues.",
    category: "Digital Out-of-Home SaaS",
    badge: "Signage Network",
    badgeColor: "violet",
    url: "https://seen-media-938630466467.us-west1.run.app",
    feats: ["Multi-display remote playlist manager", "Real-time screen health telemetry"],
    tech: ["4K video stream hardware decoding", "Cloud edge offline sync", "Screen health telemetry"],
    initial: "S"
  }
];

const UPCOMING_DATA = [
  { id: "washworks", name: "WashWorks", subtitle: "On-demand fleet washing & service management", desc: "Streamlined dispatch and scheduling for fleet washing, mobile detailing and equipment maintenance.", badge: "Coming Soon" },
  { id: "messagewise", name: "MessageWise", subtitle: "Communication clarity & empathy assistant", desc: "A communication intelligence tool helping users phrase messages with clarity and empathy.", badge: "In Development" },
  { id: "smsbackup", name: "SMSbackup", subtitle: "Automated SMS archiving & compliance utility", desc: "Secure cloud backup and archival utility for mobile messages and compliance export logs.", badge: "Coming Soon" }
];

const CAPS_DATA = [
  { t: "Cloud-hosted web & mobile apps", d: "High-performance software built for multi-device access and continuous uptime.", icon: <path d="M17 19H7a4 4 0 01-1-7.87A5.5 5.5 0 0117 8h.5a4.5 4.5 0 010 9z" /> },
  { t: "AI-assisted workflows", d: "Bounded matching engines and language tools governed by human oversight.", icon: <><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" /></> },
  { t: "Consumer & staff dashboards", d: "Role-based dashboards for consumers, navigators, educators and admins.", icon: <><rect x="3" y="4" width="18" height="14" rx="2" /><path d="M3 9h18" /></> },
  { t: "Secure authentication", d: "Role-based access, MFA and zero-trust protocols protecting user records.", icon: <><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 118 0v3" /></> },
  { t: "Automated referral workflows", d: "Triggered SMS, email dispatches and milestone check-ins for follow-up.", icon: <path d="M4 4l16 8-16 8V4z" /> },
  { t: "Data reporting & insights", d: "Anonymised aggregation and administrative telemetry for decisions.", icon: <path d="M4 19h16M8 19V9M13 19V5M18 19v-7" /> },
  { t: "Accessible responsive UI", d: "WCAG 2.1 AA compliance with high-contrast, fluid layouts for all.", icon: <><rect x="3" y="3" width="18" height="18" rx="4" /><path d="M8 8h8v8H8z" /></> },
  { t: "Multi-tenant configuration", d: "White-label engines for rapid tailoring across sectors.", icon: <><circle cx="6" cy="6" r="2.5" /><circle cx="18" cy="6" r="2.5" /><circle cx="12" cy="18" r="2.5" /><path d="M8 7l7-0M8 8l4 8M16 8l-4 8" /></> }
];

export const HomeView: React.FC<HomeViewProps> = ({ logoUrl }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const filterOptions = [
    { label: "All products", value: "all" },
    { label: "Health", value: "Preventive Health & Care Navigation" },
    { label: "AR / Vision", value: "AR & Computer Vision" },
    { label: "Education", value: "Education & Productivity" },
    { label: "Fleet", value: "Repair Services & Fleet Tech" },
    { label: "Networking", value: "Networking & Discovery" },
    { label: "Signage", value: "Digital Out-of-Home SaaS" }
  ];

  const filteredProducts = PRODUCTS_DATA.filter(
    p => activeFilter === 'all' || p.category === activeFilter
  );

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      (e.target as HTMLFormElement).reset();
    }, 2500);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const marqueeItems = [
    "ABN 55 692 594 228",
    "ACN 692 594 228",
    "Brisbane, Queensland",
    "Founded 2025",
    "App Store Published",
    "Responsible AI Governance",
    "Australian Data Sovereignty",
    "Cloud-Native Architecture"
  ];

  return (
    <div className="relative bg-[#07060a] text-[#ece7de] font-sans overflow-x-hidden">

      {/* ============ HERO SECTION ============ */}
      <section id="hero" className="relative min-h-screen flex items-center pt-[76px] overflow-hidden">
        <HeroScene />
        <div className="hero-fade" />
        <div className="hero-inner">
          <span className="eyebrow">Nemean Partners Pty Ltd &middot; Queensland, Australia</span>
          <h1 className="hero-title">
            Building practical technology<br /> for <em>complex human problems</em>
          </h1>
          <p className="hero-sub">
            Queensland-built cloud software, artificial intelligence tools and digital platforms for health, education, communication and service-based organisations.
          </p>
          <div className="hero-actions">
            <button
              onClick={() => scrollToSection('products')}
              className="btn btn-gold cursor-pointer"
            >
              <span>Explore products</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="btn btn-ghost cursor-pointer"
            >
              Partner with Nemean
            </button>
          </div>
        </div>
        <div className="scroll-cue">
          <span>Scroll</span>
          <span className="line" />
        </div>
      </section>

      {/* ============ MARQUEE STRIP ============ */}
      <div id="strip">
        <div className="marquee-track">
          {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, idx) => (
            <span key={idx}>
              <b>{item}</b>
              <span className="dot" />
            </span>
          ))}
        </div>
      </div>

      {/* ============ ABOUT SECTION ============ */}
      <section id="about">
        <div className="wrap">
          <div className="section-head reveal in">
            <span className="eyebrow">Company profile &amp; governance</span>
            <h2>Developed in Queensland.<br />Designed to scale.</h2>
            <p>
              Nemean Partners Pty Ltd develops practical digital platforms that improve how people access services, communicate, learn and manage everyday workflows.
            </p>
          </div>

          <div className="about-grid">
            <div className="card about-philosophy reveal in">
              <h3>Queensland Software &amp; AI Engineering</h3>
              <p>
                We combine product design, cloud software, automation and responsible artificial intelligence to turn complex processes into accessible, scalable applications.
              </p>
              <p>
                Our products are developed in Queensland and designed for secure cloud deployment, mobile access and future commercial scale.
              </p>
              <p>
                We fuse creativity, engineering and purpose to produce meaningful digital experiences — every app is built to feel supportive, secure and beautifully designed.
              </p>

              <AnimatedCounters inline={true} />
            </div>

            {/* Metallic Entity Registry Card - Image 3 Style */}
            <div className="metallic-card rounded-3xl p-8 sm:p-10 flex flex-col items-center text-center reveal in group">
              <div className="mb-4">
                <LionSealLogo size={80} showGlow={true} subtext="PARTNERS" imageUrl={logoUrl} />
              </div>

              <span className="text-[11px] font-semibold tracking-[0.25em] text-[#8e877c] uppercase mb-2 font-sans">
                OFFICIAL COMPANY REGISTRY
              </span>

              <h4 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-[0.18em] my-2 font-sans uppercase">
                NEMEAN PARTNERS
              </h4>

              <div className="text-xs sm:text-sm font-semibold text-[#e5c158] tracking-[0.14em] mb-6 font-sans uppercase flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-3">
                <span>ABN: 55 692 594 228</span>
                <span className="hidden sm:inline text-white/30">&bull;</span>
                <span>MILTON, BRISBANE QLD 4064</span>
              </div>

              <div className="w-4/5 border-t border-white/10 my-2" />

              <div className="pt-3 text-sm font-bold tracking-[0.18em] text-[#d4af37] flex items-center justify-center gap-2 uppercase font-sans">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="text-[#d4af37]">
                  <path d="M12 21s7-6.2 7-11.5A7 7 0 005 9.5C5 14.8 12 21 12 21z" />
                  <circle cx="12" cy="9.5" r="2.5" />
                </svg>
                <span>MILTON, BRISBANE, QUEENSLAND</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ PRODUCTS SECTION ============ */}
      <section id="products">
        <div className="wrap">
          <div className="section-head reveal in">
            <span className="eyebrow">Live products</span>
            <h2>Software already at work</h2>
            <p>
              Working web and mobile applications across preventive health, AR beauty tech, education, repair dispatch, networking and digital signage.
            </p>
          </div>

          <div className="filter-row reveal in">
            {filterOptions.map(opt => (
              <button
                key={opt.value}
                onClick={() => setActiveFilter(opt.value)}
                className={`filter-btn ${activeFilter === opt.value ? 'active' : ''}`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <div className="product-grid reveal in">
            {filteredProducts.map(product => (
              <ProductFlipCard key={product.id} product={product} />
            ))}
          </div>

          <div style={{ marginTop: '70px' }} className="reveal in">
            <span className="eyebrow">In development</span>
            <h3 style={{ marginTop: '14px', fontSize: '22px', color: 'var(--cream)', fontWeight: 600 }}>
              Coming next from Nemean
            </h3>
            <div className="upcoming-strip">
              {UPCOMING_DATA.map((u, i) => (
                <div key={i} className="upcoming-card">
                  <div className="flex items-center justify-between mb-3">
                    <AppLogo id={u.id} name={u.name} size={38} />
                    <span className="badge badge-gold">{u.badge}</span>
                  </div>
                  <h4>{u.name}</h4>
                  <p>{u.subtitle}</p>
                  <p style={{ marginTop: '8px', color: 'var(--text-dimmer)' }}>{u.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Developing for Scalable AI Projects Panel - Blurred Dark Grey Style */}
          <div className="rounded-3xl bg-[#121117]/85 backdrop-blur-2xl border border-white/10 p-8 sm:p-10 reveal in shadow-2xl mt-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-[#e5c158] mb-4 font-sans">
              Developing for Scalable AI Projects
            </h3>
            
            <p className="text-sm sm:text-base text-[#d8d3c9] leading-relaxed mb-4">
              Nemean Partners specialises in designing and delivering AI systems built for scale — from behavioural analysis engines to enterprise-grade communication intelligence. Our development philosophy focuses on modular architecture, clean data pipelines, and infrastructure that can grow seamlessly with user demand.
            </p>

            <p className="text-sm sm:text-base text-[#d8d3c9] leading-relaxed mb-6">
              Every project is engineered with reliability, performance, and long-term extensibility in mind. We combine strong engineering fundamentals, cloud-native design, and rapid experimentation frameworks to ensure our AI products can evolve into powerful, multi-service platforms serving both consumers and industry.
            </p>

            <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-4 text-xs font-mono text-[#9c9488]">
              <div className="flex items-center gap-2">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#e5c158" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <span>Enterprise Compliance</span>
              </div>
              <span className="text-[#524b42]">&bull;</span>
              <div>Encrypted Security</div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CAPABILITY SECTION ============ */}
      <section id="capability">
        <div className="wrap">
          <div className="section-head reveal in">
            <span className="eyebrow">Engineering &amp; delivery core</span>
            <h2>Our capabilities</h2>
            <p>
              End-to-end software engineering, secure cloud architecture and controlled AI deployment designed for public and private sector scale.
            </p>
          </div>

          <div className="cap-grid">
            {CAPS_DATA.map((c, i) => (
              <div key={i} className="cap-card">
                <div className="cap-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    {c.icon}
                  </svg>
                </div>
                <h4>{c.t}</h4>
                <p>{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ WELLPATH / TECH STACK SECTION ============ */}
      <section id="wellpath">
        <div className="wrap">
          <div className="wellpath-grid">
            <div className="stack-banner reveal in" style={{ margin: 0, textAlign: 'left', display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', padding: '40px 32px' }}>
              <span className="eyebrow" style={{ marginBottom: '16px' }}>Technical Architecture</span>
              <p className="big" style={{ margin: 0, fontSize: 'clamp(1.15rem, 2.2vw, 1.45rem)', lineHeight: 1.6, maxWidth: '100%' }}>
                &ldquo;Our technical stack includes modern web technologies, managed cloud infrastructure, secure databases, messaging systems and controlled artificial-intelligence services.&rdquo;
              </p>
              <p className="small" style={{ marginTop: '20px', fontSize: '13px', color: 'var(--text-dim)' }}>
                Designed for secure Australian cloud deployment, low latency, and zero single points of failure.
              </p>
            </div>

            <div className="wellpath-visual reveal in">
              <WellpathScene />
              <span className="wellpath-badge badge badge-gold">Queensland Pilot Platform</span>
              <div className="wellpath-caption">
                <b>Encrypted Vault &middot; Automated Follow-ups &middot; Secure Pathways</b>
                <p>Interactive ecosystem graph mapping verified health programs, encrypted data nodes, and automated referral pathways across Queensland.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CONTACT SECTION ============ */}
      <section id="contact">
        <div className="wrap">
          <div className="section-head reveal in">
            <span className="eyebrow">Partner with Nemean</span>
            <h2>Let's build something practical</h2>
            <p>
              We welcome enquiries from government, health, education, community and commercial organisations seeking practical digital solutions.
            </p>
          </div>

          <form className="form-card reveal in w-full" onSubmit={handleFormSubmit}>
            <div className="two-col">
              <div className="form-row">
                <label>Name *</label>
                <input type="text" required placeholder="Full name" />
              </div>
              <div className="form-row">
                <label>Organisation</label>
                <input type="text" placeholder="Organisation (optional)" />
              </div>
            </div>

            <div className="two-col">
              <div className="form-row">
                <label>Email *</label>
                <input type="email" required placeholder="you@organisation.com" />
              </div>
              <div className="form-row">
                <label>Reason for enquiry</label>
                <select defaultValue="Government and partnerships">
                  <option>Government and partnerships</option>
                  <option>WellPath</option>
                  <option>Product enquiry</option>
                  <option>Technical support</option>
                  <option>General enquiry</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <label>Message *</label>
              <textarea rows={5} required placeholder="Tell us about your enquiry..."></textarea>
            </div>

            <div className="consent-row">
              <input type="checkbox" id="consent" required />
              <label htmlFor="consent">
                I consent to Nemean Partners contacting me regarding this enquiry in line with the privacy policy.
              </label>
            </div>

            <button
              type="submit"
              className="btn btn-gold"
              style={{ width: '100%', justifyContent: 'center', opacity: formSubmitted ? 0.8 : 1 }}
            >
              {formSubmitted ? 'Enquiry received ✓' : 'Send enquiry'}
            </button>
            <p className="submit-note">
              Your enquiry will be securely logged and reviewed by the Nemean Partners team in Brisbane.
            </p>
          </form>
        </div>
      </section>

    </div>
  );
};
