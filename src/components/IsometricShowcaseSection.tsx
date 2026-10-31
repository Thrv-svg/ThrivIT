import React, { useState } from 'react';
import { 
  Sparkles, 
  Store, 
  ShoppingCart, 
  Cloud, 
  Monitor, 
  ArrowRight, 
  CheckCircle2, 
  Layers, 
  Maximize2, 
  Smartphone,
  Cpu,
  BarChart3,
  ShieldCheck,
  TrendingUp
} from 'lucide-react';
import { Language } from '../types';
import { 
  ISOMETRIC_HERO_IMAGE, 
  ISOMETRIC_UMKM_NETWORK_IMAGE, 
  ISOMETRIC_POS_ANALYTICS_IMAGE, 
  ISOMETRIC_CLOUD_INFRA_IMAGE 
} from '../data/websiteData';
import { IsometricEcosystem3D, EcosystemNodeInfo } from './IsometricEcosystem3D';

interface IsometricShowcaseSectionProps {
  language: Language;
  onOpenPosDemo: () => void;
  onExplorePricing: () => void;
}

export const IsometricShowcaseSection: React.FC<IsometricShowcaseSectionProps> = ({
  language,
  onOpenPosDemo,
  onExplorePricing
}) => {
  const [activeTab, setActiveTab] = useState<'3d-interactive' | 'photorealistic'>('3d-interactive');
  const [selectedGalleryImg, setSelectedGalleryImg] = useState<string>(ISOMETRIC_HERO_IMAGE);
  const [activeFeatureIndex, setActiveFeatureIndex] = useState(0);

  const features = [
    {
      id: 'pos',
      title: 'POS Systems & Cashier Engine',
      subtitle: 'Sistem Kasir Pintar Siap Pakai',
      description: 'Aplikasi kasir web modern dengan cetak struk thermal, scan barcode, dan integrasi QRIS otomatis yang langsung mengurangi stok inventaris toko.',
      badge: 'Paket Premium',
      icon: ShoppingCart,
      image: ISOMETRIC_POS_ANALYTICS_IMAGE,
      stats: 'Cetak Struk < 1s · Laporan Harian Otomatis',
      bullets: ['Cetak Struk PDF & Thermal', 'Terhubung QRIS & Cash', 'Stok Otomatis Berkurang']
    },
    {
      id: 'webapp',
      title: 'Web App & CMS Architecture',
      subtitle: 'Website Profil & Dashboard Kendali',
      description: 'Website responsif modern berbasis React & Tailwind CSS dengan panel admin (CMS) mandiri untuk mengelola katalog produk, promo, dan portofolio usaha.',
      badge: 'Paket Advance & Premium',
      icon: Monitor,
      image: ISOMETRIC_HERO_IMAGE,
      stats: 'Skor Google Lighthouse 95+ · Cepat & Aman',
      bullets: ['CMS Mudah Dikelola Mandiri', 'Desain Mewah Affordable Luxury', 'Domain & Cloud Hosting 1 Tahun']
    },
    {
      id: 'ecommerce',
      title: 'E-commerce & UMKM Retail',
      subtitle: 'Katalog Produk & Toko Online',
      description: 'Etalase digital terstruktur dengan fitur filter kategori, keranjang belanja, kupon diskon, dan checkout terhubung ke WhatsApp penjual.',
      badge: 'Paket Advance & Premium',
      icon: Store,
      image: ISOMETRIC_UMKM_NETWORK_IMAGE,
      stats: 'Konversi Checkout 4.8x · Auto Hitung Ongkir',
      bullets: ['Integrasi WhatsApp Checkout', 'Pemberian Diskon & Promo', 'Sinkronisasi Multi-Toko']
    },
    {
      id: 'cloud',
      title: 'Dedicated Cloud & High-Uptime Sync',
      subtitle: 'Infrastruktur Cloud Terdedikasi',
      description: 'Penyimpanan cloud cepat berstandar enterprise untuk menjamin data transaksi UMKM tersimpan aman, terenkripsi SSL HTTPS, dan selalu siap diakses 24/7.',
      badge: 'Enterprise Standard',
      icon: Cloud,
      image: ISOMETRIC_CLOUD_INFRA_IMAGE,
      stats: '99.9% Uptime Terjamin · Backup Data Otomatis',
      bullets: ['Sertifikat Keamanan SSL HTTPS', 'Database Terproteksi Cloud', 'Dukungan Teknis Terjadwal']
    }
  ];

  return (
    <section id="ecosystem" className="py-24 border-t border-white/[0.08] bg-[#070709] relative overflow-hidden">
      
      {/* Background Subtle Gradient Aura */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-r from-cyan-600/10 via-indigo-600/10 to-emerald-600/10 blur-[130px] pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header (Matching the Reference Screenshot) */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-xs font-semibold text-cyan-300 shadow-sm mx-auto">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-mono uppercase tracking-wider">Evolusi Digital UMKM</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-300">Live Ecosystem</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Growing Businesses Through{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-300 to-emerald-400">
              Digital Ecosystems
            </span>
          </h2>

          <p className="text-base text-slate-300 leading-relaxed font-normal">
            Menghubungkan gerai fisik UMKM, mesin kasir (PoS), platform web, dan infrastruktur cloud ke dalam satu ekosistem terpadu yang efisien, mewah, dan terjangkau.
          </p>

          {/* Mode Switcher Tabs */}
          <div className="pt-3 flex items-center justify-center gap-2">
            <button
              onClick={() => setActiveTab('3d-interactive')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === '3d-interactive'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 border border-indigo-400/40'
                  : 'bg-white/[0.06] text-slate-300 hover:text-white hover:bg-white/[0.1] border border-white/[0.08]'
              }`}
            >
              <Sparkles className="w-4 h-4 text-cyan-300" />
              <span>Diorama 3D Interaktif (Three.js)</span>
            </button>

            <button
              onClick={() => setActiveTab('photorealistic')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'photorealistic'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 border border-indigo-400/40'
                  : 'bg-white/[0.06] text-slate-300 hover:text-white hover:bg-white/[0.1] border border-white/[0.08]'
              }`}
            >
              <Layers className="w-4 h-4 text-emerald-300" />
              <span>Galeri Isometrik 3D Render</span>
            </button>
          </div>

        </div>

        {/* Main Display Area */}
        {activeTab === '3d-interactive' ? (
          <div className="space-y-6">
            {/* Real-Time Three.js 3D Diorama */}
            <IsometricEcosystem3D />

            {/* Quick Helper Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-[#0f121c] border border-white/[0.06] flex items-start gap-3">
                <Store className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Toko Ritel & Resto</h4>
                  <p className="text-xs text-slate-300 mt-1">Gerai fisik memiliki etalase web otomatis tanpa input manual ganda.</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#0f121c] border border-white/[0.06] flex items-start gap-3">
                <ShoppingCart className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Kasir Pintar (PoS)</h4>
                  <p className="text-xs text-slate-300 mt-1">Penjualan kasir langsung update stok katalog website secara real-time.</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#0f121c] border border-white/[0.06] flex items-start gap-3">
                <Cloud className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Cloud & Laporan</h4>
                  <p className="text-xs text-slate-300 mt-1">Pemilik bisnis memantau omset dan stok dari mana saja lewat smartphone.</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Photorealistic 3D Render Gallery with Hotspots */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Large Preview Window */}
            <div className="lg:col-span-8 rounded-3xl bg-[#0d1017] border border-white/[0.1] overflow-hidden shadow-2xl group relative">
              <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-slate-950">
                <img
                  src={selectedGalleryImg}
                  alt="3D Isometric Digital Ecosystem Showcase"
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                />

                {/* Subtle Overlay Badge */}
                <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/10 text-xs font-mono font-semibold text-cyan-300 flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>3D Isometric Render (8K Studio Fidelity)</span>
                </div>
              </div>

              {/* Thumbnails Row */}
              <div className="p-4 bg-[#0a0d14] border-t border-white/[0.08] grid grid-cols-4 gap-3">
                {[
                  { img: ISOMETRIC_HERO_IMAGE, label: 'Ecosystem Core' },
                  { img: ISOMETRIC_UMKM_NETWORK_IMAGE, label: 'Jaringan UMKM' },
                  { img: ISOMETRIC_POS_ANALYTICS_IMAGE, label: 'Terminal Kasir' },
                  { img: ISOMETRIC_CLOUD_INFRA_IMAGE, label: 'Cloud Servers' }
                ].map((thumb, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedGalleryImg(thumb.img)}
                    className={`relative rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                      selectedGalleryImg === thumb.img
                        ? 'border-cyan-400 shadow-md shadow-cyan-500/20 scale-[1.02]'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={thumb.img} alt={thumb.label} className="w-full h-14 sm:h-20 object-cover" />
                    <span className="absolute bottom-1 left-1 right-1 text-[10px] font-medium text-white bg-black/80 rounded px-1 text-center truncate">
                      {thumb.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Side Explanatory Card */}
            <div className="lg:col-span-4 rounded-3xl bg-[#0f131f] border border-white/[0.1] p-6 sm:p-8 space-y-6 shadow-xl">
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                  Visual Architecture
                </span>
                <h3 className="text-2xl font-bold text-white">
                  Presisi Visual & Nilai Nyata Bisnis
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Setiap elemen dalam ilustrasi 3D ini melambangkan modul nyata yang kami bangun untuk website dan operasional bisnis Anda:
                </p>
              </div>

              <div className="space-y-4">
                <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/[0.06] flex items-start gap-3">
                  <Monitor className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs font-bold text-white">Website & Dashboard Analytics</h5>
                    <p className="text-xs text-slate-300 mt-0.5">Website elegan yang cepat diakses pelanggan dan mudah dikelola pemilik toko.</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/[0.06] flex items-start gap-3">
                  <ShoppingCart className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs font-bold text-white">Sistem Kasir PoS Terintegrasi</h5>
                    <p className="text-xs text-slate-300 mt-0.5">Penjualan offline otomatis memotong kuota stok online tanpa takut over-selling.</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/[0.06] flex items-start gap-3">
                  <Cloud className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs font-bold text-white">Cloud Hosting & Keamanan SSL</h5>
                    <p className="text-xs text-slate-300 mt-0.5">Server stabil dengan kuota terukur dan proteksi data terenkripsi HTTPS.</p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={onOpenPosDemo}
                  className="w-full py-3 rounded-full text-xs font-semibold text-emerald-300 bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/50 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                >
                  <ShoppingCart className="w-4 h-4 text-emerald-400" />
                  <span>Uji Coba Demo Kasir PoS Sekarang</span>
                </button>
              </div>
            </div>

          </div>
        )}

        {/* Bottom Feature Tabs Matching Reference ("Stylized layers - and web apps from Low to Mid and Beyond") */}
        <div className="mt-16 pt-12 border-t border-white/[0.08] space-y-8">
          
          <div className="text-center space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-indigo-400 font-bold">
              Feature Layers
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white">
              Stylized Layers & Web Apps from Low to Mid and Beyond
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
              Setiap paket layanan dirancang fleksibel untuk berkembang seiring bertumbuhnya skala bisnis dan omset Anda.
            </p>
          </div>

          {/* Interactive 4-Column Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((feat, fIdx) => {
              const IconComp = feat.icon;
              const isSelected = activeFeatureIndex === fIdx;

              return (
                <div
                  key={feat.id}
                  onClick={() => setActiveFeatureIndex(fIdx)}
                  className={`rounded-2xl p-5 border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-[#121624] border-cyan-500/60 shadow-xl shadow-cyan-500/10 -translate-y-1'
                      : 'bg-[#0c0f17] border-white/[0.08] hover:border-white/[0.2] hover:bg-[#101420]'
                  }`}
                >
                  <div className="space-y-4">
                    {/* Top Icon & Badge */}
                    <div className="flex items-center justify-between">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        isSelected ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40' : 'bg-white/[0.06] text-slate-300'
                      }`}>
                        <IconComp className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-white/[0.06] text-slate-300 border border-white/[0.1]">
                        {feat.badge}
                      </span>
                    </div>

                    {/* Title & Description */}
                    <div>
                      <h4 className="text-base font-bold text-white">
                        {feat.title}
                      </h4>
                      <p className="text-xs font-medium text-cyan-400 mt-0.5">
                        {feat.subtitle}
                      </p>
                      <p className="text-xs text-slate-300 mt-2.5 leading-relaxed">
                        {feat.description}
                      </p>
                    </div>

                    {/* Feature Bullets */}
                    <div className="pt-2 border-t border-white/[0.06] space-y-1.5">
                      {feat.bullets.map((b, bIdx) => (
                        <div key={bIdx} className="flex items-center gap-2 text-xs text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Stats */}
                  <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-emerald-300">
                    <span>{feat.stats}</span>
                    <ArrowRight className="w-3.5 h-3.5 opacity-60" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick CTA Banner */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-indigo-950/80 via-slate-900 to-cyan-950/80 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="text-base font-bold text-white">
                Ingin Menggabungkan Website Bisnis & Sistem Kasir PoS?
              </h4>
              <p className="text-xs text-slate-300">
                Pilih Paket Premium (Rp 1.680.000) dan nikmati integrasi penuh tanpa repot setting manual.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={onOpenPosDemo}
                className="px-5 py-2.5 rounded-full text-xs font-semibold text-emerald-300 bg-emerald-950 border border-emerald-500/50 hover:bg-emerald-900 transition-all cursor-pointer"
              >
                Coba Demo Kasir
              </button>
              <button
                onClick={onExplorePricing}
                className="px-5 py-2.5 rounded-full text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 border border-indigo-400/40 transition-all cursor-pointer shadow-lg shadow-indigo-600/30"
              >
                Lihat Rincian Paket
              </button>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
};
