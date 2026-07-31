"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/auth-store";
import { Package, MapPin, User, LogOut, ChevronRight } from "lucide-react";

const MOCK_ORDERS = [
  { id: "WOW78234", date: "2026-07-22", total: 1448, status: "Delivered", items: ["Radiance Body Wash (200ml)", "Velvet Body Lotion (60ml)"] },
  { id: "WOW65109", date: "2026-06-15", total: 699, status: "Delivered", items: ["Hydra-Gel Body Moisturiser (200ml)"] },
  { id: "WOW93847", date: "2026-05-30", total: 1598, status: "Delivered", items: ["Glow Exfoliating Mist (200ml)", "Niacinamide Body Serum (50ml)"] },
];

const STATUS_COLORS: Record<string, string> = {
  Delivered: "bg-sage-100 text-sage-700",
  Shipped: "bg-blue-50 text-blue-600",
  Processing: "bg-amber-50 text-amber-600",
  Cancelled: "bg-red-50 text-red-600",
};

export default function AccountPage() {
  const { user, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/account/login");
  };

  if (!user) {
    return (
      <section className="section-py bg-cream-50 min-h-[60vh] flex items-center">
        <div className="container-padded text-center">
          <h1 className="font-serif text-2xl text-forest mb-4">Please sign in to view your account</h1>
          <Link href="/account/login" className="btn-primary">Sign In</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="section-py bg-cream-50">
      <div className="container-padded max-w-5xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-sage-100 rounded-full flex items-center justify-center">
              <span className="text-sage-600 font-bold text-xl font-serif">{user.name[0]}</span>
            </div>
            <div>
              <h1 className="font-serif text-2xl font-bold text-forest">Hello, {user.name.split(" ")[0]}!</h1>
              <p className="text-warmgray-400 text-sm">{user.email}</p>
            </div>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-warmgray-500 hover:text-coral transition-colors">
            <LogOut size={16} /> Sign Out
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Quick links */}
          <div className="space-y-3">
            {[
              { icon: Package, label: "Order History", count: MOCK_ORDERS.length },
              { icon: MapPin, label: "Saved Addresses", count: user.addresses.length },
              { icon: User, label: "Profile Details" },
            ].map(({ icon: Icon, label, count }) => (
              <div key={label} className="bg-white rounded-2xl p-4 shadow-card flex items-center justify-between group cursor-pointer hover:shadow-card-hover transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-sage-50 rounded-xl flex items-center justify-center">
                    <Icon size={16} className="text-sage-600" />
                  </div>
                  <span className="font-semibold text-forest text-sm">{label}</span>
                </div>
                <div className="flex items-center gap-2">
                  {count !== undefined && (
                    <span className="text-xs text-warmgray-400">{count}</span>
                  )}
                  <ChevronRight size={14} className="text-warmgray-300" />
                </div>
              </div>
            ))}
          </div>

          {/* Orders */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-card p-5">
              <h2 className="font-serif text-xl font-bold text-forest mb-4">Recent Orders</h2>
              <div className="space-y-4">
                {MOCK_ORDERS.map((order) => (
                  <div key={order.id} className="border border-warmgray-100 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="font-semibold text-forest text-sm">#{order.id}</p>
                        <p className="text-xs text-warmgray-400">
                          {new Date(order.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${STATUS_COLORS[order.status]}`}>
                          {order.status}
                        </span>
                        <p className="text-sm font-bold text-forest mt-1">₹{order.total.toLocaleString("en-IN")}</p>
                      </div>
                    </div>
                    <div className="space-y-0.5">
                      {order.items.map((item) => (
                        <p key={item} className="text-xs text-warmgray-400">· {item}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
