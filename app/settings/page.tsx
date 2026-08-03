"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function SettingsPage() {
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("saving");
    setError(null);

    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setError(error.message);
      setStatus("error");
      return;
    }

    setPassword("");
    setStatus("saved");
  }

  return (
    <div className="mx-auto max-w-md px-8 py-12">
      <Link href="/apps" className="mb-6 inline-block text-sm text-nasah-gray hover:text-nasah-red">
        ← Back
      </Link>
      <h1 className="mb-6 text-xl font-bold">Account settings</h1>

      <form onSubmit={handleSubmit}>
        <label className="mb-1 block text-sm font-medium">New password</label>
        <input
          type="password"
          required
          minLength={6}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-3 w-full rounded-control border border-nasah-border px-3 py-2 text-sm"
        />
        {error && <p className="mb-3 text-sm text-error">{error}</p>}
        {status === "saved" && <p className="mb-3 text-sm text-success">Password updated ✓</p>}
        <button
          type="submit"
          disabled={status === "saving"}
          className="rounded-control bg-nasah-red px-4 py-2 text-sm font-semibold text-white hover:bg-nasah-red-dark disabled:opacity-60"
        >
          {status === "saving" ? "Updating…" : "Update password"}
        </button>
      </form>

      <p className="mt-8 text-xs text-nasah-gray">
        Need to change your email or delete your account? Visit{" "}
        <a href="https://nasahgroup.com/account" className="text-nasah-red">
          nasahgroup.com/account
        </a>
        .
      </p>
    </div>
  );
}
