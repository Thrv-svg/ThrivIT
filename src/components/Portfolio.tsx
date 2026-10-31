import React, { useState } from 'react';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { CASE_STUDIES } from '../data/mockData';
import { CaseStudy, IndustryVertical } from '../types';
import { CaseStudyModal } from './CaseStudyModal';

interface PortfolioProps {
  onDiscussProject: (projectTitle: string) => void;
}

export const Portfolio: React.FC<PortfolioProps> = ({ onDiscussProject }) => {
  const [selectedFilter, setSelectedFilter] = useState<IndustryVertical>('All');
  const [activeModalStudy, setActiveModalStudy] = useState<CaseStudy | null>(null);

  const filteredStudies = selectedFilter === 'All'
    ? CASE_STUDIES
    : CASE_STUDIES.filter((item) => item.industry === selectedFilter);

  return (
    <section id="portfolio" className="py-24 border-b border-slate-800/80 bg-[#0D111C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl space-y-3">
            <div className="text-xs font-semibold text-emerald-400 tracking-wider">
              VERIFIED PORTFOLIO & CASE STUDIES
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight [text-wrap:balance]">
              Proven architectural transformations across high-scale enterprises.
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              Every case study below represents a real production deployment engineered by ThrivIT, backed by verifiable SLA benchmarks and audited ROI metrics.
            </p>
          </div>

          {/* Interactive Filter Controls (Segmented Buttons) */}
          <div className="flex items-center gap-1.5 p-1.5 bg-[#121824] border border-slate-800 rounded-xl overflow-x-auto self-start md:self-auto">
            {(['All', 'Enterprise SaaS', 'FinTech & Banking', 'Cloud & Data Infrastructure'] as IndustryVertical[]).map((tab) => {
              const active = selectedFilter === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setSelectedFilter(tab)}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                    active
                      ? 'bg-slate-900 text-emerald-400 border border-emerald-500/40 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {filteredStudies.map((study) => (
            <div
              key={study.id}
              className="bg-[#121824] border border-slate-800/90 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-slate-700 transition-all duration-300 group hover:-translate-y-1"
            >
              <div>
                {/* Media Container */}
                <div className="relative h-56 w-full overflow-hidden bg-slate-900">
                  <img
                    src={study.imagePath}
                    alt={study.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.style.display = 'none';
                      const fallback = target.nextElementSibling as HTMLElement;
                      if (fallback) fallback.style.display = 'flex';
                    }}
                  />
                  {/* Fallback frame */}
                  <div className="hidden w-full h-full bg-slate-900 p-6 flex-col justify-between">
                    <span className="text-xs text-emerald-400 font-mono">{study.industry}</span>
                    <span className="text-base font-bold text-white">{study.title}</span>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-[#121824] via-transparent to-transparent pointer-events-none" />

                  {/* Benchmark pill on image */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-slate-300 bg-[#0A0D14]/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800">
                    <span className="font-semibold text-emerald-400 font-mono">{study.keyMetric}</span>
                    <span className="text-slate-400">{study.clientName}</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 space-y-4">
                  {/* Zero-Pill Unboxed Metadata with typographic separators */}
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span className="text-emerald-400 font-medium">{study.industry}</span>
                    <span aria-hidden="true">·</span>
                    <span>Production Verified</span>
                  </div>

                  <h3 className="text-xl font-bold text-white leading-snug group-hover:text-emerald-400 transition-colors">
                    {study.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed line-clamp-3">
                    {study.headline}
                  </p>

                  {/* Quantified Secondary Indicators */}
                  <div className="pt-2 space-y-1.5 border-t border-slate-800/80">
                    {study.secondaryMetrics.slice(0, 2).map((m, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span className="font-mono">{m}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Action */}
              <div className="p-6 pt-0 border-t border-slate-800/60 mt-4">
                <button
                  onClick={() => setActiveModalStudy(study)}
                  className="w-full mt-4 py-2.5 px-4 rounded-lg bg-slate-900 hover:bg-slate-850 border border-slate-700/80 hover:border-emerald-500/50 text-xs font-semibold text-slate-200 hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Inspect Architecture Blueprint</span>
                  <ArrowUpRight className="w-4 h-4 text-emerald-400" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Case Study Details Modal */}
      <CaseStudyModal
        caseStudy={activeModalStudy}
        onClose={() => setActiveModalStudy(null)}
        onDiscussSimilar={(title) => {
          setActiveModalStudy(null);
          onDiscussProject(title);
        }}
      />
    </section>
  );
};
