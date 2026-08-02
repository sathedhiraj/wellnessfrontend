import { notFound } from "next/navigation";
import type { Metadata } from "next";

const PAGES: Record<string, { title: string; content: string }> = {
  "shipping-policy": {
    title: "Shipping Policy",
    content: `
## Shipping Overview
Wave of Wellness ships across India. All orders are processed within 1-2 business days.

## Free Shipping
Free standard shipping on all orders above ₹999. Orders below ₹999 incur a flat shipping fee of ₹99.

## Delivery Timelines
- Standard Delivery: 5-7 business days
- Express Delivery: 2-3 business days (additional charges apply)
- Metro cities (Mumbai, Delhi, Bangalore, Hyderabad, Chennai, Pune): 3-5 business days

## Order Tracking
Once your order is shipped, you will receive a tracking number via SMS and email. You can track your order in the Account section.

## Delays
Delays may occur during peak seasons, sale periods, or natural disruptions. We appreciate your patience and will communicate proactively.
    `,
  },
  "refund-policy": {
    title: "Return & Refund Policy",
    content: `
## Our Return Policy
We accept returns within 7 days of delivery if the product is unopened and in original packaging, damaged or defective on arrival, or incorrectly shipped.

## How to Initiate a Return
Contact us at hello@waveofwellness.in with your order number and photos of the product. Our team will respond within 24 hours.

## Refund Process
Approved refunds are processed within 5-7 business days to your original payment method (UPI/card/net banking). COD refunds are processed as bank transfers.

## Non-Returnable Items
Opened products (unless defective), gift cards, and free gifts included with orders are non-returnable.
    `,
  },
  "privacy-policy": {
    title: "Privacy Policy",
    content: `
## Information We Collect
We collect information you provide when creating an account, placing an order, or contacting us — including name, email, phone number, and delivery address.

## How We Use Your Information
We use your information to process and fulfill your orders, send order confirmations and updates, personalize your shopping experience, improve our products and services, and send marketing communications (you may opt out at any time).

## Data Security
Your data is encrypted and stored securely. We do not sell your personal information to third parties.

## Your Rights
Under the Digital Personal Data Protection Act (DPDP), 2023, you have the right to access, correct, or delete your personal data. Contact us at privacy@waveofwellness.in.
    `,
  },
  "cookie-policy": {
    title: "Cookie Policy",
    content: `
## What Are Cookies
Cookies are small text files placed on your device when you visit our website. They help us provide a better experience.

## Types of Cookies We Use
Essential Cookies are required for the website to function (cart, login sessions). Analytics Cookies help us understand how you use our site (Google Analytics). Marketing Cookies are used to serve relevant ads (Meta Pixel).

## Managing Cookies
You can control cookies through your browser settings. Disabling certain cookies may affect your experience on our site.
    `,
  },
  terms: {
    title: "Terms & Conditions",
    content: `
## Acceptance of Terms
By using the Wave of Wellness website, you agree to these Terms and Conditions. If you disagree, please do not use our services.

## Products and Pricing
All prices are in INR (Indian Rupees) and inclusive of applicable taxes. We reserve the right to modify prices without notice.

## Order Acceptance
We reserve the right to cancel any order due to product unavailability, pricing errors, or suspected fraud. Full refunds will be issued for cancelled orders.

## Intellectual Property
All content on this website including images, text, and branding is the property of Wave of Wellness and may not be reproduced without permission.

## Governing Law
These terms are governed by the laws of India. Disputes shall be subject to the exclusive jurisdiction of courts in Mumbai, Maharashtra.
    `,
  },
  "our-story": {
    title: "Our Story",
    content: `
## How Wave of Wellness Began
Wave of Wellness was born from a simple frustration: why were body care products so far behind face care?

We were using AHAs, Niacinamide, and Hyaluronic Acid on our faces and getting results. But body care was still stuck in the world of mineral oil and artificial fragrances.

## The Mission
We set out to create body care that actually works. Science-backed. Formulated intentionally. Designed for real routines, not 30-step programs.

## The Philosophy
Every ingredient in every formula is there for a reason. We document what it does and why it works. No hidden fillers, no greenwashing, no empty claims.

## Backed by Science
Our formulas are developed with dermatologists and cosmetic chemists who share our belief that effective body care should not compromise on safety or transparency.
    `,
  },
};

export async function generateStaticParams() {
  return Object.keys(PAGES).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = PAGES[slug];
  if (!page) return {};
  return { title: page.title };
}

export default async function StaticPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = PAGES[slug];
  if (!page) notFound();

  return (
    <section className="section-py bg-cream-50">
      <div className="container-padded max-w-3xl">
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-forest mb-8">{page.title}</h1>
        <div className="bg-white rounded-2xl shadow-card p-8 space-y-4 text-warmgray-700 leading-relaxed">
          {page.content.split("\n\n").map((block, i) => {
            const trimmed = block.trim();
            if (!trimmed) return null;
            if (trimmed.startsWith("## ")) {
              return (
                <h2 key={i} className="font-serif text-xl font-bold text-forest mt-6 mb-2">
                  {trimmed.replace("## ", "")}
                </h2>
              );
            }
            if (trimmed.startsWith("- ")) {
              return (
                <ul key={i} className="list-disc list-inside space-y-1 ml-2">
                  {trimmed.split("\n").filter((l) => l.trim()).map((l, j) => (
                    <li key={j} className="text-warmgray-600 text-sm">
                      {l.replace(/^-\s*/, "")}
                    </li>
                  ))}
                </ul>
              );
            }
            return <p key={i} className="text-sm">{trimmed}</p>;
          })}
        </div>
      </div>
    </section>
  );
}
