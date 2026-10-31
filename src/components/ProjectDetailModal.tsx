import React from 'react';
import { X, ExternalLink, CheckCircle2, Monitor, ArrowRight, ShieldCheck } from 'lucide-react';
import { PortfolioProject } from '../types';

interface ProjectDetailModalProps {
  project: PortfolioProject | null;
  onClose: () => void;
  onOrderSimilar: (projectName: string) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  onOrderSimilar
}) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-4xl bg-[#0D1017] border border-white/[0.1] rounded-3xl shadow-2xl overflow-hidden my-4 sm:my-8 flex flex-col max-h-[92vh]">
        
        {/* Browser Top Window Bar */}
        <div className="px-6 py-4 bg-[#121620] border-b border-white/[0.08] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500" />
            <div className="w-3 h-3 rounded-full bg-amber-500" />
            <div className="w-3 h-3 rounded-full bg-emerald-500" />
            <span className="text-xs font-mono text-slate-400 ml-3">
              https://showcase.thrivit.id/{project.id}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          
          {/* Hero Preview Image */}
          <div className="rounded-2xl overflow-hidden border border-white/[0.08] relative h-64 sm:h-80 bg-slate-900">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D1017] via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white">
              <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md font-semibold text-indigo-400 border border-white/[0.1]">
                {project.category}
              </span>
              <span className="font-mono text-emerald-400 font-bold bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/[0.1]">
                {project.metrics}
              </span>
            </div>
          </div>

          {/* Title & Client */}
          <div className="space-y-2">
            <div className="text-xs text-slate-400">
              Klien: <strong className="text-white">{project.client}</strong>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              {project.title}
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Features Grid */}
          <div className="space-y-3 pt-2 border-t border-white/[0.06]">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              FITUR & SISTEM YANG DIKEMBANGKAN
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {project.features.map((feat, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-[#141824] border border-white/[0.06] flex items-center gap-2.5 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-4 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={onClose}
              className="text-xs font-medium text-slate-400 hover:text-white"
            >
              Kembali ke Portofolio
            </button>

            <button
              onClick={() => {
                onClose();
                onOrderSimilar(project.title);
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Buat Website Serupa untuk Bisnis Saya</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
