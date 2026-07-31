"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search } from "lucide-react";
import { searchProducts } from "@/lib/mock-data/products";

const POPULAR = ["Gel", "Body Lotion", "Body Wash", "Creme", "Niacinamide", "Dry Brush"];

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const results = query.length > 1 ? searchProducts(query) : [];

  return (
    <section className="section-py bg-cream-50 min-h-[70vh]">
      <div className="container-padded max-w-3xl">
        <h1 className="font-serif text-3xl font-bold text-forest mb-6">Search Products</h1>

        {/* Input */}
        <div className="flex items-center gap-3 bg-white border border-warmgray-200 rounded-2xl px-4 py-3 mb-6 focus-within:border-sage-500 focus-within:ring-2 focus-within:ring-sage-100 transition-all">
          <Search size={20} className="text-warmgray-400 shrink-0" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for body wash, lotion..."
            autoFocus
            id="search-page-input"
            className="flex-1 text-base text-forest placeholder:text-warmgray-300 bg-transparent outline-none"
          />
        </div>

        {/* Popular tags */}
        {query.length <= 1 && (
          <div className="mb-8">
            <p className="text-xs font-semibold text-warmgray-400 uppercase tracking-widest mb-3">Popular Searches</p>
            <div className="flex flex-wrap gap-2">
              {POPULAR.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setQuery(tag)}
                  className="px-4 py-2 bg-white border border-warmgray-200 text-warmgray-700 text-sm font-medium rounded-full hover:bg-sage-50 hover:border-sage-300 hover:text-forest transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results */}
        {query.length > 1 && results.length === 0 && (
          <div className="text-center py-16">
            <p className="font-serif text-2xl text-forest mb-2">No results for &quot;{query}&quot;</p>
            <p className="text-warmgray-400 text-sm">Try different search terms.</p>
          </div>
        )}

        {results.length > 0 && (
          <div>
            <p className="text-xs font-semibold text-warmgray-400 uppercase tracking-widest mb-4">
              {results.length} results for &quot;{query}&quot;
            </p>
            <div className="space-y-3">
              {results.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.handle}`}
                  className="flex items-center gap-4 bg-white rounded-2xl p-4 shadow-card hover:shadow-card-hover transition-all group"
                >
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-warmgray-50 shrink-0">
                    <Image src={product.images[0]} alt={product.title} fill className="object-cover" sizes="64px" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-forest group-hover:text-sage-700 transition-colors">
                      {product.title}
                    </p>
                    <p className="text-xs text-warmgray-400 line-clamp-1">{product.tagline}</p>
                  </div>
                  <p className="font-bold text-forest shrink-0">₹{product.variants[0].price.toLocaleString("en-IN")}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
