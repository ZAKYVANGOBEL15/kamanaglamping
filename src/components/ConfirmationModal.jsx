import React from 'react';
import { 
  X, 
  Calendar, 
  User, 
  Home, 
  ShieldCheck, 
  Info,
  Users,
  MessageSquare
} from 'lucide-react';

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  name,
  phone,
  guests,
  selectedTent,
  checkIn,
  checkOut,
  totalNights,
  pricing,
  notes,
  formatDateDisplay
}) {
  if (!isOpen) return null;

  // Format currency helper
  const formatRp = (value) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop overlay */}
      <div 
        className="absolute inset-0 bg-[#1b3327]/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>
      
      {/* Modal Container */}
      <div className="relative bg-white border border-[#e7e3da] rounded-xl p-6 md:p-8 max-w-lg w-full shadow-2xl z-10 space-y-6 overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#e7e3da] pb-3 shrink-0">
          <h4 className="font-sans text-base md:text-lg font-bold text-[#1b3327] flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#8a7a5f]" />
            Konfirmasi Reservasi
          </h4>
          <button 
            type="button"
            onClick={onClose} 
            className="p-1 rounded-full text-stone-400 hover:text-[#1b3327] hover:bg-stone-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content (Scrollable) */}
        <div className="space-y-5 overflow-y-auto pr-1 leading-relaxed text-xs">
          <p className="text-stone-500">
            Silakan periksa kembali detail pesanan Anda sebelum kami mengarahkan Anda ke WhatsApp Concierge Kamana Glamping.
          </p>

          {/* Unit & Guest Info Card */}
          <div className="bg-[#fcfbf9] border border-[#e7e3da] rounded-lg p-4 space-y-3">
            <div className="flex items-start gap-2.5">
              <Home className="w-4 h-4 text-[#8a7a5f] shrink-0 mt-0.5" />
              <div>
                <p className="text-[10px] text-stone-400 uppercase tracking-wider font-bold">Unit Yang Dipilih</p>
                <p className="font-bold text-[#1b3327] text-sm">{selectedTent.name} ({selectedTent.type})</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 border-t border-[#e7e3da] pt-3">
              <div className="flex items-start gap-2.5">
                <Calendar className="w-4 h-4 text-[#8a7a5f] shrink-0 mt-0.5" />
                <div>
                  <p className="text-[10px] text-stone-400 uppercase tracking-wider font-bold">Check-In</p>
                  <p className="font-bold text-[#1b3327]">{formatDateDisplay(checkIn)}</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Calendar className="w-4 h-4 text-[#8a7a5f] shrink-0 mt-0.5" />
                <div>
                  <p className="text-[10px] text-stone-400 uppercase tracking-wider font-bold">Check-Out</p>
                  <p className="font-bold text-[#1b3327]">{formatDateDisplay(checkOut)}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 border-t border-[#e7e3da] pt-3">
              <div className="flex items-start gap-2.5">
                <User className="w-4 h-4 text-[#8a7a5f] shrink-0 mt-0.5" />
                <div>
                  <p className="text-[10px] text-stone-400 uppercase tracking-wider font-bold">Pemesan</p>
                  <p className="font-bold text-[#1b3327]">{name}</p>
                  <p className="text-[10px] text-stone-500 font-mono">{phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Users className="w-4 h-4 text-[#8a7a5f] shrink-0 mt-0.5" />
                <div>
                  <p className="text-[10px] text-stone-400 uppercase tracking-wider font-bold">Jumlah Tamu</p>
                  <p className="font-bold text-[#1b3327]">{guests} Orang</p>
                  <p className="text-[10px] text-stone-500">{totalNights} Malam Menginap</p>
                </div>
              </div>
            </div>

            {notes && (
              <div className="border-t border-[#e7e3da] pt-3 text-[11px]">
                <span className="font-bold text-[#8a7a5f]">Catatan Khusus:</span>
                <p className="text-[#4a5e51] italic mt-0.5 bg-white p-2 border border-stone-200 rounded">{notes}</p>
              </div>
            )}
          </div>

          {/* Pricing Summary */}
          <div className="border border-[#e7e3da] rounded-lg p-4 bg-stone-50/50 space-y-2.5">
            <p className="text-[10px] text-[#8a7a5f] font-black uppercase tracking-wider border-b border-[#e7e3da] pb-1.5">Rincian Invoice</p>
            
            <div className="flex justify-between text-stone-800 font-bold text-xs">
              <span>Total Biaya ({totalNights} Malam)</span>
              <span className="text-[#1b3327]">{formatRp(pricing.total)}</span>
            </div>

            {/* Down Payment Alert Box */}
            <div className="mt-1.5 p-3 rounded bg-emerald-50 border border-emerald-100 flex items-start gap-2.5">
              <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <div className="flex justify-between items-baseline gap-2">
                  <span className="text-[10px] font-black text-emerald-800 uppercase">Uang Muka (DP 50%)</span>
                  <span className="text-sm font-black text-emerald-800">{formatRp(pricing.dp)}</span>
                </div>
                <p className="text-[10px] text-emerald-700 mt-1 leading-relaxed">
                  Slot reservasi Anda baru akan terkunci setelah mengirim pesan WhatsApp dan mentransfer pembayaran DP 50%.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-3 border-t border-[#e7e3da] shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 px-4 rounded-lg border border-[#cbd2c9] hover:bg-stone-50 text-[#1b3327] text-xs font-bold uppercase tracking-wider transition-colors text-center"
          >
            Ubah Detail
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 py-3 px-4 rounded-lg bg-[#1b3327] hover:bg-[#2c4e3d] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all shadow-md active:scale-[0.98]"
          >
            <img 
              src="/image/Whatsapp_Icon.png" 
              alt="WhatsApp" 
              className="w-5 h-5 shrink-0"
            />
            Lanjutkan ke WA
          </button>
        </div>

      </div>
    </div>
  );
}
