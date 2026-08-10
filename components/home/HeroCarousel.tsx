"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SLIDES = [
  {
    id: 1,
    image: "/hero-banner.png",
    tagline: "Real Routines",
    heading: "Motorola mobles Body Care\nBacked by Science",
    sub: "Formulated with science-backed actives for skin that actually transforms.",
    cta: "Shop the Collection",
    href: "/collections/shop",
  },
  {
    id: 2,
    image: "/brand-lifestyle.png",
    tagline: "Intentional Formulas",
    heading: "Nothing Extra,\nJust What Works",
    sub: "Every ingredient earns its place. No fillers, no fluff.",
    cta: "Explore the Range",
    href: "/collections/treat",
  },
  {
    id: 3,
    image: "/body-lotion.png",
    tagline: "Science Meets Nature",
    heading: "Visible Results\nYou Can See",
    sub: "Maximum results, minimum time. A routine that works as hard as you do.",
    cta: "Shop Bestsellers",
    href: "/collections/shop",
  },
];

export function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => setCurrent((c) => (c + 1) % SLIDES.length), []);
  const prev = () => setCurrent((c) => (c - 1 + SLIDES.length) % SLIDES.length);

  useEffect(() => {
    if (isPaused) return;
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, [isPaused, next]);

  const slide = SLIDES[current];

  return (
    <section
      className="relative overflow-hidden bg-forest"
      style={{ minHeight: "clamp(480px, 70vh, 720px)" }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Hero carousel"
    >
      {/* Background image */}
      {SLIDES.map((s, i) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-opacity duration-700 ${i === current ? "opacity-100" : "opacity-0"
            }`}
        >
          <Image
            src={s.image}
            alt={s.heading}
            fill
            priority={i === 0}
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-forest/85 via-forest/40 to-transparent" />
        </div>
      ))}

      {/* Tagline strip */}
      <div className="absolute top-0 left-0 right-0 bg-sage-700/80 backdrop-blur-sm py-2 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(4)].map((_, i) => (
            <span key={i} className="mx-8 text-xs font-medium text-cream-100 tracking-widest uppercase">
              Real Routines &nbsp;·&nbsp; Intentional Formulas &nbsp;·&nbsp; Science Meets Nature &nbsp;·&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative container-padded flex items-center" style={{ minHeight: "inherit" }}>
        <div className="max-w-xl pt-14 pb-10 animate-fade-up" key={current}>
          <span className="inline-block text-xs font-semibold text-sage-300 uppercase tracking-widest mb-3">
            {slide.tagline}
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-cream-50 leading-tight mb-5 whitespace-pre-line">
            {slide.heading}
          </h1>
          <p className="text-base sm:text-lg text-cream-200 mb-8 leading-relaxed max-w-md">
            {slide.sub}
          </p>
          <Link href={slide.href} className="btn-coral text-base px-8 py-3.5">
            {slide.cta} →
          </Link>
        </div>
      </div>

      {/* Controls */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight size={18} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`rounded-full transition-all duration-300 ${i === current ? "w-6 h-2 bg-cream-50" : "w-2 h-2 bg-white/40"
              }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
