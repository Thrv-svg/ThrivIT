import { PricingPackage, PortfolioProject, BentoService, FaqItem, PosProduct } from '../types';

export const BENTO_TEAM_IMAGE = '/src/assets/images/bento_ecommerce_team_1792098150314.jpg';
export const ISOMETRIC_HERO_IMAGE = '/src/assets/images/isometric_hero_ecosystem_1793422485457.jpg';
export const ISOMETRIC_UMKM_NETWORK_IMAGE = '/src/assets/images/isometric_umkm_network_1793422487246.jpg';
export const ISOMETRIC_POS_ANALYTICS_IMAGE = '/src/assets/images/isometric_pos_analytics_1793422487703.jpg';
export const ISOMETRIC_CLOUD_INFRA_IMAGE = '/src/assets/images/isometric_cloud_infra_1793422487771.jpg';

export const DICTIONARY = {
  id: {
    nav: {
      home: 'Beranda',
      whatWeDo: 'Layanan',
      work: 'Portofolio',
      pricing: 'Paket Harga',
      faq: 'FAQ',
      contact: 'Kontak',
      demoPos: 'Demo Sistem PoS',
      portal: 'Client Portal',
      login: 'Masuk'
    },
    hero: {
      kicker: 'Evolusi Digital UMKM Indonesia · ThrivIT Ecosystem',
      titleHighlight1: 'Evolusi Digital UMKM untuk',
      titleHighlight2: 'Maju & Berkembang',
      titleSuffix: 'dengan Solusi Tepat Guna',
      subtitle: 'Memberdayakan bisnis mikro, kecil, dan menengah untuk bertumbuh pesat dengan teknologi website modern yang terjangkau, mewah, dan terintegrasi Sistem Kasir (PoS).',
      ctaPrimary: 'Mulai Transformasi',
      ctaSecondary: 'Lihat Paket Harga',
      ctaDemoPos: 'Coba Demo Kasir PoS',
      stats: {
        projects: '150+ Website Diluncurkan',
        uptime: '99.9% Cloud Uptime',
        speed: '< 1.5s Waktu Muat',
        satisfaction: '98% Klien Puas'
      }
    },
    whatWeDo: {
      title: 'What We do',
      subtitle: 'Solusi tepat guna dari desain visual elegan, rekayasa kode terstruktur, hingga sistem kasir terintegrasi.',
      services: [
        {
          id: 'web-design',
          title: 'Web Design',
          description: 'Dari konsep hingga peluncuran, kami merancang website elegan dan berorientasi pengguna yang memperkuat identitas brand bisnis Anda.'
        },
        {
          id: 'ui-ux',
          title: 'UI/UX Design',
          description: 'Riset persona pengguna, wireframing detail, dan prototipe interaktif untuk pengalaman navigasi yang intuitif tanpa gesekan.'
        },
        {
          id: 'responsive',
          title: 'Responsive Design',
          description: 'Optimasi tata letak yang tampil presisi di seluruh resolusi layar: smartphone, tablet, laptop, hingga monitor desktop.'
        },
        {
          id: 'ecommerce',
          title: 'E-commerce Solutions',
          description: 'Platform belanja online dengan katalog produk terstruktur, manajemen transaksi, dan alur checkout terhubung WhatsApp atau Payment Gateway.'
        },
        {
          id: 'modern-tech',
          title: 'Modern Tech Stack',
          description: 'Dibangun di atas fondasi React, Tailwind CSS, dan infrastruktur modern untuk kecepatan muat optimal dan skor PageSpeed tinggi.'
        },
        {
          id: 'custom-dev',
          title: 'Custom Development & PoS',
          description: 'Pengembangan web application terarah, integrasi database, dan sistem kasir Point of Sale terhubung langsung dengan inventaris toko.'
        }
      ]
    },
    work: {
      title: 'Check our Work',
      subtitle: 'Telusuri proyek website terbaru yang telah berhasil membantu mitra bisnis kami berkembang dan meningkatkan penjualan.',
      viewDemo: 'Lihat Live Preview',
      allCategory: 'Semua Proyek'
    },
    pricing: {
      title: 'Pilihan Paket & Penawaran Eksklusif',
      subtitle: 'Investasi efisien dengan standar desain kelas atas. Nikmati harga penawaran khusus dengan transparansi kuota dan spesifikasi yang jelas.',
      meetingCard: {
        badge: 'Konsultasi Gratis',
        title: "Let's Schedule a Meeting",
        description: 'Diskusikan kebutuhan spesifik bisnis Anda bersama tim konsultan teknologi kami selama 30 menit tanpa komitmen.',
        button: 'Jadwalkan Diskusi'
      },
      posBadge: '★ Termasuk Sistem PoS Kasir',
      posDemoBtn: 'Coba Demo Kasir PoS',
      choosePackage: 'Pilih Paket Ini'
    },
    faq: {
      title: 'Frequently Asked Questions',
      subtitle: 'Jawaban transparan mengenai alur kerja, kuota domain/hosting, garansi pemeliharaan, dan sistem kasir PoS ThrivIT.'
    },
    contact: {
      title: "Let's Get in Touch",
      subtitle: 'Siap membawa bisnis Anda ke level berikutnya? Isi formulir di bawah dan tim kami akan menghubungi Anda dalam 1x24 jam kerja.',
      emailLabel: 'Email Kerja',
      emailPlaceholder: 'nama@perusahaan.com',
      nameLabel: 'Nama Lengkap',
      namePlaceholder: 'Nama Anda',
      phoneLabel: 'Nomor WhatsApp / HP',
      phonePlaceholder: '0812-xxxx-xxxx',
      packageLabel: 'Pilihan Paket Website',
      messageLabel: 'Deskripsi Kebutuhan Website',
      messagePlaceholder: 'Ceritakan jenis usaha Anda, fitur yang diinginkan, atau referensi website impian...',
      submitBtn: 'Kirim Pesan Sekarang',
      successTitle: 'Pesan Berhasil Terkirim!',
      successDesc: 'Terima kasih atas kepercayaan Anda. Tim konsultan ThrivIT akan segera menghubungi Anda melalui WhatsApp dan Email.'
    },
    footer: {
      tagline: 'Solusi pembuatan website profesional dengan tampilan mewah dan harga rasional bagi UMKM dan bisnis berkembang.',
      rights: 'Hak Cipta Dilindungi.',
      quickLinks: 'Navigasi Cepat',
      legal: 'Kebijakan Privasi · Syarat & Ketentuan'
    }
  },
  en: {
    nav: {
      home: 'Home',
      whatWeDo: 'What We Do',
      work: 'Our Work',
      pricing: 'Pricing',
      faq: 'FAQ',
      contact: 'Contact',
      demoPos: 'PoS Demo',
      portal: 'Client Portal',
      login: 'Sign In'
    },
    hero: {
      kicker: 'Website Development & Digital Business Solutions',
      titleHighlight1: 'Modern Website Development &',
      titleHighlight2: 'Digital Ecosystems',
      titleSuffix: 'for Scalable Growth',
      subtitle: 'High-end design craftsmanship and proven performance at affordable rates for growing businesses. Premium package includes an integrated web-based Point of Sale (PoS) system.',
      ctaPrimary: 'Start Free Consultation',
      ctaSecondary: 'Explore Pricing Packages',
      ctaDemoPos: 'Try PoS Cashier Demo',
      stats: {
        projects: '150+ Websites Delivered',
        uptime: '99.9% Cloud Uptime',
        speed: '< 1.5s Load Latency',
        satisfaction: '98% Client Satisfaction'
      }
    },
    whatWeDo: {
      title: 'What We do',
      subtitle: 'End-to-end digital solutions from bespoke design to integrated retail point-of-sale systems.',
      services: [
        {
          id: 'web-design',
          title: 'Web Design',
          description: 'From concept to launch, we craft clean, user-centric websites that elevate your brand and actively engage your target audience.'
        },
        {
          id: 'ui-ux',
          title: 'UI/UX Design',
          description: 'User persona research, meticulous wireframing, and interactive prototypes ensuring frictionless digital customer journeys.'
        },
        {
          id: 'responsive',
          title: 'Responsive Design',
          description: 'Flawless layout adaptation across all viewport geometries: smartphones, tablets, laptops, and desktop monitors.'
        },
        {
          id: 'ecommerce',
          title: 'E-commerce Solutions',
          description: 'Online store platforms with structured product catalogs, automated shipping calculations, and seamless multi-channel checkout.'
        },
        {
          id: 'modern-tech',
          title: 'Modern Tech Stack',
          description: 'Engineered on React and Tailwind CSS architectures for fast page loads and high Google Lighthouse performance scores.'
        },
        {
          id: 'custom-dev',
          title: 'Custom Development & PoS',
          description: 'Bespoke web applications, structured database schemas, and Point of Sale systems synchronized directly with physical store inventory.'
        }
      ]
    },
    work: {
      title: 'Check our Work',
      subtitle: 'Explore our latest launched web applications that have helped business partners thrive and scale revenue.',
      viewDemo: 'View Live Showcase',
      allCategory: 'All Projects'
    },
    pricing: {
      title: 'Affordable Luxury Pricing',
      subtitle: 'Transparent, high-value digital investments tailored for businesses at every growth stage.',
      meetingCard: {
        badge: 'Free Consultation',
        title: "Let's Schedule a Meeting",
        description: 'Discuss your specific business objectives and timeline with our technology consultants in a 30-minute discovery call.',
        button: 'Schedule Meeting'
      },
      posBadge: '★ Includes Integrated PoS System',
      posDemoBtn: 'Try Interactive PoS Demo',
      choosePackage: 'Select This Package'
    },
    faq: {
      title: 'Frequently Asked Questions',
      subtitle: 'Everything you need to know about timelines, domains, maintenance, and our integrated PoS system.'
    },
    contact: {
      title: "Let's Get in Touch",
      subtitle: 'Ready to elevate your online presence? Send us your brief and our team will get back to you within 24 business hours.',
      emailLabel: 'Work Email',
      emailPlaceholder: 'name@company.com',
      nameLabel: 'Full Name',
      namePlaceholder: 'Your Name',
      phoneLabel: 'Phone / WhatsApp',
      phonePlaceholder: '+62 812-xxxx-xxxx',
      packageLabel: 'Interested Package',
      messageLabel: 'Project Description',
      messagePlaceholder: 'Tell us about your business, desired features, or timeline requirements...',
      submitBtn: 'Get In Touch',
      successTitle: 'Message Dispatched Successfully!',
      successDesc: 'Thank you for reaching out. A ThrivIT digital consultant will contact you via WhatsApp and Email shortly.'
    },
    footer: {
      tagline: 'Professional web development solutions combining luxury visual standards with cost-efficient investment tiers.',
      rights: 'All rights reserved.',
      quickLinks: 'Quick Links',
      legal: 'Privacy Policy · Terms & Conditions'
    }
  }
};

