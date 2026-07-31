import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { SearchOverlay } from "@/components/layout/SearchOverlay";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Wave of Wellness — Bodycare Backed by Science",
    template: "%s | Wave of Wellness",
  },
  description:
    "Discover body wash, lotions, exfoliating mists, and accessories formulated with science-backed actives for real, visible results. Free shipping on orders above ₹999.",
  keywords: ["body wash", "body lotion", "exfoliating mist", "bodycare", "skincare", "Wave of Wellness"],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "http://localhost:3000",
    siteName: "Wave of Wellness",
    title: "Wave of Wellness — Bodycare Backed by Science",
    description: "Science-backed bodycare formulated intentionally for real routines.",
    images: [{ url: "/hero-banner.png", width: 1200, height: 630, alt: "Wave of Wellness" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wave of Wellness — Bodycare Backed by Science",
    description: "Science-backed bodycare formulated intentionally for real routines.",
    images: ["/hero-banner.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        <AnnouncementBar />
        <Navbar />
        <CartDrawer />
        <SearchOverlay />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
