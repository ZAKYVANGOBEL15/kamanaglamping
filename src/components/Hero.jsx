import React from 'react';

export default function Hero() {
  return (
    <section className="relative h-[32vh] min-h-[230px] md:h-[38vh] flex items-center justify-center overflow-hidden border-b border-[#e7e3da]">
      <div className="absolute inset-0 z-0">
        <img 
          src="/image/banner2.jpg" 
          alt="Kamana Glamping Tomohon View" 
          className="w-full h-full object-cover object-center blur-[1px] md:blur-[3px] scale-105 transition-all duration-300"
        />
        {/* Semi-transparent dark green overlay for high text legibility */}
        <div className="absolute inset-0 bg-[#1b3327]/35 z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#fcfbf9] via-transparent to-transparent z-20"></div>
      </div>

      <div className="relative z-30 max-w-2xl mx-auto px-6 text-center mt-10">
        <h1 className="font-sans text-xl md:text-3.5xl font-black text-white leading-tight tracking-tight mb-2 md:mb-3">
          Rencanakan Kunjungan Anda
        </h1>
        <p className="text-[10px] md:text-sm text-stone-200 max-w-xl mx-auto font-light leading-relaxed">
          Tentukan tanggal menginap, tentukan tipe tenda impian, dan kirim form reservasi otomatis Anda ke WhatsApp concierge kami.
        </p>
      </div>
    </section>
  );
}