export const PRICING_PACKAGES: PricingPackage[] = [
  {
    id: 'starter',
    name: 'Paket Starter',
    tagline: 'Solusi tepat guna untuk UMKM, personal branding, dan portofolio singkat dengan tampilan bersih dan akses cepat.',
    normalPriceIdr: 599000,
    priceIdr: 479000,
    normalPriceUsd: 40,
    priceUsd: 32,
    discountPercentage: 20,
    idealFor: 'Landing Page & Profil Usaha Sederhana (1–3 Halaman)',
    deliveryTime: '3 – 5 Hari Kerja',
    features: [
      '1 – 3 Halaman Website Responsif & Modern',
      'Berbasis Desain Template Pilihan (Rapih & Akses Cepat)',
      'Sudah Termasuk Domain (.my.id / .biz.id) & Cloud Hosting 1 GB (1 Tahun)',
      'Sertifikat Keamanan SSL (HTTPS Resmi)',
      'Integrasi Tombol WhatsApp & Form Kontak Notifikasi',
      'Garansi & Pemeliharaan Teknis 1 Bulan'
    ],
    ctaLabel: 'Pilih Paket Starter'
  },
  {
    id: 'advance',
    name: 'Paket Advance',
    tagline: 'Kualitas eksklusif untuk perusahaan berkembang, katalog produk, dan penyedia jasa profesional dengan CMS mandiri.',
    normalPriceIdr: 1323000,
    priceIdr: 860000,
    normalPriceUsd: 89,
    priceUsd: 58,
    discountPercentage: 35,
    idealFor: 'Perusahaan Berkembang, Katalog Produk & Jasa Profesional',
    deliveryTime: '7 – 10 Hari Kerja',
    features: [
      'Hingga 8 Halaman Kompleks (Beranda, Layanan, Tentang, Portofolio/Katalog, Blog, Kontak)',
      'Penyesuaian Desain Template Berkuantitas Tinggi sesuai Identitas Brand',
      'Sistem CMS (Mudah untuk pembaruan artikel dan foto mandiri)',
      'Sudah Termasuk Domain Utama (.com) & Cloud Hosting 5 GB High-Speed (1 Tahun)',
      'Setup Email Bisnis Profesional (nama@domain.com)',
      'Integrasi Analitik Dasar (Google Analytics)',
      'Garansi & Pemeliharaan Teknis 3 Bulan'
    ],
    ctaLabel: 'Pilih Paket Advance'
  },
  {
    id: 'premium',
    name: 'Paket Premium',
    tagline: 'Pengalaman visual eksklusif dengan animasi interaktif + Bonus Sistem Kasir (Point of Sale) terintegrasi siap pakai.',
    normalPriceIdr: 3360000,
    priceIdr: 1680000,
    normalPriceUsd: 225,
    priceUsd: 112,
    discountPercentage: 50,
    highlighted: true,
    idealFor: 'Bisnis Transaksional, Toko Online & Operasional Fisik/Digital',
    deliveryTime: '14 – 20 Hari Kerja',
    posIncluded: true,
    features: [
      'Halaman Website Kustom dengan Sentuhan Elegan (Animasi UI/React.js pada komponen kunci)',
      'Fitur Toko Online Lengkap (Katalog, Keranjang, Kupon Diskon)',
      'Sudah Termasuk Domain (.com / .id) & Resource Cloud Hosting Terdedikasi (1 Tahun)',
      'Prioritas Dukungan Teknis & Pemeliharaan 6 Bulan'
    ],
    posFeatures: [
      'Integrasi Sistem Kasir / Point of Sale (PoS) Web-Based Siap Pakai',
      'Fitur Manajemen Stok/Inventaris Sederhana Real-Time',
      'Cetak Struk Digital PDF & Format Printer Thermal Bluetooth',
      'Rekapitulasi Laporan Penjualan & Omset Kasir Terpadu'
    ],
    ctaLabel: 'Pilih Paket Premium'
  }
];

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: 'kopikini-pos',
    title: 'KopiKini Artisan Roastery & Cafe',
    client: 'PT Kopi Kini Indonesia',
    category: 'F&B & Integrated PoS',
    description: 'Website katalog menu cafe modern dengan integrasi sistem kasir meja (PoS), pemesanan via scan QR meja, dan pembayaran QRIS langsung ke kasir.',
    image: ISOMETRIC_POS_ANALYTICS_IMAGE,
    metrics: '+240% Transaksi Kasir · 0 Antrean Kasir',
    features: ['Sistem PoS Terintegrasi', 'QR Menu Meja', 'Payment Gateway QRIS', 'Laporan Stok Biji Kopi']
  },
  {
    id: 'lumina-apparel',
    title: 'Lumina Fashion & Streetwear Store',
    client: 'Lumina Global Studio',
    category: 'E-Commerce Retail & UMKM',
    description: 'Toko online streetwear dengan integrasi omnichannel: katalog produk, kasir toko offline, dan sinkronisasi stok gudang real-time.',
    image: ISOMETRIC_UMKM_NETWORK_IMAGE,
    metrics: 'Skor PageSpeed 98 · 4.8x Konversi Checkout',
    features: ['Auto Cek Ongkir', 'Manajemen Diskon Promo', 'Notifikasi Resi WhatsApp', 'Omnichannel Sync']
  },
  {
    id: 'thrivit-cloud-core',
    title: 'ThrivIT Omnichannel Cloud Hub',
    client: 'Jaringan Mitra UMKM Jawa Barat',
    category: 'Cloud Infrastructure & PoS Core',
    description: 'Infrastruktur cloud terdedikasi untuk integrasi ribuan transaksi kasir UMKM dengan dashboard analitik penjualan dan pelaporan otomatis.',
    image: ISOMETRIC_CLOUD_INFRA_IMAGE,
    metrics: '99.99% Uptime · sub-50ms Latensi Database',
    features: ['Sinkronisasi Real-time', 'Keamanan Enkripsi SSL', 'Backup Data Harian', 'Dashboard Omset']
  }
];

