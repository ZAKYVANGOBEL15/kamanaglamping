import { 
  Compass, 
  Droplet, 
  Flame, 
  Wifi, 
  Wind, 
  Coffee, 
  Sparkles, 
  Utensils,
  Users
} from 'lucide-react';

export const TENT_TYPES = [
  // --- CABIN VILLA ---
  {
    id: 'cabin-villa',
    name: 'Cabin Villa',
    type: 'Cabin Villa',
    tagline: 'Kabin kayu premium dengan balkoni privat menghadap langsung ke panorama Gunung Lokon.',
    price: 650000,
    weekdayPrice: 650000,
    weekendPrice: 750000,
    image: '/image/kabinvila.jpg',
    capacity: 'Up to 4 Pax + 1 Child',
    size: '36 m²',
    bed: '1 King Bed',
    amenities: [
      { 
        name: 'Sky Room View on 2nd Floor', 
        icon: Sparkles,
        description: 'Kamar tidur utama dengan pemandangan langsung di lantai 2.'
      },
      { 
        name: 'Sky Net Hammock', 
        icon: Compass,
        description: 'Tempat tidur jaring gantung di area luar buat santai menikmati pemandangan.'
      },
      { 
        name: 'Hot BathTub', 
        icon: Droplet,
        description: 'Bak mandi air hangat terbuka.'
      },
      { 
        name: 'Kapasitas Nyaman', 
        icon: Users,
        description: 'Muat hingga 4 orang dewasa + 1 anak-anak (Up to 4 pax + 1 child).'
      },
      { 
        name: 'Fire Pit', 
        icon: Flame,
        description: 'Area api unggun buat nongkrong malam-malam.'
      },
      { 
        name: 'Semi-Outdoor Bath With Heater', 
        icon: Wind,
        description: 'Kamar mandi semi-terbuka yang sudah dilengkapi dengan pemanas air.'
      }
    ],
    bookedDates: [
      '2026-07-22', '2026-07-23', '2026-07-25', '2026-07-26',
      '2026-08-01', '2026-08-02', '2026-08-08', '2026-08-09'
    ]
  },

  // --- GLAMPING TENT ---
  {
    id: 'glamping-tent',
    name: 'Glamping Tent',
    type: 'Glamping Tent',
    tagline: 'Kubah Bell Tent eksklusif diameter 4 meter dengan area luar teduh untuk relaksasi total.',
    price: 350000,
    weekdayPrice: 350000,
    weekendPrice: 450000,
    image: '/image/tent1.png',
    capacity: 'Up to 3 Pax',
    size: '12 m²',
    bed: '1 Queensize Airbed',
    amenities: [
      { 
        name: 'Bell Tent 4 Meter', 
        icon: Compass,
        description: 'Tenda Bell dengan diameter luas 4 meter yang lega dan kokoh.'
      },
      { 
        name: 'Airbed Queensize', 
        icon: Wind,
        description: 'Kasur angin (Airbed) berkualitas ukuran Queensize untuk tidur nyenyak.'
      },
      { 
        name: 'Furnitur Kamar Lengkap', 
        icon: Sparkles,
        description: 'Sudah termasuk lemari, kaca rias, meja kecil, dan BeanBag buat rebahan santai.'
      },
      { 
        name: 'Fan (Kipas Angin)', 
        icon: Wind,
        description: 'Pendingin ruangan berupa kipas angin untuk kesegaran di dalam tenda.'
      },
      { 
        name: 'Fire Pit & BBQ Gear', 
        icon: Flame,
        description: 'Fasilitas luar tenda berupa area api unggun & peralatan BBQ gratis.'
      },
      { 
        name: 'Include Breakfast', 
        icon: Coffee,
        description: 'Sudah termasuk paket sarapan pagi lezat untuk seluruh tamu.'
      },
      { 
        name: 'Toilet Sharing', 
        icon: Droplet,
        description: 'Kamar mandi bersama yang bersih dan terawat (tersedia 2 WC dan 1 Kamar Mandi).'
      }
    ],
    bookedDates: [
      '2026-07-25', '2026-07-26', '2026-07-30',
      '2026-08-15', '2026-08-16', '2026-08-20', '2026-08-21'
    ]
  }
];
