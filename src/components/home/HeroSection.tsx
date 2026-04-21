'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useBooking } from '@/components/ui/BookingContext';

const SLIDES = [
  {
    src: '/images/hero/hero-1.jpg',
    alt: 'Gallant Beauty House — Hair Styling',
    tag: 'Hair & Braiding',
  },
  {
    src: '/images/hero/hero-2.jpg',
    alt: 'Gallant Beauty House — Nail Art',
    tag: 'Men Hair Braids',
  },
  {
    src: '/images/hero/hero-3.jpg',
    alt: 'Gallant Beauty House — Makeup & Glam',
    tag: 'Nails & Manicure',
  },
];

const INTERVAL = 5000;

export default function HeroSection() {
  const { openBooking } = useBooking(); // ✅ inside component
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [transitioning, setTransitioning] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      if (transitioning || index === current) return;
      setPrev(current);
      setTransitioning(true);
      setCurrent(index);
      setTimeout(() => { setPrev(null); setTransitioning(false); }, 1000);
    },
    [current, transitioning]
  );

  const next = useCallback(() => {
    goTo((current + 1) % SLIDES.length);
  }, [current, goTo]);

  useEffect(() => {
    const timer = setInterval(next, INTERVAL);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="relative w-full h-screen min-h-[600px] max-h-[1000px] overflow-hidden">

      {/* ── Background Images ── */}
      {SLIDES.map((slide, i) => (
        <div
          key={slide.src}
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          style={{
            opacity: i === current ? 1 : i === prev ? 0 : 0,
            zIndex: i === current ? 1 : i === prev ? 0 : -1,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={slide.src}
            alt={slide.alt}
            className="w-full h-full object-cover object-center"
            style={{
              transform: i === current ? 'scale(1.05)' : 'scale(1)',
              transition: 'transform 6s ease-out',
            }}
          />
        </div>
      ))}

      {/* ── Overlays ── */}
      <div className="absolute inset-0 bg-black/50 z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F1E] via-[#0F0F1E]/30 to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0F0F1E]/60 via-transparent to-transparent z-10" />

      {/* ── Content ── */}
      <div className="relative z-20 h-full flex flex-col justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">

          {/* Service tag */}
          <div key={`tag-${current}`} className="inline-flex items-center gap-2 mb-6 animate-fade-in">
            <span className="w-8 h-px bg-[#C9A96E]" />
            <span className="text-[#C9A96E] text-xs tracking-[0.35em] uppercase font-medium">
              {SLIDES[current].tag}
            </span>
          </div>

          {/* Headline */}
          <h1
            key={`h1-${current}`}
            className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-6 animate-slide-up"
          >
            Your Beauty,{' '}
            <span className="text-[#C8446B] italic">Elevated.</span>
          </h1>

          {/* Sub-headline */}
          <p
            key={`sub-${current}`}
            className="text-white/70 text-base sm:text-lg leading-relaxed mb-10 max-w-lg animate-slide-up-delay"
          >
            Lilongwe's premier destination for luxury hair, nails, and beauty.
            Walk in. Transform. Leave unforgettable.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">

            {/* Primary — opens booking modal */}
            <button
              onClick={openBooking}
              className="inline-flex items-center gap-2.5 bg-[#C8446B] hover:bg-[#b03560] text-white font-semibold tracking-wider uppercase px-7 py-3.5 rounded-full transition-all duration-200 hover:shadow-xl hover:shadow-[#C8446B]/30 hover:-translate-y-0.5 text-sm"
            >
              <WhatsAppIcon className="w-4 h-4" />
              Book Appointment
            </button>

            {/* Secondary — View Services */}
            <Link
              href="/services"
              className="inline-flex items-center gap-2 border border-white/30 hover:border-white text-white text-sm font-semibold tracking-wider uppercase px-12 py-4 rounded-full transition-all duration-200 hover:bg-white/10"
            >
              View Services
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* ── Slide Indicators ── */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`transition-all duration-500 rounded-full ${
              i === current ? 'w-8 h-1.5 bg-[#C8446B]' : 'w-1.5 h-1.5 bg-white/30 hover:bg-white/60'
            }`}
          />
        ))}
      </div>

      {/* ── Slide Counter ── */}
      <div className="absolute bottom-10 right-8 z-20 hidden md:flex items-center gap-2">
        <span className="text-white font-bold text-sm tabular-nums">0{current + 1}</span>
        <span className="w-10 h-px bg-white/20" />
        <span className="text-white/30 text-sm tabular-nums">0{SLIDES.length}</span>
      </div>

      {/* ── Scroll indicator ── */}
      <div className="absolute bottom-10 left-8 z-20 hidden md:flex flex-col items-center gap-2">
        <span className="text-white/30 text-[10px] tracking-[0.25em] uppercase rotate-180 [writing-mode:vertical-lr]">Scroll</span>
        <span className="w-px h-10 bg-gradient-to-b from-white/30 to-transparent animate-pulse" />
      </div>

      {/* ── Progress bar ── */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/10 z-20">
        <div key={`progress-${current}`} className="h-full bg-gradient-to-r from-[#C8446B] to-[#C9A96E] animate-progress" />
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes progress {
          from { width: 0%; }
          to   { width: 100%; }
        }
        .animate-fade-in { animation: fadeIn 0.8s ease forwards; }
        .animate-slide-up { animation: slideUp 0.8s ease forwards; }
        .animate-slide-up-delay { animation: slideUp 0.8s ease 0.15s both; }
        .animate-progress { animation: progress ${INTERVAL}ms linear forwards; }
      `}</style>
    </section>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.532 5.856L.057 23.57a.75.75 0 00.92.92l5.65-1.46A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.712 9.712 0 01-4.95-1.355l-.356-.212-3.668.948.975-3.584-.232-.369A9.712 9.712 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z" />
    </svg>
  );
}