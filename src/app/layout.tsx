import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { BookingProvider } from "@/components/ui/BookingContext";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Gallant Beauty House | Premium Beauty Salon in Lilongwe",
    template: "%s | Gallant Beauty House",
  },
  description:
    "Gallant Beauty House — premium hair, nail, and beauty services in the heart of Lilongwe, Malawi. Book your appointment today via WhatsApp.",
  keywords: [
    "beauty salon Lilongwe", "hair salon Malawi", "nail art Lilongwe",
    "makeup Lilongwe", "Gallant Beauty House", "beauty services Malawi",
  ],
  authors: [{ name: "Gallant Beauty House" }],
  creator: "Gallant Beauty House",
  openGraph: {
    type: "website",
    locale: "en_MW",
    title: "Gallant Beauty House | Premium Beauty Salon in Lilongwe",
    description: "Premium hair, nail, and beauty services in Lilongwe, Malawi.",
    siteName: "Gallant Beauty House",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#0F0F1E] text-white font-sans">
        <BookingProvider>
          <Navbar />
          <main className="flex-1 pt-16 md:pt-20">
            {children}
          </main>
          <Footer />
        </BookingProvider>
      </body>
    </html>
  );
}