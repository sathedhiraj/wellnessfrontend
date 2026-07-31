"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Search } from "lucide-react";
import { searchProducts } from "@/lib/mock-data/products";

const POPULAR = ["Gel", "Body Lotion", "Body Wash", "Creme", "Niacinamide", "Dry Brush"];

export function SearchOverlay() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const results = query.length > 1 ? searchProducts(query).slice(0, 6) : [];

  useEffect(() => {
    const handler = () => { setOpen(true); };
    window.addEventListener("openSearch", handler);
    return () => window.removeEventListener("openSearch", handler);
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setOpen(false); setQuery(""); }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  const close = () => { setOpen(false); setQuery(""); };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-white/98 backdrop-blur-sm animate-fade-in">
      {/* Header */}
      <div className="container-padded py-5 flex items-center gap-4 border-b border-warmgray-100">
        <Search size={20} className="text-warmgray-400 shrink-0" />
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for products..."
          className="flex-1 text-lg font-medium text-forest placeholder:text-warmgray-300 bg-transparent outline-none"
          id="search-input"
        />
        <button onClick={close} className="p-2 text-warmgray-400 hover:text-forest" aria-label="Close search">
          <X size={22} />
        </button>
      </div>

      {/* Body */}
      <div className="container-padded py-6 flex-1 overflow-y-auto">
        {query.length <= 1 && (
          <div>
            <p className="text-xs font-semibold text-warmgray-400 uppercase tracking-widest mb-3">Popular Searches</p>
            <div className="flex flex-wrap gap-2">
              {POPULAR.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setQuery(tag)}
                  className="px-4 py-2 bg-warmgray-100 text-warmgray-700 text-sm font-medium rounded-full hover:bg-sage-100 hover:text-forest transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {query.length > 1 && results.length === 0 && (
          <div className="text-center py-16">
            <p className="text-2xl font-serif font-semibold text-forest mb-2">No results found</p>
            <p className="text-warmgray-500 text-sm">Try searching for &quot;body wash&quot; or &quot;lotion&quot;</p>
          </div>
        )}

        {results.length > 0 && (
          <div>
            <p className="text-xs font-semibold text-warmgray-400 uppercase tracking-widest mb-4">
              {results.length} result{results.length !== 1 ? "s" : ""} for &quot;{query}&quot;
            </p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.handle}`}
                  onClick={close}
                  className="flex items-center gap-3 p-3 rounded-2xl hover:bg-warmgray-50 transition-colors group"
                >
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-warmgray-50 shrink-0">
                    <Image src={product.images[0]} alt={product.title} fill className="object-cover" sizes="64px" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-forest group-hover:text-sage-600 transition-colors">
                      {product.title}
                    </p>
                    <p className="text-xs text-warmgray-400 mt-0.5 line-clamp-1">{product.tagline}</p>
                    <p className="text-sm font-bold text-forest mt-1">
                      ₹{product.variants[0].price.toLocaleString("en-IN")}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
