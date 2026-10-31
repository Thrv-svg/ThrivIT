import React from 'react';
import {
  Layout,
  Palette,
  Smartphone,
  ShoppingBag,
  Code2,
  Cpu,
  Layers,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Language } from '../types';
import { DICTIONARY, BENTO_TEAM_IMAGE } from '../data/websiteData';

interface WhatWeDoBentoProps {
  language: Language;
  onExplorePoS: () => void;
  onSelectService: (serviceName: string) => void;
}

export const WhatWeDoBento: React.FC<WhatWeDoBentoProps> = ({
  language,
  onExplorePoS,
  onSelectService
}) => {
  const t = DICTIONARY[language].whatWeDo;
  const services = t.services;

  return (
    <section id="what-we-do" className="py-24 border-t border-white/[0.06] relative bg-[#070709]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-14 space-y-2">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            {t.title}
          </h2>
          <p className="text-sm text-slate-400 max-w-xl">
            {t.subtitle}
          </p>
        </div>

        {/* Asymmetric Bento Grid matching the reference layout exactly */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card 1: Web Design */}
          <div
            onClick={() => onSelectService(services[0].title)}
            className="p-6 rounded-2xl bg-[#111319] border border-white/[0.08] hover:border-white/[0.2] transition-all flex flex-col justify-between group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-slate-300 mb-6 group-hover:text-indigo-400 transition-colors">
              <Layout className="w-4 h-4" />
            </div>
            <div className="space-y-2">
              <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors">
                {services[0].title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {services[0].description}
              </p>
            </div>
          </div>

          {/* Card 2: UI/UX Design */}
          <div
            onClick={() => onSelectService(services[1].title)}
            className="p-6 rounded-2xl bg-[#111319] border border-white/[0.08] hover:border-white/[0.2] transition-all flex flex-col justify-between group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-slate-300 mb-6 group-hover:text-purple-400 transition-colors">
              <Palette className="w-4 h-4" />
            </div>
            <div className="space-y-2">
              <h3 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors">
                {services[1].title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {services[1].description}
              </p>
            </div>
          </div>

          {/* Card 3: Responsive Design */}
          <div
            onClick={() => onSelectService(services[2].title)}
            className="p-6 rounded-2xl bg-[#111319] border border-white/[0.08] hover:border-white/[0.2] transition-all flex flex-col justify-between group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-slate-300 mb-6 group-hover:text-cyan-400 transition-colors">
              <Smartphone className="w-4 h-4" />
            </div>
            <div className="space-y-2">
              <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                {services[2].title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {services[2].description}
              </p>
            </div>
          </div>

          {/* Card 4 (Tall Card with Photo): E-commerce Solutions (spans 2 rows on large screens) */}
          <div
            onClick={() => onSelectService(services[3].title)}
            className="lg:row-span-2 p-6 rounded-2xl bg-[#111319] border border-white/[0.08] hover:border-indigo-500/40 transition-all flex flex-col justify-between group cursor-pointer overflow-hidden relative"
          >
            <div className="space-y-4">
              <div className="w-9 h-9 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-indigo-400">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div className="space-y-2">
                <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors">
                  {services[3].title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {services[3].description}
                </p>
              </div>
            </div>

            {/* Vertical Photo Frame matching reference */}
            <div className="mt-6 rounded-xl overflow-hidden border border-white/[0.1] relative h-48 sm:h-56">
              <img
                src={BENTO_TEAM_IMAGE}
                alt="E-commerce web development studio team"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 right-3 text-[11px] text-white font-medium bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-lg">
                Shopify, WooCommerce & Custom Storefronts
              </div>
            </div>
          </div>

          {/* Card 5: Modern Tech Stack / Next.js & React */}
          <div
            onClick={() => onSelectService(services[4].title)}
            className="p-6 rounded-2xl bg-[#111319] border border-white/[0.08] hover:border-white/[0.2] transition-all flex flex-col justify-between group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-slate-300 mb-6 group-hover:text-emerald-400 transition-colors">
              <Code2 className="w-4 h-4" />
            </div>
            <div className="space-y-2">
              <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                {services[4].title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {services[4].description}
              </p>
            </div>
          </div>

          {/* Card 6: Signature Solid Violet Accent Square Card (as in the reference FasterUI "W" card) */}
          <div
            onClick={onExplorePoS}
            className="p-6 rounded-2xl bg-indigo-600 hover:bg-indigo-500 transition-all flex flex-col items-center justify-center text-center cursor-pointer shadow-lg shadow-indigo-600/30 group min-h-[160px]"
          >
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white mb-2 group-hover:scale-110 transition-transform shadow-inner">
              <Sparkles className="w-8 h-8" />
            </div>
            <div className="text-xs font-bold text-white tracking-wider">
              THRIVIT ECOSYSTEM
            </div>
            <div className="text-[11px] text-indigo-200 mt-1 flex items-center gap-1 font-medium">
              <span>Try PoS System Demo</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 7: Custom Development & PoS System */}
          <div
            onClick={onExplorePoS}
            className="p-6 rounded-2xl bg-[#111319] border border-emerald-500/30 hover:border-emerald-500/60 transition-all flex flex-col justify-between group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-emerald-950/60 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-6">
              <Cpu className="w-4 h-4" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-bold uppercase tracking-wider">
                <span>Premium Bonus</span>
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                {services[5].title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {services[5].description}
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
