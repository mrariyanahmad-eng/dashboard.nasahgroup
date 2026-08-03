// Same root-domain cookie as nasah-web — this is what makes a login on
// nasahgroup.com (in a browser) already work here too. See nasah-web's
// README ("One login across every subdomain") for the full picture —
// this only covers browser sessions, not native app logins.
export const authCookieOptions = {
  domain: process.env.NODE_ENV === "production" ? ".nasahgroup.com" : undefined,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
};
