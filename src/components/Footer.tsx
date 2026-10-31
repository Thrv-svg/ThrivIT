import React from 'react';
import { Sparkles, ArrowUp, Github, Linkedin, Twitter, Instagram } from 'lucide-react';
import { Language } from '../types';
import { DICTIONARY } from '../data/websiteData';

interface FooterProps {
  language: Language;
  onNavigate: (sectionId: string) => void;
  onOpenPosDemo: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  language,
  onNavigate,
  onOpenPosDemo
}) => {
  const t = DICTIONARY[language].footer;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative pt-16 pb-20 overflow-hidden bg-[#070709]">
      
      {/* Bottom Colorful Ambient Glow Mesh matching the reference image footer */}
      <div className="absolute bottom-0 left-0 right-0 h-96 pointer-events-none select-none flex items-end justify-center overflow-hidden -z-10">
        <div className="w-[850px] h-[340px] rounded-full bg-gradient-to-r from-rose-500/30 via-orange-500/25 to-indigo-600/35 blur-[120px] transform translate-y-24" />
        <div className="w-[500px] h-[280px] rounded-full bg-gradient-to-tr from-cyan-400/20 via-blue-600/30 to-fuchsia-500/30 blur-[100px] transform translate-y-32" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Contained Rounded Dark Card matching the reference image layout */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#0D1017]/95 border border-white/[0.08] shadow-2xl backdrop-blur-xl space-y-10">
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-8 border-b border-white/[0.06]">
            
            {/* Brand & Tagline */}
            <div className="space-y-3 max-w-md">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white shadow-md">
                  <Sparkles className="w-4 h-4" />
                </div>
                <span className="text-xl font-bold tracking-tight text-white">
                  Thriv<span className="text-indigo-400">IT</span>
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                {t.tagline}
              </p>
            </div>

            {/* Quick Links matching the reference */}
            <div className="flex flex-wrap items-center gap-6 text-xs text-slate-300 font-medium">
              <button
                onClick={() => onNavigate('hero')}
                className="hover:text-indigo-400 transition-colors cursor-pointer"
              >
                Home
              </button>
              <button
                onClick={() => onNavigate('what-we-do')}
                className="hover:text-indigo-400 transition-colors cursor-pointer"
              >
                What We Do
              </button>
              <button
                onClick={() => onNavigate('work')}
                className="hover:text-indigo-400 transition-colors cursor-pointer"
              >
                Work
              </button>
              <button
                onClick={() => onNavigate('pricing')}
                className="hover:text-indigo-400 transition-colors cursor-pointer"
              >
                Pricing
              </button>
              <button
                onClick={() => onNavigate('faq')}
                className="hover:text-indigo-400 transition-colors cursor-pointer"
              >
                FAQ
              </button>
              <button
                onClick={onOpenPosDemo}
                className="text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer"
              >
                Demo PoS
              </button>
              <button
                onClick={() => onNavigate('contact')}
                className="hover:text-indigo-400 transition-colors cursor-pointer"
              >
                Contact
              </button>
            </div>

          </div>

          {/* Bottom Bar: Copyright & Socials */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <span>&copy; {new Date().getFullYear()} ThrivIT Agency. {t.rights}</span>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-4 text-slate-400">
              <a href="#social" className="hover:text-white transition-colors" aria-label="Github">
                <Github className="w-4 h-4" />
              </a>
              <a href="#social" className="hover:text-white transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#social" className="hover:text-white transition-colors" aria-label="Twitter">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#social" className="hover:text-white transition-colors" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <button
                onClick={scrollToTop}
                className="p-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-slate-400 hover:text-white ml-2 transition-colors cursor-pointer"
                title="Scroll to top"
              >
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </footer>
  );
};
