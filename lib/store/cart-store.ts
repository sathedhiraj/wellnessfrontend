"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ProductVariant, Product } from "@/lib/mock-data/products";
import { Coupon, validateCoupon, calculateDiscount } from "@/lib/mock-data/coupons";

export interface CartItem {
  productId: string;
  handle: string;
  title: string;
  image: string;
  variant: ProductVariant;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  couponCode: string;
  appliedCoupon: Coupon | null;
  couponError: string;

  addItem: (product: Product, variant: ProductVariant, qty?: number) => void;
  removeItem: (productId: string, variantId: string) => void;
  updateQty: (productId: string, variantId: string, qty: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  setCouponCode: (code: string) => void;
  applyCoupon: () => void;
  removeCoupon: () => void;

  subtotal: () => number;
  discount: () => number;
  shipping: () => number;
  grandTotal: () => number;
  itemCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      couponCode: "",
      appliedCoupon: null,
      couponError: "",

      addItem: (product, variant, qty = 1) => {
        set((state) => {
          const existing = state.items.find(
            (i) => i.productId === product.id && i.variant.id === variant.id
          );
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.productId === product.id && i.variant.id === variant.id
                  ? { ...i, quantity: i.quantity + qty }
                  : i
              ),
              isOpen: true,
            };
          }
          return {
            items: [
              ...state.items,
              {
                productId: product.id,
                handle: product.handle,
                title: product.title,
                image: product.images[0],
                variant,
                quantity: qty,
              },
            ],
            isOpen: true,
          };
        });
      },

      removeItem: (productId, variantId) =>
        set((state) => ({
          items: state.items.filter(
            (i) => !(i.productId === productId && i.variant.id === variantId)
          ),
        })),

      updateQty: (productId, variantId, qty) =>
        set((state) => ({
          items:
            qty <= 0
              ? state.items.filter(
                  (i) => !(i.productId === productId && i.variant.id === variantId)
                )
              : state.items.map((i) =>
                  i.productId === productId && i.variant.id === variantId
                    ? { ...i, quantity: qty }
                    : i
                ),
        })),

      clearCart: () => set({ items: [], appliedCoupon: null, couponCode: "", couponError: "" }),

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((s) => ({ isOpen: !s.isOpen })),

      setCouponCode: (code) => set({ couponCode: code, couponError: "" }),

      applyCoupon: () => {
        const { couponCode, subtotal } = get();
        const result = validateCoupon(couponCode, subtotal());
        if (result.valid && result.coupon) {
          set({ appliedCoupon: result.coupon, couponError: "" });
        } else {
          set({ couponError: result.error || "Invalid coupon.", appliedCoupon: null });
        }
      },

      removeCoupon: () =>
        set({ appliedCoupon: null, couponCode: "", couponError: "" }),

      subtotal: () =>
        get().items.reduce((sum, i) => sum + i.variant.price * i.quantity, 0),

      discount: () => {
        const { appliedCoupon, subtotal } = get();
        if (!appliedCoupon) return 0;
        return calculateDiscount(appliedCoupon, subtotal());
      },

      shipping: () => {
        const sub = get().subtotal();
        return sub >= 999 ? 0 : 99;
      },

      grandTotal: () => {
        const { subtotal, discount, shipping } = get();
        return subtotal() - discount() + shipping();
      },

      itemCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    { name: "wow-cart" }
  )
);
