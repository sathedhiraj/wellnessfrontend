"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/auth-store";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register, isLoading, error } = useAuthStore();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await register(name, email, password);
    if (ok) router.push("/account");
  };

  return (
    <section className="section-py bg-cream-50 min-h-[70vh] flex items-center">
      <div className="container-padded max-w-md w-full mx-auto">
        <div className="bg-white rounded-3xl shadow-card p-8">
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-forest rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-cream-50 font-serif font-bold text-lg">W</span>
            </div>
            <h1 className="font-serif text-3xl font-bold text-forest">Join the Wave</h1>
            <p className="text-warmgray-400 text-sm mt-1">Create your account and start your skin journey</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { key: "name", label: "Full Name", type: "text", placeholder: "Ananya Singh", state: name, setState: setName },
              { key: "email", label: "Email Address", type: "email", placeholder: "you@example.com", state: email, setState: setEmail },
              { key: "password", label: "Password", type: "password", placeholder: "Min. 6 characters", state: password, setState: setPassword },
            ].map(({ key, label, type, placeholder, state, setState }) => (
              <div key={key}>
                <label className="block text-xs font-semibold text-warmgray-500 mb-1">{label}</label>
                <input
                  type={type}
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  required
                  placeholder={placeholder}
                  id={`register-${key}`}
                  className="input-base"
                />
              </div>
            ))}

            {error && <p className="text-xs text-coral">{error}</p>}

            <button type="submit" disabled={isLoading} className="btn-primary w-full justify-center py-3.5">
              {isLoading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-warmgray-100 text-center">
            <p className="text-sm text-warmgray-500">
              Already have an account?{" "}
              <Link href="/account/login" className="font-semibold text-forest hover:text-sage-700">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
