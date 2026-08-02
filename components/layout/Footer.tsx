"use client";
import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp, Send } from "lucide-react";

const SHOP_LINKS = [
  { name: "Shop All", href: "/collections/shop" },
  { name: "Cleanse", href: "/collections/cleanse" },
  { name: "Treat", href: "/collections/treat" },
  { name: "Moisturise", href: "/collections/hydrate" },
  { name: "Accessories", href: "/collections/accessories" },
];

const QUICK_LINKS = [
  { name: "Our Story", href: "/info/our-story" },
  { name: "Skin, Decoded Blog", href: "/blogs/news" },
  { name: "Track Your Order", href: "/account" },
  { name: "Contact Us", href: "/info/contact" },
];

const POLICY_LINKS = [
  { name: "Shipping Policy", href: "/info/shipping-policy" },
  { name: "Return & Refund Policy", href: "/info/refund-policy" },
  { name: "Privacy Policy", href: "/info/privacy-policy" },
  { name: "Cookie Policy", href: "/info/cookie-policy" },
  { name: "Terms & Conditions", href: "/info/terms" },
];

// Inline SVGs for brand icons (removed from lucide-react)
function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
    </svg>
  );
}

function FacebookIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  );
}

function LinkedinIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect x="2" y="9" width="4" height="12"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  );
}

function WhatsAppIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
    </svg>
  );
}

const SOCIAL = [
  { Icon: InstagramIcon, label: "Instagram", href: "#" },
  { Icon: FacebookIcon, label: "Facebook", href: "#" },
  { Icon: LinkedinIcon, label: "LinkedIn", href: "#" },
  { Icon: WhatsAppIcon, label: "WhatsApp", href: "https://wa.me/919876543210" },
];

function FooterSection({
  title,
  links,
}: {
  title: string;
  links: { name: string; href: string }[];
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-warmgray-700 lg:border-none py-4 lg:py-0">
      <button
        className="w-full flex items-center justify-between text-left lg:cursor-default"
        onClick={() => setOpen(!open)}
      >
        <span className="text-sm font-semibold text-cream-200 uppercase tracking-widest">{title}</span>
        <span className="lg:hidden text-warmgray-400">
          {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </span>
      </button>
      <ul className={`mt-3 space-y-2 ${open ? "block" : "hidden"} lg:block`}>
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="text-sm text-warmgray-300 hover:text-cream-50 transition-colors"
            >
              {l.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <footer className="bg-forest-dark text-cream-50">
      {/* Newsletter band */}
      <div className="bg-sage-700 py-10">
        <div className="container-padded flex flex-col sm:flex-row items-center gap-6 justify-between">
          <div>
            <p className="font-serif text-2xl font-bold text-cream-50">Join the Wellness Wave</p>
            <p className="text-sage-200 text-sm mt-1">
              Get skincare tips, ingredient education &amp; exclusive offers.
            </p>
          </div>
          {submitted ? (
            <div className="bg-sage-600 border border-sage-400 text-cream-50 text-sm px-6 py-3 rounded-full font-medium">
              ✓ You&apos;re in! Check your inbox.
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2 w-full sm:w-auto max-w-sm"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                id="newsletter-email"
                className="flex-1 px-4 py-2.5 rounded-full text-cream-50 placeholder-sage-300 text-sm focus:outline-none focus:border-cream-200"
                style={{ backgroundColor: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)" }}
              />
              <button
                type="submit"
                className="p-2.5 rounded-full hover:opacity-90 transition-opacity"
                style={{ backgroundColor: "var(--color-cream-50)", color: "var(--color-forest)" }}
                aria-label="Subscribe"
              >
                <Send size={16} />
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Main footer */}
      <div className="container-padded py-10 lg:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-0 lg:gap-10">
          {/* Brand */}
          <div className="lg:col-span-2 pb-6 lg:pb-0 border-b border-warmgray-700 lg:border-none">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ backgroundColor: "var(--color-sage-500)" }}>
                <span className="font-serif font-bold" style={{ color: "var(--color-cream-50)" }}>W</span>
              </div>
              <span className="font-serif text-xl font-bold text-cream-50">Wave of Wellness</span>
            </div>
            <p className="text-sm text-warmgray-300 leading-relaxed max-w-xs">
              Backed by Science. Formulated Intentionally. Designed for Real Routines. Your daily body care, elevated.
            </p>
            <div className="flex items-center gap-3 mt-5">
              {SOCIAL.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:opacity-80"
                  style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
                  aria-label={label}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="lg:col-span-3 grid grid-cols-1 lg:grid-cols-3 gap-0 lg:gap-8">
            <FooterSection title="Shop" links={SHOP_LINKS} />
            <FooterSection title="Quick Links" links={QUICK_LINKS} />
            <FooterSection title="Policies" links={POLICY_LINKS} />
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-warmgray-700 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-warmgray-400">
            © {new Date().getFullYear()} Wave of Wellness. All rights reserved.
          </p>
          <p className="text-xs text-warmgray-500">
            Made with 💚 in India · INR Pricing
          </p>
        </div>
      </div>
    </footer>
  );
}
