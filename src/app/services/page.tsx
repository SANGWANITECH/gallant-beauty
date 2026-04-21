'use client';

import { useEffect, useRef, useState } from 'react';
import { useBooking } from '@/components/ui/BookingContext';

/* ─────────────────────────────────────────
   SERVICES DATA
   Grouped by category
───────────────────────────────────────── */
const CATEGORIES = [
  {
    id: 'womens-hair',
    title: "Women's Hair",
    subtitle: 'Styles that celebrate every texture and length',
    for: 'Women',
    image: '/images/services/womens-hair.jpg',
    services: [
      { name: 'Box Braids', duration: '3–5 hrs', price: 'From MK 8,000' },
      { name: 'Knotless Braids', duration: '4–6 hrs', price: 'From MK 10,000' },
      { name: 'Cornrows', duration: '1–2 hrs', price: 'From MK 3,500' },
      { name: 'Blowout & Styling', duration: '1–2 hrs', price: 'From MK 4,000' },
      { name: 'Hair Colour', duration: '2–3 hrs', price: 'From MK 6,000' },
    
    ],
  },
  {
    id: 'mens-hair',
    title: "Men's Hair",
    subtitle: 'Clean cuts and sharp finishes for every man',
    for: 'Men',
    image: '/images/services/mens-hair.jpg',
    services: [
      { name: 'Haircut & Style', duration: '30–45 min', price: 'From MK 2,500' },
      { name: 'Fade / Taper', duration: '30–45 min', price: 'From MK 3,000' },
      { name: 'Shape-Up & Edge', duration: '20–30 min', price: 'From MK 1,500' },
      { name: 'Loc Styling', duration: '1–3 hrs', price: 'From MK 4,000' },
      
    ],
  },
  {
    id: 'nails',
    title: 'Nails',
    subtitle: 'Precision nail care and artistic designs',
    for: 'Women & Men',
    image: '/images/services/nails.jpg',
    services: [
      { name: 'Classic Manicure', duration: '30–45 min', price: 'From MK 2,000' },
      { name: 'Gel Manicure', duration: '45–60 min', price: 'From MK 3,500' },
      { name: 'Nail Art & Design', duration: '60–90 min', price: 'From MK 4,500' },
      { name: 'Acrylic Extensions', duration: '60–90 min', price: 'From MK 5,500' },
    
    ],
  },
  {
    id: 'beauty',
    title: 'Beauty & Skincare',
    subtitle: 'Treatments that enhance your natural glow',
    for: 'Women & Men',
    image: '/images/services/beauty.jpg',
    services: [
      { name: 'Deep Cleanse Facial', duration: '60 min', price: 'From MK 5,000' },
      { name: 'Glow Facial', duration: '60 min', price: 'From MK 6,000' },
      { name: 'Full Glam Makeup', duration: '60–90 min', price: 'From MK 8,000' },
      { name: 'Natural / Soft Makeup', duration: '45–60 min', price: 'From MK 5,000' },
      { name: 'Bridal Makeup', duration: '90–120 min', price: 'From MK 15,000' },
     
    ],
  },
];

/* ─────────────────────────────────────────
   SCROLL REVEAL HOOK
───────────────────────────────────────── */
function useScrollReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ─────────────────────────────────────────
   PAGE
───────────────────────────────────────── */
export default function ServicesPage() {
  const { openBooking } = useBooking();

  return (
    <main className="bg-[#0F0F1E] min-h-screen">

      {/* ── Hero Banner ── */}
      <section className="relative h-[50vh] min-h-[340px] max-h-[520px] overflow-hidden">
        {/* BG image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/services/services-hero.jpg"
          alt="Gallant Beauty House Services"
          className="w-full h-full object-cover object-center scale-105"
          style={{ transition: 'transform 6s ease-out', transform: 'scale(1)' }}
        />
        {/* Overlays */}
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F1E] via-[#0F0F1E]/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F0F1E]/50 to-transparent" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="w-8 h-px bg-[#C9A96E]" />
            <span className="text-[#C9A96E] text-[10px] tracking-[0.4em] uppercase font-medium">
              What We Do
            </span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight">
            Our <span className="text-[#C8446B] italic">Services</span>
          </h1>
          <p className="text-white/55 text-sm sm:text-base mt-3 max-w-lg leading-relaxed">
            Premium beauty and grooming for women and men. Every service delivered with care, precision, and excellence.
          </p>
        </div>
      </section>

      {/* ── Note strip ── */}
      <div className="bg-[#1A1A2E] border-y border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/35 text-xs tracking-wide text-center sm:text-left">
             Prices are starting rates and may vary based on hair length, complexity, or products used.
          </p>
          <button
            onClick={openBooking}
            className="shrink-0 inline-flex items-center gap-2 bg-[#C8446B] hover:bg-[#b03560] text-white text-xs font-semibold tracking-widest uppercase px-5 py-2 rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-[#C8446B]/30"
          >
            Book Now
          </button>
        </div>
      </div>

      {/* ── Categories ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col gap-24">
        {CATEGORIES.map((category, catIndex) => (
          <CategorySection
            key={category.id}
            category={category}
            index={catIndex}
            openBooking={openBooking}
          />
        ))}
      </div>

      {/* ── Bottom CTA ── */}
      <BottomCTA openBooking={openBooking} />
    </main>
  );
}

