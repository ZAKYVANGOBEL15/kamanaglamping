import React from 'react';

export default function Hero() {
  return (
    <section className="relative h-[38vh] min-h-[260px] flex items-center justify-center overflow-hidden border-b border-[#e7e3da]">
      <div className="absolute inset-0 z-0">
        <img 
          src="./image/banner.png" 
          alt="Kamana Glamping Tomohon View" 
          className="w-full h-full object-cover object-center"
        />
        {/* Clean vignette gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#fcfbf9] via-[#1b3327]/10 to-[#1b3327]/50"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center mt-12">
        
        <h1 className="font-sans text-2xl md:text-4.5xl font-black text-white leading-tight tracking-tight">
          Menenun Kedamaian <span className="font-medium text-stone-200">di Kaki Gunung Lokon</span>
        </h1>

        <p className="text-xs md:text-sm text-stone-200 max-w-xl mx-auto mt-2.5 font-light">
          Kabin premium dan kubah eksklusif dengan panorama megah Gunung Lokon.
        </p>
      </div>
    </section>
  );
}
