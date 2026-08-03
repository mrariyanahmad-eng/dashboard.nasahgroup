"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function SignInForm({
  siteName,
  logoUrl,
}: {
  siteName: string;
  logoUrl: string;
}) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/apps");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-8">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-card border border-nasah-border p-8"
      >
        <div className="mb-6 flex items-center gap-2">
          <Image src={logoUrl} alt={siteName} width={28} height={28} className="rounded-full" />
          <span className="font-bold">{siteName} Dashboard</span>
        </div>

        <p className="mb-6 text-sm text-nasah-gray">
          Sign in with the same account you use on any Nasah app.
        </p>

        <label className="mb-1 block text-sm font-medium">Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 w-full rounded-control border border-nasah-border px-3 py-2 text-sm"
        />

        <label className="mb-1 block text-sm font-medium">Password</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4 w-full rounded-control border border-nasah-border px-3 py-2 text-sm"
        />

        {error && <p className="mb-4 text-sm text-error">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-control bg-nasah-red px-4 py-2.5 text-sm font-semibold text-white hover:bg-nasah-red-dark disabled:opacity-60"
        >
          {loading ? "Signing in…" : "Sign In"}
        </button>

        <p className="mt-5 text-center text-xs text-nasah-gray">
          No account?{" "}
          <a href="https://nasahgroup.com/sign-up" className="font-semibold text-nasah-red">
            Create one on nasahgroup.com
          </a>
        </p>
      </form>
    </div>
  );
}
