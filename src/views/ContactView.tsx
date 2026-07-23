import React from 'react';
import { COMPANY_INFO } from '../data/company';
import { Building2, Globe, Mail, MapPin, ShieldCheck } from 'lucide-react';

export const ContactView: React.FC = () => {
  const mailtoHref = `mailto:${COMPANY_INFO.email}?subject=Nemean%20Partners%20Enquiry`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 animate-fade-in">
      <div className="text-center space-y-4 max-w-3xl mx-auto pt-6">
        <span className="text-xs font-extrabold uppercase tracking-widest text-amber-400">
          Partner & Enquiries
        </span>
        <h1 className="text-3xl sm:text-5xl font-black font-heading text-white">
          Contact Nemean Partners
        </h1>
        <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
          Email Nemean Partners directly for government, product, support and commercial enquiries.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5 bg-neutral-900/90 p-8 rounded-3xl border border-amber-500/30 shadow-2xl space-y-6">
          <h2 className="text-xl font-bold font-heading text-white border-b border-neutral-800 pb-3">
            Official Company Information
          </h2>

          <div className="space-y-4 text-xs text-neutral-300">
            <div className="flex items-start space-x-3 p-3.5 bg-black rounded-2xl border border-neutral-800">
              <Building2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-neutral-500 font-bold block text-[10px] uppercase">Company Name</span>
                <span className="font-extrabold text-amber-200 text-sm">{COMPANY_INFO.legalName}</span>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-3.5 bg-black rounded-2xl border border-neutral-800">
              <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-neutral-500 font-bold block text-[10px] uppercase">Location</span>
                <span className="font-semibold text-white">{COMPANY_INFO.headquarters} ({COMPANY_INFO.locationDetails})</span>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-3.5 bg-black rounded-2xl border border-neutral-800">
              <Mail className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-neutral-500 font-bold block text-[10px] uppercase">Email</span>
                <a href={mailtoHref} className="font-semibold text-amber-300 hover:underline">
                  {COMPANY_INFO.email}
                </a>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-3.5 bg-black rounded-2xl border border-neutral-800">
              <Globe className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-neutral-500 font-bold block text-[10px] uppercase">Official Website</span>
                <a href={COMPANY_INFO.website} target="_blank" rel="noopener noreferrer" className="font-semibold text-amber-300 hover:underline">
                  nemeanpartners.qld.one
                </a>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-3.5 bg-black rounded-2xl border border-neutral-800">
              <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-neutral-500 font-bold block text-[10px] uppercase">Australian Business Number</span>
                <span className="font-extrabold text-amber-400 text-sm">ABN: {COMPANY_INFO.abn}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 bg-neutral-900/80 p-8 rounded-3xl border border-neutral-800 shadow-2xl space-y-6">
          <div>
            <h2 className="text-xl font-bold font-heading text-white border-b border-neutral-800 pb-3">
              Email the Team
            </h2>
            <p className="text-sm text-neutral-300 mt-4 leading-relaxed">
              Use your email app to contact Nemean Partners directly. This keeps enquiries in the business inbox and gives you a copy in your sent mail.
            </p>
          </div>

          <a
            href={mailtoHref}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-black font-extrabold text-sm py-3.5 rounded-xl shadow-xl hover:from-amber-300 hover:to-amber-500 transition-all cursor-pointer"
          >
            <Mail className="w-4 h-4" />
            <span>Email {COMPANY_INFO.email}</span>
          </a>
        </div>
      </div>
    </div>
  );
};
