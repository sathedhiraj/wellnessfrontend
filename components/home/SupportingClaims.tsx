import Image from "next/image";
import Link from "next/link";

const CLAIMS = [
  {
    emoji: "⚡",
    heading: "Results You Can See",
    body: "Clinically studied actives at concentrations that actually work. Not just on the label — in your skin.",
    bg: "bg-amber-50",
    color: "text-amber-600",
  },
  {
    emoji: "🌿",
    heading: "Nothing Extra, Just What Works",
    body: "No fillers. No artificial dyes. No harsh chemicals. Every ingredient is there for a reason.",
    bg: "bg-sage-50",
    color: "text-sage-600",
  },
  {
    emoji: "⏱️",
    heading: "Maximum Results, Minimum Time",
    body: "Routines designed for real life. Effective in 30 seconds. No 12-step program required.",
    bg: "bg-rose-50",
    color: "text-rose-500",
  },
];

export function SupportingClaims() {
  return (
    <section className="section-py bg-warmgray-50">
      <div className="container-padded">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative rounded-3xl overflow-hidden aspect-[4/3] order-2 lg:order-1">
            <Image
              src="/brand-lifestyle.png"
              alt="Wave of Wellness lifestyle"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest/30 to-transparent" />
          </div>

          {/* Claims */}
          <div className="order-1 lg:order-2">
            <p className="text-xs font-semibold text-sage-600 uppercase tracking-widest mb-2">The Wave Promise</p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest mb-6 leading-tight">
              Science Meets Nature,<br />
              <span className="text-sage-600">Intentionally.</span>
            </h2>

            <div className="space-y-5 mb-8">
              {CLAIMS.map(({ emoji, heading, body, bg, color }) => (
                <div key={heading} className="flex gap-4">
                  <div className={`w-11 h-11 rounded-xl ${bg} flex items-center justify-center shrink-0 mt-0.5 text-xl`}>
                    {emoji}
                  </div>
                  <div>
                    <p className={`font-semibold text-forest mb-1`}>{heading}</p>
                    <p className="text-sm text-warmgray-500 leading-relaxed">{body}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link href="/collections/shop" className="btn-primary">
              Explore the Range →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
