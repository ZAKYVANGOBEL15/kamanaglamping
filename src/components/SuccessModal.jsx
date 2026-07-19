import React from 'react';
import { Check } from 'lucide-react';

export default function SuccessModal({
  isOpen,
  onClose,
  name,
  selectedTent,
  checkIn,
  checkOut,
  pricing,
  formatDateDisplay
}) {
  if (!isOpen) return null;

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop overlay */}
      <div 
        className="absolute inset-0 bg-[#1b3327]/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      {/* Modal Container */}
      <div className="relative bg-white border border-[#e7e3da] rounded-xl p-8 max-w-md w-full text-center space-y-6 shadow-xl z-10">
        <div className="w-14 h-14 rounded-full bg-[#e7eee9] border border-[#cbd2c9] flex items-center justify-center text-[#1b3327] mx-auto shadow-sm">
          <Check className="w-6 h-6 stroke-[3]" />
        </div>

        <div className="space-y-2">
          <h4 className="font-sans text-xl font-bold text-[#1b3327]">Link WhatsApp Terbuat!</h4>
          <p className="text-xs text-[#5c6e61]">
            Sistem berhasil menyusun draf reservasi Anda dan membukanya di WhatsApp.
          </p>
        </div>

        <div className="p-4 rounded bg-[#fcfbf9] border border-[#e7e3da] text-left space-y-2 text-xs">
          <p className="font-bold text-[#8a7a5f] border-b border-[#e7e3da] pb-1.5 uppercase tracking-wider text-[9px]">Draf Reservasi WhatsApp:</p>
          <div className="text-[10.5px] text-[#4a5e51] font-mono space-y-1 overflow-y-auto max-h-40 whitespace-pre-wrap leading-relaxed">
            {`Halo Admin Kamana Glamping! ...\n`}
            {`Nama Lengkap: ${name}\n`}
            {`Unit: ${selectedTent.name}\n`}
            {`Check-in: ${formatDateDisplay(checkIn)}\n`}
            {`Check-out: ${formatDateDisplay(checkOut)}\n`}
            {`Total: ${formatRp(pricing.total)}\n`}
            {`DP 50%: ${formatRp(pricing.dp)}`}
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="w-full py-3 px-6 rounded bg-[#1b3327] hover:bg-[#2c4e3d] text-white text-xs font-bold uppercase tracking-wider transition-all"
        >
          Kembali ke Halaman
        </button>
      </div>
    </div>
  );
}
