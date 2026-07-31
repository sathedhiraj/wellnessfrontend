"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Star, ShoppingCart, Check } from "lucide-react";
import { Product } from "@/lib/mock-data/products";
import { useCartStore } from "@/lib/store/cart-store";
import { useWishlistStore } from "@/lib/store/wishlist-store";

interface ProductCardProps {
  product: Product;
  showVariants?: boolean;
}

export function ProductCard({ product, showVariants = true }: ProductCardProps) {
  const [hovered, setHovered] = useState(false);
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [added, setAdded] = useState(false);

  const addItem = useCartStore((s) => s.addItem);
  const toggle = useWishlistStore((s) => s.toggle);
  const isWishlisted = useWishlistStore((s) => s.isWishlisted(product.id));

  const variant = product.variants[selectedVariantIdx];
  const discountPct = Math.round(((variant.mrp - variant.price) / variant.mrp) * 100);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, variant, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggle({
      productId: product.id,
      handle: product.handle,
      title: product.title,
      image: product.images[0],
      price: variant.price,
      mrp: variant.mrp,
    });
  };

  return (
    <Link
      href={`/products/${product.handle}`}
      className="group block"
      id={`product-card-${product.handle}`}
    >
      <div className="card-base overflow-hidden">
        {/* Image */}
        <div
          className="relative aspect-square overflow-hidden bg-warmgray-50"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <Image
            src={hovered && product.hoverImage ? product.hoverImage : product.images[0]}
            alt={product.title}
            fill
            className="object-cover transition-all duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />

          {/* Badges */}
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
            {product.isBestseller && (
              <span className="badge-bestseller">Bestseller</span>
            )}
            {discountPct > 0 && (
              <span className="badge-sale">{discountPct}% off</span>
            )}
            {!variant.inStock && (
              <span className="inline-block px-2 py-0.5 bg-warmgray-700 text-white text-xs font-bold rounded-full">
                Sold Out
              </span>
            )}
          </div>

          {/* Wishlist */}
          <button
            onClick={handleWishlist}
            className="absolute top-2.5 right-2.5 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart
              size={15}
              className={isWishlisted ? "fill-coral text-coral" : "text-warmgray-400"}
            />
          </button>

          {/* Quick add */}
          <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <button
              onClick={handleAddToCart}
              disabled={!variant.inStock}
              className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                added
                  ? "bg-sage-500 text-white"
                  : variant.inStock
                  ? "bg-forest text-cream-50 hover:bg-forest-light"
                  : "bg-warmgray-200 text-warmgray-400 cursor-not-allowed"
              }`}
            >
              {added ? (
                <><Check size={15} /> Added!</>
              ) : variant.inStock ? (
                <><ShoppingCart size={15} /> Add to Cart</>
              ) : (
                "Sold Out"
              )}
            </button>
          </div>
        </div>

        {/* Details */}
        <div className="p-3.5">
          <p className="text-xs text-sage-600 font-medium uppercase tracking-wider mb-0.5">
            {product.collection[0]}
          </p>
          <h3 className="font-semibold text-sm text-forest leading-snug line-clamp-1 mb-0.5 group-hover:text-sage-700 transition-colors">
            {product.title}
          </h3>
          <p className="text-xs text-warmgray-400 line-clamp-1 mb-2">{product.tagline}</p>

          {/* Stars */}
          <div className="flex items-center gap-1 mb-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  size={11}
                  className={s <= Math.round(product.rating) ? "fill-amber-400 text-amber-400" : "text-warmgray-200"}
                />
              ))}
            </div>
            <span className="text-[10px] text-warmgray-400">({product.reviewCount})</span>
          </div>

          {/* Variants */}
          {showVariants && product.variants.length > 1 && (
            <div className="flex gap-1.5 mb-2.5">
              {product.variants.map((v, i) => (
                <button
                  key={v.id}
                  onClick={(e) => { e.preventDefault(); setSelectedVariantIdx(i); }}
                  className={`px-2.5 py-0.5 rounded-full text-xs font-medium border transition-colors ${
                    selectedVariantIdx === i
                      ? "border-forest bg-forest text-cream-50"
                      : "border-warmgray-200 text-warmgray-600 hover:border-sage-400"
                  }`}
                >
                  {v.name}
                </button>
              ))}
            </div>
          )}

          {/* Price */}
          <div className="flex items-baseline gap-1.5">
            <span className="text-base font-bold text-forest">
              ₹{variant.price.toLocaleString("en-IN")}
            </span>
            {variant.mrp > variant.price && (
              <span className="text-xs text-warmgray-400 line-through">
                ₹{variant.mrp.toLocaleString("en-IN")}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
