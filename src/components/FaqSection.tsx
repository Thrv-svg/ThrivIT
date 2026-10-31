import React, { useState } from 'react';
import { Plus, Minus, HelpCircle } from 'lucide-react';
import { Language } from '../types';
import { DICTIONARY, FAQS } from '../data/websiteData';

interface FaqSectionProps {
  language: Language;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ language }) => {
  const t = DICTIONARY[language].faq;
  const [openId, setOpenId] = useState<string | null>(FAQS[0].id);

  const toggleFaq = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="py-24 border-t border-white/[0.06] bg-[#070709] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column (5 cols): Title & Stylized Graphic Anchor matching reference image */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                {t.title}
              </h2>
              <p className="text-sm text-slate-400 leading-relaxed">
                {t.subtitle}
              </p>
            </div>

            {/* Stylized Wireframe Coil / Spiral Motif from reference image */}
            <div className="hidden lg:flex items-center justify-center p-8 rounded-3xl bg-gradient-to-br from-[#111319] to-[#0A0D14] border border-white/[0.06] relative overflow-hidden select-none">
              <svg className="w-64 h-64 text-slate-700/60 animate-pulse duration-1000" viewBox="0 0 200 200" fill="none">
                <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 6" />
                <circle cx="100" cy="100" r="60" stroke="currentColor" strokeWidth="2" strokeDasharray="2 4" />
                <circle cx="100" cy="100" r="40" stroke="currentColor" strokeWidth="2.5" />
                <circle cx="100" cy="100" r="20" stroke="currentColor" strokeWidth="3" />
                <path d="M40 100 Q 100 20 160 100 T 40 100" stroke="currentColor" strokeWidth="1" opacity="0.4" />
                <path d="M100 40 Q 180 100 100 160 T 100 40" stroke="currentColor" strokeWidth="1" opacity="0.4" />
              </svg>
              <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Right Column (7 cols): Accordion Items matching reference image */}
          <div className="lg:col-span-7 space-y-3">
            {FAQS.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? 'bg-[#12141C] border-indigo-500/40 shadow-lg shadow-black/40'
                      : 'bg-[#0E1017] border-white/[0.08] hover:border-white/[0.18]'
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span className="text-sm sm:text-base font-bold text-white leading-snug">
                      {faq.question}
                    </span>
                    <div className="w-7 h-7 rounded-full bg-white/[0.05] border border-white/[0.1] flex items-center justify-center text-slate-300 shrink-0">
                      {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-6 sm:px-6 text-xs sm:text-sm text-slate-400 leading-relaxed border-t border-white/[0.04] pt-3 animate-fade-in">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
