"use client";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Trash2, Heart } from "lucide-react";
import { useWishlistStore } from "@/lib/store/wishlist-store";
import { useCartStore } from "@/lib/store/cart-store";
import { getProductByHandle } from "@/lib/mock-data/products";

export default function WishlistPage() {
  const { items, remove } = useWishlistStore();
  const addItem = useCartStore((s) => s.addItem);

  const handleAddToCart = (item: (typeof items)[0]) => {
    const product = getProductByHandle(item.handle);
    if (!product) return;
    addItem(product, product.variants[0], 1);
  };

  return (
    <section className="section-py bg-cream-50 min-h-[70vh]">
      <div className="container-padded">
        <div className="flex items-center gap-3 mb-8">
          <Heart size={24} className="text-coral fill-coral" />
          <h1 className="font-serif text-3xl font-bold text-forest">My Wishlist</h1>
          {items.length > 0 && (
            <span className="bg-coral text-white text-xs font-bold px-2.5 py-0.5 rounded-full">
              {items.length}
            </span>
          )}
        </div>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-sage-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart size={32} className="text-sage-300" />
            </div>
            <h2 className="font-serif text-2xl font-semibold text-forest mb-2">Your wishlist is empty</h2>
            <p className="text-warmgray-400 text-sm mb-6">Save products you love to your wishlist.</p>
            <Link href="/collections/shop" className="btn-primary">Browse Products</Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {items.map((item) => (
              <div key={item.productId} className="card-base overflow-hidden group">
                <div className="relative aspect-square bg-warmgray-50 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                  <button
                    onClick={() => remove(item.productId)}
                    className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-coral hover:text-white transition-colors"
                    aria-label="Remove from wishlist"
                  >
                    <Trash2 size={13} className="text-warmgray-400 group-hover:text-inherit" />
                  </button>
                </div>
                <div className="p-4">
                  <Link
                    href={`/products/${item.handle}`}
                    className="font-semibold text-forest hover:text-sage-700 transition-colors line-clamp-1 text-sm"
                  >
                    {item.title}
                  </Link>
                  <div className="flex items-baseline gap-2 mt-1 mb-3">
                    <span className="font-bold text-forest">₹{item.price.toLocaleString("en-IN")}</span>
                    {item.mrp > item.price && (
                      <span className="text-xs text-warmgray-400 line-through">₹{item.mrp.toLocaleString("en-IN")}</span>
                    )}
                  </div>
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="w-full flex items-center justify-center gap-2 py-2.5 bg-forest text-cream-50 rounded-xl text-sm font-semibold hover:bg-forest-light transition-colors"
                  >
                    <ShoppingBag size={14} /> Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
