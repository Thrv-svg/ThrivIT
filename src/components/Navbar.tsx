import React, { useState } from 'react';
import { Sparkles, Globe, Menu, X, ShieldCheck, ShoppingCart } from 'lucide-react';
import { Language } from '../types';
import { DICTIONARY } from '../data/websiteData';

interface NavbarProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenPosDemo: () => void;
  onOpenPortal: () => void;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  language,
  onLanguageChange,
  onOpenPosDemo,
  onOpenPortal,
  onNavigate
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = DICTIONARY[language].nav;

  const handleLink = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#070709]/85 backdrop-blur-md border-b border-white/[0.06] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Left Zone: Brand Logo Wordmark matching reference */}
          <div
            onClick={() => handleLink('hero')}
            className="flex items-center gap-2.5 cursor-pointer shrink-0 group"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              Thriv<span className="text-indigo-400">IT</span>
            </span>
          </div>

          {/* Center Zone: Floating Capsule Nav Links (as in reference image) */}
          <nav className="hidden lg:flex items-center gap-1 px-4 py-2 rounded-full bg-[#111319]/90 border border-white/[0.08] shadow-inner text-xs font-medium text-slate-300">
            <button
              onClick={() => handleLink('hero')}
              className="px-3.5 py-1.5 rounded-full hover:text-white hover:bg-white/[0.06] transition-all cursor-pointer"
            >
              {t.home}
            </button>
            <button
              onClick={() => handleLink('ecosystem')}
              className="px-3.5 py-1.5 rounded-full text-cyan-300 hover:text-cyan-200 hover:bg-cyan-500/10 transition-all cursor-pointer flex items-center gap-1.5 font-semibold"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span>3D Ekosistem</span>
            </button>
            <button
              onClick={() => handleLink('what-we-do')}
              className="px-3.5 py-1.5 rounded-full hover:text-white hover:bg-white/[0.06] transition-all cursor-pointer"
            >
              {t.whatWeDo}
            </button>
            <button
              onClick={() => handleLink('work')}
              className="px-3.5 py-1.5 rounded-full hover:text-white hover:bg-white/[0.06] transition-all cursor-pointer"
            >
              {t.work}
            </button>
            <button
              onClick={() => handleLink('pricing')}
              className="px-3.5 py-1.5 rounded-full hover:text-white hover:bg-white/[0.06] transition-all cursor-pointer"
            >
              {t.pricing}
            </button>
            <button
              onClick={() => handleLink('faq')}
              className="px-3.5 py-1.5 rounded-full hover:text-white hover:bg-white/[0.06] transition-all cursor-pointer"
            >
              {t.faq}
            </button>
            <button
              onClick={() => handleLink('contact')}
              className="px-3.5 py-1.5 rounded-full hover:text-white hover:bg-white/[0.06] transition-all cursor-pointer"
            >
              {t.contact}
            </button>
          </nav>

          {/* Right Zone: Language Toggle + PoS Demo + Sign In / Portal */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            {/* Language Switcher */}
            <div className="flex items-center bg-[#111319] border border-white/[0.08] rounded-full p-1 text-xs">
              <button
                onClick={() => onLanguageChange('id')}
                className={`px-2.5 py-1 rounded-full transition-colors cursor-pointer ${
                  language === 'id'
                    ? 'bg-indigo-600 text-white font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                ID
              </button>
              <button
                onClick={() => onLanguageChange('en')}
                className={`px-2.5 py-1 rounded-full transition-colors cursor-pointer ${
                  language === 'en'
                    ? 'bg-indigo-600 text-white font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                EN
              </button>
            </div>

            {/* PoS Demo Button */}
            <button
              onClick={onOpenPosDemo}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-300 bg-emerald-950/60 border border-emerald-500/40 rounded-full hover:bg-emerald-900/60 transition-colors cursor-pointer"
            >
              <ShoppingCart className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t.demoPos}</span>
            </button>

            {/* Primary Action Button matching reference purple/indigo button */}
            <button
              onClick={onOpenPortal}
              className="px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-full shadow-md shadow-indigo-600/30 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{t.portal}</span>
            </button>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onOpenPosDemo}
              className="px-2.5 py-1 text-[11px] font-semibold text-emerald-300 bg-emerald-950/80 border border-emerald-500/40 rounded-full"
            >
              PoS Demo
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white rounded-lg border border-white/[0.08]"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-white/[0.08] bg-[#0C0E14] px-6 py-5 space-y-4">
          <nav className="flex flex-col space-y-3 text-sm font-medium text-slate-300">
            <button onClick={() => handleLink('hero')} className="text-left py-1 hover:text-indigo-400">
              {t.home}
            </button>
            <button onClick={() => handleLink('what-we-do')} className="text-left py-1 hover:text-indigo-400">
              {t.whatWeDo}
            </button>
            <button onClick={() => handleLink('work')} className="text-left py-1 hover:text-indigo-400">
              {t.work}
            </button>
            <button onClick={() => handleLink('pricing')} className="text-left py-1 hover:text-indigo-400">
              {t.pricing}
            </button>
            <button onClick={() => handleLink('faq')} className="text-left py-1 hover:text-indigo-400">
              {t.faq}
            </button>
            <button onClick={() => handleLink('contact')} className="text-left py-1 hover:text-indigo-400">
              {t.contact}
            </button>
          </nav>

          <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
            <div className="flex items-center gap-1 bg-[#111319] border border-white/[0.08] rounded-full p-1 text-xs">
              <button
                onClick={() => onLanguageChange('id')}
                className={`px-3 py-1 rounded-full ${language === 'id' ? 'bg-indigo-600 text-white font-semibold' : 'text-slate-400'}`}
              >
                Bahasa Indonesia
              </button>
              <button
                onClick={() => onLanguageChange('en')}
                className={`px-3 py-1 rounded-full ${language === 'en' ? 'bg-indigo-600 text-white font-semibold' : 'text-slate-400'}`}
              >
                English
              </button>
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPortal();
              }}
              className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 rounded-full"
            >
              {t.portal}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
