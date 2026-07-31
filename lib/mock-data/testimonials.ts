export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  age: number;
  city: string;
  productTag: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    quote:
      "I've tried so many body washes but the Radiance Body Wash is different. My skin genuinely glows after showering. No more dullness, no more rough patches. I'm obsessed.",
    name: "Ananya S.",
    age: 28,
    city: "Mumbai",
    productTag: "Radiance Body Wash",
    rating: 5,
  },
  {
    id: "t2",
    quote:
      "The Velvet Body Lotion is UNREAL. I have chronically dry skin and this is the first product that's kept me moisturised through an entire Delhi winter without reapplying.",
    name: "Rohan M.",
    age: 34,
    city: "Delhi",
    productTag: "Velvet Body Lotion",
    rating: 5,
  },
  {
    id: "t3",
    quote:
      "The Glow Mist is like magic. I spray it, wait a minute, rinse off and my skin looks like I got a facial. The dark patches on my knees have lightened so much in 6 weeks.",
    name: "Preethi K.",
    age: 25,
    city: "Bangalore",
    productTag: "Glow Exfoliating Mist",
    rating: 5,
  },
  {
    id: "t4",
    quote:
      "Finally, a brand that doesn't put harsh sulfates or artificial fragrance in everything. The Gentle Skin Wash is perfect for my eczema-prone skin. My dermatologist approved.",
    name: "Kavya N.",
    age: 31,
    city: "Hyderabad",
    productTag: "Gentle Skin Wash",
    rating: 5,
  },
  {
    id: "t5",
    quote:
      "The dry brush + botanical oil combo has genuinely changed my skin texture. I've been dry brushing 5 mornings a week and the difference in my legs is remarkable.",
    name: "Shruti P.",
    age: 29,
    city: "Pune",
    productTag: "Natural Dry Brush",
    rating: 5,
  },
  {
    id: "t6",
    quote:
      "Wave of Wellness products actually work. The Niacinamide Serum faded the dark patches on my arms in about 8 weeks. Worth every rupee, genuinely backed by science.",
    name: "Arjun T.",
    age: 26,
    city: "Chennai",
    productTag: "Niacinamide Body Serum",
    rating: 5,
  },
];
