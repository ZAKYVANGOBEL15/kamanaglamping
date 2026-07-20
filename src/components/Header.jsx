import React, { useState, useEffect } from 'react';
import { Compass } from 'lucide-react';

export default function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const [isAtTop, setIsAtTop] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Determine if at very top
      if (currentScrollY < 20) {
        setIsAtTop(true);
      } else {
        setIsAtTop(false);
      }

      // Hide on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
      isVisible ? 'translate-y-0' : '-translate-y-full'
    } ${
      isAtTop 
        ? 'bg-[#fcfbf9]/95 md:bg-transparent border-b border-[#e7e3da] md:border-transparent py-2' 
        : 'bg-[#fcfbf9]/95 backdrop-blur-md border-b border-[#e7e3da] py-0 shadow-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between">
        <div className="flex items-center gap-2 md:gap-3">
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-[#e7e3da] overflow-hidden bg-white shadow-sm shrink-0 flex items-center justify-center">
            <img 
              src="./image/Logo.png" 
              alt="Kamana Logo" 
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div>
            <span className={`font-sans text-sm md:text-lg font-black tracking-wider block transition-colors duration-300 ${
              isAtTop ? 'text-[#1b3327] md:text-white' : 'text-[#1b3327]'
            }`}>
              KAMANA GLAMPING
            </span>
          </div>
        </div>

        <nav className={`hidden md:flex items-center gap-8 text-xs font-semibold uppercase tracking-wider transition-colors duration-300 ${
          isAtTop ? 'text-stone-200' : 'text-[#4a5e51]'
        }`}>
          <a href="#tent-selector" className={`transition-colors duration-200 ${isAtTop ? 'hover:text-white' : 'hover:text-[#1b3327]'}`}>Tipe Kubah</a>
          <a href="#location-section" className={`transition-colors duration-200 ${isAtTop ? 'hover:text-white' : 'hover:text-[#1b3327]'}`}>Lokasi</a>
          <a href="https://wa.me/6285121199518" target="_blank" rel="noopener noreferrer" className={`transition-colors duration-200 ${isAtTop ? 'hover:text-white' : 'hover:text-[#1b3327]'}`}>Kontak</a>
        </nav>
      </div>
    </header>
  );
}
