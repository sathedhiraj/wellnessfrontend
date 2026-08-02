"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/lib/store/cart-store";
import { useAuthStore } from "@/lib/store/auth-store";
import { Check, Package, CreditCard, MapPin, ChevronRight } from "lucide-react";

const STEPS = [
  { id: 1, label: "Address", icon: MapPin },
  { id: 2, label: "Shipping", icon: Package },
  { id: 3, label: "Payment", icon: CreditCard },
];

function formatINR(n: number) {
  return `₹${n.toLocaleString("en-IN")}`;
}

export default function CheckoutPage() {
  const { items, subtotal, discount, shipping, grandTotal, clearCart } = useCartStore();
  const user = useAuthStore((s) => s.user);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/account/login?redirect=/checkout");
    }
  }, [user, router]);

  const [step, setStep] = useState(1);
  const [placed, setPlaced] = useState(false);

  const [address, setAddress] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    email: user?.email || "",
    line1: user?.addresses?.[0]?.line1 || "",
    city: user?.addresses?.[0]?.city || "",
    state: user?.addresses?.[0]?.state || "",
    pincode: user?.addresses?.[0]?.pincode || "",
  });

  if (!user) {
    return (
      <section className="section-py bg-cream-50 min-h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-sage-200 border-t-forest rounded-full animate-spin" />
          <p className="text-warmgray-400 text-sm font-medium">Redirecting to login…</p>
        </div>
      </section>
    );
  }
  const [shippingMethod, setShippingMethod] = useState("standard");
  const [payment, setPayment] = useState("prepaid");

  const handlePlaceOrder = () => {
    clearCart();
    setPlaced(true);
  };

  if (placed) {
    return (
      <section className="section-py bg-cream-50 min-h-[70vh] flex items-center">
        <div className="container-padded text-center max-w-lg mx-auto">
          <div className="w-20 h-20 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-5">
            <Check size={36} className="text-sage-600" />
          </div>
          <h1 className="font-serif text-3xl font-bold text-forest mb-3">Order Placed! 🎉</h1>
          <p className="text-warmgray-500 mb-2">Thank you for shopping with Wave of Wellness.</p>
          <p className="text-warmgray-400 text-sm mb-8">
            Order #WOW{Math.floor(Math.random() * 90000) + 10000} · You will receive a confirmation email shortly.
          </p>
          <Link href="/account" className="btn-primary mr-3">Track Order</Link>
          <Link href="/collections/shop" className="btn-outline">Continue Shopping</Link>
        </div>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="section-py bg-cream-50 min-h-[60vh] flex items-center">
        <div className="container-padded text-center">
          <h1 className="font-serif text-2xl text-forest mb-4">Your cart is empty</h1>
          <Link href="/collections/shop" className="btn-primary">Shop Now</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="section-py bg-cream-50">
      <div className="container-padded max-w-5xl">
        <h1 className="font-serif text-3xl font-bold text-forest mb-8">Checkout</h1>

        {/* Steps */}
        <div className="flex items-center gap-2 mb-10">
          {STEPS.map((s, i) => (
            <div key={s.id} className="flex items-center gap-2">
              <button
                onClick={() => step > s.id && setStep(s.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  step === s.id
                    ? "bg-forest text-cream-50"
                    : step > s.id
                    ? "bg-sage-100 text-sage-700 cursor-pointer"
                    : "bg-warmgray-100 text-warmgray-400 cursor-not-allowed"
                }`}
              >
                <s.icon size={14} />
                <span className="hidden sm:block">{s.label}</span>
              </button>
              {i < STEPS.length - 1 && <ChevronRight size={14} className="text-warmgray-300" />}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Step content */}
          <div className="lg:col-span-2">
            {step === 1 && (
              <div className="bg-white rounded-2xl p-6 shadow-card">
                <h2 className="font-serif text-xl font-bold text-forest mb-5">Delivery Address</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    { key: "name", label: "Full Name", placeholder: "Ananya Singh", col: 1 },
                    { key: "phone", label: "Phone Number", placeholder: "+91 98765 43210", col: 1 },
                    { key: "email", label: "Email Address", placeholder: "you@example.com", col: 2 },
                    { key: "line1", label: "Address Line 1", placeholder: "House/Flat/Street", col: 2 },
                    { key: "city", label: "City", placeholder: "Mumbai", col: 1 },
                    { key: "state", label: "State", placeholder: "Maharashtra", col: 1 },
                    { key: "pincode", label: "PIN Code", placeholder: "400001", col: 1 },
                  ].map(({ key, label, placeholder, col }) => (
                    <div key={key} className={col === 2 ? "sm:col-span-2" : ""}>
                      <label className="block text-xs font-semibold text-warmgray-500 mb-1">{label}</label>
                      <input
                        type="text"
                        value={address[key as keyof typeof address]}
                        onChange={(e) => setAddress((a) => ({ ...a, [key]: e.target.value }))}
                        placeholder={placeholder}
                        className="input-base"
                        id={`checkout-${key}`}
                      />
                    </div>
                  ))}
                </div>
                <button onClick={() => setStep(2)} className="btn-primary mt-6 w-full justify-center py-3.5">
                  Continue to Shipping →
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="bg-white rounded-2xl p-6 shadow-card">
                <h2 className="font-serif text-xl font-bold text-forest mb-5">Shipping Method</h2>
                <div className="space-y-3">
                  {[
                    { id: "standard", label: "Standard Delivery", desc: "5-7 business days", price: shipping() },
                    { id: "express", label: "Express Delivery", desc: "2-3 business days", price: 149 },
                  ].map((opt) => (
                    <label
                      key={opt.id}
                      className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        shippingMethod === opt.id ? "border-forest bg-sage-50" : "border-warmgray-200"
                      }`}
                    >
                      <input
                        type="radio"
                        name="shipping"
                        value={opt.id}
                        checked={shippingMethod === opt.id}
                        onChange={() => setShippingMethod(opt.id)}
                        className="accent-forest"
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-forest text-sm">{opt.label}</p>
                        <p className="text-xs text-warmgray-400">{opt.desc}</p>
                      </div>
                      <span className="font-bold text-forest text-sm">
                        {opt.price === 0 ? "FREE" : formatINR(opt.price)}
                      </span>
                    </label>
                  ))}
                </div>
                <button onClick={() => setStep(3)} className="btn-primary mt-6 w-full justify-center py-3.5">
                  Continue to Payment →
                </button>
              </div>
            )}

            {step === 3 && (
              <div className="bg-white rounded-2xl p-6 shadow-card">
                <h2 className="font-serif text-xl font-bold text-forest mb-5">Payment Method</h2>
                <div className="space-y-3 mb-6">
                  {[
                    { id: "prepaid", label: "Pay Online (UPI / Card / Net Banking)", desc: "Extra 5% off on prepaid orders!" },
                    { id: "cod", label: "Cash on Delivery (COD)", desc: "Pay when your order arrives" },
                  ].map((opt) => (
                    <label
                      key={opt.id}
                      className={`flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        payment === opt.id ? "border-forest bg-sage-50" : "border-warmgray-200"
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={opt.id}
                        checked={payment === opt.id}
                        onChange={() => setPayment(opt.id)}
                        className="accent-forest mt-0.5"
                      />
                      <div>
                        <p className="font-semibold text-forest text-sm">{opt.label}</p>
                        <p className="text-xs text-sage-600">{opt.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>

                {payment === "prepaid" && (
                  <div className="bg-sage-50 rounded-xl p-4 mb-4 text-sm text-sage-700">
                    🎉 You save an extra 5% with prepaid payment! Discount applied automatically.
                  </div>
                )}

                <button onClick={handlePlaceOrder} className="btn-coral w-full justify-center py-3.5 text-base">
                  Place Order — {formatINR(grandTotal())} 🎉
                </button>
                <p className="text-xs text-warmgray-400 text-center mt-3">
                  By placing your order, you agree to our Terms & Conditions.
                </p>
              </div>
            )}
          </div>

          {/* Order summary */}
          <div className="bg-white rounded-2xl p-5 shadow-card h-fit">
            <p className="font-semibold text-forest mb-4">Order Summary</p>
            <div className="space-y-3 mb-4">
              {items.map((item) => (
                <div key={`${item.productId}-${item.variant.id}`} className="flex justify-between text-sm">
                  <div>
                    <p className="text-warmgray-700 font-medium line-clamp-1">{item.title}</p>
                    <p className="text-xs text-warmgray-400">{item.variant.name} × {item.quantity}</p>
                  </div>
                  <p className="font-semibold text-forest shrink-0 ml-2">
                    {formatINR(item.variant.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>
            <div className="border-t border-warmgray-100 pt-3 space-y-1.5 text-sm">
              <div className="flex justify-between text-warmgray-600">
                <span>Subtotal</span><span>{formatINR(subtotal())}</span>
              </div>
              {discount() > 0 && (
                <div className="flex justify-between text-sage-600">
                  <span>Coupon</span><span>−{formatINR(discount())}</span>
                </div>
              )}
              <div className="flex justify-between text-warmgray-600">
                <span>Shipping</span>
                <span>{shipping() === 0 ? "FREE" : formatINR(shipping())}</span>
              </div>
              <div className="flex justify-between font-bold text-forest text-base border-t border-warmgray-100 pt-2 mt-1">
                <span>Total</span><span>{formatINR(grandTotal())}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
