# Nasah Dashboard

`dashboard.nasahgroup.com` — shows a signed-in user which Nasah apps
they have premium in, using the `entitlements` table that
`api.nasahgroup.com`'s `/v1/verify-purchase` endpoint writes to after
an app confirms a real Google Play purchase.

Same Supabase project as `nasah-web` and `nasah-api` — same login,
same data. See `nasah-web`'s README ("One login across every
subdomain") for the shared-cookie setup this relies on.

## Setup

```bash
npm install
cp .env.example .env.local   # fill in the real anon key
npm run dev
```

## Deploy

Separate Vercel project, same pattern as `nasah-web` and `nasah-api`:

1. Push to its own GitHub repo
2. Vercel → New Project → import it
3. Add the two env vars from `.env.example`
4. Vercel → Domains → add `dashboard.nasahgroup.com`, point DNS at it

## What this does and doesn't do

- **Shows entitlements** — reads the user's own rows from the
  `entitlements` table directly (their login, their data — allowed by
  that table's RLS policy).
- **Does not let anyone buy anything here.** Purchases still happen
  inside each Android app via Google Play Billing; this dashboard is
  read-only, just a summary view.
- **Doesn't manage app-specific settings** (like Prayer Tracker's
  prayer times, or One Tap Hisab's saved records) — those still live
  wherever those apps store them today. This dashboard is specifically
  about premium/account status, not a general data sync layer.
- **No account settings page yet** (change email, delete account) —
  point people to `nasahgroup.com/account` for that; wiring an
  equivalent here later is straightforward, same pattern.
