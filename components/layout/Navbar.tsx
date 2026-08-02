"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingBag, Heart, Search, User, Menu, X, ChevronDown } from "lucide-react";
import { useCartStore } from "@/lib/store/cart-store";
import { useWishlistStore } from "@/lib/store/wishlist-store";

const COLLECTIONS = [
  { name: "Shop All", href: "/collections/shop" },
  { name: "Cleanse", href: "/collections/cleanse" },
  { name: "Treat", href: "/collections/treat" },
  { name: "Moisturise", href: "/collections/hydrate" },
  { name: "Accessories", href: "/collections/accessories" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleCart = useCartStore((s) => s.toggleCart);
  const itemCount = useCartStore((s) => s.itemCount());
  const wishCount = useWishlistStore((s) => s.count());

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close search overlay via custom event
  const openSearch = () => {
    window.dispatchEvent(new CustomEvent("openSearch"));
  };

  return (
    <>
      <header
        className={`sticky top-0 z-30 bg-cream-50/95 backdrop-blur-md transition-shadow duration-300 ${
          scrolled ? "shadow-md" : "border-b border-warmgray-100"
        }`}
      >
        <div className="container-padded">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Mobile menu toggle */}
            <button
              className="lg:hidden p-2 text-forest"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-forest rounded-full flex items-center justify-center group-hover:scale-105 transition-transform">
                <span className="text-cream-50 text-xs font-bold font-serif">W</span>
              </div>
              <span className="font-serif text-lg font-bold text-forest tracking-tight hidden sm:block">
                Wave of Wellness
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-8">
              <div
                className="relative group"
                onMouseEnter={() => setShopOpen(true)}
                onMouseLeave={() => setShopOpen(false)}
              >
                <button className="flex items-center gap-1 text-sm font-medium text-warmgray-700 hover:text-forest transition-colors py-2">
                  Shop <ChevronDown size={14} className={`transition-transform ${shopOpen ? "rotate-180" : ""}`} />
                </button>
                {shopOpen && (
                  <div className="absolute top-full left-0 bg-white rounded-2xl shadow-card-hover border border-warmgray-100 py-2 min-w-44 animate-fade-in">
                    {COLLECTIONS.map((c) => (
                      <Link
                        key={c.href}
                        href={c.href}
                        className="block px-4 py-2.5 text-sm text-warmgray-700 hover:text-forest hover:bg-sage-50 transition-colors"
                      >
                        {c.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              <Link
                href="/blogs/news"
                className="text-sm font-medium text-warmgray-700 hover:text-forest transition-colors"
              >
                Skin, Decoded
              </Link>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                onClick={openSearch}
                className="p-2 text-warmgray-600 hover:text-forest transition-colors"
                aria-label="Search"
              >
                <Search size={20} />
              </button>
              <Link
                href="/account"
                className="p-2 text-warmgray-600 hover:text-forest transition-colors hidden sm:block"
                aria-label="Account"
              >
                <User size={20} />
              </Link>
              <Link
                href="/info/wishlist"
                className="p-2 text-warmgray-600 hover:text-forest transition-colors relative"
                aria-label="Wishlist"
              >
                <Heart size={20} />
                {wishCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-coral text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {wishCount}
                  </span>
                )}
              </Link>
              <button
                onClick={toggleCart}
                className="p-2 text-warmgray-600 hover:text-forest transition-colors relative"
                aria-label="Cart"
              >
                <ShoppingBag size={20} />
                {itemCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-forest text-cream-50 text-[10px] font-bold rounded-full flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-white border-t border-warmgray-100 animate-fade-in">
            <div className="container-padded py-4 space-y-1">
              <p className="text-xs font-semibold text-warmgray-400 uppercase tracking-widest mb-2">Shop</p>
              {COLLECTIONS.map((c) => (
                <Link
                  key={c.href}
                  href={c.href}
                  className="block py-2.5 text-sm font-medium text-warmgray-700 hover:text-forest transition-colors border-b border-warmgray-50"
                  onClick={() => setMobileOpen(false)}
                >
                  {c.name}
                </Link>
              ))}
              <Link
                href="/blogs/news"
                className="block py-2.5 text-sm font-medium text-warmgray-700 hover:text-forest transition-colors border-b border-warmgray-50"
                onClick={() => setMobileOpen(false)}
              >
                Skin, Decoded
              </Link>
              <Link
                href="/account"
                className="block py-2.5 text-sm font-medium text-warmgray-700 hover:text-forest transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                My Account
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
