import React, { useState } from 'react';
import { ArrowRight, ShoppingCart, CheckCircle2, Cpu, Box, Sparkles } from 'lucide-react';
import { Language } from '../types';
import { DICTIONARY } from '../data/websiteData';
import { AmbientGlow } from './AmbientGlow';
import { AiNeuralBackground } from './AiNeuralBackground';
import { IsometricEcosystem3D } from './IsometricEcosystem3D';

interface HeroProps {
  language: Language;
  onGetInTouch: () => void;
  onExplorePricing: () => void;
  onOpenPosDemo: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  language,
  onGetInTouch,
  onExplorePricing,
  onOpenPosDemo
}) => {
  const t = DICTIONARY[language].hero;
  const [sceneMode, setSceneMode] = useState<'isometric' | 'neural'>('isometric');

  return (
    <section id="hero" className="relative pt-20 pb-28 overflow-hidden min-h-[780px] flex items-center justify-center">
      
      {/* 3D Real-Time Three.js Background Canvas (TIDAK diredupkan atau ditutupi overlay gelap) */}
      {sceneMode === 'neural' ? (
        <AiNeuralBackground />
      ) : (
        <div className="absolute inset-0 z-0 pointer-events-auto opacity-90 flex items-center justify-center">
          <IsometricEcosystem3D interactive={true} className="!border-0 !rounded-none !bg-transparent h-full" />
        </div>
      )}

      {/* Vibrant Ambient Colorful Glow Mesh */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 w-full max-w-5xl flex items-center justify-center pointer-events-none opacity-70">
        <AmbientGlow />
      </div>

      {/* Container Glassmorphism Centered di atas Animasi (relative z-10) */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 w-full">
        <div className="backdrop-blur-md bg-black/40 border border-white/10 rounded-2xl p-6 sm:p-10 shadow-2xl space-y-7 text-center font-['Inter',sans-serif]">
          
          {/* Subtle pill kicker with live indicator & 3D visual mode toggle */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.08] border border-white/[0.15] text-xs font-semibold text-slate-200 shadow-sm">
              <Cpu className="w-4 h-4 text-cyan-400" />
              <span>{t.kicker}</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] text-emerald-300 font-mono font-bold tracking-wide">Affordable Luxury</span>
            </div>

            {/* Quick 3D Backdrop Mode Switcher */}
            <div className="inline-flex items-center p-1 rounded-full bg-black/60 border border-white/10 text-[11px] font-medium">
              <button
                onClick={() => setSceneMode('isometric')}
                className={`px-3 py-1 rounded-full transition-all cursor-pointer flex items-center gap-1.5 ${
                  sceneMode === 'isometric'
                    ? 'bg-cyan-500/30 text-cyan-200 border border-cyan-400/50 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Box className="w-3 h-3 text-cyan-400" />
                <span>3D Isometrik UMKM</span>
              </button>
              <button
                onClick={() => setSceneMode('neural')}
                className={`px-3 py-1 rounded-full transition-all cursor-pointer flex items-center gap-1.5 ${
                  sceneMode === 'neural'
                    ? 'bg-purple-500/30 text-purple-200 border border-purple-400/50 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Sparkles className="w-3 h-3 text-purple-400" />
                <span>3D Neural AI</span>
              </button>
            </div>
          </div>

          {/* Hero Display Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12] [text-wrap:balance] drop-shadow-lg">
            <span>{t.titleHighlight1} </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-300 to-cyan-300">
              {t.titleHighlight2}
            </span>{' '}
            <span>{t.titleSuffix}</span>
          </h1>

          {/* Subtitle dengan font-medium (500) dan drop-shadow-md sesuai instruksi */}
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-200 font-medium leading-relaxed drop-shadow-md">
            {t.subtitle}
          </p>

          {/* Action Buttons: Get in Touch, PoS Demo, Explore Pricing */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <button
              onClick={onGetInTouch}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 border border-indigo-400/30 transition-all shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-2 cursor-pointer group"
            >
              <span>{t.ctaPrimary}</span>
              <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onOpenPosDemo}
              className="w-full sm:w-auto px-6 py-3.5 rounded-full text-sm font-semibold text-emerald-300 bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/50 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-950/40"
            >
              <ShoppingCart className="w-4 h-4 text-emerald-400" />
              <span>{t.ctaDemoPos}</span>
            </button>

            <button
              onClick={onExplorePricing}
              className="w-full sm:w-auto px-6 py-3.5 rounded-full text-sm font-semibold text-slate-200 hover:text-white bg-white/[0.08] hover:bg-white/[0.15] border border-white/[0.15] transition-colors"
            >
              {t.ctaSecondary}
            </button>
          </div>

          {/* Quick Highlights Bar */}
          <div className="pt-6 border-t border-white/[0.1] grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-slate-300 font-medium">
            <div className="flex items-center justify-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
              <span>{t.stats.projects}</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>{t.stats.speed}</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>{t.stats.uptime}</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0" />
              <span>{t.stats.satisfaction}</span>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
};
