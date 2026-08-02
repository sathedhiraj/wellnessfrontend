"use client";
import { useState, useEffect } from "react";
import { notFound } from "next/navigation";
import { use } from "react";
import { getProductsByCollection, type Product } from "@/lib/mock-data/products";
import { ProductCard } from "@/components/ui/ProductCard";
import { SlidersHorizontal, ChevronDown } from "lucide-react";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";


const COLLECTION_META: Record<string, { title: string; description: string }> = {
  shop: {
    title: "Shop All",
    description: "Browse our full range of science-backed bodycare products.",
  },
  cleanse: {
    title: "Cleanse",
    description: "Gentle yet effective cleansers that respect your skin barrier.",
  },
  treat: {
    title: "Treat",
    description: "Targeted treatments with clinical-grade actives for visible results.",
  },
  hydrate: {
    title: "Moisturise",
    description: "Rich, fast-absorbing moisturisers for all-day hydration.",
  },
  accessories: {
    title: "Accessories",
    description: "Ritual tools to elevate your daily bodycare practice.",
  },
};

const SORT_OPTIONS = [
  { value: "default", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Best Rated" },
];

export default function CollectionPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = use(params);

  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState("default");
  const [filterInStock, setFilterInStock] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const endpoint =
          handle === "shop"
            ? `${API_URL}/products`
            : `${API_URL}/collections/${handle}/products`;
        const res = await fetch(endpoint);
        if (!res.ok) throw new Error("API error");
        const data = await res.json();
        
        const productsList = handle === "shop" ? data.data : data;

        // Normalize: backend uses `stock` count, frontend expects `inStock` boolean
        const normalized: Product[] = productsList.map((p: Product & { variants: (Product["variants"][0] & { stock?: number })[] }) => ({
          ...p,
          benefits: Array.isArray(p.benefits) ? p.benefits : JSON.parse(p.benefits as unknown as string),
          variants: p.variants.map((v) => ({
            ...v,
            inStock: typeof v.inStock === "boolean" ? v.inStock : ((v as { stock?: number }).stock ?? 0) > 0,
          })),
        }));
        setAllProducts(normalized);
      } catch {
        setAllProducts(getProductsByCollection(handle));
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [handle]);

  const meta = COLLECTION_META[handle];
  if (!meta) notFound();

  let products = [...allProducts];
  if (filterInStock) {
    products = products.filter((p) => p.variants.some((v) => v.inStock));
  }
  if (sort === "price-asc") products.sort((a, b) => a.variants[0].price - b.variants[0].price);
  else if (sort === "price-desc") products.sort((a, b) => b.variants[0].price - a.variants[0].price);
  else if (sort === "rating") products.sort((a, b) => b.rating - a.rating);

  return (
    <>
      {/* Banner */}
      <section className="bg-sage-50 py-12 border-b border-warmgray-100">
        <div className="container-padded text-center">
          <p className="text-xs font-semibold text-sage-600 uppercase tracking-widest mb-2">Collection</p>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-forest mb-3">{meta.title}</h1>
          <p className="text-warmgray-500 text-base max-w-md mx-auto">{meta.description}</p>
        </div>
      </section>

      {/* Filters & Grid */}
      <section className="section-py bg-cream-50">
        <div className="container-padded">
          {/* Controls */}
          <div className="flex items-center justify-between gap-4 mb-8 flex-wrap">
            <div className="flex items-center gap-3">
              <SlidersHorizontal size={16} className="text-warmgray-500" />
              <label className="flex items-center gap-2 text-sm text-warmgray-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filterInStock}
                  onChange={(e) => setFilterInStock(e.target.checked)}
                  className="rounded border-warmgray-300 text-forest focus:ring-sage-400"
                />
                In Stock Only
              </label>
              <span className="text-xs text-warmgray-400">{products.length} products</span>
            </div>

            <div className="relative">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                id="sort-select"
                className="appearance-none pl-3 pr-8 py-2 text-sm border border-warmgray-200 rounded-xl bg-white text-warmgray-700 focus:border-sage-400 focus:outline-none cursor-pointer"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-warmgray-400 pointer-events-none" />
            </div>
          </div>

          {/* Grid */}
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
              {[1, 2, 3, 4, 6, 8].map((i) => (
                <div key={i} className="bg-warmgray-100 rounded-2xl h-72 animate-pulse" />
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-serif text-2xl text-forest mb-2">No products found</p>
              <p className="text-warmgray-400 text-sm">Try changing your filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