/* ─────────────────────────────────────────
   CATEGORY SECTION
───────────────────────────────────────── */
function CategorySection({
  category,
  index,
  openBooking,
}: {
  category: (typeof CATEGORIES)[number];
  index: number;
  openBooking: () => void;
}) {
  const { ref, visible } = useScrollReveal(0.08);
  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`flex flex-col lg:flex-row gap-10 lg:gap-16 items-start transition-all duration-700 ease-out ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      } ${!isEven ? 'lg:flex-row-reverse' : ''}`}
    >
      {/* ── Image side ── */}
      <div className="w-full lg:w-[38%] shrink-0">
        <div className="relative rounded-2xl overflow-hidden aspect-[4/3] group">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={category.image}
            alt={category.title}
            className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F1E]/60 to-transparent" />

          {/* For badge */}
          <div className="absolute top-4 left-4">
            <span className="text-[9px] tracking-widest uppercase font-semibold px-3 py-1.5 rounded-full bg-[#C8446B]/80 backdrop-blur-sm border border-[#C8446B]/40 text-white">
              {category.for}
            </span>
          </div>

          {/* Category number */}
          <div className="absolute bottom-4 right-4">
            <span className="font-heading text-5xl font-bold text-white/10 select-none">
              0{index + 1}
            </span>
          </div>
        </div>
      </div>

      {/* ── Services list side ── */}
      <div className="flex-1 min-w-0">
        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="w-6 h-px bg-[#C9A96E]" />
            <span className="text-[#C9A96E] text-[10px] tracking-[0.4em] uppercase font-medium">
              Category 0{index + 1}
            </span>
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
            {category.title}
          </h2>
          <p className="text-white/45 text-sm leading-relaxed">
            {category.subtitle}
          </p>
        </div>

        {/* Services table */}
        <div className="flex flex-col divide-y divide-white/[0.06]">
          {category.services.map((service, i) => (
            <div
              key={service.name}
              className="group flex items-center justify-between gap-4 py-3.5 hover:bg-white/[0.02] -mx-3 px-3 rounded-xl transition-all duration-200"
              style={{
                transitionDelay: visible ? `${i * 40}ms` : '0ms',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateX(0)' : 'translateX(-12px)',
                transition: `opacity 0.5s ease ${i * 40}ms, transform 0.5s ease ${i * 40}ms, background 0.2s ease`,
              }}
            >
              {/* Left — name + duration */}
              <div className="flex items-center gap-3 min-w-0">
                <span className="w-1 h-1 rounded-full bg-[#C8446B]/50 group-hover:bg-[#C8446B] transition-colors duration-200 shrink-0" />
                <div className="min-w-0">
                  <p className="text-white/80 group-hover:text-white text-sm font-medium transition-colors duration-200 truncate">
                    {service.name}
                  </p>
                  <p className="text-white/30 text-[11px] tracking-wide mt-0.5">
                    ⏱ {service.duration}
                  </p>
                </div>
              </div>

              {/* Right — price + book */}
              <div className="flex items-center gap-4 shrink-0">
                <span className="text-[#C9A96E] text-sm font-medium hidden sm:block">
                  {service.price}
                </span>
                <button
                  onClick={openBooking}
                  className="text-[10px] tracking-widest uppercase font-semibold text-white/30 group-hover:text-[#C8446B] border border-white/[0.08] group-hover:border-[#C8446B]/40 px-3 py-1.5 rounded-full transition-all duration-200"
                >
                  Book
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Book category CTA */}
        <div className="mt-7">
          <button
            onClick={openBooking}
            className="inline-flex items-center gap-2 bg-[#C8446B]/10 hover:bg-[#C8446B] border border-[#C8446B]/30 hover:border-[#C8446B] text-[#C8446B] hover:text-white text-xs font-semibold tracking-widest uppercase px-6 py-2.5 rounded-full transition-all duration-300 group"
          >
            Book {category.title}
            <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   BOTTOM CTA
───────────────────────────────────────── */
function BottomCTA({ openBooking }: { openBooking: () => void }) {
  const { ref, visible } = useScrollReveal(0.2);

  return (
    <section className="relative border-t border-white/[0.06] py-24 overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[300px] rounded-full bg-[#C8446B]/8 blur-[100px]" />
      </div>

      <div
        ref={ref}
        className={`relative max-w-2xl mx-auto px-4 text-center transition-all duration-700 ease-out ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="inline-flex items-center gap-3 mb-5">
          <span className="w-8 h-px bg-[#C9A96E]/70" />
          <span className="text-[#C9A96E] text-[10px] tracking-[0.4em] uppercase font-medium">
            Ready?
          </span>
          <span className="w-8 h-px bg-[#C9A96E]/70" />
        </div>

        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
          Not Sure What to Book?{' '}
          <span className="text-[#C8446B] italic">Just Ask.</span>
        </h2>

        <p className="text-white/40 text-sm leading-relaxed mb-8 max-w-md mx-auto">
          Send us a message and we'll help you pick the right service — no pressure, no fuss.
        </p>

        <button
          onClick={openBooking}
          className="group relative inline-flex items-center gap-2 bg-[#C8446B] hover:bg-[#b03560] text-white text-xs font-semibold tracking-[0.18em] uppercase px-7 py-3.5 rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-[#C8446B]/30 hover:-translate-y-0.5 overflow-hidden"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />
          <WhatsAppIcon className="w-3.5 h-3.5 relative z-10" />
          <span className="relative z-10">Book an Appointment</span>
        </button>
      </div>
    </section>
  );
}

/* ── WhatsApp Icon ── */
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.532 5.856L.057 23.57a.75.75 0 00.92.92l5.65-1.46A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.712 9.712 0 01-4.95-1.355l-.356-.212-3.668.948.975-3.584-.232-.369A9.712 9.712 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z" />
    </svg>
  );
}