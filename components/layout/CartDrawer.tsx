"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Minus, Plus, Trash2, Copy, Check, ShoppingBag, Tag } from "lucide-react";
import { useCartStore } from "@/lib/store/cart-store";
import { coupons } from "@/lib/mock-data/coupons";
import { useState } from "react";

function formatINR(amount: number) {
  return `₹${amount.toLocaleString("en-IN")}`;
}

export function CartDrawer() {
  const {
    isOpen,
    closeCart,
    items,
    removeItem,
    updateQty,
    couponCode,
    setCouponCode,
    applyCoupon,
    removeCoupon,
    appliedCoupon,
    couponError,
    subtotal,
    discount,
    shipping,
    grandTotal,
  } = useCartStore();

  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setCouponCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [closeCart]);

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="overlay-bg animate-fade-in"
          onClick={closeCart}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <div
        ref={drawerRef}
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-drawer flex flex-col transform transition-transform duration-350 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping Cart"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-warmgray-100">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-forest" />
            <h2 className="font-serif text-lg font-bold text-forest">Your Cart</h2>
            {items.length > 0 && (
              <span className="bg-forest text-cream-50 text-xs font-bold px-2 py-0.5 rounded-full">
                {items.reduce((s, i) => s + i.quantity, 0)}
              </span>
            )}
          </div>
          <button
            onClick={closeCart}
            className="p-2 text-warmgray-400 hover:text-forest transition-colors"
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 px-6 text-center">
              <div className="w-20 h-20 bg-sage-50 rounded-full flex items-center justify-center">
                <ShoppingBag size={32} className="text-sage-300" />
              </div>
              <div>
                <p className="font-serif text-xl font-semibold text-forest mb-1">Your cart is empty</p>
                <p className="text-sm text-warmgray-500">Discover our science-backed bodycare range.</p>
              </div>
              <button
                onClick={closeCart}
                className="btn-primary mt-2"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="divide-y divide-warmgray-50">
              {items.map((item) => (
                <div key={`${item.productId}-${item.variant.id}`} className="flex gap-3 p-4">
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-warmgray-50 shrink-0">
                    <Image src={item.image} alt={item.title} fill className="object-cover" sizes="80px" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between gap-2">
                      <div>
                        <Link
                          href={`/products/${item.handle}`}
                          className="text-sm font-semibold text-forest hover:text-sage-600 line-clamp-1"
                          onClick={closeCart}
                        >
                          {item.title}
                        </Link>
                        <p className="text-xs text-warmgray-400 mt-0.5">{item.variant.name}</p>
                      </div>
                      <button
                        onClick={() => removeItem(item.productId, item.variant.id)}
                        className="text-warmgray-300 hover:text-coral transition-colors shrink-0"
                        aria-label="Remove item"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-warmgray-200 rounded-lg overflow-hidden">
                        <button
                          onClick={() => updateQty(item.productId, item.variant.id, item.quantity - 1)}
                          className="px-2 py-1 text-warmgray-500 hover:text-forest hover:bg-sage-50 transition-colors"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="px-3 py-1 text-sm font-medium text-forest min-w-8 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQty(item.productId, item.variant.id, item.quantity + 1)}
                          className="px-2 py-1 text-warmgray-500 hover:text-forest hover:bg-sage-50 transition-colors"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-forest">
                          {formatINR(item.variant.price * item.quantity)}
                        </p>
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
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-warmgray-100 bg-cream-50">
            {/* Coupons */}
            <div className="px-4 pt-4">
              <p className="text-xs font-semibold text-warmgray-500 uppercase tracking-widest mb-2 flex items-center gap-1">
                <Tag size={12} /> Available Coupons
              </p>
              <div className="space-y-2 mb-3">
                {coupons.map((c) => (
                  <div
                    key={c.code}
                    className="flex items-center justify-between bg-white border border-warmgray-100 rounded-xl px-3 py-2"
                  >
                    <div>
                      <span className="text-xs font-bold text-forest font-mono bg-sage-50 px-1.5 py-0.5 rounded">
                        {c.code}
                      </span>
                      <p className="text-[10px] text-warmgray-400 mt-0.5">{c.description}</p>
                    </div>
                    <button
                      onClick={() => handleCopy(c.code)}
                      className="flex items-center gap-1 text-[11px] font-medium text-sage-600 hover:text-sage-800 transition-colors"
                    >
                      {copiedCode === c.code ? <Check size={12} /> : <Copy size={12} />}
                      {copiedCode === c.code ? "Copied!" : "Copy"}
                    </button>
                  </div>
                ))}
              </div>

              {/* Coupon input */}
              {!appliedCoupon ? (
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    placeholder="Enter coupon code"
                    className="flex-1 px-3 py-2 border border-warmgray-200 rounded-xl text-sm focus:border-sage-500 focus:ring-2 focus:ring-sage-100 transition-colors"
                    onKeyDown={(e) => e.key === "Enter" && applyCoupon()}
                  />
                  <button
                    onClick={applyCoupon}
                    className="px-4 py-2 bg-forest text-cream-50 text-sm font-semibold rounded-xl hover:bg-forest-light transition-colors"
                  >
                    Apply
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between bg-sage-50 border border-sage-200 rounded-xl px-3 py-2 mb-3">
                  <div>
                    <p className="text-xs font-bold text-sage-700">🎉 {appliedCoupon.code} applied!</p>
                    <p className="text-[10px] text-sage-600">You save {formatINR(discount())}</p>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-[11px] text-coral font-medium hover:underline"
                  >
                    Remove
                  </button>
                </div>
              )}
              {couponError && (
                <p className="text-xs text-coral mb-2">{couponError}</p>
              )}
            </div>

            {/* Bill summary */}
            <div className="px-4 space-y-1.5 pb-3">
              <div className="flex justify-between text-sm text-warmgray-600">
                <span>Subtotal</span>
                <span>{formatINR(subtotal())}</span>
              </div>
              {discount() > 0 && (
                <div className="flex justify-between text-sm text-sage-600">
                  <span>Discount</span>
                  <span>−{formatINR(discount())}</span>
                </div>
              )}
              <div className="flex justify-between text-sm text-warmgray-600">
                <span>Shipping</span>
                <span className={shipping() === 0 ? "text-sage-600 font-medium" : ""}>
                  {shipping() === 0 ? "FREE" : formatINR(shipping())}
                </span>
              </div>
              <div className="flex justify-between font-bold text-base text-forest border-t border-warmgray-100 pt-2 mt-1">
                <span>Grand Total</span>
                <span>{formatINR(grandTotal())}</span>
              </div>
            </div>

            <div className="px-4 pb-5">
              <Link
                href="/checkout"
                onClick={closeCart}
                className="btn-coral w-full text-center py-3.5 text-base"
              >
                Proceed to Checkout →
              </Link>
              {shipping() > 0 && (
                <p className="text-xs text-center text-warmgray-400 mt-2">
                  Add {formatINR(999 - subtotal())} more for FREE shipping
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
