import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { SignOutButton } from "@/components/SignOutButton";
import { getSettings } from "@/lib/settings";

type Entitlement = {
  app_id: string;
  product_id: string;
  status: string;
  platform: string;
  expiry_date: string | null;
};

export default async function AppsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const settings = await getSettings();

  // Users can read their own rows directly (see entitlements' RLS in
  // nasah-web's schema.sql) — no need to go through the API here since
  // this is a trusted first-party surface with its own Supabase session,
  // same as nasah-web itself.
  const { data: entitlements } = await supabase
    .from("entitlements")
    .select("app_id, product_id, status, platform, expiry_date")
    .eq("user_id", user?.id ?? "");

  return (
    <div className="mx-auto max-w-2xl px-8 py-12">
      <div className="mb-10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image src={settings.logo_mark_url} alt={settings.site_name} width={28} height={28} className="rounded-full" />
          <span className="font-bold">{settings.site_name} Dashboard</span>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/settings" className="text-sm font-medium text-nasah-gray hover:text-nasah-red">
            Settings
          </Link>
          <SignOutButton />
        </div>
      </div>

      <h1 className="mb-1 text-xl font-bold">Your apps</h1>
      <p className="mb-8 text-sm text-nasah-gray">Signed in as {user?.email}</p>

      {!entitlements || entitlements.length === 0 ? (
        <div className="rounded-card border border-dashed border-nasah-border p-8 text-center">
          <p className="text-sm text-nasah-gray">
            No premium purchases linked to this account yet.
          </p>
        </div>
      ) : (
        <div className="divide-y divide-nasah-border overflow-hidden rounded-card border border-nasah-border">
          {(entitlements as Entitlement[]).map((e) => (
            <div key={`${e.app_id}-${e.product_id}`} className="flex items-center justify-between px-5 py-4">
              <div>
                <p className="font-medium">{e.app_id}</p>
                <p className="text-xs text-nasah-gray">
                  {e.product_id}
                  {e.expiry_date &&
                    ` — renews ${new Date(e.expiry_date).toLocaleDateString()}`}
                </p>
              </div>
              <span
                className={
                  e.status === "active"
                    ? "rounded-full bg-success/10 px-2.5 py-1 text-xs font-semibold text-success"
                    : "rounded-full bg-nasah-surface px-2.5 py-1 text-xs font-semibold text-nasah-gray"
                }
              >
                {e.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
