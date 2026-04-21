'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

/* ─────────────────────────────────────────
   GALLERY DATA
   Place images in /public/images/gallery/
   Naming convention:
     women-hair-1.jpg, women-hair-2.jpg
     men-hair-1.jpg,   men-hair-2.jpg
     nails-1.jpg,      nails-2.jpg
───────────────────────────────────────── */
const CATEGORIES = [
  {
    id: 'women-hair',
    label: "Women's Hair",
    description: 'Braids, blowouts, colour & protective styles',
    images: [
      {
        src: '/images/gallery/women-hair-1.jpg',
        alt: "Women's hair styling at Gallant Beauty House",
        span: 'tall',   // tall card
      },
      {
        src: '/images/gallery/women-hair-2.jpg',
        alt: "Women's braiding at Gallant Beauty House",
        span: 'wide',  // wide card
      },
    ],
  },
  {
    id: 'men-hair',
    label: "Men's Hair",
    description: 'Cuts, fades, shape-ups & loc styling',
    images: [
      {
        src: '/images/gallery/men-hair-1.jpg',
        alt: "Men's haircut at Gallant Beauty House",
        span: 'wide',
      },
      {
        src: '/images/gallery/men-hair-2.jpg',
        alt: "Men's fade at Gallant Beauty House",
        span: 'tall',
      },
    ],
  },
  {
    id: 'nails',
    label: 'Nails',
    description: 'Gel, nail art, manicure & extensions',
    images: [
      {
        src: '/images/gallery/nails-1.jpg',
        alt: 'Nail art at Gallant Beauty House',
        span: 'tall',
      },
      {
        src: '/images/gallery/nails-2.jpg',
        alt: 'Manicure at Gallant Beauty House',
        span: 'wide',
      },
    ],
  },
];

/* ─────────────────────────────────────────
   SCROLL REVEAL HOOK
───────────────────────────────────────── */
function useScrollReveal(threshold = 0.15) {
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
   MAIN COMPONENT
───────────────────────────────────────── */
export default function GalleryPreview() {
  const [activeTab, setActiveTab] = useState(0);
  const [imageLoaded, setImageLoaded] = useState<Record<string, boolean>>({});
  const [lightbox, setLightbox] = useState<string | null>(null);
  const { ref: headerRef, visible: headerVisible } = useScrollReveal(0.2);
  const { ref: sectionRef, visible: sectionVisible } = useScrollReveal(0.05);

  const category = CATEGORIES[activeTab];

  const handleLoad = (src: string) =>
    setImageLoaded((prev) => ({ ...prev, [src]: true }));

  return (
    <>
      <section className="relative bg-[#0F0F1E] py-24 sm:py-32 overflow-hidden">

        {/* ── Background ── */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A96E]/30 to-transparent" />
        <div className="absolute -bottom-60 right-0 w-[500px] h-[500px] rounded-full bg-[#C8446B]/5 blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* ── Header ── */}
          <div
            ref={headerRef}
            className={`flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 transition-all duration-700 ease-out ${
              headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div>
              <div className="inline-flex items-center gap-3 mb-4">
                <span className="w-10 h-px bg-[#C9A96E]" />
                <span className="text-[#C9A96E] text-xs tracking-[0.35em] uppercase font-medium">
                  Our Work
                </span>
                <span className="w-10 h-px bg-[#C9A96E]" />
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white">
                Work That{' '}
                <span className="text-[#C8446B] italic">Speaks</span>
              </h2>
            </div>

            <Link
              href="/gallery"
              className="hidden md:inline-flex items-center gap-2 text-white/50 hover:text-white text-sm tracking-wider uppercase transition-colors duration-200 group shrink-0"
            >
              View Full Gallery
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </Link>
          </div>

          {/* ── Tabs ── */}
          <div
            className={`flex items-center gap-2 mb-8 transition-all duration-700 delay-100 ease-out ${
              headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            {/* Tab track */}
            <div className="flex items-center gap-1 bg-white/[0.04] border border-white/[0.08] rounded-full p-1 overflow-x-auto scrollbar-none">
              {CATEGORIES.map((cat, i) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(i)}
                  className={`relative shrink-0 px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-medium tracking-wider uppercase transition-all duration-300 ${
                    activeTab === i
                      ? 'bg-[#C8446B] text-white shadow-lg shadow-[#C8446B]/30'
                      : 'text-white/50 hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* ── Category description ── */}
          <p
            key={`desc-${activeTab}`}
            className="text-white/40 text-sm tracking-wide mb-8 animate-fade-in"
          >
            {category.description}
          </p>

          {/* ── Image Grid ── */}
          <div
            ref={sectionRef}
            key={`grid-${activeTab}`}
            className="grid grid-cols-2 gap-3 sm:gap-4"
            style={{ gridTemplateRows: 'auto' }}
          >
            {category.images.map((image, index) => (
              <div
                key={image.src}
                onClick={() => setLightbox(image.src)}
                className={`group relative overflow-hidden rounded-2xl cursor-pointer bg-white/[0.04] border border-white/[0.06]
                  ${image.span === 'tall' ? 'row-span-2' : 'col-span-1'}
                  transition-all duration-500 ease-out hover:border-[#C8446B]/40`}
                style={{
                  opacity: sectionVisible ? 1 : 0,
                  transform: sectionVisible ? 'translateY(0) scale(1)' : 'translateY(24px) scale(0.98)',
                  transition: `opacity 0.6s ease ${index * 120}ms, transform 0.6s ease ${index * 120}ms`,
                  aspectRatio: image.span === 'tall' ? '3/4' : '4/3',
                }}
              >
                {/* Skeleton shimmer */}
                {!imageLoaded[image.src] && (
                  <div className="absolute inset-0 bg-white/[0.03] animate-pulse" />
                )}

                {/* Image */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={image.src}
                  alt={image.alt}
                  onLoad={() => handleLoad(image.src)}
                  className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${
                    imageLoaded[image.src] ? 'opacity-100' : 'opacity-0'
                  }`}
                />

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F1E]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-400" />

                {/* Zoom icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white transform scale-75 group-hover:scale-100 transition-transform duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-4 h-4">
                      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                    </svg>
                  </div>
                </div>

                {/* Category label bottom-left */}
                <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  <span className="text-[10px] tracking-widest uppercase text-white/80 bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/10">
                    {category.label}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* ── Mobile: View Gallery CTA ── */}
          <div className="mt-10 flex justify-center md:hidden">
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 border border-white/20 hover:border-[#C8446B] text-white/70 hover:text-white text-sm font-medium tracking-wider uppercase px-7 py-3.5 rounded-full transition-all duration-300 group"
            >
              View Full Gallery
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Lightbox ── */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          {/* Close button */}
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#C8446B] text-white transition-all duration-200 z-10"
            aria-label="Close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="w-4 h-4">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={lightbox}
            alt="Gallery preview"
            className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* ── Keyframe styles ── */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.4s ease forwards;
        }
        .scrollbar-none::-webkit-scrollbar { display: none; }
        .scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </>
  );
}