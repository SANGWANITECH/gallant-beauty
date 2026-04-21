'use client';

import { useEffect, useRef, useState } from 'react';

/* ─────────────────────────────────────────
   TYPES
───────────────────────────────────────── */
interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type FormData = {
  name: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  notes: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

/* ─────────────────────────────────────────
   CONSTANTS
───────────────────────────────────────── */
const WHATSAPP_NUMBER = '265998837985';

const SERVICES = [
  "Women's Hair Styling",
  "Women's Braiding",
  "Men's Haircut",
  "Men's Fade / Shape-up",
  "Gel Nails",
  "Nail Art",
  "Manicure",
  "Pedicure",
  "Facial & Skincare",
  "Makeup & Glam",
  "Brows & Lashes",
  "Other (specify in notes)",
];

const TIME_SLOTS = [
  '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
  '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM',
  '4:00 PM', '5:00 PM', '6:00 PM',
];

/* ─────────────────────────────────────────
   HELPERS
───────────────────────────────────────── */
function buildWhatsAppMessage(data: FormData): string {
  const msg = [
    '👋 *New Booking Request — Gallant Beauty House*',
    '',
    `👤 *Name:* ${data.name}`,
    `📞 *WhatsApp:* ${data.phone}`,
    `💅 *Service:* ${data.service}`,
    `📅 *Date:* ${data.date}`,
    `🕐 *Time:* ${data.time}`,
    data.notes ? `📝 *Notes:* ${data.notes}` : '',
    '',
    '_Please confirm my appointment. Thank you!_',
  ]
    .filter((line) => line !== undefined)
    .join('\n');

  return encodeURIComponent(msg);
}

function getTodayString(): string {
  const today = new Date();
  return today.toISOString().split('T')[0];
}

/* ─────────────────────────────────────────
   BOOKING MODAL
───────────────────────────────────────── */
export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [form, setForm] = useState<FormData>({
    name: '', phone: '', service: '', date: '', time: '', notes: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [step, setStep] = useState<'form' | 'success'>('form');
  const firstInputRef = useRef<HTMLInputElement>(null);

  /* Lock body scroll when open */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => firstInputRef.current?.focus(), 300);
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  /* Reset on close */
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setForm({ name: '', phone: '', service: '', date: '', time: '', notes: '' });
        setErrors({});
        setStep('form');
      }, 400);
    }
  }, [isOpen]);

  /* Close on Escape */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  /* Validation */
  function validate(): boolean {
    const newErrors: FormErrors = {};
    if (!form.name.trim()) newErrors.name = 'Please enter your name';
    if (!form.phone.trim()) newErrors.phone = 'Please enter your WhatsApp number';
    if (!form.service) newErrors.service = 'Please select a service';
    if (!form.date) newErrors.date = 'Please pick a date';
    if (!form.time) newErrors.time = 'Please pick a time';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  }

  function handleSubmit() {
    if (!validate()) return;
    const message = buildWhatsAppMessage(form);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
    window.open(url, '_blank');
    setStep('success');
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center">

      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />

      {/* Modal panel */}
      <div
        className={`relative w-full sm:max-w-lg bg-[#13131F] border border-white/10 sm:rounded-3xl rounded-t-3xl shadow-2xl shadow-black/60 transition-all duration-400 ease-out overflow-hidden ${
          isOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}
        style={{ maxHeight: '92vh' }}
      >
        {/* Top gold line */}
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#C9A96E] to-transparent" />

        {/* Scrollable content */}
        <div className="overflow-y-auto" style={{ maxHeight: 'calc(92vh - 2px)' }}>
          <div className="p-6 sm:p-8">

            {step === 'form' ? (
              <>
                {/* ── Header ── */}
                <div className="flex items-start justify-between mb-7">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="w-5 h-px bg-[#C9A96E]" />
                      <span className="text-[#C9A96E] text-[9px] tracking-[0.4em] uppercase font-medium">
                        Gallant Beauty House
                      </span>
                    </div>
                    <h2 className="font-heading text-xl sm:text-2xl font-bold text-white">
                      Book Your Appointment
                    </h2>
                    <p className="text-white/40 text-xs mt-1.5 leading-relaxed">
                      Fill in your details and we'll confirm your slot via WhatsApp.
                    </p>
                  </div>

                  {/* Close */}
                  <button
                    onClick={onClose}
                    aria-label="Close"
                    className="shrink-0 mt-1 w-8 h-8 flex items-center justify-center rounded-full bg-white/8 hover:bg-[#C8446B]/80 text-white/40 hover:text-white transition-all duration-200"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="w-3.5 h-3.5">
                      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>

                {/* ── Form Fields ── */}
                <div className="flex flex-col gap-4">

                  {/* Name + Phone — side by side on sm+ */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Your Name" error={errors.name} required>
                      <input
                        ref={firstInputRef}
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="e.g. Amara Phiri"
                        className={inputClass(!!errors.name)}
                      />
                    </Field>

                    <Field label="WhatsApp Number" error={errors.phone} required>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="e.g. 0998 837 985"
                        className={inputClass(!!errors.phone)}
                      />
                    </Field>
                  </div>

                  {/* Service */}
                  <Field label="Service Needed" error={errors.service} required>
                    <select
                      name="service"
                      value={form.service}
                      onChange={handleChange}
                      className={selectClass(!!errors.service)}
                    >
                      <option value="" disabled>Select a service...</option>
                      {SERVICES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </Field>

                  {/* Date + Time */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Preferred Date" error={errors.date} required>
                      <input
                        type="date"
                        name="date"
                        value={form.date}
                        min={getTodayString()}
                        onChange={handleChange}
                        className={inputClass(!!errors.date)}
                      />
                    </Field>

                    <Field label="Preferred Time" error={errors.time} required>
                      <select
                        name="time"
                        value={form.time}
                        onChange={handleChange}
                        className={selectClass(!!errors.time)}
                      >
                        <option value="" disabled>Select a time...</option>
                        {TIME_SLOTS.map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </Field>
                  </div>

                  {/* Notes */}
                  <Field label="Additional Notes" hint="Optional">
                    <textarea
                      name="notes"
                      value={form.notes}
                      onChange={handleChange}
                      placeholder="Any specific requests or details..."
                      rows={3}
                      className={`${inputClass(false)} resize-none`}
                    />
                  </Field>
                </div>

                {/* ── Submit ── */}
                <div className="mt-7 flex flex-col gap-3">
                  <button
                    onClick={handleSubmit}
                    className="group relative w-full inline-flex items-center justify-center gap-2 bg-[#C8446B] hover:bg-[#b03560] text-white text-xs font-semibold tracking-[0.18em] uppercase py-3.5 rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-[#C8446B]/30 overflow-hidden"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />
                    <WhatsAppIcon className="w-3.5 h-3.5 relative z-10" />
                    <span className="relative z-10">Send Booking Request</span>
                  </button>

                  <p className="text-center text-white/20 text-[10px] tracking-wide">
                    Tapping above will open WhatsApp with your details pre-filled.
                  </p>
                </div>
              </>
            ) : (
              /* ── Success State ── */
              <div className="flex flex-col items-center text-center py-8 gap-5">
                <div className="w-16 h-16 rounded-full bg-[#C8446B]/15 border border-[#C8446B]/30 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#C8446B" strokeWidth="2" strokeLinecap="round" className="w-7 h-7">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-heading text-xl font-bold text-white mb-2">
                    WhatsApp Opened!
                  </h3>
                  <p className="text-white/45 text-sm leading-relaxed max-w-xs">
                    Your booking details are pre-filled. Just hit <strong className="text-white/70">Send</strong> on WhatsApp and we'll confirm your slot shortly.
                  </p>
                </div>
                <div className="w-full h-px bg-white/[0.06] my-1" />
                <div className="text-left w-full bg-white/[0.03] border border-white/[0.07] rounded-xl p-4 text-xs text-white/40 space-y-1.5">
                  <p><span className="text-white/60">Name:</span> {form.name}</p>
                  <p><span className="text-white/60">Service:</span> {form.service}</p>
                  <p><span className="text-white/60">Date:</span> {form.date}</p>
                  <p><span className="text-white/60">Time:</span> {form.time}</p>
                </div>
                <button
                  onClick={onClose}
                  className="mt-2 text-white/30 hover:text-white text-xs tracking-widest uppercase transition-colors duration-200"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   FIELD WRAPPER
───────────────────────────────────────── */
function Field({
  label,
  error,
  hint,
  required,
  children,
}: {
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <label className="text-white/60 text-[11px] tracking-widest uppercase font-medium">
          {label}
          {required && <span className="text-[#C8446B] ml-0.5">*</span>}
        </label>
        {hint && <span className="text-white/25 text-[10px]">{hint}</span>}
      </div>
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

function selectClass(hasError: boolean) {
  return `w-full bg-[#13131F] border ${
    hasError ? 'border-[#C8446B]/60' : 'border-white/[0.08]'
  } text-white text-sm rounded-xl px-4 py-2.5 outline-none focus:border-[#C8446B]/60 transition-all duration-200 appearance-none cursor-pointer`;
}

/* ─────────────────────────────────────────
   WHATSAPP ICON
───────────────────────────────────────── */
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.532 5.856L.057 23.57a.75.75 0 00.92.92l5.65-1.46A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.712 9.712 0 01-4.95-1.355l-.356-.212-3.668.948.975-3.584-.232-.369A9.712 9.712 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z" />
    </svg>
  );
}