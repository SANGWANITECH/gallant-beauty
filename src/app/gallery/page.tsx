'use client';

import { useEffect, useRef, useState } from 'react';
import { useBooking } from '@/components/ui/BookingContext';

/* ─────────────────────────────────────────
   GALLERY DATA
   5 women's hair + 5 nails + 3 men's hair = 13 total
───────────────────────────────────────── */
const GALLERY_CATEGORIES = [
  {
    id: 'all',
    label: 'All Work',
  },
  {
    id: 'womens-hair',
    label: "Women's Hair",
  },
  {
    id: 'nails',
    label: 'Nails',
  },
  {
    id: 'mens-hair',
    label: "Men's Hair",
  },
];

const GALLERY_IMAGES = [
  // Women's Hair — 5 images
  { id: 1, category: 'womens-hair', src: '/images/gallery/womens-hair-1.jpg', alt: 'Box braids', span: 2 },
  { id: 2, category: 'womens-hair', src: '/images/gallery/womens-hair-2.jpg', alt: 'Knotless braids' },
  { id: 3, category: 'womens-hair', src: '/images/gallery/womens-hair-3.jpg', alt: 'Blowout styling', span: 2 },
  { id: 4, category: 'womens-hair', src: '/images/gallery/womens-hair-4.jpg', alt: 'Cornrows' },
  { id: 5, category: 'womens-hair', src: '/images/gallery/womens-hair-5.jpg', alt: 'Weave installation' },

  // Nails — 5 images
  { id: 6, category: 'nails', src: '/images/gallery/nails-1.jpg', alt: 'Gel nails', span: 2 },
  { id: 7, category: 'nails', src: '/images/gallery/nails-2.jpg', alt: 'Nail art' },
  { id: 8, category: 'nails', src: '/images/gallery/nails-3.jpg', alt: 'Manicure', span: 2 },
  { id: 9, category: 'nails', src: '/images/gallery/nails-4.jpg', alt: 'Acrylic extensions' },
  { id: 10, category: 'nails', src: '/images/gallery/nails-5.jpg', alt: 'Pedicure' },

  // Men's Hair — 3 images
  { id: 11, category: 'mens-hair', src: '/images/gallery/men-hair-1.jpg', alt: 'Fade haircut', span: 2 },
  { id: 12, category: 'mens-hair', src: '/images/gallery/men-hair-2.jpg', alt: 'Barber cut' },
  { id: 13, category: 'mens-hair', src: '/images/gallery/men-hair-3.jpg', alt: 'Shape-up' },
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
export default function GalleryPage() {
  const { openBooking } = useBooking();
  const [activeTab, setActiveTab] = useState('all');
  const [imageLoaded, setImageLoaded] = useState<Record<number, boolean>>({});
  const [lightbox, setLightbox] = useState<(typeof GALLERY_IMAGES)[number] | null>(null);

  const { ref: headerRef, visible: headerVisible } = useScrollReveal(0.2);
  const { ref: gridRef, visible: gridVisible } = useScrollReveal(0.05);

  const filteredImages =
    activeTab === 'all'
      ? GALLERY_IMAGES
      : GALLERY_IMAGES.filter((img) => img.category === activeTab);

  const handleLoad = (id: number) =>
    setImageLoaded((prev) => ({ ...prev, [id]: true }));

  return (
    <main className="bg-[#0F0F1E] min-h-screen">

      {/* ── Hero Banner ── */}
      <section className="relative h-[45vh] min-h-[300px] max-h-[480px] overflow-hidden">
        {/* BG image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/gallery/gallery-hero.jpg"
          alt="Gallant Beauty House Portfolio"
          className="w-full h-full object-cover object-center scale-105"
        />
        {/* Overlays */}
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F1E] via-[#0F0F1E]/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F0F1E]/50 to-transparent" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="w-8 h-px bg-[#C9A96E]" />
            <span className="text-[#C9A96E] text-[10px] tracking-[0.4em] uppercase font-medium">
              Our Work
            </span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight">
            Gallery of <span className="text-[#C8446B] italic">Beauty</span>
          </h1>
          <p className="text-white/55 text-sm sm:text-base mt-3 max-w-lg leading-relaxed">
            Explore our portfolio of stunning transformations across hair and nails.
          </p>
        </div>
      </section>

      {/* ── Main Content ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* ── Header + Tabs ── */}
        <div
          ref={headerRef}
          className={`mb-12 transition-all duration-700 ease-out ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-8">
            <div>
              <p className="text-white/40 text-xs tracking-[0.3em] uppercase mb-2">
                Browse our latest work
              </p>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white">
                Filter by Category
              </h2>
            </div>
            
          </div>

          {/* Tab buttons */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {GALLERY_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`shrink-0 px-4 sm:px-5 py-2 rounded-full text-xs font-medium tracking-wider uppercase transition-all duration-300 ${
                  activeTab === cat.id
                    ? 'bg-[#C8446B] text-white shadow-lg shadow-[#C8446B]/30'
                    : 'bg-white/[0.04] border border-white/[0.08] text-white/50 hover:text-white hover:border-white/[0.15]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Masonry Grid ── */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 auto-rows-[200px] sm:auto-rows-[240px]"
        >
          {filteredImages.map((image, index) => (
            <div
              key={image.id}
              onClick={() => setLightbox(image)}
              className={`group relative overflow-hidden rounded-xl cursor-pointer bg-white/[0.04] border border-white/[0.06] hover:border-[#C8446B]/30 transition-all duration-500 ${
                image.span ? `sm:col-span-${image.span} sm:row-span-${image.span}` : ''
              }`}
              style={{
                opacity: gridVisible ? 1 : 0,
                transform: gridVisible ? 'translateY(0)' : 'translateY(16px)',
                transitionDelay: `${index * 40}ms`,
                transition: `opacity 0.5s ease, transform 0.5s ease`,
                ...(image.span && {
                  gridColumn: `span ${image.span}`,
                  gridRow: `span ${image.span}`,
                }),
              }}
            >
              {/* Skeleton shimmer */}
              {!imageLoaded[image.id] && (
                <div className="absolute inset-0 bg-gradient-to-r from-white/[0.03] via-white/[0.08] to-white/[0.03] animate-pulse" />
              )}

              {/* Image */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image.src}
                alt={image.alt}
                onLoad={() => handleLoad(image.id)}
                className={`w-full h-full object-cover object-center transition-all duration-700 group-hover:scale-110 ${
                  imageLoaded[image.id] ? 'opacity-100' : 'opacity-0'
                }`}
              />

              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F1E]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-400" />

              {/* Zoom icon */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white transform scale-75 group-hover:scale-100 transition-transform duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    className="w-5 h-5"
                  >
                    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                  </svg>
                </div>
              </div>

              {/* Category label */}
              <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                <span className="text-[9px] tracking-widest uppercase text-white/80 bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/10">
                  {GALLERY_CATEGORIES.find((c) => c.id === image.category)?.label}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {filteredImages.length === 0 && (
          <div className="text-center py-16">
            <p className="text-white/40 text-sm">No images found in this category yet.</p>
          </div>
        )}
      </div>

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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              className="w-4 h-4"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={lightbox.src}
            alt={lightbox.alt}
            className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl animate-zoom-in"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* ── Bottom CTA ── */}
      <section className="relative border-t border-white/[0.06] py-20 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[400px] h-[300px] rounded-full bg-[#C8446B]/8 blur-[100px]" />
        </div>

        <div className="relative max-w-2xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-[#C9A96E]/70" />
            <span className="text-[#C9A96E] text-[10px] tracking-[0.4em] uppercase font-medium">
              Love what you see?
            </span>
            <span className="w-8 h-px bg-[#C9A96E]/70" />
          </div>

          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 leading-tight">
            Ready for Your <span className="text-[#C8446B] italic">Transformation</span>?
          </h2>

          <p className="text-white/40 text-sm leading-relaxed mb-7">
            Book your appointment now and join our gallery of beautiful results.
          </p>

          <button
            onClick={openBooking}
            className="group relative inline-flex items-center gap-2 bg-[#C8446B] hover:bg-[#b03560] text-white text-xs font-semibold tracking-[0.18em] uppercase px-7 py-3.5 rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-[#C8446B]/30 hover:-translate-y-0.5 overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />
            <span className="relative z-10">Book an Appointment</span>
          </button>
        </div>
      </section>

      {/* ── Styles ── */}
      <style jsx>{`
        @keyframes zoomIn {
          from { opacity: 0; transform: scale(0.95); }
          to   { opacity: 1; transform: scale(1); }
        }
        .animate-zoom-in {
          animation: zoomIn 0.3s ease forwards;
        }
        .scrollbar-none::-webkit-scrollbar { display: none; }
        .scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </main>
  );
}