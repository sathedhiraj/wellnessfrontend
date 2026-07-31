"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { useAuthStore } from "@/lib/store/auth-store";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const { login, isLoading, error } = useAuthStore();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await login(email, password);
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
            <h1 className="font-serif text-3xl font-bold text-forest">Welcome Back</h1>
            <p className="text-warmgray-400 text-sm mt-1">Sign in to your Wave of Wellness account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-warmgray-500 mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                id="login-email"
                className="input-base"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-warmgray-500 mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  id="login-password"
                  className="input-base pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-warmgray-400 hover:text-forest"
                >
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && <p className="text-xs text-coral">{error}</p>}

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full justify-center py-3.5"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="mt-4 text-center">
            <Link href="#" className="text-xs text-sage-600 hover:text-forest">Forgot your password?</Link>
          </div>

          <div className="mt-6 pt-6 border-t border-warmgray-100 text-center">
            <p className="text-sm text-warmgray-500">
              New to Wave of Wellness?{" "}
              <Link href="/account/register" className="font-semibold text-forest hover:text-sage-700">
                Create account
              </Link>
            </p>
          </div>

          <p className="text-xs text-warmgray-300 text-center mt-4">
            Demo: any email + 6+ char password
          </p>
        </div>
      </div>
    </section>
  );
}
