import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found | Wave of Wellness",
  description: "The page you are looking for could not be found.",
};

export default function NotFoundPage() {
  return (
    <section className="section-py bg-cream-50 min-h-[70vh] flex items-center justify-center">
      <div className="container-padded text-center">
        <p className="font-serif text-8xl font-bold text-sage-200 mb-4">404</p>
        <h1 className="font-serif text-3xl font-bold text-forest mb-3">Page Not Found</h1>
        <p className="text-warmgray-400 text-base mb-8 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link href="/" className="btn-primary">
            ← Back to Home
          </Link>
          <Link href="/collections/shop" className="btn-outline">
            Shop All Products
          </Link>
        </div>
      </div>
    </section>
  );
}
