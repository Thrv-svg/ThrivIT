import React from 'react';
import { X, CheckCircle2, TrendingUp, Cpu, Quote, ArrowRight } from 'lucide-react';
import { CaseStudy } from '../types';

interface CaseStudyModalProps {
  caseStudy: CaseStudy | null;
  onClose: () => void;
  onDiscussSimilar: (title: string) => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  caseStudy,
  onClose,
  onDiscussSimilar
}) => {
  if (!caseStudy) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-4xl bg-[#0D111C] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-8">
        
        {/* Modal Header */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-slate-900">
          <img
            src={caseStudy.imagePath}
            alt={caseStudy.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D111C] via-[#0D111C]/60 to-transparent" />
          
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors border border-slate-700/80 cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Title & Metadata overlaid on image bottom */}
          <div className="absolute bottom-6 left-6 right-6 space-y-2">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-300">
              <span className="text-emerald-400 font-semibold">{caseStudy.industry}</span>
              <span aria-hidden="true">·</span>
              <span>Client: {caseStudy.clientName}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
              {caseStudy.title}
            </h2>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-8">
          
          {/* Quantified Impact Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 rounded-xl bg-[#121824] border border-slate-800">
            <div>
              <div className="text-xs text-slate-400">Primary Performance Benchmark</div>
              <div className="text-xl sm:text-2xl font-bold font-mono text-emerald-400 mt-0.5">
                {caseStudy.keyMetric}
              </div>
            </div>
            {caseStudy.secondaryMetrics.map((metric, i) => (
              <div key={i}>
                <div className="text-xs text-slate-400">Verified System SLA</div>
                <div className="text-sm sm:text-base font-semibold font-mono text-slate-200 mt-1">
                  {metric}
                </div>
              </div>
            ))}
          </div>

          {/* Challenge & Solution Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <h3 className="text-xs font-semibold tracking-wider text-slate-400">
                THE ARCHITECTURAL CHALLENGE
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {caseStudy.challenge}
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-xs font-semibold tracking-wider text-emerald-400">
                THRIVIT ENGINEERING SOLUTION
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {caseStudy.solution}
              </p>
            </div>
          </div>

          {/* Key Architecture Highlights */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold tracking-wider text-slate-300 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-cyan-400" />
              <span>CORE ARCHITECTURAL INVARIANTS & TOPOLOGY</span>
            </h3>
            <div className="space-y-2 bg-[#121824]/60 border border-slate-800/80 rounded-xl p-4">
              {caseStudy.architectureHighlights.map((highlight, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Production Technology Stack */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold tracking-wider text-slate-400">
              DEPLOYED INFRASTRUCTURE & TOOLS
            </h3>
            <div className="flex flex-wrap gap-2 text-xs">
              {caseStudy.stack.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 font-mono text-slate-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Executive Client Quote */}
          <div className="p-5 rounded-xl bg-gradient-to-r from-emerald-950/20 via-slate-900 to-slate-900 border border-emerald-500/30 space-y-3">
            <Quote className="w-6 h-6 text-emerald-400" />
            <p className="text-sm sm:text-base italic text-slate-200 leading-relaxed">
              "{caseStudy.clientQuote.quote}"
            </p>
            <div className="text-xs text-slate-400">
              <span className="font-semibold text-white">{caseStudy.clientQuote.author}</span>
              <span aria-hidden="true"> · </span>
              <span>{caseStudy.clientQuote.role}</span>
            </div>
          </div>

          {/* Bottom Action */}
          <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-2.5 text-xs font-medium text-slate-400 hover:text-white transition-colors"
            >
              Close Case Study
            </button>
            <button
              onClick={() => {
                onClose();
                onDiscussSimilar(caseStudy.title);
              }}
              className="w-full sm:w-auto px-6 py-2.5 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Build an Equivalent Architecture</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
