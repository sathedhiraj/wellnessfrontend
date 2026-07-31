"use client";
import { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Heart, ShoppingBag, Star, ChevronDown, ChevronUp,
  Truck, RefreshCcw, Shield, Share2, Check
} from "lucide-react";
import { getProductByHandle, products } from "@/lib/mock-data/products";
import { useCartStore } from "@/lib/store/cart-store";
import { useWishlistStore } from "@/lib/store/wishlist-store";
import { ProductCard } from "@/components/ui/ProductCard";

const REVIEWS = [
  { name: "Ananya S.", rating: 5, date: "2026-07-12", title: "Game changer!", body: "Absolutely love this. My skin has transformed in 6 weeks." },
  { name: "Priya M.", rating: 5, date: "2026-07-08", title: "Finally a body wash that works!", body: "Smells amazing and actually makes my skin glow. Repurchasing for sure." },
  { name: "Rohan T.", rating: 4, date: "2026-06-30", title: "Great product", body: "Really good moisturisation. Would love a bigger size option." },
];

function AccordionItem({ title, content }: { title: string; content: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-warmgray-100 last:border-none">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 text-left font-semibold text-forest text-sm hover:text-sage-700 transition-colors"
      >
        {title}
        {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      {open && (
        <div className="pb-4 text-sm text-warmgray-600 leading-relaxed animate-fade-in">
          {content}
        </div>
      )}
    </div>
  );
}

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = use(params);
  const product = getProductByHandle(handle);
  if (!product) notFound();

  const [selectedImg, setSelectedImg] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const variant = product.variants[selectedVariant];
  const addItem = useCartStore((s) => s.addItem);
  const toggle = useWishlistStore((s) => s.toggle);
  const isWishlisted = useWishlistStore((s) => s.isWishlisted(product.id));

  const discountPct = Math.round(((variant.mrp - variant.price) / variant.mrp) * 100);

  const handleAddToCart = () => {
    addItem(product, variant, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const related = products
    .filter((p) => p.id !== product.id && p.collection.some((c) => product.collection.includes(c)))
    .slice(0, 4);

  return (
    <>
      <section className="section-py bg-cream-50">
        <div className="container-padded">
          <div className="grid lg:grid-cols-2 gap-10 xl:gap-16">
            {/* Gallery */}
            <div className="space-y-3">
              <div className="relative aspect-square rounded-3xl overflow-hidden bg-warmgray-50">
                <Image
                  src={product.images[selectedImg] || product.images[0]}
                  alt={product.title}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                {discountPct > 0 && (
                  <div className="absolute top-4 left-4">
                    <span className="badge-sale text-sm px-3 py-1">{discountPct}% OFF</span>
                  </div>
                )}
              </div>
              {/* Thumbnails */}
              <div className="flex gap-2">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImg(i)}
                    className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImg === i ? "border-forest" : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image src={img} alt={`View ${i + 1}`} fill className="object-cover" sizes="64px" />
                  </button>
                ))}
              </div>
            </div>

            {/* Details */}
            <div>
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-xs text-warmgray-400 mb-4">
                <Link href="/" className="hover:text-forest">Home</Link>
                <span>/</span>
                <Link href={`/collections/${product.collection[0]}`} className="hover:text-forest capitalize">
                  {product.collection[0]}
                </Link>
                <span>/</span>
                <span className="text-warmgray-600 truncate">{product.title}</span>
              </div>

              {product.isBestseller && (
                <span className="badge-bestseller mb-3 inline-block">Bestseller</span>
              )}

              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-forest mb-2 leading-tight">
                {product.title}
              </h1>
              <p className="text-warmgray-500 text-base mb-4">{product.tagline}</p>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-5">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      size={16}
                      className={s <= Math.round(product.rating) ? "fill-amber-400 text-amber-400" : "text-warmgray-200"}
                    />
                  ))}
                </div>
                <span className="text-sm font-semibold text-forest">{product.rating}</span>
                <span className="text-sm text-warmgray-400">({product.reviewCount} reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-3xl font-bold text-forest">₹{variant.price.toLocaleString("en-IN")}</span>
                {variant.mrp > variant.price && (
                  <span className="text-lg text-warmgray-400 line-through">₹{variant.mrp.toLocaleString("en-IN")}</span>
                )}
                {discountPct > 0 && (
                  <span className="text-sm font-semibold text-coral">Save {discountPct}%</span>
                )}
              </div>

              {/* Variants */}
              {product.variants.length > 1 && (
                <div className="mb-5">
                  <p className="text-sm font-semibold text-forest mb-2">Size</p>
                  <div className="flex gap-2">
                    {product.variants.map((v, i) => (
                      <button
                        key={v.id}
                        onClick={() => setSelectedVariant(i)}
                        className={`px-4 py-2 rounded-full text-sm font-medium border-2 transition-all ${
                          selectedVariant === i
                            ? "border-forest bg-forest text-cream-50"
                            : "border-warmgray-200 text-warmgray-600 hover:border-sage-400"
                        } ${!v.inStock ? "opacity-50 cursor-not-allowed line-through" : ""}`}
                        disabled={!v.inStock}
                      >
                        {v.name} {!v.inStock && "(Sold Out)"}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="mb-6">
                <p className="text-sm font-semibold text-forest mb-2">Quantity</p>
                <div className="flex items-center border border-warmgray-200 rounded-full w-fit overflow-hidden">
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="px-4 py-2.5 text-warmgray-500 hover:text-forest hover:bg-sage-50 transition-colors"
                  >
                    −
                  </button>
                  <span className="px-4 py-2.5 font-semibold text-forest min-w-12 text-center">{qty}</span>
                  <button
                    onClick={() => setQty(qty + 1)}
                    className="px-4 py-2.5 text-warmgray-500 hover:text-forest hover:bg-sage-50 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex gap-3 mb-6">
                <button
                  onClick={handleAddToCart}
                  disabled={!variant.inStock}
                  className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-full font-semibold text-base transition-all ${
                    added
                      ? "bg-sage-500 text-white"
                      : variant.inStock
                      ? "bg-forest text-cream-50 hover:bg-forest-light hover:shadow-lg hover:-translate-y-0.5"
                      : "bg-warmgray-200 text-warmgray-400 cursor-not-allowed"
                  }`}
                >
                  {added ? <><Check size={18} /> Added to Cart!</> : <><ShoppingBag size={18} /> Add to Cart</>}
                </button>
                <button
                  onClick={() =>
                    toggle({
                      productId: product.id,
                      handle: product.handle,
                      title: product.title,
                      image: product.images[0],
                      price: variant.price,
                      mrp: variant.mrp,
                    })
                  }
                  className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all ${
                    isWishlisted
                      ? "border-coral bg-coral/10"
                      : "border-warmgray-200 hover:border-coral"
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart size={18} className={isWishlisted ? "fill-coral text-coral" : "text-warmgray-400"} />
                </button>
                <button className="w-12 h-12 rounded-full border-2 border-warmgray-200 flex items-center justify-center hover:border-sage-400 transition-colors" aria-label="Share">
                  <Share2 size={18} className="text-warmgray-400" />
                </button>
              </div>

              {/* Buy now */}
              {variant.inStock && (
                <Link href="/checkout" className="btn-coral w-full text-center py-3.5 mb-6 block">
                  Buy Now →
                </Link>
              )}

              {/* Trust badges */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                {[
                  { icon: Truck, text: "Free shipping above ₹999" },
                  { icon: RefreshCcw, text: "Easy 7-day returns" },
                  { icon: Shield, text: "100% authentic products" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="bg-warmgray-50 rounded-xl p-3 text-center">
                    <Icon size={16} className="text-sage-600 mx-auto mb-1" />
                    <p className="text-[10px] text-warmgray-500 leading-tight">{text}</p>
                  </div>
                ))}
              </div>

              {/* Benefits */}
              <div className="flex flex-wrap gap-2 mb-6">
                {product.benefits.map((b) => (
                  <span key={b} className="flex items-center gap-1 text-xs font-medium text-sage-700 bg-sage-50 px-3 py-1 rounded-full">
                    <Check size={11} /> {b}
                  </span>
                ))}
              </div>

              {/* Accordions */}
              <div className="bg-white rounded-2xl border border-warmgray-100 px-5">
                <AccordionItem title="Description" content={product.description} />
                <AccordionItem title="Ingredients" content={product.ingredients} />
                <AccordionItem title="How to Use" content={product.howToUse} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-12 bg-white">
        <div className="container-padded">
          <h2 className="font-serif text-2xl font-bold text-forest mb-6">Customer Reviews</h2>
          {/* Summary */}
          <div className="flex items-center gap-4 mb-8 p-5 bg-sage-50 rounded-2xl w-fit">
            <div className="text-center">
              <p className="font-serif text-5xl font-bold text-forest">{product.rating}</p>
              <div className="flex mt-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={14} className={s <= Math.round(product.rating) ? "fill-amber-400 text-amber-400" : "text-warmgray-200"} />
                ))}
              </div>
              <p className="text-xs text-warmgray-400 mt-1">{product.reviewCount} reviews</p>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            {REVIEWS.map((r, i) => (
              <div key={i} className="bg-warmgray-50 rounded-2xl p-5">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-semibold text-forest text-sm">{r.name}</p>
                    <div className="flex mt-0.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} size={12} className={s <= r.rating ? "fill-amber-400 text-amber-400" : "text-warmgray-200"} />
                      ))}
                    </div>
                  </div>
                  <span className="text-xs text-warmgray-400">{new Date(r.date).toLocaleDateString("en-IN")}</span>
                </div>
                <p className="font-semibold text-sm text-forest mb-1">{r.title}</p>
                <p className="text-sm text-warmgray-500">{r.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="py-12 bg-cream-50">
          <div className="container-padded">
            <h2 className="font-serif text-2xl font-bold text-forest mb-6">You Might Also Like</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {related.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
