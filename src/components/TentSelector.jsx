import React, { useState } from 'react';
import { Check, Users, X, Info } from 'lucide-react';

export default function TentSelector({ tents, selectedTentId, onSelectTent, selectedTent }) {
  // Modal state for viewing specific tent details
  const [detailModalTent, setDetailModalTent] = useState(null);

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
    <div id="tent-selector" className="bg-white border border-[#e7e3da] p-6 rounded-xl space-y-6 shadow-sm scroll-mt-24">
      <div className="flex items-center gap-3 border-b border-[#e7e3da] pb-4">
        <span className="w-7 h-7 rounded-md bg-[#1b3327] text-white font-bold text-xs flex items-center justify-center">1</span>
        <div>
          <h3 className="font-sans text-base font-bold text-[#1b3327]">Pilih Tipe Glamping</h3>
          <p className="text-xs text-[#5c6e61]">Setiap unit dirancang eksklusif dengan privasi penuh</p>
        </div>
      </div>

      {/* Tent Cards Grid */}
      <div className="grid grid-cols-1 gap-4 lg:max-h-[485px] lg:overflow-y-auto lg:pr-1.5 custom-scrollbar">
        {tents.map((tent) => {
          const isSelected = selectedTentId === tent.id;
          return (
            <div 
              key={tent.id}
              onClick={() => onSelectTent(tent.id)}
              className={`group cursor-pointer rounded-lg overflow-hidden border transition-all duration-200 flex flex-col justify-between ${
                isSelected 
                  ? 'border-[#1b3327] bg-[#f7f9f7] shadow-sm' 
                  : 'border-[#e7e3da] bg-white hover:border-[#1b3327]/40'
              }`}
            >
              {/* Thumbnail Area */}
              <div className="h-40 overflow-hidden relative">
                <img 
                  src={tent.image} 
                  alt={tent.name} 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {/* Category Badge */}
                <div className="absolute top-2 left-2 bg-[#1b3327] text-white text-[8px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded shadow-sm">
                  {tent.type}
                </div>
                <div className="absolute top-2 right-2 bg-white/95 backdrop-blur-sm px-2 py-1 rounded border border-[#e7e3da] shadow-sm">
                  <p className="text-[10px] text-[#1b3327] font-bold">{formatRp(tent.price)}/mlm</p>
                </div>
              </div>

              {/* Info Body */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <h4 className="font-sans font-bold text-sm text-[#1b3327]">{tent.name}</h4>
                    {isSelected && (
                      <div className="w-3.5 h-3.5 rounded-full bg-[#1b3327] flex items-center justify-center">
                        <Check className="w-2.5 h-2.5 text-white stroke-[3]" />
                      </div>
                    )}
                  </div>
                  <p className="text-[11px] text-[#5c6e61] leading-relaxed line-clamp-2">{tent.tagline}</p>
                </div>

                <div className="border-t border-[#e7e3da] pt-3 flex items-center justify-between text-[10px] text-[#4a5e51] font-semibold">
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-[#8a7a5f]" /> {tent.capacity}
                  </span>
                  
                  {/* Action Link for Detail Modal */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent selection when clicking detail
                      setDetailModalTent(tent);
                    }}
                    className="flex items-center gap-1 text-white bg-[#1b3327] hover:bg-[#2c4e3d] transition-colors uppercase tracking-wider font-bold text-[9px] px-2.5 py-1 rounded shadow-sm"
                  >
                    <Info className="w-2.5 h-2.5" /> Detail
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Unit Static Summary Bar */}
      <div className="p-4 rounded-lg bg-[#fcfbf9] border border-[#e7e3da] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
        <div>
          <span className="text-[9px] uppercase tracking-wider text-[#8a7a5f] font-bold block mb-0.5">Unit Terpilih:</span>
          <span className="font-sans font-bold text-[#1b3327] text-sm">{selectedTent.name}</span>
          <span className="text-[#5c6e61] ml-2">({selectedTent.size} | {selectedTent.bed})</span>
        </div>
        <button
          type="button"
          onClick={() => setDetailModalTent(selectedTent)}
          className="px-4 py-2 bg-[#1b3327]/5 hover:bg-[#1b3327]/10 text-[#1b3327] text-[10px] font-bold uppercase tracking-wider rounded border border-[#1b3327]/10 transition-colors"
        >
          Lihat Semua Fasilitas
        </button>
      </div>

      {/* DETAILED AMENITIES POPUP MODAL */}
      {detailModalTent && (
        <div className="fixed inset-0 bg-[#13251c]/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white max-w-xl w-full rounded-2xl overflow-hidden shadow-2xl border border-[#e7e3da] relative flex flex-col animate-scale-up max-h-[85vh]">
            
            {/* Header Image */}
            <div className="h-52 overflow-hidden relative shrink-0">
              <img 
                src={detailModalTent.image} 
                alt={detailModalTent.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-[#1b3327] text-white text-[9px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded shadow-sm">
                {detailModalTent.type}
              </div>
              <div className="absolute top-3 right-12 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded border border-[#e7e3da] shadow-sm">
                <p className="text-xs text-[#1b3327] font-bold">{formatRp(detailModalTent.price)}/malam</p>
              </div>
              <button 
                type="button"
                onClick={() => setDetailModalTent(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/95 backdrop-blur-sm border border-[#e7e3da] flex items-center justify-center hover:bg-stone-100 transition-colors shadow-sm font-bold text-stone-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body Container */}
            <div className="p-6 space-y-4 overflow-y-auto flex-1">
              <div>
                <h4 className="font-sans text-xl font-black text-[#1b3327]">{detailModalTent.name}</h4>
                <p className="text-xs text-[#5c6e61] mt-1.5 leading-relaxed">{detailModalTent.tagline}</p>
              </div>

              {/* Quick specifications grid */}
              <div className="grid grid-cols-3 gap-3 p-3 bg-[#fcfbf9] border border-[#e7e3da] rounded-lg text-center">
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-[#8a7a5f] font-bold block mb-0.5">Ukuran</span>
                  <span className="text-xs font-bold text-[#1b3327]">{detailModalTent.size}</span>
                </div>
                <div className="border-x border-[#e7e3da]">
                  <span className="text-[9px] uppercase tracking-wider text-[#8a7a5f] font-bold block mb-0.5">Kapasitas</span>
                  <span className="text-xs font-bold text-[#1b3327]">{detailModalTent.capacity}</span>
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-[#8a7a5f] font-bold block mb-0.5">Tipe Bed</span>
                  <span className="text-xs font-bold text-[#1b3327]">{detailModalTent.bed}</span>
                </div>
              </div>

              {/* Full descriptive amenities list */}
              <div className="space-y-3 pt-2">
                <span className="text-[10px] uppercase tracking-wider text-[#8a7a5f] font-black block">Fasilitas Detail:</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {detailModalTent.amenities.map((amenity, idx) => {
                    const Icon = amenity.icon;
                    return (
                      <div key={idx} className="flex items-start gap-2.5">
                        <div className="w-6.5 h-6.5 rounded-md bg-[#fcfbf9] flex items-center justify-center border border-[#e7e3da] shrink-0 mt-0.5">
                          <Icon className="w-3.5 h-3.5 text-[#1b3327]" />
                        </div>
                        <div className="space-y-0.5">
                          <h5 className="font-sans text-[11px] font-bold text-[#1b3327] leading-none">{amenity.name}</h5>
                          {amenity.description && (
                            <p className="text-[10px] text-[#5c6e61] leading-relaxed">{amenity.description}</p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Modal Actions Footer */}
            <div className="p-4 bg-[#fcfbf9] border-t border-[#e7e3da] flex gap-3 shrink-0">
              <button
                type="button"
                onClick={() => setDetailModalTent(null)}
                className="flex-1 py-3 border border-[#cbd2c9] hover:bg-[#e7eee9] text-[#1b3327] text-xs font-bold uppercase tracking-wider rounded-lg transition-colors"
              >
                Kembali
              </button>
              <button
                type="button"
                onClick={() => {
                  onSelectTent(detailModalTent.id);
                  setDetailModalTent(null);
                }}
                className="flex-1 py-3 bg-[#1b3327] hover:bg-[#2c4e3d] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors shadow-sm"
              >
                Pilih Unit Ini
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
