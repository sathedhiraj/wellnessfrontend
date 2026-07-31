"use client";
import { useState } from "react";
import { FlaskConical, Leaf, Clock } from "lucide-react";

const TABS = [
  {
    id: "science",
    icon: FlaskConical,
    label: "Backed by Science",
    heading: "Formulated with Clinical-Grade Actives",
    body: "Every formula in our range is built around clinically studied ingredients — AHAs, PHAs, Niacinamide, Hyaluronic Acid, and more — at concentrations that have been shown to deliver real, measurable results. We don't just add them to the ingredient list. We use them at levels that work.",
    stat1: { value: "10%", label: "Niacinamide — clinically effective concentration" },
    stat2: { value: "2%", label: "Glycolic Acid — optimal for daily body use" },
  },
  {
    id: "intentional",
    icon: Leaf,
    label: "Formulated Intentionally",
    heading: "Every Ingredient Earns Its Place",
    body: "We follow a strict 'nothing extra' formulation philosophy. If an ingredient doesn't serve your skin — it doesn't go in. No artificial colorants. No harsh sulfates. No parabens. No phthalates. No mineral oil. Just clean, purposeful formulations that respect your skin's natural balance.",
    stat1: { value: "0", label: "Artificial colorants or dyes in any formula" },
    stat2: { value: "100%", label: "Transparency on every ingredient and its function" },
  },
  {
    id: "routines",
    icon: Clock,
    label: "Designed for Real Routines",
    heading: "Maximum Results. Minimum Time.",
    body: "We know you're busy. Our products are designed to fit into the time you actually have — a 30-second shower ritual that exfoliates and cleanses, a 60-second mist that eliminates the need for scrubbing, a moisturiser that absorbs in seconds, not minutes. Real results don't require a 12-step routine.",
    stat1: { value: "30s", label: "Radiance Body Wash — effective in under a minute" },
    stat2: { value: "60s", label: "Glow Mist — spray, wait, rinse, done." },
  },
];

export function BrandDifferentiators() {
  const [active, setActive] = useState("science");
  const tab = TABS.find((t) => t.id === active)!;

  return (
    <section className="section-py bg-forest text-cream-50">
      <div className="container-padded">
        <div className="text-center mb-10">
          <p className="text-xs font-semibold text-sage-400 uppercase tracking-widest mb-2">Why Wave</p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-cream-50">
            What Makes Wave Different
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex flex-col sm:flex-row gap-2 justify-center mb-10">
          {TABS.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => setActive(id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold transition-all duration-200 ${
                active === id
                  ? "bg-sage-500 text-cream-50 shadow-lg"
                  : "bg-white/10 text-cream-200 hover:bg-white/15"
              }`}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="max-w-3xl mx-auto text-center animate-fade-in" key={active}>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-cream-50 mb-4">
            {tab.heading}
          </h3>
          <p className="text-cream-200 text-base leading-relaxed mb-8">{tab.body}</p>
          <div className="grid grid-cols-2 gap-6 max-w-sm mx-auto">
            <div className="bg-white/10 rounded-2xl p-5">
              <p className="font-serif text-4xl font-bold text-sage-300">{tab.stat1.value}</p>
              <p className="text-xs text-cream-300 mt-1">{tab.stat1.label}</p>
            </div>
            <div className="bg-white/10 rounded-2xl p-5">
              <p className="font-serif text-4xl font-bold text-sage-300">{tab.stat2.value}</p>
              <p className="text-xs text-cream-300 mt-1">{tab.stat2.label}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
