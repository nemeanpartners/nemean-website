import React, { useState } from 'react';
import { WELLPATH_JOURNEY_STEPS } from '../data/wellpath';
import { WELLPATH_DISCLAIMER, WELLPATH_SYNTHETIC_NOTICE } from '../data/company';
import { ProgramMatch } from '../types';
import { Activity, ShieldAlert, CheckCircle2, Search, ArrowRight, RefreshCw, Send, Users, ChevronRight, UserCheck, AlertTriangle } from 'lucide-react';

export const WellPathView: React.FC = () => {
  // Simulator State
  const [selectedGoal, setSelectedGoal] = useState<string>('Physical Movement & Diabetes Prevention');
  const [postcode, setPostcode] = useState<string>('4000');
  const [accessNeeds, setAccessNeeds] = useState<string>('Zero out-of-pocket cost preferred');
  const [telehealthPreferred, setTelehealthPreferred] = useState<boolean>(true);
  const [isMatching, setIsMatching] = useState<boolean>(false);
  const [matchedPrograms, setMatchedPrograms] = useState<ProgramMatch[] | null>(null);
  const [activeReferral, setActiveReferral] = useState<{ programId: string; token: string; milestone: number } | null>(null);

  const goalOptions = [
    'Physical Movement & Diabetes Prevention',
    'Tobacco & Nicotine Cessation',
    'Nutrition & Healthy Lifestyle Habit',
    'Stress Management & Mental Wellbeing',
    'Heart Health & Physical Activity'
  ];

  const handleRunMatcher = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsMatching(true);
    try {
      const res = await fetch('/api/wellpath/match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          goal: selectedGoal,
          location: postcode,
          accessNeeds,
          telehealthPreferred
        })
      });
      const data = await res.json();
      if (data.programs) {
        setMatchedPrograms(data.programs);
      }
    } catch (err) {
      console.error("Match error", err);
    } finally {
      setIsMatching(false);
    }
  };

  const handleActionReferral = (prog: ProgramMatch) => {
    const token = `WP-QLD-${Math.floor(100000 + Math.random() * 900000)}`;
    setActiveReferral({
      programId: prog.id,
      token,
      milestone: 7
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 animate-fade-in">
      
      {/* PAGE HEADER */}
      <div className="text-center space-y-4 max-w-4xl mx-auto pt-6">
        <div className="inline-flex items-center space-x-2 bg-[#d4af37]/20 text-[#d4af37] px-4 py-1.5 rounded-full text-xs font-bold border border-[#d4af37]/30">
          <Activity className="w-4 h-4" />
          <span>Health Platform Project • Queensland Pilot</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black font-heading text-white">
          WellPath
        </h1>

        <p className="text-xl sm:text-2xl font-bold text-[#d4af37]">
          Preventive-health navigation that continues beyond referral
        </p>

        <p className="text-sm sm:text-base text-neutral-300 leading-relaxed max-w-3xl mx-auto">
          WellPath helps consumers move from identifying a personal health goal to participating in an appropriate preventive-health program.
        </p>

        {/* Live Standalone Platform Link */}
        <div className="pt-3 flex flex-wrap items-center justify-center gap-4">
          <a
            href="https://wellpath-queensland.ai.studio"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-[#d4af37] hover:bg-[#b8860b] text-black font-extrabold text-sm px-8 py-3.5 rounded-full shadow-xl transition-all"
          >
            <span>Open WellPath Standalone Platform</span>
            <ChevronRight className="w-4 h-4" />
          </a>
        </div>

        {/* Grant Pathway Badge */}
        <div className="pt-1">
          <span className="inline-block bg-neutral-900 text-[#d4af37] text-xs font-bold px-4 py-2 rounded-xl border border-[#d4af37]/30">
            Proposed for the 2026 Private Sector Pathways health challenge
          </span>
        </div>
      </div>

      {/* MANDATORY DISCLAIMER BOX */}
      <div className="p-5 bg-amber-950/40 border border-amber-500/40 rounded-2xl space-y-2 text-amber-200 text-xs leading-relaxed max-w-4xl mx-auto">
        <div className="flex items-center space-x-2 font-bold text-amber-300">
          <ShieldAlert className="w-4 h-4 shrink-0" />
          <span>Important Non-Diagnostic Disclaimer</span>
        </div>
        <p className="font-medium">
          "{WELLPATH_DISCLAIMER}"
        </p>
      </div>

      {/* INTERACTIVE MVP SIMULATOR DEMO */}
      <section className="bg-neutral-900/90 rounded-3xl p-6 sm:p-10 border border-amber-500/30 shadow-2xl space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-neutral-800 gap-4">
          <div>
            <h2 className="text-xl font-bold font-heading text-white flex items-center space-x-2">
              <span>Interactive MVP Demonstrator</span>
              <span className="bg-emerald-950 text-emerald-400 text-[10px] px-2 py-0.5 rounded font-bold border border-emerald-500/30">
                Live Simulator
              </span>
            </h2>
            <p className="text-xs text-neutral-400 mt-1">
              Test WellPath's explainable matching engine and referral action flow below.
            </p>
          </div>

          <div className="text-xs text-neutral-400 bg-black/60 px-3 py-1.5 rounded-lg border border-neutral-800">
            Engine: Bounded Rules + QLD Directory
          </div>
        </div>

        {/* Simulator Form */}
        <form onSubmit={handleRunMatcher} className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
          
          <div className="md:col-span-4 space-y-2">
            <label className="text-xs font-bold uppercase text-amber-300 block">
              1. Personal Health Goal
            </label>
            <select
              value={selectedGoal}
              onChange={(e) => setSelectedGoal(e.target.value)}
              className="w-full bg-black text-white text-xs rounded-xl p-3 border border-neutral-800 focus:border-amber-400 focus:outline-none"
            >
              {goalOptions.map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>

          <div className="md:col-span-3 space-y-2">
            <label className="text-xs font-bold uppercase text-amber-300 block">
              2. QLD Postcode / Suburb
            </label>
            <input
              type="text"
              value={postcode}
              onChange={(e) => setPostcode(e.target.value)}
              placeholder="e.g., 4000 or Brisbane"
              className="w-full bg-black text-white text-xs rounded-xl p-3 border border-neutral-800 focus:border-amber-400 focus:outline-none"
            />
          </div>

          <div className="md:col-span-3 space-y-2">
            <label className="text-xs font-bold uppercase text-amber-300 block">
              Delivery Preference
            </label>
            <label className="flex items-center space-x-2 bg-black p-3 rounded-xl border border-neutral-800 text-xs text-neutral-300 cursor-pointer">
              <input
                type="checkbox"
                checked={telehealthPreferred}
                onChange={(e) => setTelehealthPreferred(e.target.checked)}
                className="accent-amber-400"
              />
              <span>Include Telehealth & Virtual</span>
            </label>
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={isMatching}
              className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-amber-400 to-amber-500 text-black font-extrabold text-xs py-3 px-4 rounded-xl shadow-lg hover:from-amber-300 hover:to-amber-400 transition-all cursor-pointer disabled:opacity-50"
            >
              {isMatching ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Matching...</span>
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  <span>Run Matcher</span>
                </>
              )}
            </button>
          </div>

        </form>

        {/* Match Results Display */}
        {matchedPrograms && (
          <div className="space-y-6 pt-4 animate-fade-in">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-wider text-amber-400">
                Matched Queensland Preventive Health Programs
              </h3>
              <span className="text-xs text-emerald-400 font-semibold">
                {matchedPrograms.length} Verified Options Found
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {matchedPrograms.map((prog) => (
                <div
                  key={prog.id}
                  className="bg-black p-5 rounded-2xl border border-amber-500/30 flex flex-col justify-between space-y-4 shadow-xl"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-bold border border-amber-500/30">
                        {prog.matchScore}% Match
                      </span>
                      <span className="text-neutral-400 font-semibold">{prog.cost}</span>
                    </div>

                    <h4 className="font-bold text-white text-sm">
                      {prog.title}
                    </h4>

                    <div className="text-[11px] text-neutral-400">
                      Provider: <span className="text-neutral-200">{prog.provider}</span>
                    </div>

                    <p className="text-xs text-neutral-300 bg-neutral-900 p-3 rounded-xl border border-neutral-800 leading-relaxed">
                      <strong className="text-amber-300 block mb-0.5">Explainable Reason:</strong>
                      {prog.explainability}
                    </p>
                  </div>

                  <button
                    onClick={() => handleActionReferral(prog)}
                    className="w-full flex items-center justify-center space-x-2 bg-neutral-900 hover:bg-neutral-800 text-amber-300 font-bold text-xs py-2.5 rounded-xl border border-amber-500/30 transition-all cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Action Referral Token</span>
                  </button>
                </div>
              ))}
            </div>

            {/* Active Referral Milestone Tracking Panel */}
            {activeReferral && (
              <div className="p-6 bg-gradient-to-r from-emerald-950/40 via-neutral-900 to-emerald-950/40 border border-emerald-500/40 rounded-2xl space-y-4 animate-fade-in">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-neutral-800 pb-3">
                  <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm">
                    <UserCheck className="w-5 h-5" />
                    <span>Referral Dispatched • Closed-Loop Engagement Active</span>
                  </div>
                  <span className="font-mono text-xs text-amber-300 bg-black px-3 py-1 rounded-lg border border-neutral-800">
                    Token: {activeReferral.token}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-neutral-300">
                  <div className="p-3 bg-black/60 rounded-xl border border-neutral-800">
                    <span className="text-neutral-500 text-[10px] block">Current Stage</span>
                    <span className="font-bold text-white">7-Day Milestone Check-In</span>
                  </div>
                  <div className="p-3 bg-black/60 rounded-xl border border-neutral-800">
                    <span className="text-neutral-500 text-[10px] block">Engagement Status</span>
                    <span className="font-bold text-emerald-400">Intake Appointment Confirmed</span>
                  </div>
                  <div className="p-3 bg-black/60 rounded-xl border border-neutral-800">
                    <span className="text-neutral-500 text-[10px] block">Barrier Status</span>
                    <span className="font-bold text-amber-300">No Access Barriers Flagged</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

      </section>

      {/* THE 7-STEP CONSUMER JOURNEY */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-xs font-bold uppercase tracking-widest text-amber-400">
            Closed-Loop Methodology
          </h2>
          <h3 className="text-2xl sm:text-4xl font-extrabold text-white">
            The 7-Step WellPath User Journey
          </h3>
          <p className="text-sm text-neutral-400 max-w-2xl mx-auto">
            From initial motivation to verified participation and milestone resolution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WELLPATH_JOURNEY_STEPS.map((step) => (
            <div
              key={step.stepNumber}
              className="bg-neutral-900/80 p-6 rounded-2xl border border-neutral-800 space-y-4 shadow-xl flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-black font-black text-sm flex items-center justify-center">
                    {step.stepNumber}
                  </span>
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">
                    Step {step.stepNumber}
                  </span>
                </div>

                <h4 className="text-lg font-bold text-white">
                  {step.title}
                </h4>

                <p className="text-xs font-medium text-amber-200/90">
                  {step.subtitle}
                </p>

                <p className="text-xs text-neutral-300 leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="pt-3 border-t border-neutral-800 space-y-2 text-[11px]">
                <div className="bg-black/60 p-2.5 rounded-lg border border-neutral-800/80">
                  <span className="text-neutral-500 font-bold block">User Experience:</span>
                  <span className="text-neutral-300">{step.userAction}</span>
                </div>
                <div className="bg-amber-950/20 p-2.5 rounded-lg border border-amber-500/20">
                  <span className="text-amber-400 font-bold block">Barrier Resolution:</span>
                  <span className="text-amber-200">{step.barrierResolution}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MVP SCREENSHOT VISUALIZERS */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-bold font-heading text-white">
            WellPath MVP UI Screens & Workflow Interfaces
          </h3>
          <p className="text-xs text-neutral-400">
            High-fidelity user interface representations from the working MVP
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Screen 1: Goal & Filter Intake */}
          <div className="bg-neutral-900 rounded-2xl p-5 border border-neutral-800 space-y-4">
            <div className="flex items-center justify-between text-xs border-b border-neutral-800 pb-2">
              <span className="font-bold text-amber-300">Screen 01: Goal Intake</span>
              <span className="text-neutral-500">Mobile View</span>
            </div>
            <div className="bg-black p-4 rounded-xl border border-neutral-800 space-y-3 text-xs">
              <div className="p-2 bg-amber-500/10 border border-amber-500/30 rounded text-amber-300 font-semibold">
                ✓ Goal: Reduce Chronic Risk
              </div>
              <div className="p-2 bg-neutral-900 rounded text-neutral-300">
                📍 Location: QLD 4064
              </div>
              <div className="p-2 bg-neutral-900 rounded text-neutral-300">
                💲 Cost: Free Programs Only
              </div>
            </div>
          </div>

          {/* Screen 2: Explainable Matcher */}
          <div className="bg-neutral-900 rounded-2xl p-5 border border-neutral-800 space-y-4">
            <div className="flex items-center justify-between text-xs border-b border-neutral-800 pb-2">
              <span className="font-bold text-amber-300">Screen 02: Explainable Match</span>
              <span className="text-neutral-500">Dashboard View</span>
            </div>
            <div className="bg-black p-4 rounded-xl border border-neutral-800 space-y-3 text-xs">
              <div className="flex justify-between font-bold text-white">
                <span>My Health for Life</span>
                <span className="text-emerald-400">96%</span>
              </div>
              <p className="text-[11px] text-neutral-400">
                Matched because it provides verified local coaching in Queensland with zero cost.
              </p>
            </div>
          </div>

          {/* Screen 3: Navigator Barrier Assist */}
          <div className="bg-neutral-900 rounded-2xl p-5 border border-neutral-800 space-y-4">
            <div className="flex items-center justify-between text-xs border-b border-neutral-800 pb-2">
              <span className="font-bold text-amber-300">Screen 03: Navigator Resolution</span>
              <span className="text-neutral-500">Support View</span>
            </div>
            <div className="bg-black p-4 rounded-xl border border-neutral-800 space-y-3 text-xs">
              <div className="p-2 bg-amber-950/40 border border-amber-500/30 rounded text-amber-200">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400 inline mr-1" />
                Transport Barrier Detected → Switched to Telehealth Group
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SYNTHETIC DATA & PARTNERSHIP DISCLAIMER STATEMENT */}
      <section className="p-6 bg-neutral-900/60 rounded-2xl border border-neutral-800 text-center text-xs text-neutral-400 leading-relaxed max-w-3xl mx-auto space-y-2">
        <span className="font-bold text-amber-400 block uppercase tracking-widest">
          Synthetic Data Notice
        </span>
        <p>
          "{WELLPATH_SYNTHETIC_NOTICE}"
        </p>
      </section>

    </div>
  );
};
