'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

/* ─────────────────────────────────────────
   TESTIMONIALS DATA
───────────────────────────────────────── */
const TESTIMONIALS = [
  {
    id: 1,
    name: 'Amara Phiri',
    service: "Women's Hair",
    review:
      'I came in for braids and honestly left speechless. The attention to detail was incredible — every single braid was perfect. This is my go-to salon from now on.',
    rating: 5,
    initial: 'A',
  },
  {
    id: 2,
    name: 'Tadiwanashe Banda',
    service: "Men's Hair",
    review:
      'Best fade I have ever gotten in Lilongwe. Clean, sharp, and the atmosphere was really relaxed. I was nervous as a first-timer but they made me feel right at home.',
    rating: 5,
    initial: 'T',
  },
  {
    id: 3,
    name: 'Grace Mwale',
    service: 'Nail Art',
    review:
      'My nails have never looked this good. The nail artist took her time and the design came out exactly how I wanted. Already booked my next appointment!',
    rating: 5,
    initial: 'G',
  },
  {
    id: 4,
    name: 'Chisomo Tembo',
    service: "Women's Hair",
    review:
      'Gallant Beauty House is on another level. The salon is clean, the staff are friendly, and the quality of work is outstanding. Highly recommend to everyone.',
    rating: 5,
    initial: 'C',
  },
  {
    id: 5,
    name: 'Brian Lungu',
    service: "Men's Hair",
    review:
      'I was skeptical at first but wow — the haircut was precise and clean. They really understand what a man wants. Will definitely be back every month.',
    rating: 5,
    initial: 'B',
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
   STAR RATING
───────────────────────────────────────── */
function Stars({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill={i < count ? '#C9A96E' : 'none'}
          stroke="#C9A96E"
          strokeWidth="1.5"
          className="w-3.5 h-3.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
          />
        </svg>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────── */
export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [animDir, setAnimDir] = useState<'left' | 'right'>('left');
  const [animating, setAnimating] = useState(false);
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const { ref: headerRef, visible: headerVisible } = useScrollReveal(0.2);
  const { ref: cardsRef, visible: cardsVisible } = useScrollReveal(0.1);

  const goTo = useCallback(
    (index: number, dir: 'left' | 'right' = 'left') => {
      if (animating || index === active) return;
      setAnimDir(dir);
      setAnimating(true);
      setTimeout(() => {
        setActive(index);
        setAnimating(false);
      }, 300);
    },
    [active, animating]
  );

  const next = useCallback(() => {
    goTo((active + 1) % TESTIMONIALS.length, 'left');
  }, [active, goTo]);

  const prev = useCallback(() => {
    goTo(
      (active - 1 + TESTIMONIALS.length) % TESTIMONIALS.length,
      'right'
    );
  }, [active, goTo]);

  useEffect(() => {
    autoRef.current = setInterval(next, 5000);
    return () => { if (autoRef.current) clearInterval(autoRef.current); };
  }, [next]);

  const pauseAuto = () => { if (autoRef.current) clearInterval(autoRef.current); };
  const resumeAuto = () => { autoRef.current = setInterval(next, 5000); };

  const onDragStart = (x: number) => { setDragging(true); setDragStartX(x); pauseAuto(); };
  const onDragEnd = (x: number) => {
    if (!dragging) return;
    setDragging(false);
    const diff = dragStartX - x;
    if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
    resumeAuto();
  };

  const featuredLeft = TESTIMONIALS[(active - 1 + TESTIMONIALS.length) % TESTIMONIALS.length];
  const featuredCenter = TESTIMONIALS[active];
  const featuredRight = TESTIMONIALS[(active + 1) % TESTIMONIALS.length];

  return (
    <section className="relative bg-[#1A1A2E] py-24 sm:py-32 overflow-hidden">

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C8446B]/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A96E]/20 to-transparent" />
      <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[#C8446B]/[0.04] blur-3xl pointer-events-none" />

    

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div
          ref={headerRef}
          className={`text-center mb-16 transition-all duration-700 ease-out ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="w-10 h-px bg-[#C9A96E]" />
            <span className="text-[#C9A96E] text-xs tracking-[0.35em] uppercase font-medium">
              Client Love
            </span>
            <span className="w-10 h-px bg-[#C9A96E]" />
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            What Our Clients{' '}
            <span className="text-[#C8446B] italic">Say</span>
          </h2>
          <p className="text-white/50 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Real words from real clients. Their experience speaks better than anything we could say ourselves.
          </p>
        </div>

        {/* Desktop 3-card */}
        <div
          className={`hidden md:block transition-all duration-700 ease-out ${
            cardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          onMouseEnter={pauseAuto}
          onMouseLeave={resumeAuto}
        >
          <div className="grid grid-cols-3 gap-5 items-center">
            <TestimonialCard
              testimonial={featuredLeft}
              state="side"
              onClick={() => goTo(
                (active - 1 + TESTIMONIALS.length) % TESTIMONIALS.length,
                'right'
              )}
            />
            <TestimonialCard
              testimonial={featuredCenter}
              state="center"
              animating={animating}
              animDir={animDir}
            />
            <TestimonialCard
              testimonial={featuredRight}
              state="side"
              onClick={() => goTo((active + 1) % TESTIMONIALS.length, 'left')}
            />
          </div>
        </div>

        {/* Mobile single card — FIXED WITH min-h AND flex */}
        <div
          ref={cardsRef}
          className={`md:hidden min-h-[420px] flex items-center justify-center transition-all duration-700 ease-out ${
            cardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          onTouchStart={(e) => onDragStart(e.touches[0].clientX)}
          onTouchEnd={(e) => onDragEnd(e.changedTouches[0].clientX)}
          onMouseDown={(e) => onDragStart(e.clientX)}
          onMouseUp={(e) => onDragEnd(e.clientX)}
        >
          <div className="w-full">
            <TestimonialCard
              testimonial={featuredCenter}
              state="center"
              animating={animating}
              animDir={animDir}
            />
          </div>
        </div>

        {/* Controls */}
        <div className="mt-10 flex items-center justify-center gap-6">
          <button
            onClick={prev}
            aria-label="Previous testimonial"
            className="w-10 h-10 rounded-full border border-white/15 hover:border-[#C8446B] text-white/40 hover:text-white flex items-center justify-center transition-all duration-200 hover:bg-[#C8446B]/10"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-4 h-4">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <div className="flex items-center gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i, i > active ? 'left' : 'right')}
                aria-label={`Go to testimonial ${i + 1}`}
                className={`rounded-full transition-all duration-400 ${
                  i === active
                    ? 'w-6 h-2 bg-[#C8446B]'
                    : 'w-2 h-2 bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>

          <button
            onClick={next}
            aria-label="Next testimonial"
            className="w-10 h-10 rounded-full border border-white/15 hover:border-[#C8446B] text-white/40 hover:text-white flex items-center justify-center transition-all duration-200 hover:bg-[#C8446B]/10"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-4 h-4">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

        <div
          className={`mt-14 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-10 transition-all duration-700 delay-300 ease-out ${
            cardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
        
         
          
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   TESTIMONIAL CARD
───────────────────────────────────────── */
function TestimonialCard({
  testimonial,
  state,
  animating,
  animDir,
  onClick,
}: {
  testimonial: (typeof TESTIMONIALS)[number];
  state: 'center' | 'side';
  animating?: boolean;
  animDir?: 'left' | 'right';
  onClick?: () => void;
}) {
  const isCenter = state === 'center';

  return (
    <div
      onClick={onClick}
      className={`relative rounded-2xl border p-6 sm:p-8 flex flex-col gap-5 transition-all duration-500 ease-out select-none
        ${isCenter
          ? 'bg-white/[0.06] border-[#C8446B]/25 shadow-2xl shadow-black/40 scale-100 z-10'
          : 'bg-white/[0.02] border-white/[0.06] scale-95 opacity-50 cursor-pointer hover:opacity-70'
        }
        ${animating && isCenter
          ? animDir === 'left'
            ? 'animate-slide-from-right'
            : 'animate-slide-from-left'
          : ''
        }
      `}
    >
      <div className="font-heading text-5xl text-[#C8446B]/20 leading-none select-none -mb-2">
        "
      </div>

      <p className={`leading-relaxed ${isCenter ? 'text-white/80 text-base' : 'text-white/50 text-sm'}`}>
        {testimonial.review}
      </p>

      <Stars count={testimonial.rating} />

      <div className="flex items-center gap-3 mt-auto pt-2 border-t border-white/[0.06]">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-heading font-bold text-sm shrink-0 ${
          isCenter
            ? 'bg-gradient-to-br from-[#C8446B] to-[#C9A96E] text-white'
            : 'bg-white/10 text-white/50'
        }`}>
          {testimonial.initial}
        </div>
        <div>
          <p className={`font-semibold text-sm ${isCenter ? 'text-white' : 'text-white/50'}`}>
            {testimonial.name}
          </p>
          <p className="text-[#C9A96E]/70 text-xs tracking-wide">
            {testimonial.service}
          </p>
        </div>
      </div>

      {isCenter && (
        <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-[#C8446B]/10 to-transparent pointer-events-none" />
      )}

      <style jsx>{`
        @keyframes slideFromRight {
          from { opacity: 0; transform: translateX(40px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideFromLeft {
          from { opacity: 0; transform: translateX(-40px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .animate-slide-from-right { animation: slideFromRight 0.3s ease forwards; }
        .animate-slide-from-left  { animation: slideFromLeft  0.3s ease forwards; }
      `}</style>
    </div>
  );
}