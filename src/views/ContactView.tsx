import React, { useState } from 'react';
import { COMPANY_INFO } from '../data/company';
import { EnquiryForm } from '../types';
import { Mail, MapPin, Globe, Building2, Send, CheckCircle2, AlertCircle, RefreshCw, ShieldCheck } from 'lucide-react';

export const ContactView: React.FC = () => {
  const [formData, setFormData] = useState<EnquiryForm>({
    name: '',
    organisation: '',
    email: '',
    reason: 'Government and partnerships',
    message: '',
    consent: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{ success: boolean; ticketRef?: string; message: string } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage("Please fill out all required fields (Name, Email, and Message).");
      return;
    }

    if (!formData.consent) {
      setErrorMessage("Please accept the privacy and communication consent checkbox.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitResult({
          success: true,
          ticketRef: data.ticketRef,
          message: data.message
        });
      } else {
        setErrorMessage(data.error || "Failed to submit enquiry. Please try again.");
      }
    } catch (err) {
      setErrorMessage("Network error submitting enquiry. Please verify your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 animate-fade-in">
      
      {/* HEADER SECTION */}
      <div className="text-center space-y-4 max-w-3xl mx-auto pt-6">
        <span className="text-xs font-extrabold uppercase tracking-widest text-amber-400">
          Partner & Enquiries
        </span>
        <h1 className="text-3xl sm:text-5xl font-black font-heading text-white">
          Contact Nemean Partners
        </h1>
        <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
          We welcome enquiries from government agencies, health practitioners, educational institutions, and enterprise partners seeking practical digital platforms.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* READABLE COMPANY CONTACT DETAILS COLUMN */}
        <div className="lg:col-span-5 bg-neutral-900/90 p-8 rounded-3xl border border-amber-500/30 shadow-2xl space-y-6 flex flex-col justify-between">
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold font-heading text-white border-b border-neutral-800 pb-3">
                Official Company Information
              </h2>
              <p className="text-xs text-neutral-400 mt-2">
                Accessible, readable site text for government assessors and partners.
              </p>
            </div>

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
                  <a href={`mailto:${COMPANY_INFO.email}`} className="font-semibold text-amber-300 hover:underline">
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

          <div className="p-4 bg-amber-950/20 rounded-2xl border border-amber-500/20 text-[11px] text-amber-200/90 leading-relaxed">
            <strong className="block text-amber-300 font-bold mb-1">Response Commitment:</strong>
            Our Brisbane team handles government and commercial enquiries directly, responding within 1-2 business days.
          </div>
        </div>

        {/* INTERACTIVE FORM COLUMN */}
        <div className="lg:col-span-7 bg-neutral-900/80 p-8 rounded-3xl border border-neutral-800 shadow-2xl space-y-6">
          <div>
            <h2 className="text-xl font-bold font-heading text-white border-b border-neutral-800 pb-3">
              Submit an Enquiry
            </h2>
            <p className="text-xs text-neutral-400 mt-2">
              Please specify the reason for your message to route your request efficiently.
            </p>
          </div>

          {submitResult ? (
            <div className="p-8 bg-black rounded-2xl border border-emerald-500/40 text-center space-y-4 animate-fade-in">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                <CheckCircle2 className="w-7 h-7" />
              </div>

              <h3 className="text-xl font-bold text-white font-heading">
                Enquiry Received Successfully
              </h3>

              <div className="inline-block bg-neutral-900 px-4 py-2 rounded-xl border border-neutral-800 text-xs font-mono text-amber-300">
                Reference Ticket: {submitResult.ticketRef}
              </div>

              <p className="text-xs text-neutral-300 max-w-md mx-auto leading-relaxed">
                {submitResult.message}
              </p>

              <button
                onClick={() => {
                  setSubmitResult(null);
                  setFormData({
                    name: '',
                    organisation: '',
                    email: '',
                    reason: 'Government and partnerships',
                    message: '',
                    consent: false,
                  });
                }}
                className="px-6 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-amber-300 font-bold text-xs rounded-xl border border-neutral-700 transition-all cursor-pointer"
              >
                Submit Another Enquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {errorMessage && (
                <div className="p-3 bg-red-950/50 border border-red-500/40 rounded-xl text-red-200 text-xs flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-neutral-300 block">
                    Full Name <span className="text-amber-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Sarah Jenkins"
                    className="w-full bg-black text-white text-xs rounded-xl p-3 border border-neutral-800 focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-neutral-300 block">
                    Organisation / Department
                  </label>
                  <input
                    type="text"
                    value={formData.organisation}
                    onChange={(e) => setFormData({ ...formData, organisation: e.target.value })}
                    placeholder="e.g., Queensland Health / Department"
                    className="w-full bg-black text-white text-xs rounded-xl p-3 border border-neutral-800 focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-neutral-300 block">
                    Email Address <span className="text-amber-400">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g., s.jenkins@qld.gov.au"
                    className="w-full bg-black text-white text-xs rounded-xl p-3 border border-neutral-800 focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-neutral-300 block">
                    Reason for Enquiry <span className="text-amber-400">*</span>
                  </label>
                  <select
                    value={formData.reason}
                    onChange={(e) => setFormData({ ...formData, reason: e.target.value as any })}
                    className="w-full bg-black text-white text-xs rounded-xl p-3 border border-neutral-800 focus:border-amber-400 focus:outline-none"
                  >
                    <option value="Government and partnerships">Government and partnerships</option>
                    <option value="WellPath">WellPath</option>
                    <option value="Product enquiry">Product enquiry</option>
                    <option value="Technical support">Technical support</option>
                    <option value="General enquiry">General enquiry</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-neutral-300 block">
                  Message Details <span className="text-amber-400">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your inquiry or proposed project..."
                  className="w-full bg-black text-white text-xs rounded-xl p-3 border border-neutral-800 focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div className="p-3 bg-black/60 rounded-xl border border-neutral-800">
                <label className="flex items-start space-x-3 text-xs text-neutral-300 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={formData.consent}
                    onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                    className="mt-0.5 accent-amber-400"
                  />
                  <span className="leading-snug">
                    I consent to Nemean Partners Pty Ltd collecting my contact details to respond to this enquiry in accordance with the Privacy Policy. <span className="text-amber-400">*</span>
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-black font-extrabold text-sm py-3.5 rounded-xl shadow-xl hover:from-amber-300 hover:to-amber-500 transition-all cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Submitting Enquiry...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message to Nemean Partners</span>
                  </>
                )}
              </button>

            </form>
          )}
        </div>

      </div>

    </div>
  );
};
