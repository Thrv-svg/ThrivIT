import React, { useState } from 'react';
import {
  X,
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  Receipt,
  RefreshCw,
  Printer,
  Package
} from 'lucide-react';
import { PosProduct, PosCartItem, PosReceipt } from '../types';
import { INITIAL_POS_PRODUCTS } from '../data/websiteData';

interface PosSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPremium: () => void;
}

export const PosSimulatorModal: React.FC<PosSimulatorModalProps> = ({
  isOpen,
  onClose,
  onSelectPremium
}) => {
  // Parent Lifted State Management for products (with dynamic stock) and cart
  const [products, setProducts] = useState<PosProduct[]>(INITIAL_POS_PRODUCTS);
  const [cart, setCart] = useState<PosCartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [paymentMethod, setPaymentMethod] = useState<'QRIS' | 'Tunai (Cash)' | 'Transfer VA'>('QRIS');
  const [receipt, setReceipt] = useState<PosReceipt | null>(null);
  const [dailySalesTotal, setDailySalesTotal] = useState<number>(1480000);
  const [totalOrdersToday, setTotalOrdersToday] = useState<number>(34);

  if (!isOpen) return null;

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter((p) => p.category === selectedCategory);

  /**
   * ATOMIC STATE UPDATE:
   * 1. Tambah item ke dalam array `cart`
   * 2. Kurangi nilai `stock` sebanyak 1 di dalam array `products` secara bersamaan
   */
  const addToCart = (productId: string) => {
    const targetProduct = products.find((p) => p.id === productId);
    if (!targetProduct || targetProduct.stock <= 0) return;

    // 1. Kurangi stock produk secara atomic
    setProducts((prevProducts) =>
      prevProducts.map((p) =>
        p.id === productId ? { ...p, stock: p.stock - 1 } : p
      )
    );

    // 2. Tambahkan ke cart
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.product.id === productId);
      if (existing) {
        return prevCart.map((item) =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { product: { ...targetProduct, stock: targetProduct.stock - 1 }, quantity: 1 }];
    });
  };

  /**
   * Update quantity di keranjang dengan sinkronisasi stok produk dua arah
   */
  const updateQuantity = (productId: string, delta: number) => {
    if (delta > 0) {
      // Periksa apakah stok produk masih ada
      const prod = products.find((p) => p.id === productId);
      if (!prod || prod.stock <= 0) return;

      // Kurangi stok produk
      setProducts((prev) =>
        prev.map((p) => (p.id === productId ? { ...p, stock: p.stock - 1 } : p))
      );

      // Tambah jumlah di keranjang
      setCart((prev) =>
        prev.map((item) =>
          item.product.id === productId ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else if (delta < 0) {
      // Kembalikan stok ke produk
      setProducts((prev) =>
        prev.map((p) => (p.id === productId ? { ...p, stock: p.stock + 1 } : p))
      );

      // Kurangi jumlah di keranjang
      setCart((prev) =>
        prev
          .map((item) => {
            if (item.product.id === productId) {
              const newQty = item.quantity - 1;
              return newQty > 0 ? { ...item, quantity: newQty } : null;
            }
            return item;
          })
          .filter(Boolean) as PosCartItem[]
      );
    }
  };

  /**
   * Hapus item spesifik dari keranjang dan pulihkan seluruh kuantitas ke stok produk
   */
  const removeFromCart = (productId: string) => {
    const itemToRemove = cart.find((item) => item.product.id === productId);
    if (!itemToRemove) return;

    // Pulihkan stok produk sesuai kuantitas yang dibatalkan
    setProducts((prev) =>
      prev.map((p) =>
        p.id === productId ? { ...p, stock: p.stock + itemToRemove.quantity } : p
      )
    );

    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  /**
   * Kosongkan keranjang dan pulihkan semua stok produk
   */
  const clearCart = () => {
    setProducts((prevProducts) => {
      const updated = [...prevProducts];
      cart.forEach((cartItem) => {
        const idx = updated.findIndex((p) => p.id === cartItem.product.id);
        if (idx !== -1) {
          updated[idx] = {
            ...updated[idx],
            stock: updated[idx].stock + cartItem.quantity
          };
        }
      });
      return updated;
    });
    setCart([]);
  };

  /**
   * Reset seluruh stok produk ke kondisi katalog awal
   */
  const resetToInitialStock = () => {
    setProducts(INITIAL_POS_PRODUCTS);
    setCart([]);
  };

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const tax = Math.round(subtotal * 0.11); // PPN 11%
  const grandTotal = subtotal + tax;

  const handleProcessOrder = () => {
    if (cart.length === 0) return;

    const newReceipt: PosReceipt = {
      transactionId: `TRX-${Date.now().toString().slice(-6)}`,
      date:
        new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) +
        ', ' +
        new Date().toLocaleDateString('id-ID'),
      items: [...cart],
      subtotal,
      tax,
      total: grandTotal,
      paymentMethod,
      cashierName: 'Kasir Utama 01'
    };

    setDailySalesTotal((prev) => prev + grandTotal);
    setTotalOrdersToday((prev) => prev + 1);
    setReceipt(newReceipt);
    setCart([]); // Kosongkan cart tanpa mengembalikan stok karena barang sudah terjual
  };

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-fade-in font-['Inter',sans-serif]">
      <div className="relative w-full max-w-6xl bg-[#0D1017] border border-white/[0.1] rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[94vh]">
        
        {/* Top Header of the POS Terminal */}
        <div className="px-6 py-4 bg-[#121620] border-b border-white/[0.08] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-indigo-600 flex items-center justify-center text-white shadow-md">
              <ShoppingCart className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white flex items-center gap-2">
                <span>ThrivIT Point of Sale (PoS)</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 font-mono text-[10px] border border-emerald-500/40">
                  Demo Interaktif Paket Premium
                </span>
              </div>
              <div className="text-[11px] text-slate-400">
                Sistem Kasir Web & Tablet terintegrasi inventaris website toko
              </div>
            </div>
          </div>

          {/* Right Info: Daily Sales Metric & Close */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-3 px-3 py-1.5 rounded-xl bg-slate-900 border border-white/[0.06] text-xs">
              <div className="space-y-0.5">
                <span className="text-[10px] text-slate-400 block font-sans">Omset Kasir Hari Ini</span>
                <span className="font-bold text-emerald-400 font-mono">{formatRupiah(dailySalesTotal)}</span>
              </div>
              <div className="h-6 w-px bg-white/[0.1]" />
              <div className="space-y-0.5">
                <span className="text-[10px] text-slate-400 block font-sans">Total Struk</span>
                <span className="font-bold text-indigo-400 font-mono">{totalOrdersToday} order</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors border border-white/[0.08] cursor-pointer"
              aria-label="Tutup modal kasir"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* POS Body 2-Column Grid: Catalog (7 cols) + Cart & Checkout (5 cols) */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-white/[0.08]">
          
          {/* Left Column: Product Catalog (7 cols) */}
          <div className="lg:col-span-7 p-4 sm:p-6 space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              {/* Category Filter Pills */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                  {[
                    { id: 'all', label: 'Semua Produk' },
                    { id: 'beverage', label: 'Minuman' },
                    { id: 'food', label: 'Makanan' },
                    { id: 'retail', label: 'Merchandise' }
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                        selectedCategory === cat.id
                          ? 'bg-indigo-600 text-white font-semibold shadow-sm'
                          : 'bg-[#121620] text-slate-400 hover:text-white hover:bg-white/[0.06]'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                <button
                  onClick={resetToInitialStock}
                  className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1 shrink-0 cursor-pointer p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-white/[0.06]"
                  title="Reset Stok & Demo"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span className="hidden sm:inline">Reset Stok Awal</span>
                </button>
              </div>

              {/* Product Cards Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {filteredProducts.map((product) => {
                  const isOutOfStock = product.stock === 0;
                  return (
                    <div
                      key={product.id}
                      className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between select-none shadow-sm ${
                        isOutOfStock
                          ? 'bg-slate-900/40 border-slate-800/80 opacity-70'
                          : 'bg-[#121620] border-white/[0.08] hover:border-indigo-500/50 hover:-translate-y-0.5'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <span className="text-2xl">{product.icon}</span>
                        {/* Live Stock Counter */}
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold transition-colors ${
                            isOutOfStock
                              ? 'bg-rose-950/80 text-rose-300 border border-rose-800/60'
                              : product.stock <= 5
                              ? 'bg-amber-950/80 text-amber-300 border border-amber-800/60 animate-pulse'
                              : 'bg-slate-900 text-emerald-400 border border-emerald-500/30'
                          }`}
                        >
                          {isOutOfStock ? 'Stok: 0' : `Stok: ${product.stock}`}
                        </span>
                      </div>

                      <div className="mt-3 space-y-1">
                        <div className="text-xs font-bold text-white line-clamp-1">
                          {product.name}
                        </div>
                        <div className="text-[11px] font-mono text-emerald-400 font-semibold">
                          {formatRupiah(product.price)}
                        </div>
                      </div>

                      {/* Tombol dengan logika: disabled={product.stock === 0} */}
                      <button
                        type="button"
                        disabled={isOutOfStock}
                        onClick={() => addToCart(product.id)}
                        className={`mt-3 w-full py-2 px-2.5 rounded-xl text-[11px] font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                          isOutOfStock
                            ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/50'
                            : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/25 active:scale-95'
                        }`}
                      >
                        {isOutOfStock ? (
                          <span>Stok Habis</span>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5" />
                            <span>+ Tambah</span>
                          </>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Info Banner */}
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/[0.06] flex items-center justify-between text-xs text-slate-400 mt-4">
              <span>Stok kasir berkurang secara instan saat ditambahkan ke keranjang.</span>
              <span className="text-indigo-400 font-semibold cursor-pointer" onClick={onSelectPremium}>
                Pesan Paket Premium →
              </span>
            </div>
          </div>

          {/* Right Column: Active Cart & Checkout (5 cols) */}
          <div className="lg:col-span-5 p-4 sm:p-6 bg-[#0E1118] flex flex-col justify-between space-y-6">
            
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <Receipt className="w-4 h-4 text-indigo-400" />
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    Keranjang Kasir ({cart.reduce((a, b) => a + b.quantity, 0)})
                  </span>
                </div>

                {cart.length > 0 && (
                  <button
                    onClick={clearCart}
                    className="text-[11px] text-rose-400 hover:text-rose-300 flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Kosongkan & Pulihkan Stok</span>
                  </button>
                )}
              </div>

              {/* Cart Items List */}
              <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                {cart.length === 0 ? (
                  <div className="text-center py-10 text-slate-500 space-y-2">
                    <Package className="w-8 h-8 mx-auto opacity-40" />
                    <div className="text-xs">Keranjang masih kosong.</div>
                    <div className="text-[11px] text-slate-600">Klik tombol '+ Tambah' pada produk di sebelah kiri.</div>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div
                      key={item.product.id}
                      className="p-2.5 rounded-xl bg-[#141824] border border-white/[0.06] flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-white truncate">{item.product.name}</div>
                        <div className="text-[11px] font-mono text-emerald-400">
                          {formatRupiah(item.product.price)} x {item.quantity}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <div className="flex items-center bg-slate-900 border border-white/[0.08] rounded-lg p-0.5">
                          <button
                            onClick={() => updateQuantity(item.product.id, -1)}
                            className="p-1 text-slate-400 hover:text-white cursor-pointer"
                            title="Kurangi kuantitas (kembalikan 1 ke stok)"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 font-mono text-xs text-white font-bold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, 1)}
                            className="p-1 text-slate-400 hover:text-white cursor-pointer"
                            title="Tambah kuantitas (kurangi 1 dari stok)"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="p-1.5 text-slate-500 hover:text-rose-400 cursor-pointer"
                          title="Hapus dari keranjang"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Payment Method Selector */}
              <div className="space-y-2 pt-2">
                <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Metode Pembayaran Kasir
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['QRIS', 'Tunai (Cash)', 'Transfer VA'] as const).map((method) => (
                    <button
                      key={method}
                      onClick={() => setPaymentMethod(method)}
                      className={`py-2 px-2 rounded-xl text-xs font-medium border text-center transition-all cursor-pointer ${
                        paymentMethod === method
                          ? 'bg-indigo-600 border-indigo-400 text-white font-bold shadow-md'
                          : 'bg-[#141824] border-white/[0.06] text-slate-400 hover:text-white'
                      }`}
                    >
                      {method}
                    </button>
                  ))}
                </div>
              </div>

              {/* Calculations Box */}
              <div className="p-3.5 rounded-2xl bg-[#141824] border border-white/[0.06] space-y-2 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Subtotal:</span>
                  <span className="font-mono text-white">{formatRupiah(subtotal)}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>PPN 11%:</span>
                  <span className="font-mono text-white">{formatRupiah(tax)}</span>
                </div>
                <div className="pt-2 border-t border-white/[0.08] flex justify-between text-sm font-bold text-white">
                  <span>Total Tagihan Kasir:</span>
                  <span className="font-mono text-emerald-400 text-base">{formatRupiah(grandTotal)}</span>
                </div>
              </div>
            </div>

            {/* Process Transaction Button */}
            <div className="space-y-2">
              <button
                disabled={cart.length === 0}
                onClick={handleProcessOrder}
                className="w-full py-3 px-4 rounded-xl font-bold text-xs bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-800 disabled:text-slate-600 disabled:cursor-not-allowed text-slate-950 transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Receipt className="w-4 h-4" />
                <span>Proses Transaksi & Cetak Struk</span>
              </button>

              <div className="text-[11px] text-slate-500 text-center">
                Mencakup struk belanja thermal, nota digital PDF, dan rekapan omset otomatis.
              </div>
            </div>

          </div>

        </div>

        {/* Digital Receipt Popup on Transaction Completion */}
        {receipt && (
          <div className="absolute inset-0 z-30 bg-black/80 backdrop-blur-md p-4 flex items-center justify-center animate-fade-in">
            <div className="bg-white text-slate-900 rounded-3xl max-w-sm w-full p-6 space-y-4 shadow-2xl relative">
              <button
                onClick={() => setReceipt(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Receipt Header */}
              <div className="text-center space-y-1 pb-3 border-b border-dashed border-slate-300">
                <div className="text-base font-extrabold uppercase tracking-wider">THRIVIT POS STORE</div>
                <div className="text-[11px] text-slate-500">Jl. Ir. H. Juanda No. 128, Bandung</div>
                <div className="text-[11px] text-slate-500 font-mono">No: {receipt.transactionId}</div>
                <div className="text-[10px] text-slate-400">{receipt.date}</div>
              </div>

              {/* Items Table */}
              <div className="space-y-1.5 text-xs max-h-48 overflow-y-auto font-mono">
                {receipt.items.map((it, idx) => (
                  <div key={idx} className="flex justify-between items-start">
                    <div>
                      <div className="font-semibold text-slate-800">{it.product.name}</div>
                      <div className="text-[10px] text-slate-500">{it.quantity} x {formatRupiah(it.product.price)}</div>
                    </div>
                    <div className="font-bold text-slate-900">
                      {formatRupiah(it.product.price * it.quantity)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="pt-3 border-t border-dashed border-slate-300 space-y-1 text-xs font-mono">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>{formatRupiah(receipt.subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>PPN 11%:</span>
                  <span>{formatRupiah(receipt.tax)}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-slate-950 pt-1 border-t border-slate-200">
                  <span>TOTAL:</span>
                  <span>{formatRupiah(receipt.total)}</span>
                </div>
                <div className="flex justify-between text-[11px] text-slate-600 pt-1">
                  <span>Metode Bayar:</span>
                  <span className="font-bold text-emerald-700">{receipt.paymentMethod}</span>
                </div>
              </div>

              {/* Barcode & Thank You */}
              <div className="text-center pt-2 space-y-2 border-t border-dashed border-slate-300">
                <div className="font-mono text-[10px] tracking-widest text-slate-400">||| | |||| | ||||| || |||</div>
                <div className="text-[11px] text-slate-600 font-medium">Terima kasih atas kunjungan Anda!</div>
                <div className="text-[9px] text-slate-400">Powered by ThrivIT Ecosystem</div>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  onClick={() => {
                    alert('Simulasi: Perintah Cetak berhasil dikirimkan ke Thermal Printer!');
                    setReceipt(null);
                  }}
                  className="flex-1 py-2 px-3 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 flex items-center justify-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Cetak Struk</span>
                </button>
                <button
                  onClick={() => setReceipt(null)}
                  className="py-2 px-4 rounded-xl bg-slate-200 text-slate-800 text-xs font-semibold hover:bg-slate-300"
                >
                  Selesai
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
