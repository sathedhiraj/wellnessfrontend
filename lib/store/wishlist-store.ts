"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface WishlistItem {
  productId: string;
  handle: string;
  title: string;
  image: string;
  price: number;
  mrp: number;
}

interface WishlistStore {
  items: WishlistItem[];
  toggle: (item: WishlistItem) => void;
  isWishlisted: (productId: string) => boolean;
  remove: (productId: string) => void;
  count: () => number;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],

      toggle: (item) => {
        const exists = get().items.find((i) => i.productId === item.productId);
        if (exists) {
          set((s) => ({ items: s.items.filter((i) => i.productId !== item.productId) }));
        } else {
          set((s) => ({ items: [...s.items, item] }));
        }
      },

      isWishlisted: (productId) =>
        !!get().items.find((i) => i.productId === productId),

      remove: (productId) =>
        set((s) => ({ items: s.items.filter((i) => i.productId !== productId) })),

      count: () => get().items.length,
    }),
    { name: "wow-wishlist" }
  )
);
