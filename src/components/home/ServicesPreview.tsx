'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

/* ─────────────────────────────────────────
   SERVICES DATA
───────────────────────────────────────── */
const SERVICES = [
  {
    id: 'hair',
    title: 'Hair Styling',
    description:
      'From bold cuts and sleek blowouts to intricate braids and protective styles — for every hair type, every person.',
    tags: ['Braiding', 'Cuts', 'Blowouts', 'Colour', 'Loc Styling'],
    for: 'Women & Men',
  },
  {
    id: 'nails',
    title: 'Nails & Manicure',
    description:
      'Precision nail care, artistic designs, and long-lasting finishes. Clean, groomed nails for everyone.',
    tags: ['Gel Nails', 'Nail Art', 'Manicure', 'Pedicure', 'Nail Extensions'],
    for: 'Women & Men',
  },
  {
    id: 'facials',
    title: 'Facials & Skincare',
    description:
      'Rejuvenating treatments tailored to your skin type. Glow-up rituals that leave your skin fresh and radiant.',
    tags: ['Deep Cleanse', 'Glow Facial', 'Exfoliation', 'Moisturising'],
    for: 'Women & Men',
  },
  {
    id: 'makeup',
    title: 'Makeup & Glam',
    description:
      'Full glam, natural looks, or event-ready finishes. Our artists enhance your natural beauty for any occasion.',
    tags: ['Bridal Glam', 'Event Makeup', 'Natural Look', 'Contouring'],
    for: 'Women',
  },
  {
    id: 'eyebrows',
    title: 'Brows & Lashes',
    description:
      'Perfectly shaped brows and luscious lashes that frame your face and complete every look effortlessly.',
    tags: ['Brow Shaping', 'Tinting', 'Lash Extensions', 'Lash Lift'],
    for: 'Women',
  },
  {
    id: 'pedicure',
    title: 'Pedicure & Foot Care',
    description:
      'Relaxing, thorough foot treatments that leave your feet soft, clean, and perfectly groomed.',
    tags: ['Classic Pedicure', 'Spa Pedicure', 'Callus Removal', 'Nail Polish'],
    for: 'Women & Men',
  },
];

const WHATSAPP_LINK =
  'https://wa.me/265998837985?text=Hi%2C%20I%27d%20like%20to%20book%20an%20appointment%20at%20Gallant%20Beauty%20House';

/* ─────────────────────────────────────────
   SCROLL ANIMATION HOOK
───────────────────────────────────────── */
function useScrollReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
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
export default function ServicesPreview() {
  const { ref: headerRef, visible: headerVisible } = useScrollReveal(0.2);
  const { ref: gridRef, visible: gridVisible } = useScrollReveal(0.05);

  return (
    <section className="relative bg-[#0F0F1E] py-24 sm:py-32 overflow-hidden">

      {/* ── Background decoration ── */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A96E]/30 to-transparent" />
      <div className="absolute -top-60 -right-60 w-[500px] h-[500px] rounded-full bg-[#C8446B]/5 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-60 -left-60 w-[500px] h-[500px] rounded-full bg-[#C9A96E]/5 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section Header ── */}
        <div
          ref={headerRef}
          className={`text-center mb-16 transition-all duration-700 ease-out ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="w-10 h-px bg-[#C9A96E]" />
            <span className="text-[#C9A96E] text-xs tracking-[0.35em] uppercase font-medium">
              What We Offer
            </span>
            <span className="w-10 h-px bg-[#C9A96E]" />
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Services Built for{' '}
            <span className="text-[#C8446B] italic">Everyone</span>
          </h2>

          <p className="text-white/50 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Premium beauty and grooming services for women and men.
            Every treatment is crafted with care, precision, and excellence.
          </p>
        </div>

        {/* ── Services Grid ── */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {SERVICES.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
              visible={gridVisible}
            />
          ))}
        </div>

        {/* ── Bottom CTAs ── */}
        <div
          className={`mt-16 flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 delay-500 ease-out ${
            gridVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <Link
            href="/services"
            className="inline-flex items-center gap-2 border border-white/20 hover:border-[#C8446B] text-white/70 hover:text-white text-sm font-medium tracking-wider uppercase px-7 py-3.5 rounded-full transition-all duration-300 group"
          >
            See All Services
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </Link>

          
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   SERVICE CARD
───────────────────────────────────────── */
function ServiceCard({
  service,
  index,
  visible,
}: {
  service: (typeof SERVICES)[number];
  index: number;
  visible: boolean;
}) {
  const num = String(index + 1).padStart(2, '0');
  const delay = index * 80; // stagger: 80ms apart

  return (
    <div
      className="group relative bg-white/[0.03] border border-white/[0.08] rounded-2xl p-7 overflow-hidden
                 hover:bg-white/[0.06] hover:border-[#C8446B]/30 hover:-translate-y-1
                 transition-all duration-500 ease-out"
      style={{
        transitionDelay: visible ? `${delay}ms` : '0ms',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(32px)',
      }}
    >
      {/* ── Subtle corner glow on hover ── */}
      <div className="absolute -top-12 -right-12 w-36 h-36 rounded-full bg-[#C8446B]/0 group-hover:bg-[#C8446B]/8 blur-2xl transition-all duration-500 pointer-events-none" />

      {/* ── Number ── */}
      <div className="flex items-start justify-between mb-5">
        <span className="font-heading text-4xl font-bold text-[#C9A96E]/25 group-hover:text-[#C9A96E]/50 transition-colors duration-300 leading-none select-none">
          {num}
        </span>

        {/* For badge — unified rose style */}
        <span className="text-[9px] tracking-widest uppercase font-semibold px-2.5 py-1 rounded-full bg-[#C8446B]/10 border border-[#C8446B]/25 text-[#C8446B]">
          {service.for}
        </span>
      </div>

      {/* ── Title ── */}
      <h3 className="font-heading text-xl font-semibold text-white mb-3 group-hover:text-white transition-colors">
        {service.title}
      </h3>

      {/* ── Description ── */}
      <p className="text-white/45 text-sm leading-relaxed mb-6">
        {service.description}
      </p>

      {/* ── Tags ── */}
      <div className="flex flex-wrap gap-2">
        {service.tags.map((tag) => (
          <span
            key={tag}
            className="text-[10px] tracking-wider uppercase text-white/30 bg-white/[0.05] border border-white/[0.07] px-2.5 py-1 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* ── Bottom rose line sweeps in on hover ── */}
      <div className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500 ease-out bg-gradient-to-r from-[#C8446B] to-[#C9A96E]" />
    </div>
  );
}