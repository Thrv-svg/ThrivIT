import React, { useState } from 'react';
import { X, Calendar, Clock, Video, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';

interface ScheduleMeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const ScheduleMeetingModal: React.FC<ScheduleMeetingModalProps> = ({
  isOpen,
  onClose,
  language
}) => {
  const [selectedDate, setSelectedDate] = useState('2026-10-18');
  const [selectedTime, setSelectedTime] = useState('10:00 WIB');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  if (!isOpen) return null;

  const timeSlots = [
    '09:30 WIB',
    '10:30 WIB',
    '13:00 WIB',
    '14:30 WIB',
    '16:00 WIB',
    '19:30 WIB'
  ];

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    setConfirmed(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-lg bg-[#0E1017] border border-white/[0.1] rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {confirmed ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-950/80 border border-emerald-500/50 flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white">Jadwal Diskusi Terkonfirmasi!</h3>
            <p className="text-xs text-slate-300 leading-relaxed max-w-sm mx-auto">
              Undangan Google Meet telah dikirimkan ke <strong className="text-emerald-400">{email}</strong>.
            </p>
            <div className="p-4 rounded-xl bg-slate-900 border border-white/[0.06] text-xs text-slate-300 space-y-1 font-mono text-left">
              <div>Tanggal: {selectedDate}</div>
              <div>Waktu: {selectedTime}</div>
              <div>Platform: Google Meet Video Call</div>
            </div>
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-full text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white"
            >
              Tutup & Kembali
            </button>
          </div>
        ) : (
          <form onSubmit={handleBook} className="space-y-4">
            <div className="space-y-1">
              <div className="text-xs font-semibold text-indigo-400">DISCOVERY MEETING (30 MENIT)</div>
              <h3 className="text-xl font-bold text-white">Jadwalkan Konsultasi Website</h3>
              <p className="text-xs text-slate-400">
                Diskusikan konsep website impian dan demonstrasi sistem PoS langsung bersama Lead Architect ThrivIT.
              </p>
            </div>

            {/* Date selection */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                <span>Pilih Tanggal</span>
              </label>
              <input
                type="date"
                required
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/[0.08] text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Time Slot Buttons */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-indigo-400" />
                <span>Pilih Jam Pertemuan</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setSelectedTime(slot)}
                    className={`py-2 px-2 text-xs rounded-xl border text-center transition-all ${
                      selectedTime === slot
                        ? 'bg-indigo-600 border-indigo-400 text-white font-bold'
                        : 'bg-slate-900 border-white/[0.06] text-slate-400 hover:text-white'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* Name & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="space-y-1">
                <label className="text-xs text-slate-300">Nama Lengkap</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nama Anda"
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/[0.08] text-xs text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-300">Email Kerja</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@bisnis.com"
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/[0.08] text-xs text-white"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl font-bold text-xs bg-indigo-600 hover:bg-indigo-500 text-white transition-colors flex items-center justify-center gap-2 mt-4"
            >
              <Video className="w-4 h-4" />
              <span>Konfirmasi Jadwal Google Meet</span>
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
