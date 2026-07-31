"use client";
import { useState, useEffect, useCallback } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { testimonials } from "@/lib/mock-data/testimonials";

export function TestimonialsCarousel() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => setCurrent((c) => (c + 1) % testimonials.length), []);
  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    if (isPaused) return;
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, [isPaused, next]);

  const t = testimonials[current];

  return (
    <section
      className="section-py bg-sage-50"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="container-padded">
        <div className="text-center mb-10">
          <p className="text-xs font-semibold text-sage-600 uppercase tracking-widest mb-2">Real People, Real Results</p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest">What Our Customers Say</h2>
        </div>

        <div className="max-w-2xl mx-auto relative">
          {/* Quote */}
          <div className="bg-white rounded-3xl shadow-card p-8 sm:p-10 text-center animate-fade-in" key={current}>
            {/* Stars */}
            <div className="flex justify-center gap-1 mb-6">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} size={18} className="fill-amber-400 text-amber-400" />
              ))}
            </div>

            {/* Quote mark */}
            <div className="text-6xl font-serif text-sage-200 leading-none mb-2 select-none">&ldquo;</div>

            <p className="text-warmgray-700 text-lg leading-relaxed mb-6 italic">
              {t.quote}
            </p>

            {/* Author */}
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 bg-sage-100 rounded-full flex items-center justify-center">
                <span className="text-sage-600 font-bold text-sm">{t.name[0]}</span>
              </div>
              <div>
                <p className="font-semibold text-forest text-sm">{t.name}</p>
                <p className="text-xs text-warmgray-400">{t.age} · {t.city}</p>
              </div>
              <span className="badge-bestseller text-[10px] mt-1">{t.productTag}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={prev}
              className="w-9 h-9 rounded-full border border-warmgray-200 flex items-center justify-center text-warmgray-500 hover:border-forest hover:text-forest transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft size={16} />
            </button>
            <div className="flex gap-1.5">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === current ? "w-5 h-2 bg-forest" : "w-2 h-2 bg-warmgray-200"
                  }`}
                  aria-label={`Testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-9 h-9 rounded-full border border-warmgray-200 flex items-center justify-center text-warmgray-500 hover:border-forest hover:text-forest transition-colors"
              aria-label="Next"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
