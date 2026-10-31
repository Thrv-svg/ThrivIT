import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, ExternalLink, CheckCircle2, Monitor } from 'lucide-react';
import { Language, PortfolioProject } from '../types';
import { DICTIONARY, PORTFOLIO_PROJECTS } from '../data/websiteData';

interface CheckOurWorkProps {
  language: Language;
  onSelectProject: (project: PortfolioProject) => void;
}

export const CheckOurWork: React.FC<CheckOurWorkProps> = ({ language, onSelectProject }) => {
  const t = DICTIONARY[language].work;
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? PORTFOLIO_PROJECTS.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === PORTFOLIO_PROJECTS.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="work" className="py-24 border-t border-white/[0.06] bg-[#070709]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Navigation Controls (matching reference) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              {t.title}
            </h2>
            <p className="text-sm text-slate-400 max-w-xl">
              {t.subtitle}
            </p>
          </div>

          {/* Left/Right Carousel Arrows as in reference image */}
          <div className="flex items-center gap-3">
            <button
              onClick={prevSlide}
              className="w-10 h-10 rounded-full bg-[#111319] hover:bg-[#1A1D28] border border-white/[0.08] hover:border-white/[0.2] flex items-center justify-center text-slate-300 hover:text-white transition-all cursor-pointer"
              aria-label="Previous project slide"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextSlide}
              className="w-10 h-10 rounded-full bg-[#111319] hover:bg-[#1A1D28] border border-white/[0.08] hover:border-white/[0.2] flex items-center justify-center text-slate-300 hover:text-white transition-all cursor-pointer"
              aria-label="Next project slide"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Project Cards Grid with Browser Window Frame */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PORTFOLIO_PROJECTS.map((project, idx) => (
            <div
              key={project.id}
              onClick={() => onSelectProject(project)}
              className="rounded-2xl bg-[#111319] border border-white/[0.08] overflow-hidden hover:border-indigo-500/50 transition-all duration-300 group cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Browser Top Window Bar */}
                <div className="px-4 py-3 bg-[#0B0C10] border-b border-white/[0.06] flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                  <div className="text-[10px] font-mono text-slate-500 truncate max-w-[140px]">
                    https://{project.id}.thrivit.id
                  </div>
                  <Monitor className="w-3.5 h-3.5 text-slate-600" />
                </div>

                {/* Website Preview Image */}
                <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-900">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111319] via-transparent to-transparent pointer-events-none" />

                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-semibold text-indigo-300 border border-white/[0.1]">
                    {project.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-3">
                  <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {project.features.map((feat, i) => (
                      <span
                        key={i}
                        className="text-[10px] px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.06] text-slate-300 font-mono"
                      >
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Metric Strip */}
              <div className="p-6 pt-0 border-t border-white/[0.04] mt-4 flex items-center justify-between text-xs text-emerald-400 font-mono font-medium">
                <span>{project.metrics}</span>
                <span className="text-slate-400 group-hover:text-white flex items-center gap-1 text-[11px] font-sans">
                  <span>Lihat Detail</span>
                  <ExternalLink className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
