import React from 'react';
import { ShieldCheck, Sparkles, MapPin } from 'lucide-react';

export default function Features() {
  return (
    <section id="features" className="py-20 bg-[#f5f2eb] border-t border-b border-[#e7e3da]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* Gallery / Mockup visual */}
          <div className="relative rounded-lg overflow-hidden border border-[#e7e3da] shadow-sm">
            <img 
              src="/interior_glamping.png" 
              alt="Kamana Dome Interior" 
              className="w-full h-auto object-cover aspect-[4/3]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1b3327]/85 via-transparent to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6">
              <h4 className="font-serif font-bold text-lg text-white mb-1">Kenyamanan Maksimal di Tengah Alam</h4>
              <p className="text-xs text-stone-200">Setiap dome dilengkapi dengan premium bed, private fireplace, dan skylight panoramik.</p>
            </div>
          </div>

          {/* List details */}
          <div className="space-y-8">
            <div>
              <span className="text-xs font-bold tracking-widest text-[#8a7a5f] uppercase">Keunggulan Kamana</span>
              <h3 className="font-serif text-2xl md:text-3xl font-bold text-[#1b3327] mt-2">Kamana Glamping & Sanctuary</h3>
            </div>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-9 h-9 rounded bg-[#1b3327]/10 flex items-center justify-center shrink-0 border border-[#1b3327]/25 text-[#1b3327]">
                  <ShieldCheck className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h5 className="font-bold text-[#1b3327] text-sm mb-1">Sistem Booking Aman & Pasti</h5>
                  <p className="text-xs text-[#4a5e51] leading-relaxed">
                    Lakukan Down Payment (DP) sebesar 50% untuk mengamankan tanggal reservasi Anda. Detail pembayaran diproses langsung oleh admin WhatsApp resmi kami untuk menjamin keaslian reservasi.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-9 h-9 rounded bg-[#1b3327]/10 flex items-center justify-center shrink-0 border border-[#1b3327]/25 text-[#1b3327]">
                  <Sparkles className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h5 className="font-bold text-[#1b3327] text-sm mb-1">Pelayanan Eksklusif</h5>
                  <p className="text-xs text-[#4a5e51] leading-relaxed">
                    Staf kami siap membantu penyalaan api unggun malam hari, panduan trekking pagi, hingga pemesanan hidangan privat tepat di samping sungai yang menenangkan.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-9 h-9 rounded bg-[#1b3327]/10 flex items-center justify-center shrink-0 border border-[#1b3327]/25 text-[#1b3327]">
                  <MapPin className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h5 className="font-bold text-[#1b3327] text-sm mb-1">Lokasi Konservasi Tersembunyi</h5>
                  <p className="text-xs text-[#4a5e51] leading-relaxed">
                    Berlokasi di kawasan tersembunyi Maribaya Lembang yang damai. Bebas dari bising jalan raya, hanya dikelilingi suara angin hutan pinus dan gemericik air sungai pegunungan.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
