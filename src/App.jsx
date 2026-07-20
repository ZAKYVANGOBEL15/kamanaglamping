import React, { useState, useMemo, useEffect } from 'react';
import { TENT_TYPES } from './data/tents';
import Header from './components/Header';
import Hero from './components/Hero';
import TentSelector from './components/TentSelector';
import BookingCalendar from './components/BookingCalendar';
import BookingSummary from './components/BookingSummary';
import Footer from './components/Footer';
import SuccessModal from './components/SuccessModal';
import ConfirmationModal from './components/ConfirmationModal';
import './App.css';

function App() {
  // Booking State
  const [selectedTentId, setSelectedTentId] = useState(TENT_TYPES[0].id);
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [guests, setGuests] = useState(2);
  const [notes, setNotes] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  
  // Toast Notification State
  const [toast, setToast] = useState(null); // { message: string, type: 'error' | 'success' }

  // Auto-hide toast after 4 seconds
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const triggerToast = (message, type = 'error') => {
    setToast({ message, type });
  };

  // Current Tent details helper
  const selectedTent = useMemo(() => {
    return TENT_TYPES.find(tent => tent.id === selectedTentId);
  }, [selectedTentId]);

  // Handle Date selection from calendar
  const handleSelectRange = (inDate, outDate) => {
    setCheckIn(inDate);
    setCheckOut(outDate);
  };

  // Calculations
  const totalNights = useMemo(() => {
    if (!checkIn || !checkOut) return 0;
    const diffTime = Math.abs(new Date(checkOut) - new Date(checkIn));
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }, [checkIn, checkOut]);

  const pricing = useMemo(() => {
    if (totalNights === 0 || !checkIn || !checkOut) return { subtotal: 0, total: 0, dp: 0 };
    
    let total = 0;
    let cur = new Date(checkIn);
    const end = new Date(checkOut);
    
    while (cur < end) {
      const dayOfWeek = cur.getDay(); // 0 = Sunday, 5 = Friday, 6 = Saturday
      // Friday and Saturday nights are weekend nights
      const isWeekend = dayOfWeek === 5 || dayOfWeek === 6;
      
      let priceForNight = selectedTent.price;
      if (selectedTent.weekdayPrice !== undefined && selectedTent.weekendPrice !== undefined) {
        priceForNight = isWeekend ? selectedTent.weekendPrice : selectedTent.weekdayPrice;
      }
      
      total += priceForNight;
      cur.setDate(cur.getDate() + 1);
    }
    
    const dp = Math.round(total * 0.5); // 50% Down Payment
    return { subtotal: total, total, dp };
  }, [selectedTent, totalNights, checkIn, checkOut]);

  // Format currency helper
  const formatRp = (value) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatDateDisplay = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  // Reset checkin/checkout if tent type changes
  useEffect(() => {
    setCheckIn(null);
    setCheckOut(null);
    setToast(null);
  }, [selectedTentId]);

  // Handle open confirmation modal prior to redirect
  const handleOpenConfirmation = (e) => {
    e.preventDefault();
    if (!checkIn || !checkOut) {
      triggerToast('Silakan tentukan tanggal Check-in dan Check-out di kalender terlebih dahulu.');
      return;
    }
    if (!name || !phone) {
      triggerToast('Silakan isi Nama Lengkap dan Nomor WhatsApp Anda.');
      return;
    }
    setShowConfirmationModal(true);
  };

  // Perform actual redirect upon confirmation
  const handleConfirmBooking = () => {
    setShowConfirmationModal(false);

    const messageTemplate = 
`Halo Admin Kamana Glamping!
Saya ingin memesan unit glamping berikut detail pesanan saya:

*Detail Tamu:*
- Nama Lengkap: ${name}
- No. WhatsApp: ${phone}
- Jumlah Tamu: ${guests} orang

*Detail Unit & Reservasi:*
- Unit Glamping: ${selectedTent.name}
- Check-in: ${formatDateDisplay(checkIn)}
- Check-out: ${formatDateDisplay(checkOut)}
- Durasi: ${totalNights} Malam

*Rincian Pembayaran:*
- Tarif Unit: ${selectedTent.weekdayPrice === selectedTent.weekendPrice ? `${formatRp(selectedTent.price)} / Malam` : `Weekday ${formatRp(selectedTent.weekdayPrice)} | Weekend ${formatRp(selectedTent.weekendPrice)}`}
- Total Biaya (${totalNights} Malam): ${formatRp(pricing.total)}
- *Uang Muka (DP 50%): ${formatRp(pricing.dp)}*

${notes ? `*Catatan Tambahan:* ${notes}\n` : ''}
Mohon informasi ketersediaan slot ini dan instruksi transfer pembayaran DP. Terima kasih!`;

    const encodedMessage = encodeURIComponent(messageTemplate);
    const waUrl = `https://wa.me/6281234567890?text=${encodedMessage}`;
    
    // Open WA Link in new tab
    window.open(waUrl, '_blank');
    
    // Show success dialog
    setShowSuccessModal(true);
  };

  return (
    <div className="relative min-h-screen bg-[#fcfbf9] overflow-x-hidden">
      
      {/* Brand Header */}
      <Header />

      {/* Hero Intro */}
      <Hero />

      {/* Interactive Booking & Configuration Section */}
      <section id="booking-section" className="py-10 md:py-16 max-w-7xl mx-auto px-4 md:px-6 scroll-mt-20">

        <div className="space-y-8">
          
          {/* TOP ROW: Side-by-Side Tent Selector & Calendar */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Step 1: Selector */}
            <TentSelector 
              tents={TENT_TYPES} 
              selectedTentId={selectedTentId} 
              onSelectTent={setSelectedTentId}
              selectedTent={selectedTent}
            />

            {/* Step 2: Custom Interactive Grid Calendar */}
            <BookingCalendar 
              selectedTent={selectedTent}
              checkIn={checkIn}
              checkOut={checkOut}
              onSelectRange={handleSelectRange}
              totalNights={totalNights}
              formatDateDisplay={formatDateDisplay}
              triggerToast={triggerToast}
            />
          </div>

          {/* BOTTOM ROW: Booking Summary and Payment form */}
          <div className="scroll-mt-20">
            <BookingSummary 
              selectedTent={selectedTent}
              checkIn={checkIn}
              checkOut={checkOut}
              name={name}
              setName={setName}
              phone={phone}
              setPhone={setPhone}
              guests={guests}
              setGuests={setGuests}
              notes={notes}
              setNotes={setNotes}
              totalNights={totalNights}
              pricing={pricing}
              onSubmit={handleOpenConfirmation}
            />
          </div>

        </div>
      </section>

      {/* Location Section */}
      <section id="location-section" className="py-16 bg-white border-t border-[#e7e3da] scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-[10px] font-bold text-[#8a7a5f] uppercase tracking-[0.25em] block">Sanctuary & Panorama</span>
            <h2 className="font-sans text-2xl md:text-3xl font-black text-[#1b3327]">Lokasi Kamana</h2>
            <p className="text-xs md:text-sm text-[#5c6e61] leading-relaxed">
              Terletak di kawasan sejuk Tomohon Utara, Kamana Glamping sangat mudah diakses dan menawarkan pemandangan langsung ke Gunung Lokon. Tempat yang sempurna untuk melepaskan penat dari hiruk-pikuk perkotaan.
            </p>
            <div className="pt-2 text-xs space-y-2 text-[#1b3327] font-medium">
              <p className="flex items-start gap-2.5">
                <span className="font-bold text-[#8a7a5f]">Alamat:</span> 
                <span>Perkebunan Koharangdang, Kec. Tomohon Utara, Kota Tomohon, Sulawesi Utara, 95419</span>
              </p>
              <p className="flex items-center gap-2.5">
                <span className="font-bold text-[#8a7a5f]">Akses:</span> 
                <span>± 15 Menit berkendara dari Pusat Kota Tomohon</span>
              </p>
            </div>
            <div className="pt-4">
              <a 
                href="https://www.google.com/maps/search/Kamana+Glamping+Tomohon" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-[#1b3327] hover:bg-[#2c4e3d] text-white text-[11px] font-bold uppercase tracking-wider transition-colors shadow-sm"
              >
                Buka di Google Maps
              </a>
            </div>
          </div>
          <div className="lg:col-span-7 h-[350px] rounded-xl overflow-hidden border border-[#e7e3da] shadow-sm relative bg-stone-100">
            <iframe 
              title="Kamana Glamping Google Maps Location"
              src="https://maps.google.com/maps?q=Kamana%20Glamping%20Tomohon&t=&z=15&ie=UTF8&iwloc=&output=embed" 
              className="w-full h-full border-0"
              allowFullScreen="" 
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Footer Branding */}
      <Footer />

      {/* Confirmation booking modal popup */}
      <ConfirmationModal
        isOpen={showConfirmationModal}
        onClose={() => setShowConfirmationModal(false)}
        onConfirm={handleConfirmBooking}
        name={name}
        phone={phone}
        guests={guests}
        selectedTent={selectedTent}
        checkIn={checkIn}
        checkOut={checkOut}
        totalNights={totalNights}
        pricing={pricing}
        notes={notes}
        formatDateDisplay={formatDateDisplay}
      />

      {/* Success checkout modal popup */}
      <SuccessModal 
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        name={name}
        selectedTent={selectedTent}
        checkIn={checkIn}
        checkOut={checkOut}
        pricing={pricing}
        formatDateDisplay={formatDateDisplay}
      />

      {/* Floating Toast Notification Box */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 max-w-sm bg-[#1e2d24] text-white px-4 py-3 rounded-lg shadow-2xl border border-[#2d4034] flex items-center gap-3 animate-slide-up-fade text-xs">
          <span className={`w-2 h-2 rounded-full shrink-0 ${
            toast.type === 'error' ? 'bg-rose-500' : 'bg-emerald-500'
          }`}></span>
          <span className="font-medium flex-1">{toast.message}</span>
          <button 
            type="button" 
            onClick={() => setToast(null)} 
            className="text-stone-400 hover:text-stone-200 font-bold px-1 text-sm leading-none"
          >
            &times;
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
