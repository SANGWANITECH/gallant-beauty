'use client';

import { useEffect, useRef, useState } from 'react';
import { useBooking } from '@/components/ui/BookingContext';

function useScrollReveal(threshold = 0.2) {
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

export default function CallToAction() {
  const { openBooking } = useBooking(); // ✅ inside component
  const { ref, visible } = useScrollReveal(0.2);

  return (
    <section className="relative bg-[#0F0F1E] py-28 overflow-hidden">

      {/* ── Top rule ── */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C9A96E]/40 to-transparent" />

      {/* ── Ambient glow ── */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-[560px] h-[320px] rounded-full bg-[#C8446B]/10 blur-[100px]" />
      </div>

      {/* ── Content ── */}
      <div ref={ref} className="relative max-w-3xl mx-auto px-6 text-center">

        {/* Eyebrow */}
        <div className={`inline-flex items-center gap-3 mb-5 transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <span className="w-8 h-px bg-[#C9A96E]/70" />
          <span className="text-[#C9A96E] text-[10px] tracking-[0.4em] uppercase font-medium">Ready to Glow?</span>
          <span className="w-8 h-px bg-[#C9A96E]/70" />
        </div>

        {/* Headline */}
        <h2 className={`font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-[1.08] mb-5 transition-all duration-700 delay-100 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          Your Best Look Is{' '}
          <span className="text-[#C8446B] italic">One Booking Away.</span>
        </h2>

        {/* Subtext */}
        <p className={`text-white/45 text-[15px] leading-relaxed max-w-md mx-auto mb-10 transition-all duration-700 delay-150 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          Fill in your details and we'll confirm your slot via WhatsApp.
          Fast, friendly, and no hassle.
        </p>

        {/* ── Buttons ── */}
        <div className={`flex flex-col sm:flex-row items-center justify-center gap-3 mb-12 transition-all duration-700 delay-200 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>

          {/* Primary — opens booking modal */}
          <button
            onClick={openBooking}
            className="group relative inline-flex items-center gap-2 bg-[#C8446B] hover:bg-[#b03560] text-white text-xs font-semibold tracking-[0.18em] uppercase px-6 py-3 rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-[#C8446B]/30 hover:-translate-y-0.5 overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />
            <WhatsAppIcon className="w-3.5 h-3.5 shrink-0 relative z-10" />
            <span className="relative z-10">Book Appointment</span>
          </button>

          {/* Secondary — call */}
          <a
            href="tel:+265998837985"
            className="inline-flex items-center gap-2 border border-white/12 hover:border-white/30 text-white/50 hover:text-white/90 text-xs font-medium tracking-[0.18em] uppercase px-6 py-3 rounded-full transition-all duration-300 hover:bg-white/[0.04]"
          >
            <PhoneIcon className="w-3.5 h-3.5 shrink-0" />
            Call Us
          </a>
        </div>

        {/* ── Trust pills ── */}
        <div className={`flex flex-wrap items-center justify-center gap-2 transition-all duration-700 delay-300 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {[
            { icon: '', text: 'No Booking Fee' },
            { icon: '', text: 'Fast Response' },
            { icon: '', text: 'Open 7 Days' },
            { icon: '', text: 'Lilongwe, Malawi' },
          ].map((item) => (
            <span
              key={item.text}
              className="inline-flex items-center gap-1.5 text-[10px] tracking-widest uppercase text-white/30 bg-white/[0.04] border border-white/[0.07] px-3 py-1.5 rounded-full"
            >
              <span className="text-[#C9A96E] text-[9px]">{item.icon}</span>
              {item.text}
            </span>
          ))}
        </div>

        {/* ── Brand sign-off ── */}
        
      </div>
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

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 .18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
    </svg>
  );
}