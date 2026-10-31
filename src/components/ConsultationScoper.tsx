import React, { useState } from 'react';
import { Send, CheckCircle2, Clock, DollarSign, Layers, AlertCircle, FileCheck } from 'lucide-react';
import { ConsultationSubmission } from '../types';

interface ConsultationScoperProps {
  initialService?: string;
}

export const ConsultationScoper: React.FC<ConsultationScoperProps> = ({ initialService }) => {
  const [fullName, setFullName] = useState('');
  const [corporateEmail, setCorporateEmail] = useState('');
  const [company, setCompany] = useState('');
  const [primaryService, setPrimaryService] = useState(
    initialService || 'Cloud Ecosystem Modernization'
  );
  const [timeline, setTimeline] = useState('3–6 Months');
  const [budgetRange, setBudgetRange] = useState('$100k – $250k');
  const [projectBrief, setProjectBrief] = useState('');
  const [submittedTicket, setSubmittedTicket] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const services = [
    'Cloud Ecosystem Modernization',
    'Real-Time Streaming Data Fabric',
    'Enterprise SaaS Platform Engineering',
    'Zero-Trust Security & Compliance Architecture'
  ];

  const timelines = ['1–3 Months', '3–6 Months', '6–12 Months', 'Ongoing Advisory'];
  const budgets = ['$50k – $100k', '$100k – $250k', '$250k – $500k', '$500k+'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!fullName.trim() || !corporateEmail.trim() || !company.trim() || !projectBrief.trim()) {
      setErrorMsg('Please complete all required fields.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(corporateEmail)) {
      setErrorMsg('Please enter a valid corporate email address.');
      return;
    }

    // Save to local storage for persistence
    const ticketId = `THRV-${Math.floor(10000 + Math.random() * 90000)}`;
    const submission: ConsultationSubmission = {
      fullName,
      corporateEmail,
      company,
      primaryService,
      timeline,
      budgetRange,
      projectBrief,
      submittedAt: new Date().toISOString()
    };

    const existingSubmissions = JSON.parse(localStorage.getItem('thrivit_consultations') || '[]');
    existingSubmissions.push({ ...submission, ticketId });
    localStorage.setItem('thrivit_consultations', JSON.stringify(existingSubmissions));

    setSubmittedTicket(ticketId);
  };

  const handleReset = () => {
    setFullName('');
    setCorporateEmail('');
    setCompany('');
    setProjectBrief('');
    setSubmittedTicket(null);
  };

  return (
    <section id="consultation" className="py-24 border-b border-slate-800/80 bg-[#0A0D14]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="text-xs font-semibold text-emerald-400 tracking-wider">
            START YOUR TRANSFORMATION
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight [text-wrap:balance]">
            Schedule an Architectural Discovery Session.
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            Collaborate directly with our principal systems engineers to evaluate your current bottlenecks, map your target architecture, and define an actionable implementation roadmap.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Form Container (7 cols) */}
          <div className="lg:col-span-7 bg-[#121824] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
            
            {submittedTicket ? (
              <div className="py-12 px-6 text-center space-y-6 animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-emerald-950/80 border border-emerald-500/50 flex items-center justify-center mx-auto text-emerald-400 shadow-lg shadow-emerald-950/60">
                  <FileCheck className="w-8 h-8" />
                </div>
                
                <div className="space-y-2">
                  <span className="text-xs font-mono font-bold text-emerald-400">
                    DISPATCH TICKET ISSUED: {submittedTicket}
                  </span>
                  <h3 className="text-2xl font-bold text-white">
                    Discovery Brief Received
                  </h3>
                  <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-white">{fullName}</strong>. A ThrivIT Principal Solutions Architect has been assigned to <strong className="text-white">{company}</strong>. We will review your technical specifications and contact you at <strong className="text-emerald-400">{corporateEmail}</strong> within 1 business day.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-left max-w-md mx-auto space-y-2 text-xs text-slate-400">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Service Category:</span>
                    <span className="text-slate-200 font-medium">{primaryService}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Target Timeline:</span>
                    <span className="text-slate-200 font-medium">{timeline}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Budget Range:</span>
                    <span className="text-slate-200 font-medium">{budgetRange}</span>
                  </div>
                </div>

                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 text-xs font-semibold text-slate-900 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors cursor-pointer"
                >
                  Submit Another Consultation Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {errorMsg && (
                  <div className="p-3.5 rounded-lg bg-rose-950/40 border border-rose-500/50 text-xs text-rose-300 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {/* Scope / Service Selector */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Primary Architectural Focus</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {services.map((svc) => (
                      <button
                        key={svc}
                        type="button"
                        onClick={() => setPrimaryService(svc)}
                        className={`p-3 text-xs text-left rounded-lg border transition-all cursor-pointer ${
                          primaryService === svc
                            ? 'bg-slate-900 border-emerald-500 text-white font-medium shadow-sm'
                            : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                        }`}
                      >
                        {svc}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Contact Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-300">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Sarah Jenkins"
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-900 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-300">
                      Corporate Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={corporateEmail}
                      onChange={(e) => setCorporateEmail(e.target.value)}
                      placeholder="s.jenkins@enterprise.com"
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-900 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300">
                    Company / Organization *
                  </label>
                  <input
                    type="text"
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. Meridian Financial Group"
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-900 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                {/* Timeline & Budget Selectors */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-300 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-cyan-400" />
                      <span>Target Delivery Timeline</span>
                    </label>
                    <select
                      value={timeline}
                      onChange={(e) => setTimeline(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-emerald-500 cursor-pointer"
                    >
                      {timelines.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-300 flex items-center gap-1">
                      <DollarSign className="w-3 h-3 text-emerald-400" />
                      <span>Estimated Capital Allocation</span>
                    </label>
                    <select
                      value={budgetRange}
                      onChange={(e) => setBudgetRange(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-emerald-500 cursor-pointer"
                    >
                      {budgets.map((b) => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Project Brief */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300">
                    System Architecture Goals & Bottlenecks *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={projectBrief}
                    onChange={(e) => setProjectBrief(e.target.value)}
                    placeholder="Describe your current software topology, target transaction volume, and operational challenges..."
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-900 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-emerald-500/20"
                >
                  <Send className="w-4 h-4" />
                  <span>Dispatch Architecture Discovery Brief</span>
                </button>

                <p className="text-[11px] text-slate-500 text-center">
                  Protected by mutual non-disclosure and strict enterprise confidentiality standards.
                </p>
              </form>
            )}

          </div>

          {/* Right Info Box (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl bg-[#121824] border border-slate-800 space-y-4">
              <h3 className="text-base font-bold text-white">
                What happens after you submit?
              </h3>
              
              <div className="space-y-4 text-xs text-slate-300">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-slate-800 text-emerald-400 font-mono flex items-center justify-center shrink-0">
                    1
                  </div>
                  <div>
                    <strong className="text-white">Technical Triage within 24 Hours:</strong> A dedicated Lead Systems Architect reviews your infrastructure brief.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-slate-800 text-cyan-400 font-mono flex items-center justify-center shrink-0">
                    2
                  </div>
                  <div>
                    <strong className="text-white">60-Minute Whiteboard Session:</strong> We map your target topology, state replication model, and API boundaries.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-slate-800 text-teal-400 font-mono flex items-center justify-center shrink-0">
                    3
                  </div>
                  <div>
                    <strong className="text-white">Formal Implementation Spec:</strong> You receive a concrete architectural blueprint with phased sprints and fixed SLA milestones.
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-950/30 to-slate-900 border border-emerald-500/30 space-y-3">
              <div className="text-xs font-semibold text-emerald-400">EXISTING ENTERPRISE CLIENTS</div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Already partnering with ThrivIT? Log in to your secure Client Portal to review live project sprints, milestone sign-offs, and deliverable files.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
