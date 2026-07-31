"use client";
import { useEffect, useState } from "react";
import { X } from "lucide-react";

const MESSAGES = [
  "🌿 5% off on prepaid orders — Use code PREPAID5 at checkout",
  "🎁 Free Dry Brush on orders above ₹999",
  "✨ New arrivals: Glow Exfoliating Mist is here!",
  "🚚 Free shipping on orders above ₹999",
  "💚 Backed by Science. Formulated Intentionally. Designed for Real Routines.",
];

export function AnnouncementBar() {
  const [current, setCurrent] = useState(0);
  const [dismissed, setDismissed] = useState(false);
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setAnimate(false);
      setTimeout(() => {
        setCurrent((c) => (c + 1) % MESSAGES.length);
        setAnimate(true);
      }, 300);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  if (dismissed) return null;

  return (
    <div className="bg-forest text-cream-50 text-xs sm:text-sm relative overflow-hidden">
      <div className="container-padded flex items-center justify-center py-2.5 gap-4">
        <p
          className={`text-center font-medium tracking-wide transition-all duration-300 ${
            animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
          }`}
        >
          {MESSAGES[current]}
        </p>
        <button
          onClick={() => setDismissed(true)}
          className="absolute right-4 text-cream-200 hover:text-white transition-colors"
          aria-label="Dismiss announcement"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}
