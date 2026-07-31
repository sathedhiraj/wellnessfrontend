export interface Coupon {
  code: string;
  description: string;
  type: "percent" | "flat";
  value: number;
  minOrder: number;
}

export const coupons: Coupon[] = [
  {
    code: "FIRST10",
    description: "10% off on your first order. No minimum.",
    type: "percent",
    value: 10,
    minOrder: 0,
  },
  {
    code: "2000OFF",
    description: "15% off on orders above ₹2000.",
    type: "percent",
    value: 15,
    minOrder: 2000,
  },
  {
    code: "1000OFF",
    description: "10% off on orders above ₹1000.",
    type: "percent",
    value: 10,
    minOrder: 1000,
  },
];

export function validateCoupon(
  code: string,
  subtotal: number
): { valid: boolean; coupon?: Coupon; error?: string } {
  const coupon = coupons.find((c) => c.code === code.toUpperCase());
  if (!coupon) return { valid: false, error: "Coupon code not found." };
  if (subtotal < coupon.minOrder)
    return {
      valid: false,
      error: `Minimum order of ₹${coupon.minOrder} required for this coupon.`,
    };
  return { valid: true, coupon };
}

export function calculateDiscount(coupon: Coupon, subtotal: number): number {
  if (coupon.type === "percent") return Math.round(subtotal * (coupon.value / 100));
  return coupon.value;
}
