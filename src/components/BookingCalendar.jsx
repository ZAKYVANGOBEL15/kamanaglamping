import React, { useState, useMemo } from 'react';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight,
  RotateCcw
} from 'lucide-react';

export default function BookingCalendar({ 
  selectedTent, 
  checkIn, 
  checkOut, 
  onSelectRange, 
  totalNights,
  formatDateDisplay,
  triggerToast
}) {
  // Calendar Navigation State
  const [currentYear, setCurrentYear] = useState(2026);
  const [currentMonth, setCurrentMonth] = useState(6); // 0-indexed, so 6 is July
  const [hoveredDate, setHoveredDate] = useState(null);

  // Calendar Details & Names
  const monthNames = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];

  const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(prev => prev - 1);
    } else {
      setCurrentMonth(prev => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(prev => prev + 1);
    } else {
      setCurrentMonth(prev => prev + 1);
    }
  };

  // Check if date is in the past (based on system time: 2026-07-19)
  const isDateInPast = (dateStr) => {
    const today = new Date('2026-07-19');
    const checkDate = new Date(dateStr);
    today.setHours(0,0,0,0);
    checkDate.setHours(0,0,0,0);
    return checkDate < today;
  };

  // Check if date is booked for the currently selected tent
  const isDateBooked = (dateStr) => {
    return selectedTent.bookedDates.includes(dateStr);
  };

  const isDateToday = (dateStr) => {
    return dateStr === '2026-07-19';
  };

  const handleDateClick = (dateStr) => {
    if (isDateInPast(dateStr) || isDateBooked(dateStr)) return;

    if (!checkIn || (checkIn && checkOut)) {
      onSelectRange(dateStr, null);
    } else {
      // If check out is clicked before check in, reset check in
      if (new Date(dateStr) <= new Date(checkIn)) {
        onSelectRange(dateStr, null);
      } else {
        // Verify if there are any booked dates inside the range
        let hasBookedInRange = false;
        let cur = new Date(checkIn);
        const end = new Date(dateStr);
        
        while (cur <= end) {
          const checkStr = cur.toISOString().split('T')[0];
          if (isDateBooked(checkStr)) {
            hasBookedInRange = true;
            break;
          }
          cur.setDate(cur.getDate() + 1);
        }

        if (hasBookedInRange) {
          triggerToast('Terdapat tanggal yang sudah ter-booking di dalam rentang pilihan Anda. Silakan pilih rentang tanggal lain.');
          onSelectRange(dateStr, null);
        } else {
          onSelectRange(checkIn, dateStr);
        }
      }
    }
  };

  // Quick Selection Helpers
  const selectQuickPackage = (nights) => {
    let start = checkIn ? new Date(checkIn) : new Date('2026-07-19');
    
    // Find next available date starting from base if not set
    if (!checkIn) {
      let testDate = new Date('2026-07-19');
      while (isDateInPast(testDate.toISOString().split('T')[0]) || isDateBooked(testDate.toISOString().split('T')[0])) {
        testDate.setDate(testDate.getDate() + 1);
      }
      start = testDate;
    }

    const end = new Date(start);
    end.setDate(end.getDate() + nights);

    const startStr = start.toISOString().split('T')[0];
    const endStr = end.toISOString().split('T')[0];

    // Check if range contains any booked dates
    let hasBookedInRange = false;
    let cur = new Date(start);
    while (cur <= end) {
      const checkStr = cur.toISOString().split('T')[0];
      if (isDateBooked(checkStr)) {
        hasBookedInRange = true;
        break;
      }
      cur.setDate(cur.getDate() + 1);
    }

    if (hasBookedInRange) {
      triggerToast(`Kamar sudah ter-booking pada rentang paket ${nights} Malam (${formatDateDisplay(startStr)} - ${formatDateDisplay(endStr)}). Silakan pilih tanggal check-in lainnya.`);
    } else {
      onSelectRange(startStr, endStr);
    }
  };

  const selectWeekendPackage = () => {
    let start = new Date(checkIn ? checkIn : '2026-07-19');
    
    // Find next Friday (day index 5)
    let daysUntilFriday = (5 - start.getDay() + 7) % 7;
    // If starting from today and today is Friday, keep it. Otherwise search forward.
    if (daysUntilFriday !== 0 || (!checkIn && isDateBooked(start.toISOString().split('T')[0]))) {
      start.setDate(start.getDate() + (daysUntilFriday === 0 ? 7 : daysUntilFriday));
    }

    // Ensure start date is not in the past
    while (isDateInPast(start.toISOString().split('T')[0])) {
      start.setDate(start.getDate() + 7);
    }

    const end = new Date(start);
    end.setDate(end.getDate() + 2); // 2 nights (Fri to Sun)

    const startStr = start.toISOString().split('T')[0];
    const endStr = end.toISOString().split('T')[0];

    // Check range
    let hasBookedInRange = false;
    let cur = new Date(start);
    while (cur <= end) {
      const checkStr = cur.toISOString().split('T')[0];
      if (isDateBooked(checkStr)) {
        hasBookedInRange = true;
        break;
      }
      cur.setDate(cur.getDate() + 1);
    }

    if (hasBookedInRange) {
      triggerToast(`Kamar sudah ter-booking pada akhir pekan terdekat (${formatDateDisplay(startStr)} - ${formatDateDisplay(endStr)}). Silakan pilih tanggal lain.`);
    } else {
      onSelectRange(startStr, endStr);
    }
  };

  const isDateSelected = (dateStr) => {
    return dateStr === checkIn || dateStr === checkOut;
  };

  const isDateInRange = (dateStr) => {
    if (!checkIn || !checkOut) return false;
    const date = new Date(dateStr);
    return date > new Date(checkIn) && date < new Date(checkOut);
  };

  // Generate days array for calendar
  const calendarCells = useMemo(() => {
    const totalDays = daysInMonth(currentYear, currentMonth);
    const startDay = firstDayOfMonth(currentYear, currentMonth);
    const cells = [];

    // Offset for empty starting days
    let offset = startDay - 1;
    if (offset < 0) offset = 6; // Sunday offset

    for (let i = 0; i < offset; i++) {
      cells.push({ type: 'empty', key: `empty-${i}` });
    }

    // Add days
    for (let day = 1; day <= totalDays; day++) {
      const monthStr = String(currentMonth + 1).padStart(2, '0');
      const dayStr = String(day).padStart(2, '0');
      const dateStr = `${currentYear}-${monthStr}-${dayStr}`;
      
      cells.push({
        type: 'day',
        day,
        dateStr,
        isPast: isDateInPast(dateStr),
        isBooked: isDateBooked(dateStr),
        isSelected: isDateSelected(dateStr),
        isInRange: isDateInRange(dateStr),
        key: dateStr
      });
    }

    return cells;
  }, [currentYear, currentMonth, selectedTent, checkIn, checkOut]);

  return (
    <div className="bg-white border border-[#e7e3da] p-6 rounded-xl space-y-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#e7e3da] pb-4 gap-4">
        <div className="flex items-center gap-3">
          <span className="w-7 h-7 rounded-md bg-[#1b3327] text-white font-bold text-xs flex items-center justify-center">2</span>
          <div>
            <h3 className="font-sans text-base font-bold text-[#1b3327]">Pilih Tanggal Menginap</h3>
            <p className="text-xs text-[#5c6e61]">Klik tanggal check-in, lalu tanggal check-out</p>
          </div>
        </div>

        {/* Calendar Legend */}
        <div className="flex flex-wrap gap-3 text-[10px] text-[#5c6e61] font-medium">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-white border border-[#e7e3da] relative">
              <span className="absolute top-0.5 right-0.5 w-0.5 h-0.5 rounded-full bg-[#1b3327]"></span>
            </span> Hari ini
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-white border border-[#e7e3da]"></span> Tersedia
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-stone-100 border border-[#e7e3da] relative overflow-hidden">
              <span className="absolute inset-0 bg-gradient-to-tr from-transparent via-stone-300 to-transparent"></span>
            </span> Penuh
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1b3327]"></span> Terpilih
          </div>
        </div>
      </div>

      {/* Quick Selection Package Buttons Row */}
      <div className="flex flex-wrap items-center gap-2 p-2 bg-[#fcfbf9] border border-[#e7e3da] rounded-lg">
        <span className="text-[10px] font-bold text-[#8a7a5f] uppercase tracking-wider mr-1">Pilihan Cepat:</span>
        <button
          type="button"
          onClick={() => selectQuickPackage(1)}
          className="px-2.5 py-1 text-[10px] font-bold text-[#1b3327] bg-white border border-[#cbd2c9] rounded hover:bg-[#e7eee9] hover:border-[#1b3327] transition-all"
        >
          1 Malam
        </button>
        <button
          type="button"
          onClick={() => selectQuickPackage(2)}
          className="px-2.5 py-1 text-[10px] font-bold text-[#1b3327] bg-white border border-[#cbd2c9] rounded hover:bg-[#e7eee9] hover:border-[#1b3327] transition-all"
        >
          2 Malam
        </button>
        <button
          type="button"
          onClick={() => selectQuickPackage(3)}
          className="px-2.5 py-1 text-[10px] font-bold text-[#1b3327] bg-white border border-[#cbd2c9] rounded hover:bg-[#e7eee9] hover:border-[#1b3327] transition-all"
        >
          3 Malam
        </button>
        <button
          type="button"
          onClick={selectWeekendPackage}
          className="px-2.5 py-1 text-[10px] font-bold text-[#8a7a5f] bg-[#fdfaf2] border border-[#e7d5c0] rounded hover:bg-[#f7ece1] transition-all"
        >
          Weekend (Jum - Min)
        </button>
        
        {(checkIn || checkOut) && (
          <button
            type="button"
            onClick={() => onSelectRange(null, null)}
            className="ml-auto flex items-center gap-1 text-[10px] font-bold text-rose-600 hover:text-rose-800 transition-colors"
          >
            <RotateCcw className="w-3 h-3" /> Reset Tanggal
          </button>
        )}
      </div>

      {/* Calendar Grid */}
      <div className="max-w-xl mx-auto space-y-4">
        
        {/* Month Selector header */}
        <div className="flex items-center justify-between px-2">
          <h4 className="font-sans font-bold text-[#1b3327] text-sm md:text-base">
            {monthNames[currentMonth]} {currentYear}
          </h4>
          <div className="flex items-center gap-2">
            <button 
              type="button"
              onClick={handlePrevMonth}
              className="p-1 rounded bg-[#fcfbf9] hover:bg-[#f5f2eb] border border-[#e7e3da] text-[#1b3327] transition-colors"
              aria-label="Previous Month"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button 
              type="button"
              onClick={handleNextMonth}
              className="p-1 rounded bg-[#fcfbf9] hover:bg-[#f5f2eb] border border-[#e7e3da] text-[#1b3327] transition-colors"
              aria-label="Next Month"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Days of week header */}
        <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-bold uppercase tracking-wider text-[#5c6e61]">
          <div>Sen</div>
          <div>Sel</div>
          <div>Rab</div>
          <div>Kam</div>
          <div>Jum</div>
          <div>Sab</div>
          <div>Min</div>
        </div>

        {/* Days grid */}
        <div className="grid grid-cols-7 gap-1">
          {calendarCells.map((cell, idx) => {
            if (cell.type === 'empty') {
              return <div key={cell.key} className="h-10 md:h-11"></div>;
            }

            const { day, dateStr, isPast, isBooked, isSelected, isInRange } = cell;

            // Hover Range Preview check
            const isHoveredRange = 
              checkIn && 
              !checkOut && 
              hoveredDate && 
              !isPast && 
              !isBooked && 
              new Date(dateStr) > new Date(checkIn) && 
              new Date(dateStr) <= new Date(hoveredDate);

            // Compute styling based on states
            let cellClass = "h-10 md:h-11 rounded flex flex-col items-center justify-center text-xs relative transition-all ";
            let textClass = "font-medium ";

            if (isPast) {
              cellClass += "bg-[#fcfbf9] text-stone-300 cursor-not-allowed opacity-50";
            } else if (isBooked) {
              cellClass += "bg-stone-100 text-stone-400 border border-stone-200/60 cursor-not-allowed overflow-hidden line-through";
            } else if (isSelected) {
              cellClass += "bg-[#1b3327] text-white font-bold shadow-sm cursor-pointer";
            } else if (isInRange) {
              cellClass += "bg-[#e7eee9] text-[#1b3327] border border-[#cbd2c9] cursor-pointer";
            } else if (isHoveredRange) {
              cellClass += "bg-[#e7eee9]/50 text-[#1b3327] border-dashed border-[#1b3327]/30 cursor-pointer";
            } else {
              cellClass += "bg-[#fcfbf9] text-[#1b3327] hover:bg-[#f5f2eb] border border-[#e7e3da] cursor-pointer";
            }

            const isCheckIn = checkIn === dateStr;
            const isCheckOut = checkOut === dateStr;

            return (
              <button
                key={dateStr}
                type="button"
                onClick={() => handleDateClick(dateStr)}
                onMouseEnter={() => setHoveredDate(dateStr)}
                onMouseLeave={() => setHoveredDate(null)}
                disabled={isPast || isBooked}
                className={cellClass}
              >
                <span className={textClass}>{day}</span>
                
                {/* Today's indicator dot */}
                {isDateToday(dateStr) && (
                  <span className={`absolute top-1 right-1 w-1 h-1 rounded-full ${
                    isSelected ? 'bg-white' : 'bg-[#1b3327]'
                  }`}></span>
                )}

                {isCheckIn && (
                  <span className="absolute bottom-0.5 text-[6.5px] font-bold uppercase tracking-wider text-white opacity-90 leading-none">In</span>
                )}
                {isCheckOut && (
                  <span className="absolute bottom-0.5 text-[6.5px] font-bold uppercase tracking-wider text-white opacity-90 leading-none">Out</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Status info bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between p-3.5 rounded-lg bg-[#fcfbf9] border border-[#e7e3da] gap-4 text-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded bg-white flex items-center justify-center border border-[#e7e3da] text-[#1b3327]">
            <CalendarIcon className="w-3.5 h-3.5" />
          </div>
          <div>
            {checkIn ? (
              <div className="text-[#1b3327]">
                <span className="text-[#5c6e61]">Reservasi: </span>
                <span className="font-bold">{formatDateDisplay(checkIn)}</span>
                {checkOut ? (
                  <>
                    <span className="text-[#8a7a5f] mx-1.5">—</span>
                    <span className="font-bold">{formatDateDisplay(checkOut)}</span>
                  </>
                ) : (
                  <span className="text-[#8a7a5f] animate-pulse ml-1">(pilih tanggal checkout...)</span>
                )}
              </div>
            ) : (
              <span className="text-[#5c6e61]">Silakan pilih tanggal check-in pada kalender.</span>
            )}
          </div>
        </div>

        {totalNights > 0 && (
          <div className="px-2.5 py-0.5 rounded bg-[#e7eee9] text-[#1b3327] text-[10px] font-bold border border-[#cbd2c9]">
            {totalNights} Malam
          </div>
        )}
      </div>
    </div>
  );
}
