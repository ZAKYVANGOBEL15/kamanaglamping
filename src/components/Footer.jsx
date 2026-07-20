import React from 'react';
import { Compass } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#13251c] border-t border-[#1b3327] py-12 text-center text-xs text-[#8da697]">
      <div className="max-w-7xl mx-auto px-6 space-y-6">
        <div className="flex flex-col items-center justify-center gap-3">
          <div className="w-12 h-12 rounded-full overflow-hidden bg-white shadow-sm border border-[#1b3327] flex items-center justify-center">
            <img 
              src="./image/Logo.png" 
              alt="Kamana Logo" 
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <span className="font-sans text-base font-black tracking-widest text-[#fcfbf9]">KAMANA GLAMPING</span>
        </div>
        <p className="max-w-md mx-auto leading-relaxed">
          Tomohon Utara, Kota Tomohon, Sulawesi Utara. <br />
          © 2026 Kamana Glamping. All Rights Reserved.
        </p>
        <div className="flex items-center justify-center gap-6 text-[#cbd2c9]">
          <a href="https://wa.me/62895402945495" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">WhatsApp Concierge</a>
        </div>
      </div>
    </footer>
  );
}
