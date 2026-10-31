import React, { useState } from 'react';
import { Send, CheckCircle2, Sparkles, AlertCircle } from 'lucide-react';
import { Language } from '../types';
import { DICTIONARY, PRICING_PACKAGES } from '../data/websiteData';

interface ContactSectionProps {
  language: Language;
  selectedPackageName?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  language,
  selectedPackageName
}) => {
  const t = DICTIONARY[language].contact;
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedPackage, setSelectedPackage] = useState(
    selectedPackageName || 'Paket Premium + Sistem PoS — Rp 1.680.000 (Hemat 50%)'
  );
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email.trim() || !name.trim() || !message.trim()) {
      setErrorMsg('Mohon lengkapi nama, email, dan pesan Anda.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMsg('Format email tidak valid.');
      return;
    }

    // Save lead locally
    const ticketId = `THRIV-${Math.floor(10000 + Math.random() * 90000)}`;
    const lead = {
      ticketId,
      name,
      email,
      phone,
      selectedPackage,
      message,
      date: new Date().toISOString()
    };
    const currentLeads = JSON.parse(localStorage.getItem('thrivit_leads') || '[]');
    currentLeads.push(lead);
    localStorage.setItem('thrivit_leads', JSON.stringify(currentLeads));

    setIsSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 border-t border-white/[0.06] bg-[#070709] relative">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Title matching reference image */}
        <div className="text-center space-y-3">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            {t.title}
          </h2>
          <p className="text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {isSubmitted ? (
          <div className="p-8 rounded-3xl bg-[#111319] border border-emerald-500/40 text-center space-y-4 animate-fade-in shadow-2xl">
            <div className="w-14 h-14 rounded-full bg-emerald-950/80 border border-emerald-500/60 flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white">{t.successTitle}</h3>
            <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
              {t.successDesc}
            </p>
            <div className="p-4 rounded-xl bg-slate-900 border border-white/[0.06] max-w-sm mx-auto text-xs text-left space-y-1.5 text-slate-400 font-mono">
              <div className="flex justify-between">
                <span>Nama:</span>
                <span className="text-white">{name}</span>
              </div>
              <div className="flex justify-between">
                <span>Paket Pilihan:</span>
                <span className="text-emerald-400">{selectedPackage}</span>
              </div>
              <div className="flex justify-between">
                <span>Email:</span>
                <span className="text-white">{email}</span>
              </div>
            </div>
            <button
              onClick={() => {
                setIsSubmitted(false);
                setMessage('');
              }}
              className="px-6 py-2.5 rounded-full text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white cursor-pointer"
            >
              Kirim Pertanyaan Lain
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {errorMsg && (
              <div className="p-3 rounded-xl bg-rose-950/50 border border-rose-500/50 text-xs text-rose-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Email field */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-400 block">
                {t.emailLabel}
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.emailPlaceholder}
                className="w-full px-4 py-3 rounded-xl bg-[#0E1017] border border-white/[0.08] text-white text-xs sm:text-sm placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>

            {/* Name field */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-400 block">
                {t.nameLabel}
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t.namePlaceholder}
                className="w-full px-4 py-3 rounded-xl bg-[#0E1017] border border-white/[0.08] text-white text-xs sm:text-sm placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>

            {/* Package selector & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-400 block">
                  {t.packageLabel}
                </label>
                <select
                  value={selectedPackage}
                  onChange={(e) => setSelectedPackage(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#0E1017] border border-white/[0.08] text-white text-xs sm:text-sm focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer"
                >
                  <option value="Paket Starter — Rp 479.000 (Hemat 20%)">Paket Starter — Rp 479.000 (Hemat 20%)</option>
                  <option value="Paket Advance — Rp 860.000 (Hemat 35%)">Paket Advance — Rp 860.000 (Hemat 35%)</option>
                  <option value="Paket Premium + Sistem PoS — Rp 1.680.000 (Hemat 50%)">Paket Premium + Sistem PoS — Rp 1.680.000 (Hemat 50%)</option>
                  <option value="Custom Enterprise / Konsultasi Khusus">Custom Enterprise / Konsultasi Khusus</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-400 block">
                  {t.phoneLabel}
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={t.phonePlaceholder}
                  className="w-full px-4 py-3 rounded-xl bg-[#0E1017] border border-white/[0.08] text-white text-xs sm:text-sm placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
            </div>

            {/* Message field */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-400 block">
                {t.messageLabel}
              </label>
              <textarea
                rows={4}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={t.messagePlaceholder}
                className="w-full px-4 py-3 rounded-xl bg-[#0E1017] border border-white/[0.08] text-white text-xs sm:text-sm placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>

            {/* Submit button in radiant royal indigo */}
            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-xl font-bold text-xs sm:text-sm text-white bg-indigo-600 hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>{t.submitBtn}</span>
            </button>

          </form>
        )}

      </div>
    </section>
  );
};