export const FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'Berapa lama proses pembuatan website di ThrivIT?',
    answer: 'Durasi pengerjaan terukur sesuai paket: Paket Starter selesai dalam 3–5 hari kerja, Paket Advance 7–10 hari kerja, dan Paket Premium (termasuk kustomisasi Sistem PoS) sekitar 14–20 hari kerja setelah materi konten diserahkan.'
  },
  {
    id: 'faq-2',
    question: 'Apa saja yang perlu saya siapkan sebelum mulai membuat website?',
    answer: 'Anda cukup menyiapkan logo bisnis, profil ringkas usaha/toko, foto produk atau layanan, dan nomor WhatsApp. Tim desainer ThrivIT siap membantu merapikan copy tulisan dan struktur navigasi agar elegan.'
  },
  {
    id: 'faq-3',
    question: 'Bagaimana cara kerja Sistem Kasir (PoS) yang didapatkan pada Paket Premium?',
    answer: 'Sistem PoS kami adalah aplikasi kasir berbasis web yang dapat dijalankan langsung di tablet, laptop, atau smartphone tanpa perlu instalasi rumit. Sistem ini langsung terhubung dengan database inventaris website Anda—ketika barang terjual di kasir fisik toko, stok di website otomatis diperbarui secara real-time.'
  },
  {
    id: 'faq-4',
    question: 'Apakah saya bisa mengupdate isi website sendiri setelah selesai dibuat?',
    answer: 'Tentu saja! Untuk Paket Advance dan Premium, kami melengkapi website Anda dengan dashboard CMS yang ramah pengguna. Anda dapat menambah artikel, mengganti harga produk, mengubah nomor telepon, dan mengunggah foto baru secara mandiri.'
  },
  {
    id: 'faq-5',
    question: 'Apakah ada kuota penyimpanan hosting dan domain yang jelas?',
    answer: 'Ya, semua spesifikasi terukur transparan: Paket Starter mendapatkan Cloud Hosting 1 GB + domain (.my.id / .biz.id), Paket Advance mendapatkan Cloud Hosting 5 GB High-Speed + domain (.com), dan Paket Premium mendapatkan resource cloud terdedikasi + domain (.com / .id) selama 1 tahun pertama.'
  },
  {
    id: 'faq-6',
    question: 'Bagaimana ketentuan garansi dan pemeliharaan teknis?',
    answer: 'Setiap paket dilengkapi pemeliharaan teknis terdefinisi: 1 bulan untuk Paket Starter, 3 bulan untuk Paket Advance, dan 6 bulan prioritas untuk Paket Premium. Pemeliharaan mencakup perbaikan kendala teknis, backup data rutin, dan pemantauan keamanan SSL.'
  }
];

