export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  publishDate: string;
  tags: string[];
  readTime: number;
}

export const blogPosts: BlogPost[] = [
  {
    id: "b1",
    slug: "aha-vs-pha-body-care",
    title: "AHA vs PHA: Which Exfoliant is Right for Your Body Skin?",
    excerpt:
      "Confused between AHA and PHA exfoliants? We break down the science behind each and help you pick the right one for your skin type and concerns.",
    content: `
## Understanding Chemical Exfoliants

Chemical exfoliants have transformed the world of body care. Unlike physical scrubs that rely on abrasion, chemical exfoliants work by dissolving the bonds between dead skin cells, allowing them to slough off naturally.

### AHAs (Alpha Hydroxy Acids)
AHAs like Glycolic Acid and Lactic Acid are water-soluble acids derived from natural sources. Glycolic Acid, with its tiny molecular size, penetrates deeply for maximum brightening. Lactic Acid is gentler and more hydrating.

**Best for:** Normal to dry skin, hyperpigmentation, dullness, uneven texture.

### PHAs (Polyhydroxy Acids)
PHAs are the next generation of chemical exfoliants. Larger molecules mean slower, gentler penetration — making them ideal for sensitive skin while still delivering impressive results.

**Best for:** Sensitive, reactive, or eczema-prone skin. Great for beginners.

## The Wave of Wellness Approach
Our Radiance Body Wash uses AHAs at an optimal 2% concentration — effective for daily use without over-exfoliating. Our Glow Exfoliating Mist uses PHAs for those who want results without the sting.

**Tip:** Start 3x per week and build up. Always follow with SPF in the morning.
    `,
    image: "/exfoliating-mist.png",
    author: "Dr. Priya Sharma",
    publishDate: "2026-07-15",
    tags: ["AHA", "PHA", "exfoliation", "skincare science"],
    readTime: 5,
  },
  {
    id: "b2",
    slug: "how-to-build-body-care-routine",
    title: "How to Build a 3-Step Body Care Routine That Actually Works",
    excerpt:
      "A consistent body care routine doesn't need to be complicated. Here's how to build one that fits your lifestyle and actually delivers results.",
    content: `
## The 3-Step Framework

Great skin doesn't require 10 steps. It requires the right 3 steps done consistently.

### Step 1: Cleanse (Daily)
Your cleanser sets the tone. A gentle, pH-balanced body wash removes impurities without stripping your skin's natural oils. Look for ingredients like Aloe Vera, Niacinamide, and mild surfactants.

### Step 2: Treat (3-4x per week)
Exfoliation is your biggest skin transformation tool. Whether it's an AHA body wash, a PHA mist, or a gentle scrub — consistent exfoliation = consistently glowing skin.

### Step 3: Moisturise (Daily)
This is non-negotiable. Apply your body lotion or body butter immediately after showering on damp skin — this locks moisture in. For dry skin, layer a body oil underneath.

## Morning vs. Night
- **Morning:** Cleanse + lightweight moisturiser
- **Night:** Cleanse + treat (exfoliant) + rich body butter

Consistency beats perfection. Build the habit, and your skin will thank you.
    `,
    image: "/brand-lifestyle.png",
    author: "Wave of Wellness Team",
    publishDate: "2026-07-08",
    tags: ["routine", "body care", "how to", "tips"],
    readTime: 4,
  },
  {
    id: "b3",
    slug: "niacinamide-for-body",
    title: "Why Niacinamide Belongs in Your Body Care Routine",
    excerpt:
      "Niacinamide isn't just for your face. Here's why this multi-tasking ingredient deserves a place in your full-body skincare ritual.",
    content: `
## Niacinamide: The Multitasker

Niacinamide (Vitamin B3) is one of skincare's most researched and proven ingredients. While it's been a face-care staple for years, it works just as powerfully on body skin.

### What it does
- Fades hyperpigmentation and dark patches on arms, legs, and knees
- Minimises the appearance of enlarged pores
- Strengthens the skin barrier
- Controls excess sebum (helpful for back acne)
- Brightens dull, uneven tone

### Concentration matters
For body use, 5-10% Niacinamide is the sweet spot. Our Niacinamide Body Serum is formulated at 10% with Zinc PCA for enhanced efficacy.

### How to use it
Apply after cleansing, before moisturising. Let it absorb for 60 seconds. Follow with your body lotion. Use morning and night for best results.

Results are visible in 4-6 weeks of consistent use.
    `,
    image: "/body-wash.png",
    author: "Dr. Priya Sharma",
    publishDate: "2026-06-28",
    tags: ["niacinamide", "vitamin B3", "dark spots", "brightening"],
    readTime: 4,
  },
  {
    id: "b4",
    slug: "dry-brushing-benefits",
    title: "Dry Brushing 101: The Ancient Ritual Your Skin Will Love",
    excerpt:
      "Dry brushing has been used for centuries. Here's the modern science behind why it works and how to make it part of your weekly ritual.",
    content: `
## What is Dry Brushing?

Dry brushing is the practice of using a natural bristle brush on dry skin in sweeping strokes before showering. Used in Ayurvedic practice for thousands of years, modern science now backs its benefits.

### Proven Benefits
1. **Physical exfoliation:** Sloughs away dead skin cells for smoother texture
2. **Lymphatic stimulation:** Helps move lymphatic fluid and reduce puffiness
3. **Improved circulation:** The massaging action boosts blood flow to the surface
4. **Cellulite reduction:** Consistent use can reduce the appearance of cellulite over time
5. **Energising effect:** Many people find morning dry brushing invigorating

### How to Do It Right
- Always brush on completely dry skin, before showering
- Use long, sweeping strokes toward the heart
- Start at your feet, move upward to legs, then arms toward shoulders
- Be gentle on sensitive areas (inner arms, chest)
- Shower afterward to wash away loosened dead skin
- Follow with our Velvet Body Lotion for maximum softness

### How Often?
Start 2-3x per week. Build to daily if your skin tolerates it well.
    `,
    image: "/dry-brush.png",
    author: "Wave of Wellness Team",
    publishDate: "2026-06-15",
    tags: ["dry brushing", "lymphatic", "exfoliation", "wellness ritual"],
    readTime: 5,
  },
  {
    id: "b5",
    slug: "ingredients-to-avoid-bodycare",
    title: "5 Ingredients We Deliberately Left Out of Our Formulas",
    excerpt:
      "At Wave of Wellness, 'formulated intentionally' isn't just a tagline. Here's what we chose NOT to include and why.",
    content: `
## Intentional Exclusions

Our 'nothing extra, just what works' philosophy means every formulation decision is deliberate. Here are 5 ingredients we've excluded — and why.

### 1. SLS (Sodium Lauryl Sulfate)
Harsh surfactant that strips the skin's natural moisture barrier. We use SLSA (Sodium Lauryl Sulfoacetate) instead — gentle, skin-derived, and just as effective at cleansing.

### 2. Parabens
While low concentrations may be considered safe, we chose paraben-free preservation systems to give customers peace of mind.

### 3. Artificial Colorants
Skin doesn't benefit from synthetic dyes — and many sensitise the skin over time. Our products' colors come from natural botanicals.

### 4. Phthalates
Potentially disruptive compounds found in some synthetic fragrances. Our fragrance systems are phthalate-free.

### 5. Mineral Oil
Cheap, occlusive, and derived from petroleum. We use plant-based oils (Jojoba, Rosehip, Squalane) that nourish rather than just coat the skin.

Being intentional means knowing what to leave out as much as what to put in.
    `,
    image: "/body-lotion.png",
    author: "Wave of Wellness Formulation Team",
    publishDate: "2026-06-05",
    tags: ["clean beauty", "formulation", "ingredients", "transparency"],
    readTime: 4,
  },
  {
    id: "b6",
    slug: "hyperpigmentation-body-guide",
    title: "The Complete Guide to Fading Body Hyperpigmentation",
    excerpt:
      "Dark patches on elbows, knees, and underarms? Here's your science-backed roadmap to visibly even skin.",
    content: `
## Understanding Body Hyperpigmentation

Hyperpigmentation on the body — dark patches on elbows, knees, inner thighs, and underarms — is extremely common, especially in South Asian skin tones. It's caused by excess melanin production, often triggered by friction, inflammation, or hormonal changes.

### Your Treatment Stack

**Step 1 — Exfoliate regularly**
Physical and chemical exfoliation removes dark dead skin cells. Use our Brightening Body Scrub 2-3x per week, or the Glow Exfoliating Mist for a no-scrub option.

**Step 2 — Target with active ingredients**
- Niacinamide (5-10%) — regulates melanin transfer
- Kojic Acid — inhibits melanin production  
- Alpha Arbutin — gentle melanin suppressor
- Vitamin C (stable forms) — antioxidant brightening

**Step 3 — Protect with SPF**
Exposed areas (arms, legs) need SPF 30+ daily. UV exposure darkens existing hyperpigmentation significantly.

### Realistic Timeline
- 4-6 weeks: Skin texture improves
- 8-12 weeks: Visible brightening of dark patches
- 16-24 weeks: Significant tone evenness

Consistency is everything. Results compound over time.
    `,
    image: "/exfoliating-mist.png",
    author: "Dr. Priya Sharma",
    publishDate: "2026-05-22",
    tags: ["hyperpigmentation", "dark spots", "brightening", "skin concern"],
    readTime: 6,
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getRecentPosts(limit = 3): BlogPost[] {
  return blogPosts.slice(0, limit);
}
