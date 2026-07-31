"use client";
import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProductCard } from "@/components/ui/ProductCard";
import { getBestsellers, type Product } from "@/lib/mock-data/products";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

export function BestsellerCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);
  const [bestsellers, setBestsellers] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBestsellers() {
      try {
        const res = await fetch(`${API_URL}/products`);
        if (!res.ok) throw new Error("API error");
        const data: Product[] = await res.json();
        // Filter products where isBestseller is true from backend data
        const filtered = data.filter((p) => p.isBestseller);
        setBestsellers(filtered.length > 0 ? filtered : getBestsellers());
      } catch {
        // Fallback to mock data if backend is unreachable
        setBestsellers(getBestsellers());
      } finally {
        setLoading(false);
      }
    }
    fetchBestsellers();
  }, []);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.8;
    scrollRef.current.scrollBy({ left: dir === "right" ? amount : -amount, behavior: "smooth" });
  };

  const onScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanLeft(scrollLeft > 10);
    setCanRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  return (
    <section className="section-py bg-cream-50">
      <div className="container-padded">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs font-semibold text-sage-600 uppercase tracking-widest mb-1">Our Favorites</p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest">Bestsellers</h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              disabled={!canLeft}
              className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all ${
                canLeft
                  ? "border-forest text-forest hover:bg-forest hover:text-cream-50"
                  : "border-warmgray-200 text-warmgray-300 cursor-not-allowed"
              }`}
              aria-label="Scroll left"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canRight}
              className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all ${
                canRight
                  ? "border-forest text-forest hover:bg-forest hover:text-cream-50"
                  : "border-warmgray-200 text-warmgray-300 cursor-not-allowed"
              }`}
              aria-label="Scroll right"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {loading ? (
          /* Skeleton loader */
          <div className="flex gap-4 overflow-hidden">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="min-w-[220px] sm:min-w-[260px] flex-shrink-0 bg-warmgray-100 rounded-xl h-80 animate-pulse" />
            ))}
          </div>
        ) : (
          <div
            ref={scrollRef}
            onScroll={onScroll}
            className="flex gap-4 overflow-x-auto scrollbar-hide pb-2"
          >
            {bestsellers.map((product) => (
              <div key={product.id} className="min-w-[220px] sm:min-w-[260px] flex-shrink-0">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
