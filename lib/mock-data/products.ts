export interface ProductVariant {
  id: string;
  name: string;
  price: number;
  mrp: number;
  sku: string;
  inStock: boolean;
}

export interface Product {
  id: string;
  handle: string;
  title: string;
  tagline: string;
  description: string;
  ingredients: string;
  howToUse: string;
  collection: string[];
  images: string[];
  hoverImage: string;
  variants: ProductVariant[];
  rating: number;
  reviewCount: number;
  isBestseller: boolean;
  isFeatured: boolean;
  tags: string[];
  benefits: string[];
}

export const products: Product[] = [
  {
    id: "p1",
    handle: "radiance-body-wash",
    title: "Radiance Body Wash",
    tagline: "Smoother, Brighter skin in one 30-second step.",
    description:
      "A science-backed daily body wash with AHAs and botanical extracts that gently exfoliate, cleanse, and illuminate the skin with every shower. Formulated for all skin types, it leaves skin feeling impossibly smooth and visibly radiant.",
    ingredients:
      "Aqua, Glycolic Acid (AHA), Aloe Vera Extract, Niacinamide, Centella Asiatica, Sodium Lauryl Sulfoacetate (mild surfactant), Glycerin, Chamomile Extract, Vitamin E, Fragrance (skin-safe).",
    howToUse:
      "Apply a generous amount to wet skin using hands or loofah. Massage in circular motions for 30 seconds. Rinse thoroughly. Use daily for best results.",
    collection: ["cleanse", "shop"],
    images: ["/body-wash.png", "/body-wash.png"],
    hoverImage: "/brand-lifestyle.png",
    variants: [
      { id: "v1a", name: "200ml", price: 699, mrp: 899, sku: "RBW-200", inStock: true },
      { id: "v1b", name: "60ml", price: 249, mrp: 299, sku: "RBW-60", inStock: true },
    ],
    rating: 4.8,
    reviewCount: 312,
    isBestseller: true,
    isFeatured: true,
    tags: ["body wash", "AHA", "brightening", "daily cleanse"],
    benefits: ["Brightens dull skin", "Gentle exfoliation", "Hydrates & nourishes", "No harsh sulfates"],
  },
  {
    id: "p2",
    handle: "velvet-body-lotion",
    title: "Velvet Body Lotion",
    tagline: "24-hour moisture lock for silky-soft skin.",
    description:
      "An ultra-rich yet fast-absorbing body lotion with Shea Butter, Hyaluronic Acid, and botanical oils that deliver long-lasting hydration. Perfect for dry skin that craves a velvety finish without greasiness.",
    ingredients:
      "Aqua, Shea Butter, Hyaluronic Acid, Jojoba Oil, Ceramides, Squalane, Vitamin C, Niacinamide, Aloe Vera, Glycerin, Chamomile Extract.",
    howToUse:
      "Apply liberally to clean skin immediately after shower for best absorption. Massage until fully absorbed. Use morning and night.",
    collection: ["hydrate", "shop"],
    images: ["/body-lotion.png", "/body-lotion.png"],
    hoverImage: "/brand-lifestyle.png",
    variants: [
      { id: "v2a", name: "200ml", price: 749, mrp: 999, sku: "VBL-200", inStock: true },
      { id: "v2b", name: "60ml", price: 299, mrp: 349, sku: "VBL-60", inStock: true },
    ],
    rating: 4.9,
    reviewCount: 487,
    isBestseller: true,
    isFeatured: true,
    tags: ["body lotion", "hydration", "shea butter", "moisturiser"],
    benefits: ["24-hour hydration", "Non-greasy formula", "Softens & smooths", "Fragrance-balanced"],
  },
  {
    id: "p3",
    handle: "glow-exfoliating-mist",
    title: "Glow Exfoliating Mist",
    tagline: "Spray. Wait. Glow. Your 60-second skin ritual.",
    description:
      "A revolutionary spray-on exfoliator with PHA and fruit enzymes that buffs away dead skin cells without scrubbing. Simply mist, wait 60 seconds, and rinse for instantly smoother, radiant skin.",
    ingredients:
      "Aqua, Gluconolactone (PHA), Papaya Enzyme, Pineapple Enzyme, Glycerin, Aloe Vera, Niacinamide, Green Tea Extract, Rose Water.",
    howToUse:
      "Mist evenly on damp body. Leave for 60 seconds. Rinse off. Use 3-4 times per week. Follow with moisturiser.",
    collection: ["treat", "shop"],
    images: ["/exfoliating-mist.png", "/exfoliating-mist.png"],
    hoverImage: "/brand-lifestyle.png",
    variants: [
      { id: "v3a", name: "200ml", price: 849, mrp: 1099, sku: "GEM-200", inStock: true },
      { id: "v3b", name: "60ml", price: 349, mrp: 449, sku: "GEM-60", inStock: false },
    ],
    rating: 4.7,
    reviewCount: 198,
    isBestseller: true,
    isFeatured: true,
    tags: ["exfoliating mist", "PHA", "glow", "exfoliator"],
    benefits: ["No-scrub exfoliation", "Instant glow", "Gentle on sensitive skin", "Enzyme-powered"],
  },
  {
    id: "p4",
    handle: "natural-dry-brush",
    title: "Natural Dry Brush",
    tagline: "Stimulate. Smooth. Sculpt. Daily.",
    description:
      "A premium natural sisal dry brush crafted for lymphatic drainage, cellulite reduction, and skin texture improvement. Use before showering for best results. Ergonomic long handle for full-body reach.",
    ingredients: "Natural Sisal Bristles, Bamboo Handle, Cotton Strap",
    howToUse:
      "On dry skin before showering, brush in long strokes toward the heart. Start at feet, move upward. Shower after. Use 3-5 times per week.",
    collection: ["accessories", "shop"],
    images: ["/dry-brush.png", "/dry-brush.png"],
    hoverImage: "/dry-brush.png",
    variants: [
      { id: "v4a", name: "Standard", price: 499, mrp: 699, sku: "NDB-STD", inStock: true },
    ],
    rating: 4.6,
    reviewCount: 143,
    isBestseller: false,
    isFeatured: true,
    tags: ["dry brush", "accessories", "lymphatic", "cellulite"],
    benefits: ["Improves circulation", "Reduces cellulite appearance", "Natural sisal bristles", "Ergonomic design"],
  },
  {
    id: "p5",
    handle: "repair-body-butter",
    title: "Repair Body Butter",
    tagline: "Deep repair for intensely dry or damaged skin.",
    description:
      "A thick, indulgent body butter loaded with Mango Butter, Collagen Peptides, and Vitamin E for overnight skin barrier repair. Wake up to noticeably softer, plumper skin.",
    ingredients:
      "Mango Butter, Shea Butter, Collagen Peptides, Vitamin E, Sweet Almond Oil, Beeswax, Cocoa Butter, Lavender Essential Oil.",
    howToUse:
      "Apply generously to dry areas before bed. Focus on knees, elbows, and heels. Use nightly.",
    collection: ["hydrate", "treat", "shop"],
    images: ["/body-lotion.png", "/body-lotion.png"],
    hoverImage: "/brand-lifestyle.png",
    variants: [
      { id: "v5a", name: "200ml", price: 899, mrp: 1199, sku: "RBB-200", inStock: true },
    ],
    rating: 4.8,
    reviewCount: 231,
    isBestseller: true,
    isFeatured: false,
    tags: ["body butter", "repair", "overnight", "intensive"],
    benefits: ["Deep overnight repair", "Plumps skin barrier", "Non-comedogenic", "Dermatologist tested"],
  },
  {
    id: "p6",
    handle: "brightening-body-scrub",
    title: "Brightening Body Scrub",
    tagline: "Polished skin. Every single time.",
    description:
      "A luxurious walnut-shell and sugar scrub infused with Kojic Acid and Vitamin C to exfoliate, brighten dark patches, and even skin tone. Rich botanical oils leave skin silky smooth.",
    ingredients:
      "Sugar, Walnut Shell Powder, Kojic Acid, Vitamin C (Ascorbyl Glucoside), Sweet Almond Oil, Jojoba Beads, Orange Peel Extract, Turmeric Extract.",
    howToUse:
      "Apply to wet skin. Gently scrub in circular motions for 1-2 minutes. Rinse thoroughly. Use 2-3 times per week.",
    collection: ["cleanse", "treat", "shop"],
    images: ["/exfoliating-mist.png", "/exfoliating-mist.png"],
    hoverImage: "/brand-lifestyle.png",
    variants: [
      { id: "v6a", name: "200g", price: 649, mrp: 849, sku: "BBS-200", inStock: true },
    ],
    rating: 4.5,
    reviewCount: 167,
    isBestseller: false,
    isFeatured: false,
    tags: ["body scrub", "brightening", "exfoliate", "kojic acid"],
    benefits: ["Brightens dark patches", "Even skin tone", "Smooth texture", "Natural exfoliants"],
  },
  {
    id: "p7",
    handle: "niacinamide-serum-body",
    title: "Niacinamide Body Serum",
    tagline: "Visibly even skin. Backed by science.",
    description:
      "A lightweight 10% Niacinamide body serum that targets hyperpigmentation, uneven tone, and blemishes across the body. Fast-absorbing, non-sticky formula for daily use.",
    ingredients:
      "Aqua, Niacinamide 10%, Hyaluronic Acid, Zinc PCA, Alpha Arbutin, Centella Asiatica, Glycerin, Panthenol.",
    howToUse:
      "Apply 3-4 pumps to clean skin. Massage until absorbed. Follow with moisturiser. Use morning and/or evening.",
    collection: ["treat", "shop"],
    images: ["/body-wash.png", "/body-wash.png"],
    hoverImage: "/brand-lifestyle.png",
    variants: [
      { id: "v7a", name: "100ml", price: 999, mrp: 1299, sku: "NBS-100", inStock: true },
      { id: "v7b", name: "50ml", price: 549, mrp: 699, sku: "NBS-50", inStock: true },
    ],
    rating: 4.7,
    reviewCount: 289,
    isBestseller: true,
    isFeatured: false,
    tags: ["niacinamide", "serum", "body serum", "hyperpigmentation"],
    benefits: ["Reduces dark spots", "Evens skin tone", "Minimises pores", "Lightweight"],
  },
  {
    id: "p8",
    handle: "sensitive-skin-wash",
    title: "Gentle Skin Wash",
    tagline: "Calming cleanse for sensitive, reactive skin.",
    description:
      "A fragrance-free, dermatologist-tested body wash for sensitive, eczema-prone, or reactive skin. With Oat Extract, Allantoin, and Ceramides to cleanse without stripping the skin barrier.",
    ingredients:
      "Aqua, Oat Extract, Allantoin, Ceramide NP, Glycerin, Colloidal Silver, Aloe Vera, Chamomile Flower Extract.",
    howToUse:
      "Apply to wet skin. Lather gently with hands. Rinse. Use daily. Suitable for face and body.",
    collection: ["cleanse", "shop"],
    images: ["/body-wash.png", "/body-wash.png"],
    hoverImage: "/brand-lifestyle.png",
    variants: [
      { id: "v8a", name: "200ml", price: 649, mrp: 849, sku: "GSW-200", inStock: true },
      { id: "v8b", name: "60ml", price: 229, mrp: 279, sku: "GSW-60", inStock: true },
    ],
    rating: 4.9,
    reviewCount: 412,
    isBestseller: true,
    isFeatured: false,
    tags: ["sensitive skin", "gentle", "fragrance free", "eczema"],
    benefits: ["Fragrance-free", "Barrier-protecting", "Clinically tested", "pH-balanced"],
  },
  {
    id: "p9",
    handle: "oil-blend-body",
    title: "Botanical Body Oil",
    tagline: "Luxurious dry oil that sinks in, not sits on.",
    description:
      "A luxurious blend of 7 botanical oils — Rosehip, Marula, Sea Buckthorn, Jojoba, Argan, Evening Primrose, and Bakuchiol — for deep radiance and overnight skin renewal.",
    ingredients:
      "Rosehip Oil, Marula Oil, Sea Buckthorn Oil, Jojoba Oil, Argan Oil, Evening Primrose Oil, Bakuchiol, Vitamin E, Lavender Essential Oil.",
    howToUse:
      "Apply 4-6 drops to damp skin after shower. Press in with palms. Can be mixed with body lotion for lighter application.",
    collection: ["hydrate", "treat", "shop"],
    images: ["/body-lotion.png", "/body-lotion.png"],
    hoverImage: "/brand-lifestyle.png",
    variants: [
      { id: "v9a", name: "50ml", price: 1099, mrp: 1499, sku: "BBO-50", inStock: true },
    ],
    rating: 4.8,
    reviewCount: 176,
    isBestseller: false,
    isFeatured: false,
    tags: ["body oil", "botanical", "rosehip", "luxury"],
    benefits: ["7-oil blend", "Non-greasy", "Overnight renewal", "Antioxidant-rich"],
  },
  {
    id: "p10",
    handle: "konjac-body-sponge",
    title: "Konjac Body Sponge",
    tagline: "Zero-waste daily cleansing ritual.",
    description:
      "A 100% natural Konjac plant fiber sponge infused with Activated Charcoal for deep cleansing and gentle physical exfoliation. Biodegradable, zero-waste, and suitable for all skin types.",
    ingredients: "100% Konjac Fiber, Activated Charcoal",
    howToUse:
      "Soak in warm water for 2 minutes. Squeeze gently. Use with or without cleanser in circular motions. Rinse and hang to dry.",
    collection: ["accessories", "cleanse", "shop"],
    images: ["/dry-brush.png", "/dry-brush.png"],
    hoverImage: "/dry-brush.png",
    variants: [
      { id: "v10a", name: "Single", price: 299, mrp: 399, sku: "KBS-1", inStock: true },
      { id: "v10b", name: "Pack of 3", price: 749, mrp: 999, sku: "KBS-3", inStock: true },
    ],
    rating: 4.5,
    reviewCount: 88,
    isBestseller: false,
    isFeatured: false,
    tags: ["konjac", "sponge", "accessories", "zero waste"],
    benefits: ["100% natural", "Zero-waste", "Deep cleansing", "Gentle exfoliation"],
  },
  {
    id: "p11",
    handle: "hydra-gel-body",
    title: "Hydra-Gel Body Moisturiser",
    tagline: "Water-gel hydration. No heaviness.",
    description:
      "A lightweight water-gel body moisturiser with Hyaluronic Acid and Cactus Water that delivers instant hydration perfect for oily or combination skin types who want moisture without heaviness.",
    ingredients:
      "Aqua, Cactus Water, Hyaluronic Acid (3 weights), Aloe Vera, Cucumber Extract, Allantoin, Glycerin, Niacinamide.",
    howToUse:
      "Apply liberally to clean skin. Massage until absorbed. Use morning and evening. Ideal for humid climates.",
    collection: ["hydrate", "shop"],
    images: ["/body-lotion.png", "/body-lotion.png"],
    hoverImage: "/brand-lifestyle.png",
    variants: [
      { id: "v11a", name: "200ml", price: 699, mrp: 899, sku: "HGB-200", inStock: true },
    ],
    rating: 4.6,
    reviewCount: 154,
    isBestseller: false,
    isFeatured: false,
    tags: ["gel", "hydration", "lightweight", "oily skin"],
    benefits: ["Ultra-lightweight", "3-weight HA", "Cactus water", "Non-comedogenic"],
  },
  {
    id: "p12",
    handle: "body-massage-tool",
    title: "Rose Quartz Body Massager",
    tagline: "Sculpt. Depuff. Glow.",
    description:
      "A natural Rose Quartz gemstone roller designed for body contouring, lymphatic drainage, and puffiness reduction. Pairs perfectly with our Botanical Body Oil for a luxurious self-care ritual.",
    ingredients: "Natural Rose Quartz, Stainless Steel Frame",
    howToUse:
      "Apply body oil or lotion first. Roll in upward strokes toward the heart. Use for 5-10 minutes daily.",
    collection: ["accessories", "shop"],
    images: ["/dry-brush.png", "/dry-brush.png"],
    hoverImage: "/dry-brush.png",
    variants: [
      { id: "v12a", name: "Standard", price: 699, mrp: 999, sku: "RQM-STD", inStock: true },
    ],
    rating: 4.7,
    reviewCount: 102,
    isBestseller: false,
    isFeatured: false,
    tags: ["massage", "rose quartz", "accessories", "contouring"],
    benefits: ["Natural gemstone", "Lymphatic drainage", "Body contouring", "Depuffing"],
  },
];

export function getProductByHandle(handle: string): Product | undefined {
  return products.find((p) => p.handle === handle);
}

export function getProductsByCollection(collection: string): Product[] {
  if (collection === "shop") return products;
  return products.filter((p) => p.collection.includes(collection));
}

export function getBestsellers(): Product[] {
  return products.filter((p) => p.isBestseller);
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase();
  return products.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.tagline.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q))
  );
}
