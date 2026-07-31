"use client";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, Tag, ArrowRight } from "lucide-react";
import { useCartStore } from "@/lib/store/cart-store";
import { coupons } from "@/lib/mock-data/coupons";
import { useState } from "react";

function formatINR(n: number) {
  return `₹${n.toLocaleString("en-IN")}`;
}

export default function CartPage() {
  const {
    items, removeItem, updateQty,
    couponCode, setCouponCode, applyCoupon, removeCoupon,
    appliedCoupon, couponError,
    subtotal, discount, shipping, grandTotal,
  } = useCartStore();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setCouponCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  if (items.length === 0) {
    return (
      <section className="section-py bg-cream-50 min-h-[60vh] flex items-center">
        <div className="container-padded text-center mx-auto">
          <div className="w-24 h-24 bg-sage-50 rounded-full flex items-center justify-center mx-auto mb-5">
            <span className="text-4xl">🛍️</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-forest mb-3">Your cart is empty</h1>
          <p className="text-warmgray-500 mb-6">Discover our science-backed bodycare collection.</p>
          <Link href="/collections/shop" className="btn-primary">Browse Products</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="section-py bg-cream-50">
      <div className="container-padded">
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-forest mb-8">Your Cart</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={`${item.productId}-${item.variant.id}`}
                className="bg-white rounded-2xl p-4 flex gap-4 shadow-card"
              >
                <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-warmgray-50 shrink-0">
                  <Image src={item.image} alt={item.title} fill className="object-cover" sizes="96px" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between gap-2 mb-1">
                    <Link
                      href={`/products/${item.handle}`}
                      className="font-semibold text-forest hover:text-sage-700 transition-colors line-clamp-1"
                    >
                      {item.title}
                    </Link>
                    <button
                      onClick={() => removeItem(item.productId, item.variant.id)}
                      className="text-warmgray-300 hover:text-coral transition-colors shrink-0"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <p className="text-sm text-warmgray-400 mb-3">{item.variant.name}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center border border-warmgray-200 rounded-lg overflow-hidden">
                      <button
                        onClick={() => updateQty(item.productId, item.variant.id, item.quantity - 1)}
                        className="px-3 py-1.5 text-warmgray-500 hover:text-forest hover:bg-sage-50 transition-colors"
                      >
                        <Minus size={13} />
                      </button>
                      <span className="px-3 py-1.5 text-sm font-semibold text-forest min-w-10 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQty(item.productId, item.variant.id, item.quantity + 1)}
                        className="px-3 py-1.5 text-warmgray-500 hover:text-forest hover:bg-sage-50 transition-colors"
                      >
                        <Plus size={13} />
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-forest">{formatINR(item.variant.price * item.quantity)}</p>
                      {item.variant.mrp > item.variant.price && (
                        <p className="text-xs text-warmgray-400 line-through">
                          {formatINR(item.variant.mrp * item.quantity)}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="space-y-4">
            {/* Coupons */}
            <div className="bg-white rounded-2xl p-5 shadow-card">
              <p className="text-sm font-semibold text-forest flex items-center gap-1.5 mb-3">
                <Tag size={14} className="text-sage-500" /> Available Coupons
              </p>
              <div className="space-y-2 mb-4">
                {coupons.map((c) => (
                  <div key={c.code} className="flex items-center justify-between bg-sage-50 rounded-xl px-3 py-2">
                    <div>
                      <span className="text-xs font-bold text-forest font-mono">{c.code}</span>
                      <p className="text-[10px] text-warmgray-400">{c.description}</p>
                    </div>
                    <button
                      onClick={() => handleCopy(c.code)}
                      className="text-xs text-sage-600 font-semibold hover:text-forest"
                    >
                      {copiedCode === c.code ? "✓ Copied!" : "Copy"}
                    </button>
                  </div>
                ))}
              </div>

              {!appliedCoupon ? (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    placeholder="Coupon code"
                    className="flex-1 input-base"
                    onKeyDown={(e) => e.key === "Enter" && applyCoupon()}
                  />
                  <button
                    onClick={applyCoupon}
                    className="px-4 py-2.5 bg-forest text-cream-50 text-sm font-semibold rounded-xl hover:bg-forest-light transition-colors"
                  >
                    Apply
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between bg-sage-50 rounded-xl px-3 py-2.5">
                  <div>
                    <p className="text-xs font-bold text-sage-700">✓ {appliedCoupon.code} applied</p>
                    <p className="text-[10px] text-sage-600">You save {formatINR(discount())}</p>
                  </div>
                  <button onClick={removeCoupon} className="text-xs text-coral font-semibold">Remove</button>
                </div>
              )}
              {couponError && <p className="text-xs text-coral mt-2">{couponError}</p>}
            </div>

            {/* Bill */}
            <div className="bg-white rounded-2xl p-5 shadow-card">
              <p className="font-semibold text-forest mb-4">Order Summary</p>
              <div className="space-y-2.5 text-sm">
                <div className="flex justify-between text-warmgray-600">
                  <span>Subtotal</span><span>{formatINR(subtotal())}</span>
                </div>
                {discount() > 0 && (
                  <div className="flex justify-between text-sage-600">
                    <span>Coupon Discount</span><span>−{formatINR(discount())}</span>
                  </div>
                )}
                <div className="flex justify-between text-warmgray-600">
                  <span>Shipping</span>
                  <span className={shipping() === 0 ? "text-sage-600 font-medium" : ""}>
                    {shipping() === 0 ? "FREE" : formatINR(shipping())}
                  </span>
                </div>
                <div className="border-t border-warmgray-100 pt-2.5 flex justify-between font-bold text-base text-forest">
                  <span>Total</span><span>{formatINR(grandTotal())}</span>
                </div>
              </div>
              {shipping() > 0 && (
                <p className="text-xs text-warmgray-400 mt-3 bg-amber-50 px-3 py-2 rounded-lg">
                  Add {formatINR(999 - subtotal())} more for FREE shipping!
                </p>
              )}
              <Link
                href="/checkout"
                className="btn-coral w-full text-center py-3.5 mt-4 flex items-center justify-center gap-2"
              >
                Proceed to Checkout <ArrowRight size={16} />
              </Link>
              <Link href="/collections/shop" className="btn-outline w-full text-center py-3 mt-2 flex items-center justify-center">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
