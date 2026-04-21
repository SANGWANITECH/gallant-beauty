'use client';

import { useEffect, useRef, useState } from 'react';
import { useBooking } from '@/components/ui/BookingContext';
import { FiMapPin, FiMessageCircle, FiMail, FiSend, FiCheck } from 'react-icons/fi';

/* ─────────────────────────────────────────
   CONSTANTS
───────────────────────────────────────── */
const CONTACT_INFO = {
  address: 'Lilongwe Area 49, New Shire, Gulliver',
  phone: '+265 998 837 985',
  email: 'info@gallantbeautyhouse.com',
  hours: [
    { day: 'Mon – Fri', time: '8:00 AM – 7:00 PM' },
    { day: 'Saturday', time: '8:00 AM – 8:00 PM' },
    { day: 'Sunday', time: '10:00 AM – 5:00 PM' },
  ],
};

const CONTACT_METHODS = [
  {
    icon: FiMapPin,
    title: 'Visit Us',
    detail: CONTACT_INFO.address,
    link: 'https://www.google.com/maps/search/Lilongwe+Area+49+New+Shire+Gulliver',
    linkText: 'Get Directions',
  },
  {
    icon: FiMessageCircle,
    title: 'WhatsApp',
    detail: CONTACT_INFO.phone,
    link: `https://wa.me/265998837985`,
    linkText: 'Message Us',
  },
  {
    icon: FiMail,
    title: 'Email',
    detail: CONTACT_INFO.email,
    link: `mailto:${CONTACT_INFO.email}`,
    linkText: 'Send Email',
  },
];

type FormData = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

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
   PAGE
