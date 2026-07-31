import type { Metadata } from "next";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import { BestsellerCarousel } from "@/components/home/BestsellerCarousel";
import { BrandDifferentiators } from "@/components/home/BrandDifferentiators";
import { SupportingClaims } from "@/components/home/SupportingClaims";
import { TestimonialsCarousel } from "@/components/home/TestimonialsCarousel";
import { BlogPreviewGrid } from "@/components/home/BlogPreviewGrid";

export const metadata: Metadata = {
  title: "Wave of Wellness — Bodycare Backed by Science",
  description:
    "Discover body wash, lotions, exfoliating mists, and accessories formulated with science-backed actives for real, visible results. Free shipping on orders above ₹999.",
};

export default function HomePage() {
  return (
    <>
      <HeroCarousel />
      <BestsellerCarousel />
      <BrandDifferentiators />
      <SupportingClaims />
      <TestimonialsCarousel />
      <BlogPreviewGrid />
    </>
  );
}
