'use client';

import { createContext, useContext, useState, useCallback } from 'react';
import BookingModal from '@/components/ui/BookingModal';

/* ─────────────────────────────────────────
   CONTEXT
───────────────────────────────────────── */
interface BookingContextType {
  openBooking: () => void;
  closeBooking: () => void;
}

const BookingContext = createContext<BookingContextType>({
  openBooking: () => {},
  closeBooking: () => {},
});

/* ─────────────────────────────────────────
   HOOK — use this anywhere in the app
   e.g. const { openBooking } = useBooking();
───────────────────────────────────────── */
export function useBooking() {
  return useContext(BookingContext);
}

/* ─────────────────────────────────────────
   PROVIDER — wrap in layout.tsx
───────────────────────────────────────── */
export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openBooking = useCallback(() => setIsOpen(true), []);
  const closeBooking = useCallback(() => setIsOpen(false), []);

  return (
    <BookingContext.Provider value={{ openBooking, closeBooking }}>
      {children}
      <BookingModal isOpen={isOpen} onClose={closeBooking} />
    </BookingContext.Provider>
  );
}