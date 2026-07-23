import React from 'react';
import { TrustModalType } from '../types';
import { COMPANY_INFO, RESPONSIBLE_AI_WORDING } from '../data/company';
import { X, ShieldCheck, Lock, FileText, Globe, Building2, CheckCircle } from 'lucide-react';

interface TrustModalProps {
  type: TrustModalType;
  onClose: () => void;
}

export const TrustModal: React.FC<TrustModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  const renderContent = () => {
    switch (type) {
      case 'responsible-ai':
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-4 bg-amber-950/40 border border-amber-500/30 rounded-xl">
              <ShieldCheck className="w-8 h-8 text-amber-400 shrink-0" />
              <div>
                <h4 className="font-bold text-amber-200 text-sm">Security & Responsible AI Framework</h4>
                <p className="text-xs text-amber-300/80">Governed by Nemean Partners AI Ethics Guidelines</p>
              </div>
            </div>

            <div className="space-y-3 text-sm text-neutral-300 leading-relaxed">
              <p className="p-4 bg-neutral-900 rounded-xl border border-neutral-800 text-neutral-100 font-medium">
                "{RESPONSIBLE_AI_WORDING}"
              </p>

              <h5 className="font-bold text-amber-400 text-sm pt-2">Key AI Governance Principles:</h5>
              <ul className="space-y-2 text-xs text-neutral-300 list-disc list-inside">
                <li><strong className="text-amber-200">Bounded Outputs:</strong> AI models run with strict domain constraints and deterministic rule verification.</li>
                <li><strong className="text-amber-200">Human Oversight:</strong> Critical referrals and recommendations in platforms like WellPath are non-diagnostic and require user confirmation.</li>
                <li><strong className="text-amber-200">Privacy First:</strong> Personal information is not fed back into foundational public training sets.</li>
                <li><strong className="text-amber-200">Data Sovereignty:</strong> Cloud workloads and customer database instances reside within secure Australian data center regions.</li>
              </ul>
            </div>
          </div>
        );

      case 'privacy':
        return (
          <div className="space-y-4 text-xs text-neutral-300 leading-relaxed">
            <div className="flex items-center space-x-2 text-amber-400 font-bold text-sm">
              <Lock className="w-5 h-5" />
              <span>Nemean Partners Privacy Policy</span>
            </div>
            <p>
              Nemean Partners Pty Ltd (ABN 55 692 594 228) is committed to protecting your personal information in accordance with the Australian Privacy Principles (APPs) contained in the Privacy Act 1988 (Cth).
            </p>

            <h5 className="font-bold text-amber-300 text-xs">1. Information We Collect</h5>
            <p>
              We collect information necessary to deliver software platforms, process enquiries, and facilitate non-diagnostic health navigation. This includes contact details, organisation affiliation, and user-provided health goals or location data for program matching.
            </p>

            <h5 className="font-bold text-amber-300 text-xs">2. Use of Health & Preference Data</h5>
            <p>
              Data supplied through applications such as WellPath is used exclusively to generate explainable program recommendations and support engagement check-ins. No health data is sold or disclosed to third-party advertisers.
            </p>

            <h5 className="font-bold text-amber-300 text-xs">3. Data Security & Storage</h5>
            <p>
              All user records are protected using industry-standard TLS encryption in transit and AES-256 encryption at rest, hosted on enterprise-grade cloud infrastructure located in Australia.
            </p>

            <h5 className="font-bold text-amber-300 text-xs">4. Contact Privacy Officer</h5>
            <p>
              For privacy enquiries or to request deletion of personal records, contact our Privacy Officer at <strong>{COMPANY_INFO.email}</strong>.
            </p>
          </div>
        );

      case 'terms':
        return (
          <div className="space-y-4 text-xs text-neutral-300 leading-relaxed">
            <div className="flex items-center space-x-2 text-amber-400 font-bold text-sm">
              <FileText className="w-5 h-5" />
              <span>Terms of Use</span>
            </div>
            <p>
              These Terms of Use govern your access to websites, applications, and digital platforms operated by Nemean Partners Pty Ltd.
            </p>

            <h5 className="font-bold text-amber-300 text-xs">1. Non-Diagnostic Health Disclaimer</h5>
            <p className="bg-amber-950/30 p-3 rounded-lg border border-amber-500/20 text-amber-200">
              WellPath and related products provide non-diagnostic health navigation. They do not replace qualified medical practitioners, emergency services, or formal clinical advice.
            </p>

            <h5 className="font-bold text-amber-300 text-xs">2. Intellectual Property</h5>
            <p>
              All software designs, source code, logos, trademarks, and content published on this platform are the property of Nemean Partners Pty Ltd.
            </p>

            <h5 className="font-bold text-amber-300 text-xs">3. Governing Law</h5>
            <p>
              These terms are governed by the laws of Queensland, Australia. Any disputes shall be submitted to the exclusive jurisdiction of the courts of Queensland.
            </p>
          </div>
        );

      case 'accessibility':
        return (
          <div className="space-y-4 text-xs text-neutral-300 leading-relaxed">
            <div className="flex items-center space-x-2 text-amber-400 font-bold text-sm">
              <Globe className="w-5 h-5" />
              <span>Accessibility Statement</span>
            </div>
            <p>
              Nemean Partners Pty Ltd is dedicated to ensuring digital accessibility for people of all abilities, including those using assistive screen-reading devices or operating with low vision or motor impairments.
            </p>
            <ul className="space-y-2 list-disc list-inside">
              <li>Adherence to WCAG 2.1 AA accessibility guidelines across web platforms</li>
              <li>High-contrast visual hierarchy and scalable text typography</li>
              <li>Keyboard navigable interactive flows and screen reader ARIA labels</li>
              <li>Responsiveness across mobile, tablet, and desktop viewports</li>
            </ul>
          </div>
        );

      case 'company-details':
        return (
          <div className="space-y-4 text-xs text-neutral-300 leading-relaxed">
            <div className="flex items-center space-x-2 text-amber-400 font-bold text-sm">
              <Building2 className="w-5 h-5" />
              <span>Official Company Details & ABN Lookup</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 bg-neutral-900 rounded-xl border border-neutral-800">
              <div>
                <span className="text-neutral-500 block text-[10px] uppercase">Entity Name</span>
                <span className="font-bold text-amber-300">{COMPANY_INFO.legalName}</span>
              </div>
              <div>
                <span className="text-neutral-500 block text-[10px] uppercase">Entity Type</span>
                <span className="text-neutral-200">{COMPANY_INFO.entityType}</span>
              </div>
              <div>
                <span className="text-neutral-500 block text-[10px] uppercase">ABN</span>
                <span className="font-bold text-amber-400">{COMPANY_INFO.abn}</span>
              </div>
              <div>
                <span className="text-neutral-500 block text-[10px] uppercase">ACN</span>
                <span className="font-semibold text-neutral-200">{COMPANY_INFO.acn}</span>
              </div>
              <div>
                <span className="text-neutral-500 block text-[10px] uppercase">Main Location</span>
                <span className="text-neutral-200">{COMPANY_INFO.headquarters} ({COMPANY_INFO.locationDetails})</span>
              </div>
              <div>
                <span className="text-neutral-500 block text-[10px] uppercase">Founded</span>
                <span className="text-neutral-200">{COMPANY_INFO.foundedYear}</span>
              </div>
            </div>

            <div className="p-3 bg-amber-950/20 rounded-xl border border-amber-500/20 text-neutral-300">
              <div className="flex items-center space-x-2 text-amber-300 font-semibold mb-1">
                <CheckCircle className="w-4 h-4" />
                <span>ABN Registration Status</span>
              </div>
              <p>
                The ABN is active and lists the main business location as Queensland 4064. Website updated following GST registration finalisation.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const getTitle = () => {
    switch (type) {
      case 'responsible-ai': return 'Security & Responsible AI';
      case 'privacy': return 'Privacy Policy';
      case 'terms': return 'Terms of Use';
      case 'accessibility': return 'Accessibility';
      case 'company-details': return 'Company Details';
      default: return '';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="bg-neutral-950 border border-amber-500/30 w-full max-w-2xl rounded-2xl shadow-2xl shadow-amber-500/10 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Modal Header */}
        <div className="p-5 bg-neutral-900/90 border-b border-neutral-800 flex items-center justify-between">
          <h3 className="font-heading font-extrabold text-amber-200 text-base sm:text-lg">
            {getTitle()}
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-amber-300 hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scroll Body */}
        <div className="p-6 overflow-y-auto">
          {renderContent()}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-neutral-900/80 border-t border-neutral-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-gradient-to-r from-amber-400 to-amber-500 text-black font-bold text-xs rounded-lg hover:from-amber-300 hover:to-amber-400 transition-all cursor-pointer"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
};
