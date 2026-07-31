"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Address {
  id: string;
  name: string;
  phone: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  pincode: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  addresses: Address[];
}

interface AuthStore {
  user: User | null;
  isLoading: boolean;
  error: string;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  clearError: () => void;
}

const MOCK_USER: User = {
  id: "u1",
  name: "Ananya Singh",
  email: "ananya@example.com",
  phone: "+91 98765 43210",
  addresses: [
    {
      id: "a1",
      name: "Ananya Singh",
      phone: "+91 98765 43210",
      line1: "12, Green Valley Apartments",
      line2: "Bandra West",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400050",
    },
  ],
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isLoading: false,
      error: "",

      login: async (email, password) => {
        set({ isLoading: true, error: "" });
        await new Promise((r) => setTimeout(r, 800));
        if (email === "ananya@example.com" && password === "password123") {
          set({ user: MOCK_USER, isLoading: false });
          return true;
        }
        // Allow any credentials for demo
        if (email && password.length >= 6) {
          set({
            user: { ...MOCK_USER, email, name: email.split("@")[0] },
            isLoading: false,
          });
          return true;
        }
        set({ error: "Invalid email or password.", isLoading: false });
        return false;
      },

      register: async (name, email, _password) => {
        set({ isLoading: true, error: "" });
        await new Promise((r) => setTimeout(r, 800));
        set({
          user: { ...MOCK_USER, name, email },
          isLoading: false,
        });
        return true;
      },

      logout: () => set({ user: null }),
      clearError: () => set({ error: "" }),
    }),
    { name: "wow-auth" }
  )
);
