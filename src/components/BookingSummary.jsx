import React from 'react';
import { 
  Users, 
  MessageSquare, 
  ShieldCheck, 
  Info 
} from 'lucide-react';

export default function BookingSummary({
  selectedTent,
  checkIn,
  checkOut,
  name,
  setName,
  phone,
  setPhone,
  guests,
  setGuests,
  notes,
  setNotes,
  totalNights,
  pricing,
  onSubmit
}) {
  
  // Format currency
  const formatRp = (value) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <form onSubmit={onSubmit} className="bg-white border border-[#e7e3da] p-6 rounded-xl space-y-6 shadow-sm">
      
      <div className="flex items-center gap-3 border-b border-[#e7e3da] pb-4">
        <span className="w-7 h-7 rounded-md bg-[#1b3327] text-white font-bold text-xs flex items-center justify-center">3</span>
        <h3 className="font-sans text-base font-bold text-[#1b3327]">Konfirmasi Pemesanan & Pembayaran</h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        
        {/* LEFT COLUMN: Guest Fields */}
        <div className="space-y-4">
          <p className="text-[10px] uppercase tracking-wider text-[#8a7a5f] font-black block mb-2">Informasi Tamu:</p>
          
          <div>
            <label htmlFor="name-input" className="block text-xs font-bold text-[#1b3327] mb-1">Nama Lengkap Pemesan *</label>
            <input
              id="name-input"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded bg-white border border-[#cbd2c9] text-[#1b3327] focus:outline-none focus:border-[#1b3327] text-xs transition-all"
            />
          </div>

          <div>
            <label htmlFor="phone-input" className="block text-xs font-bold text-[#1b3327] mb-1">Nomor WhatsApp *</label>
            <input
              id="phone-input"
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded bg-white border border-[#cbd2c9] text-[#1b3327] focus:outline-none focus:border-[#1b3327] text-xs transition-all"
            />
          </div>

          <div>
            <label htmlFor="guests-input" className="block text-xs font-bold text-[#1b3327] mb-1">Jumlah Tamu</label>
            <div className="relative">
              <select
                id="guests-input"
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded bg-white border border-[#cbd2c9] text-[#1b3327] focus:outline-none focus:border-[#1b3327] text-xs appearance-none cursor-pointer"
              >
                <option value="1">1 Orang</option>
                <option value="2">2 Orang</option>
                <option value="3">3 Orang</option>
                <option value="4">4 Orang (Maksimal)</option>
              </select>
              <Users className="w-3.5 h-3.5 text-[#8a7a5f] absolute right-3 top-3 pointer-events-none" />
            </div>
          </div>

          <div>
            <label htmlFor="notes-input" className="block text-xs font-bold text-[#1b3327] mb-1">Catatan Tambahan (Opsional)</label>
            <textarea
              id="notes-input"
              rows="3"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded bg-white border border-[#cbd2c9] text-[#1b3327] focus:outline-none focus:border-[#1b3327] text-xs transition-all resize-none"
            ></textarea>
          </div>
        </div>

        {/* RIGHT COLUMN: Calculations & CTA */}
        <div className="space-y-4">
          <p className="text-[10px] uppercase tracking-wider text-[#8a7a5f] font-black block mb-2">Rincian Pembayaran:</p>

          <div className="border border-[#e7e3da] rounded-xl p-4 bg-[#fcfbf9] space-y-3 text-xs">
            <div className="flex justify-between text-[#5c6e61]">
              <span>Tipe Glamping</span>
              <span className="font-bold text-[#1b3327]">{selectedTent.name}</span>
            </div>
            
            <div className="flex justify-between text-[#5c6e61]">
              <span>Harga per Malam</span>
              <span className="font-bold text-[#1b3327]">
                {selectedTent.weekdayPrice === selectedTent.weekendPrice 
                  ? formatRp(selectedTent.price) 
                  : `${formatRp(selectedTent.weekdayPrice)} (WD) / ${formatRp(selectedTent.weekendPrice)} (WE)`}
              </span>
            </div>

            <div className="flex justify-between text-[#5c6e61]">
              <span>Durasi Menginap</span>
              <span className="font-bold text-[#1b3327]">
                {totalNights > 0 ? `${totalNights} Malam` : 'Belum ditentukan'}
              </span>
            </div>

            {totalNights > 0 && (
              <>
                <div className="flex justify-between text-xs text-[#1b3327] pt-2 border-t border-[#e7e3da]">
                  <span className="font-black">Total Biaya</span>
                  <span className="font-black text-[#1b3327]">{formatRp(pricing.total)}</span>
                </div>

                {/* Down Payment (DP) Calculation */}
                <div className="mt-2 p-3 rounded bg-emerald-50/50 border border-emerald-100 space-y-1">
                  <div className="flex justify-between items-baseline">
                    <span className="text-[10px] font-black text-emerald-800 flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" /> UANG MUKA (DP 50%):
                    </span>
                    <span className="text-sm font-black text-emerald-800">{formatRp(pricing.dp)}</span>
                  </div>
                  <p className="text-[9px] text-[#5c6e61] leading-none pt-0.5">Transfer DP 50% untuk mengunci slot reservasi Anda.</p>
                </div>
              </>
            )}
          </div>

          {/* Submit CTA */}
          <div className="space-y-3">
            <button
              type="submit"
              disabled={!checkIn || !checkOut}
              className={`w-full py-3.5 px-6 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all ${
                checkIn && checkOut
                  ? 'bg-[#1b3327] hover:bg-[#2c4e3d] text-white cursor-pointer active:scale-[0.98] shadow-md'
                  : 'bg-stone-100 text-stone-400 border border-stone-200 cursor-not-allowed'
              }`}
            >
              <img 
                src="/image/Whatsapp_Icon.png" 
                alt="WhatsApp" 
                className="w-5 h-5 shrink-0"
              />
              Kirim Booking
            </button>
            
            <div className="text-[10px] text-center text-[#5c6e61] leading-relaxed flex items-start gap-1.5 px-0.5">
              <Info className="w-3.5 h-3.5 text-[#8a7a5f] shrink-0 mt-0.5" />
              <span className="text-left">
                Setelah mengirim form, data Anda terformat otomatis ke WhatsApp concierge Kamana Glamping untuk koordinasi pembayaran DP.
              </span>
            </div>
          </div>
        </div>

      </div>
    </form>
  );
}