export const INITIAL_POS_PRODUCTS: PosProduct[] = [
  {
    id: 'prod-1',
    name: 'Espresso Single Origin Arabica',
    category: 'beverage',
    price: 28000,
    stock: 45,
    sku: 'BV-ESP-01',
    icon: '☕'
  },
  {
    id: 'prod-2',
    name: 'Matcha Oat Latte Iced',
    category: 'beverage',
    price: 36000,
    stock: 32,
    sku: 'BV-MTC-02',
    icon: '🍵'
  },
  {
    id: 'prod-3',
    name: 'Almond Croissant Butter Pastry',
    category: 'food',
    price: 32000,
    stock: 18,
    sku: 'FD-CRS-03',
    icon: '🥐'
  },
  {
    id: 'prod-4',
    name: 'Truffle French Fries & Dip',
    category: 'food',
    price: 38000,
    stock: 24,
    sku: 'FD-FF-04',
    icon: '🍟'
  },
  {
    id: 'prod-5',
    name: 'Linen Oversized Shirt Casual',
    category: 'retail',
    price: 185000,
    stock: 14,
    sku: 'RT-SHR-05',
    icon: '👕'
  },
  {
    id: 'prod-6',
    name: 'Artisan Ceramic Mug 350ml',
    category: 'retail',
    price: 95000,
    stock: 20,
    sku: 'RT-MUG-06',
    icon: '🍶'
  }
];
