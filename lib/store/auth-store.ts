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

export interface OrderItem {
  quantity: number;
  price: number;
  variant: {
    name: string;
    sku: string;
    product: { title: string; handle: string };
  };
}

export interface Order {
  id: string;
  orderNumber: string;
  status: string;
  total: number;
  createdAt: string;
  items: OrderItem[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  addresses: Address[];
  orders: Order[];
}

interface AuthStore {
  user: User | null;
  isLoading: boolean;
  error: string;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  fetchOrders: () => Promise<void>;
  fetchUserProfile: () => Promise<void>;
  updateProfile: (name: string, email: string, phone: string) => Promise<boolean>;
  addAddress: (address: Omit<Address, 'id'>) => Promise<boolean>;
  updateAddress: (id: string, address: Omit<Address, 'id'>) => Promise<boolean>;
  deleteAddress: (id: string) => Promise<boolean>;
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
  orders: [], // no mock orders — always start clean
};

// Points to the Express backend (same value used in lib/api.ts)
const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

/** Read the JWT stored by login/register from localStorage */
function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("wow-token");
}

/** Shape the raw API user into the store's User interface */
function toUser(apiUser: any, orders: Order[] = []): User {
  return {
    id: apiUser.id,
    name: apiUser.name,
    email: apiUser.email,
    phone: apiUser.phone ?? "",
    addresses: apiUser.addresses ?? [],
    orders,
  };
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isLoading: false,
      error: "",

      login: async (email, password) => {
        set({ isLoading: true, error: "" });

        try {
          // ── Real backend login ─────────────────────────────────────────
          const res = await fetch(`${API_BASE}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          });

          if (res.ok) {
            const data = await res.json();
            const { token, user: apiUser } = data;

            // Store JWT so checkout can send Authorization: Bearer <token>
            localStorage.setItem("wow-token", token);

            // Build user with empty orders — fetchOrders() will populate them
            const user = toUser(apiUser, []);
            set({ user, isLoading: false });

            // Immediately fetch this user's real orders from the backend
            // (fire-and-forget; account page will show them once loaded)
            get().fetchOrders();
            return true;
          }
        } catch {
          // Network error / backend offline — fall through to demo fallback
        }

        // ── Demo fallback: hardcoded credentials work offline ──────────
        if (email === "ananya@example.com" && password === "password123") {
          set({ user: { ...MOCK_USER, orders: [] }, isLoading: false });
          return true;
        }

        // Allow any email + password ≥ 6 chars for demo purposes
        if (email && password.length >= 6) {
          set({
            user: { ...MOCK_USER, email, name: email.split("@")[0], orders: [] },
            isLoading: false,
          });
          return true;
        }

        set({ error: "Invalid email or password.", isLoading: false });
        return false;
      },

      register: async (name, email, password) => {
        set({ isLoading: true, error: "" });

        try {
          // ── Real backend registration ──────────────────────────────────
          const res = await fetch(`${API_BASE}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password }),
          });

          if (res.ok) {
            const data = await res.json();
            const { token, user: apiUser } = data;
            localStorage.setItem("wow-token", token);
            const user = toUser(apiUser, []);
            set({ user, isLoading: false });
            return true;
          }

          // Surface backend error (e.g. "Email already registered")
          try {
            const errData = await res.json();
            set({
              error: errData.error ?? "Registration failed.",
              isLoading: false,
            });
          } catch {
            set({ error: "Registration failed.", isLoading: false });
          }
          return false;
        } catch {
          // Network error — demo fallback
        }

        // ── Demo fallback ───────────────────────────────────────────────
        set({
          user: { ...MOCK_USER, name, email, orders: [] },
          isLoading: false,
        });
        return true;
      },

      /**
       * Fetches the authenticated user's orders from GET /auth/me.
       * Called automatically after login and after a successful checkout.
       * Updates the orders on the user object in state without touching
       * any other user fields.
       */
      fetchOrders: async () => {
        const token = getToken();
        if (!token) return; // not logged in — nothing to fetch

        try {
          const res = await fetch(`${API_BASE}/auth/me`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          if (!res.ok) return;

          const data = await res.json();
          const freshOrders: Order[] = data.orders ?? [];

          set((state) => {
            if (!state.user) return {};
            return { user: { ...state.user, orders: freshOrders } };
          });
        } catch {
          // silently ignore — stale orders are better than a crash
        }
      },

      fetchUserProfile: async () => {
        const token = getToken();
        if (!token) return;
        try {
          const res = await fetch(`${API_BASE}/auth/me`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (!res.ok) return;
          const data = await res.json();
          set((state) => {
            if (!state.user) return {};
            return {
              user: {
                ...state.user,
                name: data.name,
                email: data.email,
                phone: data.phone ?? "",
                addresses: data.addresses ?? [],
                orders: data.orders ?? state.user.orders,
              },
            };
          });
        } catch (err) {
          console.error("Failed to fetch profile", err);
        }
      },

      updateProfile: async (name, email, phone) => {
        const token = getToken();
        if (!token) return false;
        set({ isLoading: true, error: "" });
        try {
          const res = await fetch(`${API_BASE}/auth/profile`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ name, email, phone }),
          });

          if (res.ok) {
            const data = await res.json();
            set((state) => {
              if (!state.user) return {};
              return {
                user: {
                  ...state.user,
                  name: data.user.name,
                  email: data.user.email,
                  phone: data.user.phone,
                  addresses: data.user.addresses ?? state.user.addresses,
                },
                isLoading: false,
              };
            });
            return true;
          } else {
            const errData = await res.json().catch(() => ({}));
            set({ error: errData.error ?? "Failed to update profile", isLoading: false });
            return false;
          }
        } catch {
          set({ error: "Network error. Please try again.", isLoading: false });
          return false;
        }
      },

      addAddress: async (address) => {
        const token = getToken();
        if (!token) return false;
        set({ isLoading: true, error: "" });
        try {
          const res = await fetch(`${API_BASE}/auth/addresses`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(address),
          });

          if (res.ok) {
            set({ isLoading: false });
            const store = get() as any;
            await store.fetchUserProfile();
            return true;
          } else {
            const errData = await res.json().catch(() => ({}));
            set({ error: errData.error ?? "Failed to add address", isLoading: false });
            return false;
          }
        } catch {
          set({ error: "Network error.", isLoading: false });
          return false;
        }
      },

      updateAddress: async (id, address) => {
        const token = getToken();
        if (!token) return false;
        set({ isLoading: true, error: "" });
        try {
          const res = await fetch(`${API_BASE}/auth/addresses/${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(address),
          });

          if (res.ok) {
            set({ isLoading: false });
            const store = get() as any;
            await store.fetchUserProfile();
            return true;
          } else {
            const errData = await res.json().catch(() => ({}));
            set({ error: errData.error ?? "Failed to update address", isLoading: false });
            return false;
          }
        } catch {
          set({ error: "Network error.", isLoading: false });
          return false;
        }
      },

      deleteAddress: async (id) => {
        const token = getToken();
        if (!token) return false;
        set({ isLoading: true, error: "" });
        try {
          const res = await fetch(`${API_BASE}/auth/addresses/${id}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (res.ok) {
            set({ isLoading: false });
            const store = get() as any;
            await store.fetchUserProfile();
            return true;
          } else {
            const errData = await res.json().catch(() => ({}));
            set({ error: errData.error ?? "Failed to delete address", isLoading: false });
            return false;
          }
        } catch {
          set({ error: "Network error.", isLoading: false });
          return false;
        }
      },

      logout: () => {
        localStorage.removeItem("wow-token");
        set({ user: null });
      },

      clearError: () => set({ error: "" }),
    }),
    { name: "wow-auth" }
  )
);
