import React, { useState } from 'react';
import { Check, Sparkles, ArrowRight, Calendar, ShoppingCart, Tag } from 'lucide-react';
import { Language, PricingPackage } from '../types';
import { DICTIONARY, PRICING_PACKAGES } from '../data/websiteData';

interface PricingSectionProps {
  language: Language;
  onSelectPackage: (pkg: PricingPackage) => void;
  onOpenPosDemo: () => void;
  onScheduleMeeting: () => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({
  language,
  onSelectPackage,
  onOpenPosDemo,
  onScheduleMeeting
}) => {
  const t = DICTIONARY[language].pricing;
  const [currency, setCurrency] = useState<'IDR' | 'USD'>('IDR');

  const formatPrice = (val: number, isUsd: boolean = false) => {
    if (isUsd) {
      return `$${val}`;
    }
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <section id="pricing" className="py-24 border-t border-white/[0.06] bg-[#070709] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Layout Grid: Left Info & Meeting Card + Right Pricing Packages */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column (4 cols): Title & "Let's Schedule a Meeting" Box */}
          <div className="lg:col-span-4 space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-950/60 border border-indigo-500/40 text-[11px] font-bold text-indigo-400">
                <Tag className="w-3.5 h-3.5" />
                <span>PENAWARAN TERBATAS · HEMAT HINGGA 50%</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                {t.title}
              </h2>
              <p className="text-sm text-slate-400 leading-relaxed">
                {t.subtitle}
              </p>
            </div>

            {/* Currency Switcher */}
            <div className="flex items-center gap-2 p-1 bg-[#111319] border border-white/[0.08] rounded-lg w-fit text-xs">
              <button
                onClick={() => setCurrency('IDR')}
                className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                  currency === 'IDR'
                    ? 'bg-indigo-600 text-white font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Rupiah (IDR)
              </button>
              <button
                onClick={() => setCurrency('USD')}
                className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                  currency === 'USD'
                    ? 'bg-indigo-600 text-white font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                USD ($)
              </button>
            </div>

            {/* "Let's Schedule a Meeting" Card matching the reference exactly */}
            <div className="p-6 rounded-2xl bg-[#111319] border border-white/[0.08] space-y-4">
              <div className="inline-block px-2.5 py-1 rounded-full bg-indigo-950/60 border border-indigo-500/40 text-[10px] font-bold text-indigo-400 uppercase tracking-wider">
                {t.meetingCard.badge}
              </div>
              <h3 className="text-xl font-bold text-white">
                {t.meetingCard.title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {t.meetingCard.description}
              </p>
              <button
                onClick={onScheduleMeeting}
                className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl transition-all shadow-md shadow-indigo-600/30 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>{t.meetingCard.button}</span>
              </button>
            </div>

            {/* PoS Special Notice */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-950/40 to-slate-900 border border-emerald-500/30 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                <Sparkles className="w-4 h-4" />
                <span>KEUNGGULAN PAKET PREMIUM</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Mendapatkan Sistem Kasir (Point of Sale) lengkap siap pakai tanpa biaya langganan bulanan. Sinkronisasi stok fisik dan pesanan web secara otomatis.
              </p>
              <button
                onClick={onOpenPosDemo}
                className="mt-2 text-xs font-semibold text-emerald-300 hover:text-emerald-200 flex items-center gap-1 cursor-pointer"
              >
                <span>{t.posDemoBtn}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Column (8 cols): 3 Packages Grid */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* FEATURED: Paket Premium (styled in signature vibrant royal indigo/violet as in the reference) */}
            {PRICING_PACKAGES.filter((p) => p.highlighted).map((pkg) => (
              <div
                key={pkg.id}
                className="p-6 sm:p-8 rounded-3xl bg-indigo-600 text-white shadow-2xl shadow-indigo-600/25 space-y-6 relative overflow-hidden"
              >
                {/* Background ambient lighting */}
                <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-bold text-white">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>{t.posBadge}</span>
                      </span>
                      <span className="px-2.5 py-1 rounded-full bg-emerald-400 text-slate-950 text-[11px] font-extrabold uppercase">
                        Hemat {pkg.discountPercentage}%
                      </span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                      {pkg.name}
                    </h3>
                  </div>

                  <div className="text-left sm:text-right">
                    <div className="text-xs text-indigo-200 line-through">
                      Normal: {currency === 'IDR' ? formatPrice(pkg.normalPriceIdr) : formatPrice(pkg.normalPriceUsd || 225, true)}
                    </div>
                    <div className="text-3xl sm:text-4xl font-extrabold font-mono tracking-tight mt-0.5 text-white">
                      {currency === 'IDR' ? formatPrice(pkg.priceIdr) : formatPrice(pkg.priceUsd, true)}
                    </div>
                    <div className="text-[11px] text-indigo-200">Investasi Efisien · Pengerjaan {pkg.deliveryTime}</div>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-indigo-100 leading-relaxed max-w-2xl">
                  {pkg.tagline}
                </p>

                {/* 2-Column Features List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-white/20">
                  {pkg.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-indigo-50 leading-relaxed">
                      <div className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 text-white" />
                      </div>
                      <span>{feat}</span>
                    </div>
                  ))}
                  {pkg.posFeatures?.map((posFeat, i) => (
                    <div key={`pos-${i}`} className="flex items-start gap-2.5 text-xs text-emerald-200 font-medium leading-relaxed bg-black/25 p-2 rounded-lg border border-emerald-400/30">
                      <div className="w-4 h-4 rounded-full bg-emerald-400 flex items-center justify-center shrink-0 mt-0.5 text-slate-950 font-bold text-[9px]">
                        ✓
                      </div>
                      <span>{posFeat}</span>
                    </div>
                  ))}
                </div>

                {/* Bottom Actions */}
                <div className="pt-4 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    onClick={() => onSelectPackage(pkg)}
                    className="w-full sm:w-auto flex-1 py-3 px-6 rounded-full font-bold text-xs bg-white text-indigo-900 hover:bg-indigo-50 transition-colors shadow-lg cursor-pointer text-center"
                  >
                    {pkg.ctaLabel} (Rp 1.680.000)
                  </button>

                  <button
                    onClick={onOpenPosDemo}
                    className="w-full sm:w-auto py-3 px-6 rounded-full font-bold text-xs bg-indigo-950/80 hover:bg-indigo-900 text-emerald-300 border border-emerald-400/50 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <ShoppingCart className="w-4 h-4 text-emerald-400" />
                    <span>{t.posDemoBtn}</span>
                  </button>
                </div>
              </div>
            ))}

            {/* Standard Tier Packages: Starter & Advance (2-column grid) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {PRICING_PACKAGES.filter((p) => !p.highlighted).map((pkg) => (
                <div
                  key={pkg.id}
                  className="p-6 rounded-2xl bg-[#111319] border border-white/[0.08] hover:border-white/[0.2] transition-all flex flex-col justify-between space-y-6"
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="inline-block px-2 py-0.5 rounded-full bg-indigo-950/70 border border-indigo-500/40 text-[10px] font-bold text-indigo-300 mb-1">
                          Hemat {pkg.discountPercentage}%
                        </div>
                        <h4 className="text-xl font-bold text-white">
                          {pkg.name}
                        </h4>
                        <div className="text-[11px] text-slate-400 mt-0.5">
                          {pkg.idealFor}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-slate-500 line-through">
                          {currency === 'IDR' ? formatPrice(pkg.normalPriceIdr) : formatPrice(pkg.normalPriceUsd || 40, true)}
                        </div>
                        <div className="text-xl sm:text-2xl font-bold font-mono text-emerald-400 mt-0.5">
                          {currency === 'IDR' ? formatPrice(pkg.priceIdr) : formatPrice(pkg.priceUsd, true)}
                        </div>
                        <div className="text-[10px] text-slate-500">{pkg.deliveryTime}</div>
                      </div>
                    </div>

                    <p className="text-xs text-slate-400 leading-relaxed">
                      {pkg.tagline}
                    </p>

                    <div className="space-y-2 pt-3 border-t border-white/[0.06]">
                      {pkg.features.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                          <Check className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => onSelectPackage(pkg)}
                    className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 border border-white/[0.1] hover:border-indigo-400 transition-all cursor-pointer"
                  >
                    {pkg.ctaLabel}
                  </button>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
