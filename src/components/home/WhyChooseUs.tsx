'use client';

import { useEffect, useRef, useState } from 'react';

/* ─────────────────────────────────────────
   REASONS DATA
───────────────────────────────────────── */
const REASONS = [
  {
    number: '01',
    title: 'Expert Stylists',
    description:
      'Our team are trained professionals with years of hands-on experience. Every service is delivered with skill, care, and attention to detail.',
  },
  {
    number: '02',
    title: 'Premium Products Only',
    description:
      'We use only high-quality, skin and hair-safe products. Your health and results matter — we never cut corners on what touches you.',
  },
  {
    number: '03',
    title: 'Welcoming to All',
    description:
      'Whether you\'re a woman, man, or visiting for the first time — you\'re welcome here. We create a comfortable space for everyone.',
  },
  {
    number: '04',
    title: 'Precision & Detail',
    description:
      'From your first consultation to the final finish, we obsess over every detail. You leave looking exactly how you imagined — or better.',
  },
  {
    number: '05',
    title: 'Relaxed Atmosphere',
    description:
      'Step in and unwind. Our salon is designed to feel like a retreat — calm, clean, and inviting from the moment you walk through the door.',
  },
  {
    number: '06',
    title: 'Easy WhatsApp Booking',
    description:
      'No complicated booking systems. Just send us a WhatsApp message and we\'ll sort your appointment quickly and hassle-free.',
  },
];

/* ─────────────────────────────────────────
   STATS
───────────────────────────────────────── */
const STATS = [
  { value: '500+', label: 'Happy Clients' },
  { value: '6+',   label: 'Services Offered' },
  { value: '100%', label: 'Satisfaction Focus' },
  { value: '7',    label: 'Days a Week' },
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
export default function WhyChooseUs() {
  const { ref: headerRef, visible: headerVisible } = useScrollReveal(0.2);
  const { ref: statsRef, visible: statsVisible } = useScrollReveal(0.15);
  const { ref: gridRef, visible: gridVisible } = useScrollReveal(0.05);

  return (
    <section className="relative bg-[#1A1A2E] py-24 sm:py-32 overflow-hidden">

      {/* ── Background decoration ── */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C8446B]/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A96E]/20 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#C8446B]/[0.03] blur-3xl pointer-events-none" />

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
              Why Gallant
            </span>
            <span className="w-10 h-px bg-[#C9A96E]" />
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            The Gallant{' '}
            <span className="text-[#C8446B] italic">Difference</span>
          </h2>

          <p className="text-white/50 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            We don't just do beauty — we deliver an experience. Here's what
            sets Gallant Beauty House apart from the rest.
          </p>
        </div>

        {/* ── Stats Bar ── */}
        <div
          ref={statsRef}
          className={`grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.06] rounded-2xl overflow-hidden mb-20 border border-white/[0.06] transition-all duration-700 ease-out ${
            statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className="bg-[#1A1A2E] flex flex-col items-center justify-center py-8 px-4 text-center group hover:bg-white/[0.04] transition-colors duration-300"
              style={{
                transitionDelay: statsVisible ? `${i * 80}ms` : '0ms',
              }}
            >
              <span className="font-heading text-3xl sm:text-4xl font-bold text-[#C8446B] mb-1 group-hover:scale-105 transition-transform duration-300 inline-block">
                {stat.value}
              </span>
              <span className="text-white/40 text-xs tracking-widest uppercase">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* ── Reasons Grid ── */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {REASONS.map((reason, index) => (
            <ReasonCard
              key={reason.number}
              reason={reason}
              index={index}
              visible={gridVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   REASON CARD
───────────────────────────────────────── */
function ReasonCard({
  reason,
  index,
  visible,
}: {
  reason: (typeof REASONS)[number];
  index: number;
  visible: boolean;
}) {
  return (
    <div
      className="group relative flex gap-5 p-6 rounded-2xl border border-white/[0.06]
                 bg-white/[0.02] hover:bg-white/[0.05] hover:border-[#C8446B]/25
                 transition-all duration-500 ease-out hover:-translate-y-0.5"
      style={{
        transitionDelay: visible ? `${index * 80}ms` : '0ms',
        opacity: visible ? 1 : 0,
        transform: visible
          ? 'translateY(0)'
          : 'translateY(28px)',
      }}
    >
      {/* Left: Number column */}
      <div className="shrink-0 pt-1">
        <span className="font-heading text-2xl font-bold text-[#C9A96E]/30 group-hover:text-[#C9A96E]/60 transition-colors duration-300 select-none">
          {reason.number}
        </span>
      </div>

      {/* Right: Content */}
      <div className="flex flex-col">
        {/* Title with animated underline */}
        <div className="mb-2 relative w-fit">
          <h3 className="font-heading text-base font-semibold text-white">
            {reason.title}
          </h3>
          <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-[#C8446B] group-hover:w-full transition-all duration-400 ease-out" />
        </div>

        <p className="text-white/45 text-sm leading-relaxed">
          {reason.description}
        </p>
      </div>

      {/* Corner accent dot */}
      <div className="absolute top-4 right-4 w-1.5 h-1.5 rounded-full bg-[#C8446B]/0 group-hover:bg-[#C8446B]/60 transition-all duration-300" />
    </div>
  );
}