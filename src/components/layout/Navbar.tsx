'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useBooking } from '@/components/ui/BookingContext';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const { openBooking } = useBooking(); // ✅ inside the component
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('/');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setActiveLink(window.location.pathname);
  }, []);

  useEffect(() => {
    if (isMenuOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  return (
    <>
      {/* ── Header Bar ── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#1A1A2E]/98 backdrop-blur-md shadow-xl shadow-black/30'
            : 'bg-[#1A1A2E]'
        }`}
      >
        {/* Top gold accent line */}
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#C9A96E] to-transparent" />

        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">

            {/* ── Logo ── */}
            <Link
              href="/"
              className="flex items-center gap-3 group"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="w-[3px] h-9 bg-gradient-to-b from-[#C9A96E] to-[#C8446B] rounded-full transition-all duration-300 group-hover:h-11" />
              <div className="flex flex-col leading-tight">
                <span className="text-white font-bold text-sm md:text-base tracking-[0.25em] uppercase">
                  Gallant
                </span>
                <span className="text-[#C8446B] text-[9px] md:text-[11px] tracking-[0.3em] uppercase font-medium">
                  Beauty House
                </span>
              </div>
            </Link>

            {/* ── Desktop Nav Links ── */}
            <ul className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setActiveLink(link.href)}
                    className={`relative text-sm tracking-wider uppercase font-medium transition-colors duration-200 group ${
                      activeLink === link.href
                        ? 'text-white'
                        : 'text-white/70 hover:text-white'
                    }`}
                  >
                    {link.label}
                    <span
                      className={`absolute -bottom-1 left-0 h-px bg-[#C8446B] transition-all duration-300 ${
                        activeLink === link.href ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </Link>
                </li>
              ))}
            </ul>

            {/* ── Desktop CTA ── */}
            <div className="hidden md:block">
              <button
                onClick={openBooking}
                className="inline-flex items-center gap-2 bg-[#C8446B] hover:bg-[#b03560] text-white text-sm font-semibold tracking-wider uppercase px-5 py-2.5 rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-[#C8446B]/40 hover:-translate-y-px"
              >
                <WhatsAppIcon className="w-4 h-4" />
                Book Now
              </button>
            </div>

            {/* ── Mobile Hamburger ── */}
            <button
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="md:hidden relative flex flex-col justify-center items-center w-10 h-10 gap-[5px] focus:outline-none"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              <span className={`block w-6 h-[2px] bg-white rounded-full transition-all duration-300 origin-center ${isMenuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
              <span className={`block h-[2px] bg-white rounded-full transition-all duration-300 ${isMenuOpen ? 'w-0 opacity-0' : 'w-6 opacity-100'}`} />
              <span className={`block w-6 h-[2px] bg-white rounded-full transition-all duration-300 origin-center ${isMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
            </button>
          </div>
        </nav>
      </header>

      {/* ── Mobile Menu Overlay ── */}
      <div
        className={`md:hidden fixed inset-0 z-40 transition-all duration-300 ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          onClick={() => setIsMenuOpen(false)}
          className="absolute inset-0 bg-[#0B0B14]/90 backdrop-blur-xl"
        />

        {/* Ambient glows */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#C8446B]/10 blur-3xl rounded-full pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#C9A96E]/10 blur-3xl rounded-full pointer-events-none" />

        {/* Floating Card */}
        <div className="absolute inset-0 flex items-center justify-center px-5">
          <div
            className={`relative w-full max-w-sm bg-white/[0.06] border border-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl shadow-black/60 p-8 transition-all duration-500 ${
              isMenuOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-6'
            }`}
          >
            {/* ── X Close Button ── */}
            <button
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close menu"
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#C8446B] text-white/50 hover:text-white transition-all duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="w-3.5 h-3.5">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* ── Brand Header ── */}
            <div className="text-center mb-7">
              <div className="flex items-center justify-center gap-2 mb-3">
                <span className="w-8 h-px bg-gradient-to-r from-transparent to-[#C9A96E]/60" />
                <span className="w-1 h-1 rounded-full bg-[#C9A96E]" />
                <span className="w-8 h-px bg-gradient-to-l from-transparent to-[#C9A96E]/60" />
              </div>
              <p className="text-white text-base font-bold tracking-[0.25em] uppercase">Gallant</p>
              <p className="text-[#C8446B] text-[9px] tracking-[0.35em] uppercase mt-0.5">Beauty House</p>
            </div>

            {/* ── Nav Links ── */}
            <nav className="flex flex-col gap-1 mb-7">
              {NAV_LINKS.map((link, index) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => { setActiveLink(link.href); setIsMenuOpen(false); }}
                  style={{ transitionDelay: isMenuOpen ? `${100 + index * 55}ms` : '0ms' }}
                  className={`group flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 ${
                    activeLink === link.href
                      ? 'bg-[#C8446B]/15 text-[#C8446B] border border-[#C8446B]/20'
                      : 'text-white/65 hover:text-white hover:bg-white/5 border border-transparent'
                  } ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
                >
                  <span className="text-sm tracking-[0.18em] uppercase font-medium">
                    {link.label}
                  </span>
                  {activeLink === link.href ? (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C8446B]" />
                  ) : (
                    <span className="text-white/0 group-hover:text-white/50 text-sm transition-all duration-200 group-hover:translate-x-0.5">→</span>
                  )}
                </Link>
              ))}
            </nav>

            {/* ── Divider ── */}
            <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6" />

            {/* ── Book Now CTA — opens modal ── */}
            <button
              onClick={() => { setIsMenuOpen(false); openBooking(); }}
              style={{ transitionDelay: isMenuOpen ? '390ms' : '0ms' }}
              className={`flex items-center justify-center gap-2 w-full bg-[#C8446B] hover:bg-[#b03560] text-white font-semibold tracking-widest uppercase py-3.5 rounded-full text-sm transition-all duration-300 shadow-lg shadow-[#C8446B]/25 hover:shadow-[#C8446B]/40 hover:-translate-y-px ${
                isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
            >
              <WhatsAppIcon className="w-4 h-4" />
              Book Appointment
            </button>

            {/* ── Location ── */}
            <p
              style={{ transitionDelay: isMenuOpen ? '440ms' : '0ms' }}
              className={`text-center text-white/25 text-[10px] mt-5 tracking-widest uppercase transition-all duration-300 ${
                isMenuOpen ? 'opacity-100' : 'opacity-0'
              }`}
            >
              Lilongwe, Malawi
            </p>
          </div>
        </div>
      </div>
    </>
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