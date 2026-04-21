'use client';

import Link from 'next/link';
import { useBooking } from '@/components/ui/BookingContext';

/* ─────────────────────────────────────────
   CONSTANTS
───────────────────────────────────────── */
const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

const SERVICES = [
  'Hair Styling & Braiding',
  'Nail Art & Manicure',
  'Facials & Skincare',
  'Eyebrows & Lashes',
  'Male Hair & Grooming',
];

const SOCIAL_LINKS = [
  {
    label: 'Facebook',
    href: 'https://facebook.com',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.514c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    label: 'TikTok',
    href: 'https://tiktok.com',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z" />
      </svg>
    ),
  },
];

const BUSINESS_HOURS = [
  { day: 'Mon – Fri', hours: '8:00 AM – 7:00 PM' },
  { day: 'Saturday', hours: '8:00 AM – 8:00 PM' },
  { day: 'Sunday', hours: '10:00 AM – 5:00 PM' },
];

/* ─────────────────────────────────────────
   COMPONENT
───────────────────────────────────────── */
export default function Footer() {
  const { openBooking } = useBooking(); // ✅ inside the component
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0F0F1E] text-white relative overflow-hidden">

      {/* ── Ambient glow top ── */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-[#C9A96E]/60 to-transparent" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#C8446B]/5 blur-3xl rounded-full pointer-events-none" />

      {/* ── Main Footer Grid ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

          {/* ── Col 1: Brand ── */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 group w-fit mb-5">
              <span className="w-[3px] h-9 bg-gradient-to-b from-[#C9A96E] to-[#C8446B] rounded-full transition-all duration-300 group-hover:h-11" />
              <div className="flex flex-col leading-tight">
                <span className="text-white font-bold text-sm tracking-[0.25em] uppercase">
                  Gallant
                </span>
                <span className="text-[#C8446B] text-[9px] tracking-[0.3em] uppercase font-medium">
                  Beauty House
                </span>
              </div>
            </Link>

            <p className="text-white/50 text-sm leading-relaxed mb-6 max-w-xs">
              Where beauty meets elegance. Premium hair, nail, and beauty services crafted for you in the heart of Lilongwe.
            </p>

            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-[#C8446B] hover:border-[#C8446B] transition-all duration-200"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* ── Col 2: Quick Links ── */}
          <div>
            <FooterHeading>Quick Links</FooterHeading>
            <ul className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 text-white/50 hover:text-white text-sm transition-colors duration-200"
                  >
                    <span className="w-0 h-px bg-[#C8446B] transition-all duration-300 group-hover:w-4" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Col 3: Services ── */}
          <div>
            <FooterHeading>Our Services</FooterHeading>
            <ul className="flex flex-col gap-3">
              {SERVICES.map((service) => (
                <li key={service}>
                  <Link
                    href="/services"
                    className="group flex items-center gap-2 text-white/50 hover:text-white text-sm transition-colors duration-200"
                  >
                    <span className="w-0 h-px bg-[#C9A96E] transition-all duration-300 group-hover:w-4" />
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Col 4: Contact & Hours ── */}
          <div>
            <FooterHeading>Find Us</FooterHeading>
            <ul className="flex flex-col gap-4 mb-7">

              {/* Location */}
              <li className="flex items-start gap-3">
                <span className="mt-0.5 text-[#C9A96E] shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-2.003 3.5-4.697 3.5-8.327a8.25 8.25 0 00-16.5 0c0 3.63 1.556 6.324 3.5 8.327a19.58 19.58 0 002.683 2.282 16.975 16.975 0 001.144.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                  </svg>
                </span>
                <span className="text-white/50 text-sm leading-relaxed">Lilongwe, Malawi</span>
              </li>

              {/* Phone */}
              <li className="flex items-center gap-3">
                <span className="text-[#C9A96E] shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.532 5.856L.057 23.57a.75.75 0 00.92.92l5.65-1.46A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.712 9.712 0 01-4.95-1.355l-.356-.212-3.668.948.975-3.584-.232-.369A9.712 9.712 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z" />
                  </svg>
                </span>
                <a
                  href="tel:+265998837985"
                  className="text-white/50 hover:text-[#C8446B] text-sm transition-colors duration-200"
                >
                  +265 998 837 985
                </a>
              </li>

              {/* Hours */}
              <li className="flex items-start gap-3">
                <span className="mt-0.5 text-[#C9A96E] shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clipRule="evenodd" />
                  </svg>
                </span>
                <div className="flex flex-col gap-1">
                  {BUSINESS_HOURS.map(({ day, hours }) => (
                    <div key={day} className="flex gap-2 text-sm">
                      <span className="text-white/35 w-24 shrink-0">{day}</span>
                      <span className="text-white/60">{hours}</span>
                    </div>
                  ))}
                </div>
              </li>
            </ul>

            {/* ── Book Now CTA ── */}
            <button
              onClick={openBooking}
              className="inline-flex items-center gap-2 border border-[#C8446B]/50 hover:border-[#C8446B] hover:bg-[#C8446B] text-[#C8446B] hover:text-white text-xs font-semibold tracking-widest uppercase px-5 py-2.5 rounded-full transition-all duration-200"
            >
              Book Now
            </button>
          </div>
        </div>

        {/* ── Bottom Bar ── */}
        <div className="mt-14 pt-6 border-t border-white/[0.07] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/25 text-xs tracking-wider">
            © {year} Gallant Beauty House. All rights reserved.
          </p>
          <p className="text-white/20 text-xs tracking-wider">
            <a
              href="https://ram-techs.online"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white/40 transition-colors duration-200"
            >
              Designed by Ramtech
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ── Small reusable heading ── */
function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-5">
      <h3 className="text-white text-xs font-semibold tracking-[0.25em] uppercase mb-2">
        {children}
      </h3>
      <div className="w-8 h-[2px] bg-gradient-to-r from-[#C8446B] to-[#C9A96E] rounded-full" />
    </div>
  );
}