───────────────────────────────────────── */
export default function ContactPage() {
  const { openBooking } = useBooking();
  const [form, setForm] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const { ref: headerRef, visible: headerVisible } = useScrollReveal(0.2);
  const { ref: methodsRef, visible: methodsVisible } = useScrollReveal(0.1);
  const { ref: formRef, visible: formVisible } = useScrollReveal(0.1);
  const { ref: mapRef, visible: mapVisible } = useScrollReveal(0.1);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!form.name.trim()) newErrors.name = 'Please enter your name';
    if (!form.email.trim()) newErrors.email = 'Please enter your email';
    if (!form.phone.trim()) newErrors.phone = 'Please enter your phone number';
    if (!form.subject.trim()) newErrors.subject = 'Please enter a subject';
    if (!form.message.trim()) newErrors.message = 'Please enter your message';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const whatsappMessage = `
*Contact Form Submission — Gallant Beauty House*

*Name:* ${form.name}
*Email:* ${form.email}
*Phone:* ${form.phone}
*Subject:* ${form.subject}

*Message:*
${form.message}
    `.trim();

    const encoded = encodeURIComponent(whatsappMessage);
    window.open(`https://wa.me/265998837985?text=${encoded}`, '_blank');
    setSubmitted(true);
    setTimeout(() => {
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <main className="bg-[#0F0F1E] min-h-screen">

      {/* ── Hero Banner ── */}
      <section className="relative h-[40vh] min-h-[280px] max-h-[420px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#C8446B]/20 via-[#0F0F1E] to-[#1A1A2E]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F0F1E]/60 to-transparent" />
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 rounded-full bg-[#C8446B]/10 blur-3xl pointer-events-none" />

        <div className="absolute inset-0 flex flex-col justify-end max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="w-8 h-px bg-[#C9A96E]" />
            <span className="text-[#C9A96E] text-[10px] tracking-[0.4em] uppercase font-medium">
              Get in Touch
            </span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight">
            Let's <span className="text-[#C8446B] italic">Connect</span>
          </h1>
          <p className="text-white/55 text-sm sm:text-base mt-3 max-w-lg leading-relaxed">
            Have questions? Want to book? We're here to help. Reach out any way that works for you.
          </p>
        </div>
      </section>

      {/* ── Contact Methods ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div
          ref={methodsRef}
          className={`grid grid-cols-1 sm:grid-cols-3 gap-6 mb-20 transition-all duration-700 ease-out ${
            methodsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {CONTACT_METHODS.map((method, i) => {
            const Icon = method.icon;
            return (
              <a
                key={method.title}
                href={method.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{ transitionDelay: methodsVisible ? `${i * 100}ms` : '0ms' }}
                className="group relative p-6 rounded-2xl border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.06] hover:border-[#C8446B]/30 transition-all duration-300 flex flex-col gap-3 text-left"
              >
                {/* Icon */}
                <div className="w-10 h-10 rounded-lg bg-[#C8446B]/10 border border-[#C8446B]/20 flex items-center justify-center text-[#C8446B] group-hover:bg-[#C8446B] group-hover:text-white transition-all duration-300">
                  <Icon className="w-5 h-5" />
                </div>

                {/* Title */}
                <h3 className="font-heading text-lg font-semibold text-white group-hover:text-white transition-colors">
                  {method.title}
                </h3>

                {/* Detail */}
                <p className="text-white/50 text-sm leading-relaxed">
                  {method.detail}
                </p>

                {/* Link */}
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-[#C8446B] text-xs font-semibold tracking-widest uppercase transition-all duration-200">
                    {method.linkText}
                  </span>
                  <span className="text-[#C8446B] text-sm group-hover:translate-x-1 transition-transform duration-200">
                    →
                  </span>
                </div>

                {/* Hover border */}
                <div className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-[#C8446B] to-transparent transition-all duration-500 rounded-full" />
              </a>
            );
          })}
        </div>

        {/* ── Main Content: Form + Map ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

          {/* ── Contact Form ── */}
          <div
            ref={formRef}
            className={`transition-all duration-700 ease-out ${
              formVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="mb-8">
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-2">
                Send us a Message
              </h2>
              <p className="text-white/45 text-sm">
                We'll get back to you as soon as possible.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">

              {/* Name */}
              <FormField label="Your Name" error={errors.name} required>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g. Amara Phiri"
                  className={inputClass(!!errors.name)}
                />
              </FormField>

              {/* Email */}
              <FormField label="Email Address" error={errors.email} required>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="e.g. amara@example.com"
                  className={inputClass(!!errors.email)}
                />
              </FormField>

              {/* Phone */}
              <FormField label="Phone Number" error={errors.phone} required>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="e.g. 0998 837 985"
                  className={inputClass(!!errors.phone)}
                />
              </FormField>

              {/* Subject */}
              <FormField label="Subject" error={errors.subject} required>
                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="e.g. Booking Inquiry"
                  className={inputClass(!!errors.subject)}
                />
              </FormField>

              {/* Message */}
              <FormField label="Message" error={errors.message} required>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us more..."
                  rows={5}
                  className={`${inputClass(!!errors.message)} resize-none`}
                />
              </FormField>

              {/* Submit */}
              <button
                type="submit"
                disabled={submitted}
                className="group relative w-full inline-flex items-center justify-center gap-2 bg-[#C8446B] hover:bg-[#b03560] disabled:bg-[#C8446B]/50 disabled:cursor-not-allowed text-white text-xs font-semibold tracking-[0.18em] uppercase py-3.5 rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-[#C8446B]/30 overflow-hidden mt-2"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />
                <span className="relative z-10 flex items-center gap-2">
                  {submitted ? (
                    <>
                      <FiCheck className="w-4 h-4" />
                      Sent to WhatsApp!
                    </>
                  ) : (
                    <>
                      <FiSend className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </span>
              </button>

              <p className="text-center text-white/25 text-[10px] tracking-wide">
                Your message will be sent to WhatsApp for instant response.
              </p>
            </form>
          </div>

          {/* ── Map + Hours ── */}
          <div className="flex flex-col gap-8">

            {/* Map */}
            <div
              ref={mapRef}
              className={`transition-all duration-700 ease-out ${
                mapVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="relative rounded-2xl overflow-hidden h-[400px] sm:h-[480px] border border-white/[0.08] shadow-lg">
                <iframe
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3828.2234234234234!2d33.7738!3d-13.9626!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sGallant%20Beauty%20House!5e0!3m2!1sen!2smw!4v1234567890"
                />
              </div>
              <p className="text-white/40 text-xs mt-3 text-center">
                Lilongwe Area 49, New Shire, Gulliver
              </p>
            </div>

            {/* Business Hours */}
            <div
              className={`transition-all duration-700 delay-100 ease-out ${
                mapVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6">
                <h3 className="font-heading text-lg font-semibold text-white mb-4">
                  Business Hours
                </h3>
                <div className="flex flex-col gap-3">
                  {CONTACT_INFO.hours.map(({ day, time }) => (
                    <div key={day} className="flex items-center justify-between">
                      <span className="text-white/50 text-sm">{day}</span>
                      <span className="text-white/80 text-sm font-medium">{time}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t border-white/[0.06]">
                  <p className="text-white/40 text-xs leading-relaxed flex items-start gap-2">
                    <span className="text-[#C8446B] mt-0.5 shrink-0">•</span>
                    For faster response, message us on WhatsApp during business hours.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Book CTA */}
            <button
              onClick={openBooking}
              className="group relative w-full inline-flex items-center justify-center gap-2 bg-[#C8446B]/10 hover:bg-[#C8446B] border border-[#C8446B]/30 hover:border-[#C8446B] text-[#C8446B] hover:text-white text-xs font-semibold tracking-widest uppercase px-6 py-3 rounded-full transition-all duration-300"
            >
              <span className="relative z-10">Quick Book</span>
              <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

/* ─────────────────────────────────────────
   FORM FIELD COMPONENT
───────────────────────────────────────── */
function FormField({
  label,
  error,
  required,
  children,
}: {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-white/60 text-[11px] tracking-widest uppercase font-medium">
        {label}
        {required && <span className="text-[#C8446B] ml-0.5">*</span>}
      </label>
      {children}
      {error && (
        <p className="text-[#C8446B] text-[10px] tracking-wide">{error}</p>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────
   INPUT STYLES
───────────────────────────────────────── */
function inputClass(hasError: boolean) {
  return `w-full bg-white/[0.04] border ${
    hasError ? 'border-[#C8446B]/60' : 'border-white/[0.08]'
  } text-white text-sm placeholder:text-white/20 rounded-xl px-4 py-2.5 outline-none focus:border-[#C8446B]/60 focus:bg-white/[0.06] transition-all duration-200`;
}