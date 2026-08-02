"use client";
import { useState } from "react";
import { Mail, Phone, MapPin, Send, Check } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section className="section-py bg-cream-50">
      <div className="container-padded max-w-5xl">
        <div className="text-center mb-10">
          <p className="text-xs font-semibold text-sage-600 uppercase tracking-widest mb-2">Get in Touch</p>
          <h1 className="font-serif text-4xl font-bold text-forest">Contact Us</h1>
          <p className="text-warmgray-500 mt-2">We&apos;re here to help. Reach out any time.</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Info */}
          <div className="lg:col-span-2 space-y-5">
            {[
              { icon: Mail, label: "Email", value: "hello@waveofwellness.in" },
              { icon: Phone, label: "WhatsApp", value: "+91 98765 43210" },
              { icon: MapPin, label: "Address", value: "Mumbai, Maharashtra, India" },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex gap-4 items-start bg-white rounded-2xl p-4 shadow-card">
                <div className="w-10 h-10 bg-sage-50 rounded-xl flex items-center justify-center shrink-0">
                  <Icon size={18} className="text-sage-600" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-warmgray-400 uppercase tracking-wide">{label}</p>
                  <p className="font-medium text-forest text-sm mt-0.5">{value}</p>
                </div>
              </div>
            ))}

            <div className="bg-forest rounded-2xl p-5 text-cream-50">
              <p className="font-serif text-lg font-bold mb-2">Response Time</p>
              <p className="text-cream-200 text-sm">We typically respond within 24 hours on business days (Mon–Sat).</p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3 bg-white rounded-2xl shadow-card p-6">
            {sent ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check size={28} className="text-sage-600" />
                </div>
                <p className="font-serif text-2xl font-bold text-forest mb-2">Message Sent!</p>
                <p className="text-warmgray-400 text-sm">We&apos;ll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-warmgray-500 mb-1">Your Name</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    required
                    placeholder="Ananya Singh"
                    id="contact-name"
                    className="input-base"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-warmgray-500 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    required
                    placeholder="you@example.com"
                    id="contact-email"
                    className="input-base"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-warmgray-500 mb-1">Message</label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    required
                    placeholder="Tell us how we can help..."
                    rows={5}
                    id="contact-message"
                    className="input-base resize-none"
                  />
                </div>
                <button type="submit" className="btn-primary w-full justify-center py-3.5 gap-2">
                  <Send size={16} /> Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
